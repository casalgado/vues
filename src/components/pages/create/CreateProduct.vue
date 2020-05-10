<template>
  <b-form id="form" @submit="submit" @reset="reset" v-if="show">
    <b-button type="submit" variant="primary">Submit</b-button>
    <InputBasic v-model="form.name" :type="'text'" :label="'nombre'" />
    <InputBasic v-model="form.price" :type="'text'" :label="'p venta'" />
    <InputBasic v-model="form.cost" :type="'text'" :label="'p costo'" />
    <InputSelect
      v-model="form.category"
      :options="this.options.categories"
      :label="'categoria'"
      :allowText="false"
    />
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
  mixins: [validationMixin],
  components: { InputBasic, InputSelect },
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
  methods: {
    submit(evt) {
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("invalid");
        this.submitStatus = "ERROR";
        evt.preventDefault();
      } else {
        this.$fire({
          text: "¿continuar?",
          showCancelButton: true,
        }).then((alertStatus) => {
          if (alertStatus.dismiss) {
            console.log("dismiss");
          } else {
            if (this.oid === "") {
              evt.preventDefault();
              save(this.path, this.form, this).then(() => {
                this.$router.go(-1);
              });
            } else {
              evt.preventDefault();
              update(`${this.path}/${this.oid}`, this.form).then(() => {
                this.$router.go(-1);
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
