<template>
  <b-form v-if="show" id="form" @submit="submit" @reset="reset">
    <h5 id="form-title">crear producto</h5>
    <InputBasic v-model="form.name" :type="'text'" :label="'nombre'" />
    <InputBasic v-model="form.price" :type="'text'" :label="'p venta'" />
    <InputBasic v-model="form.cost" :type="'text'" :label="'p costo'" />
    <InputSelect
      v-model="form.category"
      :options="this.options.categories"
      :label="'categoria'"
      :allow-text="false"
    />
    <b-button type="submit" variant="primary">Submit</b-button>
    <p v-if="$v.form.name.$error"><kbd>Debe incluir nombre</kbd></p>
    <p v-if="$v.form.category.$error"><kbd>Debe incluir categoria</kbd></p>
  </b-form>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
import InputBasic from "../../inputs/InputBasic";
import InputSelect from "../../inputs/InputSelect";
import { save, getAsOptionsForSelect, getById, update } from "@/firebase";
import { mapState } from "vuex";
export default {
  name: "CreateProduct",
  components: { InputBasic, InputSelect },
  mixins: [validationMixin],
  props: {
    oid: {
      type: String,
      default: () => "",
    },
  },
  data() {
    return {
      form: {
        name: "",
        price: "",
        cost: "",
        category: "",
      },
      options: {
        categories: [],
      },
      show: true,
      path: "products",
    };
  },
  validations: {
    form: {
      name: {
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
  },
  beforeCreate() {
    Promise.all([
      getAsOptionsForSelect("optionsForMenus/productCategories").then(
        (options) => {
          console.log(options);
          options.unshift({ value: "", text: "categoria" });
          this.options.categories = options;
        }
      ),
    ]).then(() => {
      if (this.oid !== "") {
        getById(this.path, this.oid).then((object) => {
          object.price = object.price || "";
          object.cost = object.cost || "";
          this.form.name = object.name;
          this.form.price = object.price.toString();
          this.form.cost = object.cost.toString();
          this.form.category = object.category;
        });
      }
    });
  },
  methods: {
    submit(evt) {
      evt.preventDefault();
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("invalid");
        this.submitStatus = "ERROR";
      } else {
        this.$fire({
          text: "¿continuar?",
          showCancelButton: true,
        }).then((alertStatus) => {
          if (alertStatus.dismiss) {
            console.log("dismiss");
          } else {
            this.form.name = this.form.name.toLowerCase();
            if (this.oid === "") {
              save(this.path, this.form, this).then(() => {
                this.$router.go();
              });
            } else {
              update(`${this.path}/${this.oid}`, this.form).then(() => {
                this.$router.go();
              });
            }
          }
        });
      }
    },
    reset(evt) {
      if (evt) {
        evt.preventDefault();
      }
      this.name = "";
      this.price = "";
      this.cost = "";
      this.category = "";
      this.show = false;
      this.$nextTick(() => {
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
.f-group {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr 8fr;
}

#container {
  display: grid;
  grid-template-columns: 2fr 1fr;
}
</style>
