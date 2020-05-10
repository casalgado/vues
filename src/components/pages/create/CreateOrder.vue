<template>
  <b-form
    v-if="show"
    id="form"
    @submit="
      submit($event);
      saveClient();
    "
    @reset="reset"
  >
    <b-button @click="addProduct" variant="info">+ producto</b-button>
    <b-button type="submit" variant="primary">Submit</b-button>
    <InputSelect
      v-model="form.client"
      :options="this.options.client"
      :label="'cliente'"
    />

    <InputBasic v-model="form.date" :type="'date'" :label="'producir'" />
    <InputBasic v-model="form.delivered" :type="'date'" :label="'entregar'" />

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
      <p v-if="$v.form.client.$error"><kbd>Debe incluir cliente</kbd></p>
    </div>

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
  save,
  getClientsLastOrder,
  getMostUsedClients,
  getAsOptionsForSelect,
  getById,
} from "@/firebase";
import { mapState } from "vuex";
import moment from "moment";
export default {
  name: "CreateOrder",
  mixins: [dynamicFieldsMixin, validationMixin],
  components: { InputSelect, InputBasic, InputDynamic },
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
        delivered: "",
        paid: "",
        products: [
          {
            id: 0,
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
  beforeCreate() {
    Promise.all([
      getAsOptionsForSelect("products").then((options) => {
        options.unshift({ value: "", text: "producto" });
        this.options.product = options;
      }),
      getMostUsedClients(20).then((options) => {
        options.unshift({ value: "", text: "cliente" });
        this.options.client = options;
      }),
    ]).then(() => {
      if (this.oid !== "") {
        this.form.products.pop();
        getById("orders", this.oid).then((object) => {
          console.log("beforeCreate");
          console.log(object);
          this.form.client = object.client;
          this.form.date = object.date.split("T")[0];
          this.form.delivered = object.date.split("T")[0];
          this.form.paid = object.paid;
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
        this.form.delivered = moment()
          .add(2, "day")
          .format("YYYY-MM-DD");
      }
    });
  },
  methods: {
    saveClient() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("invalid");
        this.submitStatus = "ERROR";
      } else {
        if (!this.options.client.includes(this.form.client)) {
          save(`clients`, { name: this.form.client, birthday: "" }, this);
        }
      }
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
      this.form.delivered = moment(val)
        .add(1, "day")
        .format("YYYY-MM-DD");
    },
  },
};
</script>
<style scoped>
#form {
  max-width: 500px;
}

* {
  margin: 5px;
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
