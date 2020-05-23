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
      <b-button variant="info" @click="addProduct">+ producto</b-button>
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
        products: [
          {
            id: 0,
            active: true,
            name: "domicilio",
            unitPrice: 5000,
            quantity: 1,
            total: 5000,
          },
          {
            id: 1,
            active: true,
            name: "",
            unitPrice: 1,
            quantity: 1,
            total: 1,
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
      this.form.deliver = moment(val)
        .add(1, "day")
        .format("YYYY-MM-DD");
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
          console.log(object);
          this.form.client = object.client;
          this.form.date = object.date.split("T")[0];
          this.form.deliver = object.date.split("T")[0];
          this.form.paid = object.paid.split("T")[0];
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
          {
            id: 1,
            active: true,
            name: "",
            unitPrice: 1,
            quantity: 1,
            total: 1,
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
        "pan de masa madre",
        "pan integral",
        "pan de banano y semillas de girasol",
        "pan de semillas",
        "pan de zaatar",
      ];
      let pgrandes = strings.filter((e) => {
        return e.includes("grande");
      });
      let ppeque = strings.filter((e) => {
        return e.includes("pequeño");
      });
      let tortas = strings.filter((e) => {
        return e.includes("torta");
      });
      ppeque.shift();
      ppeque.pop();
      let potros = [
        "pan brioche",
        "pan de bono",
        "pan de bono paquete",
        "pan de hamburguesa",
      ];
      strings = strings
        .filter((e) => {
          return !sorted.includes(e);
        })
        .filter((e) => {
          return !pgrandes.includes(e);
        })
        .filter((e) => {
          return !ppeque.includes(e);
        })
        .filter((e) => {
          return !tortas.includes(e);
        })
        .filter((e) => {
          return e.split(" ")[0] !== "pan";
        });
      sorted = [
        ...sorted,
        ...pgrandes,
        "pan de masa madre mediano",
        "",
        ...ppeque,
        "",
        ...potros,
        "",
        ...tortas,
        "",
        ...strings,
      ];
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

.f-group {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr 8fr;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
