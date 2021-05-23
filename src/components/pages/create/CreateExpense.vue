<template>
  <b-form v-if="show" id="form" @submit="submit($event)">
    <h5 id="form-title">crear gasto</h5>
    <InputSelect
      v-model="form.provider"
      :options="options.provider"
      :label="'proveedor'"
    />

    <InputSelect
      v-model="form.category"
      :options="options.category"
      :allow-text="false"
      :label="'categoria'"
    />

    <InputBasic v-model="form.date" :type="'date'" :label="'fecha'" />
    <b-button variant="info" @click="addProduct">+ producto</b-button>

    <div v-for="field in form.products" :key="field.id">
      <transition name="fade">
        <InputDynamic
          v-if="field.active"
          :id="field.id"
          :property="'products'"
          :priority="'total'"
          :populate="field"
          :only-text="true"
          @remove-field="removeField"
          @update-field="updateField"
        />
      </transition>
    </div>
    <b-card id="toolbox">
      <p v-if="$v.form.provider.$error"><kbd>Debe incluir proveedor</kbd></p>
      <p v-if="$v.form.category.$error"><kbd>Debe incluir categoria</kbd></p>
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
  getMostUsed,
  getAsOptionsForSelect,
  getById,
  getProvidersLastExpense,
} from "@/firebase";
import { mapState } from "vuex";
import moment from "moment";
export default {
  name: "CreateExpense",
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
        provider: "",
        category: "",
        date: "",
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
      path: "expenses",
      options: {
        provider: [],
        category: [],
      },
      show: true,
    };
  },
  validations: {
    form: {
      provider: {
        required,
        minLength: minLength(2),
      },
      category: {
        required,
      },
    },
  },
  computed: {
    ...mapState(["ref"]),
    provider() {
      return this.form.provider;
    },
    date() {
      return this.form.date;
    },
  },
  watch: {
    provider: function(val) {
      console.log(val);
      if (
        this.oid === "" &&
        this.options.provider.includes(this.form.provider)
      ) {
        this.form.products = [];
        getProvidersLastExpense(val).then((e) => {
          let products = e.products;
          this.form.category = e.category;
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
  },
  beforeCreate() {
    Promise.all([
      getMostUsed(`expenses`, "provider", 20).then((options) => {
        options.unshift({ value: "", text: "proveedor" });
        this.options.provider = options;
      }),
      getAsOptionsForSelect("optionsForMenus/expenseCategories").then(
        (options) => {
          options.unshift({ value: "", text: "categoria" });
          this.options.category = options;
        }
      ),
    ]).then(() => {
      if (this.oid !== "") {
        this.form.products.pop();
        getById("expenses", this.oid).then((object) => {
          console.log(object);
          this.form.provider = object.provider;
          this.form.category = object.category;
          this.form.date = object.date.split("T")[0];
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
        this.form.date = moment().format("YYYY-MM-DD");
      }
    });
  },
  methods: {
    reset(evt) {
      if (evt) {
        evt.preventDefault();
      }
      this.form = {
        provider: "",
        category: "",
        date: "",
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
      };
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
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
  grid-template-columns: 1fr 5fr;
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
