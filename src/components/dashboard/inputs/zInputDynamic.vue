<template>
  <div id="dynamic">
    <b-button id="remove-button" variant="danger" @click="remove()">x</b-button>

    <b-form-select
      id="product-select"
      class="custom-input"
      @change="onChange('name')"
      v-model="input.name"
      :options="options"
      size="sm"
    ></b-form-select>

    <b-form-group class="f-group price-group" label="$ Unitario" size="sm"></b-form-group>
    <b-form-input
      class="custom-input price-input"
      @change="onChange('unitPrice')"
      v-model="input.unitPrice"
      type="number"
      size="sm"
    ></b-form-input>

    <b-form-group class="f-group price-group" label="Cantidad"></b-form-group>
    <b-form-input
      class="custom-input price-input"
      @change="onChange('quantity')"
      v-model="input.quantity"
      type="number"
      size="sm"
    ></b-form-input>

    <b-form-group class="f-group price-group" label="$ Total"></b-form-group>
    <b-form-input
      class="custom-input price-input"
      @change="onChange('total')"
      v-model="input.total"
      type="number"
      size="sm"
    ></b-form-input>
  </div>
</template>
<script>
export default {
  name: "InputDynamic",
  props: {
    options: Array,
    property: String,
    id: Number,
    priority: String
  },
  data() {
    return {
      input: {
        name: "",
        unitPrice: 0,
        quantity: 1,
        total: 0
      },
      payload: {}
    };
  },
  methods: {
    onChange(field) {
      let unitPrice = this.input.unitPrice;
      let quantity = this.input.quantity;
      let total = this.input.total;
      if (field == "unitPrice") {
        this.input.total = unitPrice * quantity;
      } else if (field == "total") {
        this.input.unitPrice = Math.floor(total / quantity);
      } else if (field == "quantity" && this.priority == "total") {
        this.input.unitPrice = Math.floor((total * 10) / quantity) / 10;
      } else if (field == "quantity" && this.priority == "unitPrice") {
        this.input.total = Math.floor(unitPrice * quantity);
      }
      this.input.id = this.id;
      this.input.active = true;
      this.$store.commit("updateField", this.input);
    },
    remove() {
      console.log(this.id);
      this.$store.commit("removeField", { id: this.id });
    }
  }
};
</script>
<style scoped>
* {
  margin: 0px;
}
#dynamic {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-gap: 5px;
}

#product-select {
  grid-column: 2 / span 8;
}

.price-input {
  grid-column: span 3;
}

.price-group {
  grid-column: span 6;
  justify-self: start;
  align-self: end;
}

#remove-button {
  height: 30px;
  width: 30px;
  padding: 0px;
}
</style>