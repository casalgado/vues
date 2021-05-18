<template>
  <b-form v-if="show" id="form" @submit="submit($event)">
    <h5 id="form-title">crear pedido</h5>
    <InputSelect
      v-if="this.oid == ''"
      v-model="form.client"
      :options="this.options.client"
      :label="'cliente'"
    />
    <InputBasic v-model="form.date" :type="'date'" :label="'producir'" />
    <InputBasic v-model="form.deliver" :type="'date'" :label="'entregar'" />
    <InputBasic v-model="form.paid" :type="'date'" :label="'paid'" />
    <InputBasic v-model="form.comment" :type="'text'" :label="'comentario'" />
    <b-form-group label="">
      <div class="radio-group">
        <p @click="form.paymentMethod = ''">metodo de pago</p>
        <b-form-radio
          v-model="form.paymentMethod"
          name="efectivo"
          value="efectivo"
          >efectivo</b-form-radio
        >
        <b-form-radio
          v-model="form.paymentMethod"
          name="transferencia"
          value="transferencia"
          >transferencia</b-form-radio
        >
      </div>
      <!-- <div class="radio-group">
        <p>e. inmediata</p>
        <b-form-radio v-model="form.sameDayDelivery" name="si" :value="true"
          >si</b-form-radio
        >
        <b-form-radio v-model="form.sameDayDelivery" name="no" :value="false"
          >no</b-form-radio
        >
      </div> -->
    </b-form-group>
    <b-button variant="info" @click="addProduct">+ producto</b-button>
    <!-- <div>{{ form.paymentMethod }}</div>
    <div>{{ form.sameDayDelivery }}</div> -->
    <div v-for="field in this.form.products" :key="field.id">
      <transition name="fade">
        <InputDynamic
          v-if="field.active"
          :id="field.id"
          :property="'products'"
          :options="options.product"
          :priority="'unitPrice'"
          :populate="field"
          @remove-field="removeField"
          @update-field="updateField"
        />
      </transition>
    </div>
    <b-card id="toolbox">
      <p v-if="$v.form.client.$error"><kbd>Debe incluir cliente</kbd></p>
      <p v-if="$v.form.date.$error"><kbd>Debe incluir fecha produccion</kbd></p>
      <p v-if="$v.form.deliver.$error"><kbd>Debe incluir fecha entrega</kbd></p>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-card>

    <!-- <b-card class="mt-3">
      <pre class="m-0">{{ this.form }}</pre>
    </b-card> -->
  </b-form>
