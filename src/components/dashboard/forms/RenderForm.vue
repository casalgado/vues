<template>
  <div id="container" class="border">
    <div id="main">
      <b-card class="mt-3">
        <pre class="m-0">{{ form }}</pre>
      </b-card>
    </div>
    <div id="sidebar">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <Select />
        <TextGroup />
        <!-- <div v-for="field in fields" :key="field.id">
          <component v-bind:is="field.component"></component>
        </div>-->

        <!-- <b-form-select v-model="form.product" :options="products" size="sm"></b-form-select>
        <b-form-group id="unit-group" class="f-group" label="unit price" label-for="unit">
          <b-form-input id="unit" v-model="form.unit" type="number" size="sm"></b-form-input>
        </b-form-group>-->
        <div v-if="false">
          <!-- necessary because of linting rule 'no unused component' -->
          <Select />
          <TextGroup />
        </div>
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </div>
  </div>
</template>
<script>
import Select from "./inputs/Select";
import TextGroup from "./TextGroup";
export default {
  components: { Select, TextGroup },
  name: "OrdersForm",
  data() {
    return {
      fields: [
        { component: "Select", id: 1 },
        { component: "TextGroup", id: 2 }
      ],
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
  grid-gap: 10px;
  grid-template-columns: 1fr 8fr;
}

#container {
  display: grid;
  grid-template-columns: 2fr 1fr;
}
</style>