<template>
  <b-form id="form" @submit="submit" @reset="reset" v-if="show">
    <b-button type="submit" variant="primary">Submit</b-button>
    <InputBasic v-model="form.name" :type="'text'" :label="'nombre'" />
    <InputBasic v-model="form.price" :type="'text'" :label="'precio venta'" />
    <InputBasic v-model="form.cost" :type="'text'" :label="'precio costo'" />
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
  name: "FormProduct",
  components: { InputBasic, InputSelect },
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
      save(`${this.ref}/products`, this.form).then(() => {
        this.reset();
      });
    },
    reset(evt) {
      if (evt) {
        evt.preventDefault();
      }
      this.name = "";
      this.price = "";
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
  mounted() {
    getList(this.ref, "productCategories").then((options) => {
      console.log(options);
      options.unshift({ value: "", text: "categorias" });
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
