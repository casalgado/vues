<template>
  <b-form v-if="show" id="form" @submit="submit" @reset="reset">
    <h5 id="form-title">crear cliente</h5>
    <InputBasic v-model="form.name" :type="'text'" :label="'nombre'" />
    <InputBasic v-model="form.phone" :type="'number'" :label="'telefono'" />
    <InputBasic v-model="form.address" :type="'text'" :label="'direccion'" />
    <InputBasic v-model="form.birthday" :type="'date'" :label="'cumpleaños'" />
    <InputSelect
      v-model="form.category"
      :options="this.options.categories"
      :label="'categoria'"
      :allow-text="false"
    />
    <b-card id="toolbox">
      <p v-if="$v.form.name.$error"><kbd>Debe incluir nombre</kbd></p>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-card>
  </b-form>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
import InputBasic from "../../inputs/InputBasic";
import InputSelect from "../../inputs/InputSelect";
import { save, update, getAsOptionsForSelect, getById } from "@/firebase";
import { mapState } from "vuex";
import moment from "moment";
export default {
  name: "CreateClient",
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
        phone: "",
        address: "",
        birthday: "",
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
  beforeCreate() {
    Promise.all([
      getAsOptionsForSelect("optionsForMenus/clientCategories").then(
        (options) => {
          options.unshift({ value: "", text: "origen" });
          this.options.categories = options;
        }
      ),
    ]).then(() => {
      if (this.oid !== "") {
        getById("clients", this.oid).then((object) => {
          this.form.name = object.name;
          this.form.phone = object.phone.toString();
          this.form.address = object.address;
          this.form.birthday = object.birthday;
          this.form.comment = object.comment || "";
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
              this.form.since = moment().format();
              save(this.path, this.form, this).then((id) => {
                update("optionsForMenus/clients", {
                  [id]: { name: this.form.name },
                });
                this.$router.push({ name: "ShowClients" });
              });
            } else {
              update(`${this.path}/${this.oid}`, this.form).then(() => {
                this.$router.push({ name: "ShowClients" });
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
      this.form.name = "";
      this.form.phone = 0;
      this.form.address = "";
      this.form.birthday = "";
      this.form.comment = "";
      this.form.category = "";
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
