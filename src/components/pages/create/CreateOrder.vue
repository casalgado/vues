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
  getClientListWithMostUsedFirst,
  getAsOptionsForSelect,
  getById,
} from "@/firebase";
import { mapState } from "vuex";
import moment from "moment";
import { reorderProductsMixin } from "../../../mixins/reorderProductsMixin";
export default {
  name: "CreateOrder",
  components: { InputSelect, InputBasic, InputDynamic },
  mixins: [dynamicFieldsMixin, validationMixin, reorderProductsMixin],
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
            code: "00",
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
    client: function (val) {
      if (this.oid === "" && this.options.client.includes(this.form.client)) {
        this.form.products = [];
        getClientsLastOrder(val).then((e) => {
          if (e) {
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
                code: products[i].code,
              });
            }
          } else {
            this.form.products.push({
              id: 0,
              active: true,
              name: "domicilio",
              unitPrice: 5000,
              quantity: 1,
              total: 5000,
              code: "000001",
            });
          }
        });
      }
    },
    date: function (val) {
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
      getClientListWithMostUsedFirst(20).then((options) => {
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
              code: products[i].code,
            });
          }
        });
      } else {
        this.form.date = moment().add(1, "day").format("YYYY-MM-DD");
        this.form.deliver = moment().add(2, "day").format("YYYY-MM-DD");
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
        date: moment().add(1, "day").format("YYYY-MM-DD"),
        deliver: moment().add(2, "day").format("YYYY-MM-DD"),
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
        this.$v.$reset();
        this.show = true;
      });
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
  grid-template-columns: 1fr 5fr;
}

.fade-enter-active {
  transition: opacity 0.3s;
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