</template>
<script>
import { dynamicFieldsMixin } from "@/mixins/dynamicFieldsMixin";
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
import InputSelect from "../../inputs/InputSelect";
import InputBasic from "../../inputs/InputBasic";
import InputDynamic from "../../inputs/InputDynamic";
import {
  getClientsLastOrder,
  getMostUsedClients,
  getAsOptionsForSelect,
  getById,
} from "@/firebase";
import { mapState } from "vuex";
import moment from "moment";
export default {
  name: "CreateOrder",
  components: { InputSelect, InputBasic, InputDynamic },
  mixins: [dynamicFieldsMixin, validationMixin],
  props: {
    oid: {
      type: String,
      default: () => "",
    },
  },
  data() {
    return {
      form: {
        client: "",
        date: "",
        deliver: "",
        paid: "",
        paymentMethod: "",
        sameDayDelivery: false,
        comment: "",
        products: [
          {
            id: 0,
            active: true,
            name: "domicilio",
            unitPrice: 5000,
            quantity: 1,
            total: 5000,
          },
        ],
      },
      path: "orders",
      options: {
        client: [],
        product: [],
      },
      show: true,
    };
  },
  validations: {
    form: {
      client: {
        required,
        minLength: minLength(4),
      },
      date: {
        required,
      },
      deliver: {
        required,
      },
    },
  },
  computed: {
    ...mapState(["ref"]),
    client() {
      return this.form.client;
    },
    date() {
      return this.form.date;
    },
  },
  watch: {
    client: function(val) {
      if (this.oid === "" && this.options.client.includes(this.form.client)) {
        this.form.products = [];
        getClientsLastOrder(val).then((e) => {
          let products = e.products;
          this.form.paymentMethod = e.paymentMethod;
          for (let i = 0; i < products.length; i++) {
            this.form.products.push({
              id: i,
              active: true,
              name: products[i].name,
              unitPrice: products[i].unitPrice,
              quantity: products[i].quantity,
              total: products[i].total,
            });
          }
        });
      }
    },
    date: function(val) {
      this.form.deliver = moment(val).format("YYYY-MM-DD");
    },
  },
  beforeCreate() {
    Promise.all([
      getAsOptionsForSelect("products").then((options) => {
        options = this.reorder(options);
        options.unshift({ value: "", text: "producto" });
        this.options.product = options;
      }),
      getMostUsedClients(20).then((options) => {
        options.unshift({ value: "", text: "cliente" });
        this.options.client = options;
      }),
    ]).then(() => {
      if (this.oid !== "") {
        this.form.products = [];
        getById("orders", this.oid).then((object) => {
          console.log("beforeCreate");
          this.form.client = object.client;
          this.form.date = object.date.split("T")[0];
          this.form.deliver = object.date.split("T")[0];
          this.form.paid = object.paid.split("T")[0];
          this.form.paymentMethod = object.paymentMethod;
          this.form.comment = object.comment || "";
          let products = object.products;
          for (let i = 0; i < products.length; i++) {
            this.form.products.push({
              id: i,
              active: true,
              name: products[i].name,
              unitPrice: products[i].unitPrice,
              quantity: products[i].quantity,
              total: products[i].total,
            });
          }
        });
      } else {
        this.form.date = moment()
          .add(1, "day")
          .format("YYYY-MM-DD");
        this.form.deliver = moment()
          .add(2, "day")
          .format("YYYY-MM-DD");
      }
    });
  },
  methods: {
    reset(evt) {
      if (evt) {
        evt.preventDefault();
      }
      this.form = {
        client: "",
        date: moment()
          .add(1, "day")
          .format("YYYY-MM-DD"),
        deliver: moment()
          .add(2, "day")
          .format("YYYY-MM-DD"),
        paid: "",
        products: [
          {
            id: 0,
            active: true,
            name: "domicilio",
            unitPrice: 5000,
            quantity: 1,
            total: 5000,
          },
        ],
      };
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    reorder(products) {
      let strings = products.map((e) => {
        return e.text;
      });
      let sorted = [
        "domicilio",
        "descuento referente 30%",
        "descuento referido 25%",
        "iva 19%",
        "",
        "original grande",
        "pan de masa madre mediano",
        "pan de masa madre pequeño",
        "original 25% dcto",
        "original mediano 25% dcto",
        "original pequeño 25% dcto",
        "original 30% dcto",
        "original mediano 30% dcto",
        "original pequeño 30% dcto",
        "",
        "pan de queso costeño grande",
        "pan de queso costeño medio",
        "pan de queso costeño pequeño",
        "queso costeño 25% dcto",
        "queso mediano 25% dcto",
        "queso pequeño 25% dcto",
        "queso costeño 30% dcto",
        "queso mediano 30% dcto",
        "queso pequeño 30% dcto",
        "",
        "pan integral",
        "pan integral mediano",
        "pan integral pequeño",
        "integral y avena 25% dcto",
        "integral y avena mediano 25% dcto",
        "integral y avena pequeño 25% dcto",
        "integral y avena 30% dcto",
        "integral y avena mediano 30% dcto",
        "integral y avena pequeño 30% dcto",
        "",
        "pan de zaatar",
        "pan de zaatar mediano",
        "pan de zaatar pequeño",
        "zaatar 25% dcto",
        "zaatar mediano 25% dcto",
        "zaatar pequeño 25% dcto",
        "zaatar 30% dcto",
        "zaatar mediano 30% dcto",
        "zaatar pequeño 30% dcto",
        "",
        "pan de uva grande",
        "pan de uva mediano",
        "pan de uva pequeño",
        "uva fermentada 25% dcto",
        "uva mediano 25% dcto",
        "uva pequeño 25% dcto",
        "uva fermentada 30% dcto",
        "uva mediano 30% dcto",
        "uva pequeño 30% dcto",
        "",
        "pan de banano y semillas de girasol",
        "pan de banano y semillas de girasol mediano",
        "pan de banano y semillas de girasol pequeño",
        "",
        "girasol y banano mediano 25% dcto",
        "girasol y banano pequeño 25% dcto",
        "",
        "girasol y banano mediano 30% dcto",
        "girasol y banano pequeño 30% dcto",
        "",
        "pan de semillas grande",
        "pan 5 semillas mediano",
        "pan de semillas pequeño",
        "5 semillas 25% dcto",
        "5 semillas mediano 25% dcto",
        "5 semillas pequeño 25% dcto",
        "5 semillas 30% dcto",
        "5 semillas mediano 30% dcto",
        "5 semillas pequeño 30% dcto",
        "",
        "pan de ajonjoli grande",
        "pan de ajonjoli mediano",
        "pan de ajonjoli pequeño",
        "ajonjolí 25% dcto",
        "ajonjolí mediano 25% dcto",
        "ajonjolí pequeño 25% dcto",
        "ajonjolí 30% dcto",
        "ajonjolí mediano 30% dcto",
        "ajonjolí pequeño 30% dcto",
        "",
        "pan de chocolate grande",
        "pan de chocolate mediano",
        "pan de chocolate pequeño",
        "",
        "chocolate mediano 25% dcto",
        "chocolate pequeño 25% dcto",
        "",
        "chocolate mediano 30% dcto",
        "chocolate pequeño 30% dcto",
        "",
        "pan integral sin avena grande",
        "pan integral sin avena mediano",
        "pan integral sin avena pequeno",
        "integral original 25% dcto",
        "integral original mediano 25% dcto",
        "integral original pequeño 25% dcto",
        "integral original 30% dcto",
        "integral original mediano 30% dcto",
        "integral original pequeño 30% dcto",
        "",
        "pan integral de queso grande",
        "pan integral de queso mediano",
        "pan integral de queso pequeño",
        "integral queso costeño 25% dcto",
        "integral queso mediano 25% dcto",
        "integral queso pequeño 25% dcto",
        "integral queso costeño 30% dcto",
        "integral queso mediano 30% dcto",
        "integral queso pequeño 30% dcto",
        "",
        "pan integral de zaatar grande",
        "pan integral de zaatar mediano",
        "pan integral de zaatar pequeño",
        "integral zaatar 25% dcto",
        "integral zaatar mediano 25% dcto",
        "integral zaatar pequeño 25% dcto",
        "integral zaatar 30% dcto",
        "integral zaatar mediano 30% dcto",
        "integral zaatar pequeño 30% dcto",
        "",
        "pan integral de uva grande",
        "pan integral de uva mediano",
        "pan integral de uva pequeño",
        "integral uva fermentada 25% dcto",
        "integral uva mediano 25% dcto",
        "integral uva pequeño 25% dcto",
        "integral uva fermentada 30% dcto",
        "integral uva mediano 30% dcto",
        "integral uva pequeño 30% dcto",
        "",
        "pan integral de semillas y banano grande",
        "pan integral de semillas y banano mediano",
        "pan integral de semillas y banano pequeño",
        "integral semillas de girasol 25% dcto",
        "integral girasol y banano mediano 25% dcto",
        "integral girasol y banano pequeño 25% dcto",
        "integral semillas de girasol 30% dcto",
        "integral girasol y banano mediano 30% dcto",
        "integral girasol y banano pequeño 30% dcto",
        "",
        "pan integral de semillas",
        "pan integral de semillas mediano",
        "pan integral de semillas pequeño",
        "integral 5 semillas 25% dcto",
        "integral 5 semillas mediano 25% dcto",
        "integral 5 semillas pequeño 25% dcto",
        "integral 5 semillas 30% dcto",
        "integral 5 semillas mediano 30% dcto",
        "integral 5 semillas pequeño 30% dcto",
        "",
        "pan integral de ajonjoli grande",
        "pan integral de ajonjoli mediano",
        "pan integral de ajonjoli pequeño",
        "integral ajonjolí 25% dcto",
        "integral ajonjolí mediano 25% dcto",
        "integral ajonjolí pequeño 25% dcto",
        "integral ajonjolí 30% dcto",
        "integral ajonjolí mediano 30% dcto",
        "integral ajonjolí pequeño 30% dcto",
        "",
        "pan integral de chocolate grande",
        "pan integral de chocolate mediano",
        "pan integral de chocolate pequeño",
        "",
        "integral chocolate mediano 25% dcto",
        "integral chocolate pequeño 25% dcto",
        "",
        "integral chocolate mediano 30% dcto",
        "integral chocolate pequeño 30% dcto",
      ];
      // let past_sorted = [
      //   "domicilio",
      //   "",
      //   "pan de masa madre",
      //   "pan de masa madre mediano",
      //   "pan de masa madre pequeño",
      //   "mini masa madre",
      //   "",
      //   "pan integral",
      //   "pan integral mediano",
      //   "pan integral pequeño",
      //   "",
      //   "pan de queso costeño grande",
      //   "pan de queso costeño medio",
      //   "pan de queso costeño pequeño",
      //   "",
      //   "pan de zaatar",
      //   "pan de zaatar mediano",
      //   "pan de zaatar pequeño",
      //   "",
      //   "pan de ajonjoli grande",
      //   "pan de ajonjoli mediano",
      //   "pan de ajonjoli pequeño",
      //   "",
      //   "pan de banano y semillas de girasol",
      //   "pan de banano y semillas de girasol mediano",
      //   "pan de banano y semillas de girasol pequeño",
      //   "",
      //   "pan de semillas grande",
      //   "pan de semillas mediano",
      //   "pan de semillas pequeño",
      //   "",
      //   "pan de uva grande",
      //   "pan de uva mediano",
      //   "pan de uva pequeño",
      //   "",
      //   "pan de chocolate grande",
      //   "pan de chocolate mediano",
      //   "pan de chocolate pequeño",
      //   "",
      //   "",
      //   "pan integral sin avena grande ",
      //   "pan integral sin avena mediano",
      //   "pan integral sin avena pequeño",
      //   "",
      //   "pan integral de queso grande",
      //   "pan integral de queso mediano",
      //   "pan integral de queso pequeño",
      //   "",
      //   "pan integral de zaatar grande",
      //   "pan integral de zaatar mediano",
      //   "pan integral de zaatar pequeño",
      //   "",
      //   "pan integral de ajonjoli grande",
      //   "pan integral de ajonjoli mediano",
      //   "pan integral de ajonjoli pequeño",
      //   "",
      //   "pan integral de semillas y banano grande",
      //   "pan integral de semillas y banano mediano",
      //   "pan integral de semillas y banano pequeño",
      //   "",
      //   "pan integral de semillas",
      //   "pan integral de semillas mediano",
      //   "pan integral de semillas pequeño",
      //   "",
      //   "pan integral de uva grande",
      //   "pan integral de uva mediano",
      //   "pan integral de uva pequeño",
      //   "",
      //   "pan integral de chocolate grande",
      //   "pan integral de chocolate mediano",
      //   "pan integral de chocolate pequeño",
      //   "",
      // ];
      // let pgrandes = strings.filter((e) => {
      //   return e.includes("grande");
      // });
      // let pmedios = strings.filter((e) => {
      //   return e.includes("medio");
      // });
      // let ppeque = strings.filter((e) => {
      //   return e.includes("pequeño");
      // });
      let tortas = strings.filter((e) => {
        return e.includes("torta");
      });
      let potros = [
        "pan de bono paquete",
        "pan de hamburguesa",
        "pan de hamburguesa integral",
      ];
      let remove = [
        "brownie de coco",
        "brownie de mantequilla de mani",
        "domicilio reembolsable",
        "excedente",
        "fermento de pimenton",
        "galleta de jengibre",
        "harina",
        "helado de cafe",
        "helado de maracuya",
        "helado de nispero",
        "helado de yogurt",
        "integral de queso mediano",
        "pan de bono",
        "pan de bono paquete",
        "pan de cafe pequeño",
        "pan de hamburguesa",
        "pan de hamburguesa integral",
        "pan de semillas grande ",
        "pan de semillas mediano ",
        "pan de semillas y banano mediano",
        "pan de uva integral pequeño",
        "pan integral de queso mediano",
        "pan integral de zaatar mediano",
        "pan integral pequeño",
        "pan integral sin avena pequeno",
        "pan mini masa madre",
        "pan queso costeño pequeño",
        "pan sin avena grande",
      ];
      strings = strings
        .filter((e) => {
          return !sorted.includes(e);
        })
        .filter((e) => {
          return !tortas.includes(e);
        })
        .filter((e) => {
          return !remove.includes(e);
        });
      sorted = [...sorted, ...potros, "", ...tortas, "", ...strings];
      products = sorted.map((e) => {
        return { text: e, value: e };
      });

      return products;
    },
  },
};
</script>
<style scoped>
* {
  margin: 5px;
}

button {
  width: 110px;
}

.radio-group {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.radio-group p:first-child {
  text-align: left;
  cursor: pointer;
}

.f-group {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr 8fr;
}

.fade-enter-active {
  transition: opacity 1s;
}

.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter {
  opacity: 0.3;
}

.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave {
  opacity: 1;
}
</style>
