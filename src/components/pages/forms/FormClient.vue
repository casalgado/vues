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
    />
  </b-form>
</template>
<script>
import InputBasic from "../../inputs/InputBasic";
import InputSelect from "../../inputs/InputSelect";
import { save, getList } from "@/firebase";
import { mapState } from "vuex";
export default {
  name: "FormClient",
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
  computed: {
    ...mapState(["ref"]),
  },
  methods: {
    submit(evt) {
      if (evt) {
        evt.preventDefault();
      }
      save(`${this.ref}/clients`, this.form).then(() => {
        this.reset();
      });
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
    getList(this.ref, "productCategories").then((options) => {
      console.log(options);
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
