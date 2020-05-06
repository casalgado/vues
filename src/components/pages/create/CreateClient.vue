<template>
  <b-form id="form" @submit="submit" @reset="reset" v-if="show">
    <b-button type="submit" variant="primary">Submit</b-button>
    <InputBasic v-model="form.name" :type="'text'" :label="'nombre'" />
    <InputBasic v-model="form.phone" :type="'text'" :label="'telefono'" />
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
import { save, getAsOptionsForSelect } from "@/firebase";
import { mapState } from "vuex";
export default {
  name: "CreateClient",
  mixins: [validationMixin],
  components: { InputBasic, InputSelect },
  data() {
    return {
      form: {
        name: "",
        phone: "",
        address: "",
        birthday: "",
        details: "",
        comment: "",
        category: "",
      },
      options: {
        categories: [],
      },
      show: true,
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
        this.submitStatus = "ERROR";
      } else {
        if (evt) {
          evt.preventDefault();
        }
        save(`clients`, this.form).then(() => {
          this.reset();
        });
      }
    },
    reset(evt) {
      if (evt) {
        evt.preventDefault();
      }
      this.name = "";
      this.phone = "";
      this.address = "";
      this.birthday = "";
      this.comment = "";
      this.category = "";
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
  mounted() {
    getAsOptionsForSelect("clientCategories").then((options) => {
      options.unshift({ value: "", text: "origen" });
      this.options.categories = options;
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
