<template>
  <div id="container" class="border">
    <div id="main">
      <b-card class="mt-3">
        <pre class="m-0">{{ form }}</pre>
      </b-card>
    </div>
    <div id="sidebar">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <Select @change="addInput" :options="clients" :property="'client'" />
        <Basic @change="addInput" :label="'Total'" :property="'total'" :type="'date'" />

        <div v-for="product in form.products" :key="product.name">
          {{form.products.indexOf(product)}}
          <Select @change="addNestedInput" :options="products" :property="'name'" />
          <Prices @change="addNestedInput" :property="'products'" />
        </div>

        <b-form-group class="f-group date-group" label="Pro" label-for="unit">
          <b-form-input v-model="form.date" type="date" size="sm"></b-form-input>
        </b-form-group>

        <b-form-group class="f-group date-group" label="Ent" label-for="unit">
          <b-form-input v-model="form.delivered" type="date" size="sm"></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </div>
  </div>
</template>
<script>
import Select from "./inputs/Select";
import Basic from "./inputs/Basic";
import Prices from "./inputs/Prices";
// import { save } from "../../../firebase";
export default {
  components: { Select, Basic, Prices },
  name: "OrdersForm",
  data() {
    return {
      form: {
        client: "",
        unitPrice: 0,
        quantity: 0,
        total: 0,
        date: "",
        products: [{ name: "1" }, { name: "2" }],
        delivered: "",
        paid: ""
      },
      show: true,
      clients: [
        { value: "", text: "cliente" },
        { value: "c", text: "ciieosu" }
      ],
      products: [
        { value: "", text: "producto" },
        { value: "p", text: "pounhon" }
      ]
    };
  },
  methods: {
    addInput(evt) {
      this.form = Object.assign(this.form, evt);
    },
    addNestedInput(evt) {
      console.log(evt);
    },
    onSubmit(evt) {
      evt.preventDefault();
      console.log(this.form);
      // save("orders", this.form);
      this.onReset();
    },
    onReset(evt) {
      if (evt) {
        evt.preventDefault();
      }
      // Reset our form values
      this.client = "";
      this.product = "";
      this.unitPrice = 0;
      this.quantity = 0;
      this.total = 0;
      this.date = "";
      this.delivered = "";
      this.paid = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    toggleCreate() {
      this.create = !this.create;
    }
  }
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