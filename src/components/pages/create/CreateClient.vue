<template>
  <b-form id="form" @submit="submit" @reset="reset" v-if="show">
    <b-button type="submit" variant="primary">Submit</b-button>
    <InputBasic v-model="form.name" :type="'text'" :label="'nombre'" />
    <InputBasic v-model="form.phone" :type="'number'" :label="'telefono'" />
    <InputBasic v-model="form.address" :type="'text'" :label="'direccion'" />
    <InputBasic v-model="form.birthday" :type="'date'" :label="'cumpleaños'" />
    <InputSelect
      v-model="form.category"
      :options="this.options.categories"
      :label="'categoria'"
      :allowText="false"
    />
    <p v-if="$v.form.name.$error"><kbd>Debe incluir nombre</kbd></p>
  </b-form>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
import InputBasic from "../../inputs/InputBasic";
import InputSelect from "../../inputs/InputSelect";
import { save, update, getAsOptionsForSelect, getById } from "@/firebase";
import { mapState } from "vuex";
export default {
  name: "CreateClient",
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
        phone: "",
        address: "",
        birthday: "",
        details: "-",
        comment: "",
        category: "",
      },
      options: {
        categories: [],
      },
      show: true,
      path: "clients",
    };
  },
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(2),
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
      } else {
        if (evt) {
          evt.preventDefault();
        }
        if (this.oid === "") {
          save(this.path, this.form).then(() => {
            update("optionsForMenus/clients", {
              [this.oid]: { name: this.form.name },
            });
          });
        } else {
          update(`${this.path}/${this.oid}`, this.form);
        }
      }
    },
    reset(evt) {
      if (evt) {
        evt.preventDefault();
      }
      this.form.name = "";
      this.form.phone = "";
      this.form.address = "";
      this.form.birthday = "";
      this.form.details = "";
      this.form.comment = "";
      this.form.category = "";
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
  beforeCreate() {
    Promise.all([
      getAsOptionsForSelect("clientCategories").then((options) => {
        options.unshift({ value: "", text: "origen" });
        this.options.categories = options;
      }),
    ]).then(() => {
      if (this.oid !== "") {
        getById("clients", this.oid).then((object) => {
          console.log(object);
          this.form.name = object.name;
          this.form.phone = object.phone;
          this.form.address = object.address;
          this.form.birthday = object.birthday;
          this.form.details = object.details;
          this.form.comment = object.comment;
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
