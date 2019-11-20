<template>
  <div id="container" class="border">
    <div id="main">
      <b-card class="mt-3">
        <pre class="m-0">{{ this.dynamicFields }}</pre>
      </b-card>
    </div>
    <div id="sidebar">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <Select @change="addInput" :options="clients" :property="'client'" />
        <b-button @click="addProductFields">+ producto</b-button>
        <div v-for="field in dynamicFields" :key="field.id">
          <div v-if="field.active">
            <b-button @click="removeAtIndex(field.id)">x{{field.id}}</b-button>
            <Prices
              @change="addNestedInput"
              :property="'products'"
              :options="products"
              :id="field.id"
              :priority="'unitPrice'"
            />
          </div>
        </div>
        <Basic @change="addInput" :label="'producir'" :property="'date'" :type="'date'" />
        <Basic @change="addInput" :label="'entregar'" :property="'delivered'" :type="'date'" />

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
import { save } from "../../../firebase";
export default {
  components: { Select, Basic, Prices },
  name: "OrdersForm",
  data() {
    return {
      form: {
        client: "",
        date: "",
        delivered: "",
        paid: "",
        products: []
      },
      dynamicFields: [{ id: 0, active: true }],
      show: true,
      clients: [
        { value: "", text: "cliente" },
        { value: "c", text: "ciieosu" }
      ],
      products: [
        { value: "", text: "producto" },
        { value: "p", text: "pounhon" },
        { value: "a", text: "a" },
        { value: "b", text: "b" },
        { value: "c", text: "c" },
        { value: "d", text: "d" }
      ]
    };
  },
  methods: {
    addInput(evt) {
      this.form = Object.assign(this.form, evt);
    },
    addNestedInput(evt) {
      Object.assign(this.dynamicFields[evt.id], evt);
    },
    addProductFields() {
      let size = this.dynamicFields.length;
      this.dynamicFields.push({ id: size, active: true });
    },
    removeAtIndex(i) {
      this.dynamicFields[i].active = false;
    },
    onSubmit(evt) {
      evt.preventDefault();
      let products = this.dynamicFields;
      let total = 0;
      for (let i = 0; i < products.length; i++) {
        if (products[i].active) {
          delete products[i].id;
          delete products[i].active;
          total += products[i].total;
          this.form.products.push(products[i]);
        }
      }
      this.form.total = total;
      console.log(this.form);
      save("orders", this.form).then(() => {
        this.onReset();
      });
    },
    onReset(evt) {
      if (evt) {
        evt.preventDefault();
      }
      // Reset our form values
      this.form.client = "";
      this.form.product = "";
      this.form.unitPrice = 0;
      this.form.quantity = 0;
      this.form.total = 0;
      this.form.date = "";
      this.form.delivered = "";
      this.form.products = [];
      this.dynamicFields = [{ id: 0, active: true }];
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