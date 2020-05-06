<template>
  <b-form
    id="form"
    @submit="
      submit($event);
      createRecord();
    "
    @reset="reset"
    v-if="show"
  >
    <b-button @click="addProduct" variant="info">+ producto</b-button>
    <b-button type="submit" variant="primary">Submit</b-button>

    <InputSelect
      v-model="form.provider"
      :options="this.options.provider"
      :label="'proveedor'"
    />

    <InputSelect
      v-model="form.category"
      :options="this.options.category"
      :allowText="false"
      :label="'categoria'"
    />

    <InputBasic v-model="form.date" :type="'date'" :label="'fecha'" />

    <div v-for="field in this.form.products" :key="field.id">
      <transition name="fade">
        <InputDynamic
          v-if="field.active"
          :property="'products'"
          :id="field.id"
          :priority="'total'"
          :populate="field"
          :onlyText="true"
          @remove-field="removeField"
          @update-field="updateField"
        />
      </transition>
    </div>
    <p v-if="$v.form.provider.$error"><kbd>Debe incluir proveedor</kbd></p>
    <p v-if="$v.form.category.$error"><kbd>Debe incluir categoria</kbd></p>
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
import { save, getMostUsed, getAsOptionsForSelect } from "@/firebase";
import { mapState } from "vuex";
import moment from "moment";
export default {
  name: "CreateExpense",
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
    client() {
      return this.form.client;
    },
    date() {
      return this.form.date;
    },
  },
  methods: {
    createRecord() {
      if (!this.options.provider.includes(this.form.provider)) {
        save(`/providers`, { name: this.form.provider });
      }
    },
  },

  watch: {},
  created() {
    if (!this.object.empty) {
      this.form.provider = this.object.provider;
      this.form.date = this.object.date.split("T")[0];
      this.form.category = this.object.category;
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
    getMostUsed(`expenses`, "provider", 20).then((options) => {
      options.unshift({ value: "", text: "proveedor" });
      this.options.provider = options;
    });
    getAsOptionsForSelect("expenseCategories").then((options) => {
      options.unshift({ value: "", text: "categoria" });
      this.options.category = options;
    });
    this.form.date = moment().format("YYYY-MM-DD");
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
