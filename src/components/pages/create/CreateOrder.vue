<template>
  <b-form
    id="form"
    @submit="
      submit($event);
      updateClientInfo();
    "
    @reset="reset"
    v-if="show"
    novalidate
  >
    <b-button @click="add" variant="info">+ producto</b-button>
    <b-button type="submit" variant="primary">Submit</b-button>
    <InputSelect
      v-model="form.client"
      :options="this.options.client"
      :label="'cliente'"
    />
    <p v-if="$v.form.client.$error"><kbd>Debe incluir cliente</kbd></p>
    <InputBasic v-model="form.date" :type="'date'" :label="'producir'" />
    <InputBasic v-model="form.delivered" :type="'date'" :label="'entregar'" />

    <div v-for="field in this.form.products" :key="field.id">
      <transition name="fade">
        <InputDynamic
          v-if="field.active"
          :property="'products'"
          :options="options.product"
          :id="field.id"
          :priority="'unitPrice'"
          :populate="field"
          @remove-field="remove"
          @update-field="update"
        />
      </transition>
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
import { save, getClientsLastOrder, getMostUsed, getList } from "@/firebase";
import { mapState } from "vuex";
import moment from "moment";
export default {
  name: "CreateOrder",
  mixins: [dynamicFieldsMixin, validationMixin],
  components: { InputSelect, InputBasic, InputDynamic },
  props: {
    object: {
      type: Object,
      default: () => ({ empty: true }),
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
      table: "orders",
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
  methods: {
    updateClientInfo() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("invalid");
        this.submitStatus = "ERROR";
      } else {
        if (!this.options.client.includes(this.form.client)) {
          save(`${this.ref}/clients`, { name: this.form.client, birthday: "" });
        }
      }
    },
  },
  watch: {
    client: function(val) {
      if (this.options.client.includes(this.form.client)) {
        this.form.products = [];
        getClientsLastOrder(this.ref, val).then((e) => {
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
  created() {
    if (!this.object.empty) {
      this.form.client = this.object.client;
      this.form.date = this.object.date.split("T")[0];
      this.form.delivered = this.object.date.split("T")[0];
      let products = this.object.products;
      this.form.products.pop();
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
    }
  },
  mounted() {
    getMostUsed(`${this.ref}/orders`, "client", 20).then((options) => {
      options.unshift({ value: "", text: "cliente" });
      this.options.client = options;
    });
    getList(this.ref, "products").then((options) => {
      options.unshift({ value: "", text: "producto" });
      this.options.product = options;
    });
    this.form.date = moment().format("YYYY-MM-DD");
    this.form.delivered = moment()
      .add(1, "day")
      .format("YYYY-MM-DD");
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
