<template>
  <div id="container" class="border">
    <div id="main">
      <b-card class="mt-3">
        <pre class="m-0">{{ form }}</pre>
      </b-card>
    </div>
    <div id="sidebar">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <div class="f-group select-group">
          <b-button @click="toggleCreate" variant="info">+</b-button>
          <b-form-input v-if="create" id="unitPrice" v-model="form.client" type="text" size="sm"></b-form-input>
          <b-form-select v-else v-model="form.client" :options="clients" size="sm"></b-form-select>
        </div>

        <div class="f-group select-group">
          <b-button @click="toggleCreate" variant="info">+</b-button>
          <b-form-input v-if="create" id="product" v-model="form.product" type="text" size="sm"></b-form-input>
          <b-form-select v-else v-model="form.product" :options="products" size="sm"></b-form-select>
        </div>

        <b-form-group class="f-group price-group" label="Ctd" label-for="unit">
          <b-form-input v-model="form.quantity" type="number" size="sm"></b-form-input>
        </b-form-group>

        <b-form-group class="f-group price-group" label="$Un" label-for="unit">
          <b-form-input v-model="form.unitPrice" type="number" size="sm"></b-form-input>
        </b-form-group>

        <b-form-group class="f-group price-group" label="$To" label-for="unit">
          <b-form-input v-model="form.total" type="number" size="sm"></b-form-input>
        </b-form-group>

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
import { save } from "../../../firebase";
export default {
  name: "OrdersForm",
  data() {
    return {
      form: {
        client: "",
        product: "",
        unitPrice: 0,
        quantity: 0,
        total: 0,
        date: "",
        delivered: "",
        paid: ""
      },
      show: true,
      create: false,
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
    onSubmit(evt) {
      evt.preventDefault();
      save("orders", this.form);
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
  grid-template-columns: 1fr 8fr;
}

#container {
  display: grid;
  grid-template-columns: 2fr 1fr;
}
</style>