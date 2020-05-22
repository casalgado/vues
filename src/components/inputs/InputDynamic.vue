<template>
  <div class="dynamic">
    <b-button id="remove-button" variant="danger" @click="remove()">x</b-button>

    <b-form-select
      v-if="!this.onlyText"
      id="product-select"
      v-model="input.name"
      class="custom-input"
      :options="options"
      size="sm"
      @change="onChange('name')"
    />
    <b-form-input
      id="product-select"
      v-else
      v-model="input.name"
      class="custom-input"
      placeholder="..."
      type="text"
      size="sm"
      @change="onChange('name')"
    />

    <b-form-group class="f-group price-group" label="$ Unitario" size="sm" />
    <b-form-input
      v-model="input.unitPrice"
      class="custom-input price-input"
      type="number"
      step=".01"
      size="sm"
      @change="onChange('unitPrice')"
    />

    <b-form-group class="f-group price-group" label="Cantidad" />
    <b-form-input
      v-model="input.quantity"
      class="custom-input price-input"
      type="number"
      size="sm"
      @change="onChange('quantity')"
    />

    <b-form-group class="f-group price-group" label="$ Total" />
    <b-form-input
      v-model="input.total"
      class="custom-input price-input"
      type="number"
      size="sm"
      @change="onChange('total')"
    />
  </div>
</template>
<script>
import { getOneWhere } from "@/firebase";
export default {
  name: "InputDynamic",
  props: {
    options: Array,
    property: String,
    id: Number,
    priority: String,
    populate: Object,
    onlyText: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      input: {
        name: "",
        unitPrice: 1,
        quantity: 1,
        total: 1,
      },
      payload: {},
    };
  },
  computed: {
    name: function() {
      return this.input.name;
    },
  },
  watch: {
    name() {},
  },
  created() {
    this.input.name = this.populate.name;
    this.input.unitPrice = this.populate.unitPrice;
    this.input.quantity = this.populate.quantity;
    this.input.total = this.populate.total;
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
        this.input.unitPrice = Math.floor((total * 100) / quantity) / 100;
      } else if (field == "quantity" && this.priority == "unitPrice") {
        this.input.total = Math.floor(unitPrice * quantity);
      }
      if (field == "name") {
        getOneWhere("products", "name", this.name).then((obj) => {
          if (obj) {
            this.input.unitPrice = obj.price;
            this.input.total = Math.floor(obj.price * quantity);
            this.$emit("update-field", this.input);
          }
        });
      }
      this.input.id = this.id;
      this.input.active = true;
      this.$emit("update-field", this.input);
    },
    remove() {
      console.log(this.id);
      this.$emit("remove-field", { id: this.id });
    },
  },
};
</script>
<style scoped>
* {
  margin: 0px;
}
.dynamic {
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
