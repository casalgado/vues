<template>
  <div id="container" class="border">
    <div id="main">
      <b-card class="mt-3">
        <pre class="m-0">{{ form }}</pre>
      </b-card>
    </div>
    <div id="sidebar">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <div id="select-group" class="f-group">
          <b-button @click="toggleCreate" variant="info">+</b-button>
          <b-form-input v-if="create" id="unit" v-model="form.client" type="text" size="sm"></b-form-input>
          <b-form-select v-else v-model="form.client" :options="clients" size="sm"></b-form-select>
        </div>
        <b-form-select v-model="form.product" :options="products" size="sm"></b-form-select>
        <b-form-group id="unit-group" class="f-group" label="unit price" label-for="unit">
          <b-form-input id="unit" v-model="form.unit" type="number" size="sm"></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "Form",
  data() {
    return {
      form: {
        client: "",
        product: "",
        food: null,
        checked: []
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
      alert(JSON.stringify(this.form));
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      this.form.food = null;
      this.form.checked = [];
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