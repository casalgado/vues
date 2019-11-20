<template>
  <div>
    <b-form>
      <b-form-group class="f-group price-group" label="$Un">
        <b-form-select @change="onChange('name')" v-model="input.name" :options="options" size="sm"></b-form-select>
      </b-form-group>
      <b-form-group class="f-group price-group" label="$Un">
        <b-form-input
          @change="onChange('unitPrice')"
          v-model="input.unitPrice"
          type="number"
          size="sm"
        ></b-form-input>
      </b-form-group>
      <b-form-group class="f-group price-group" label="Ctd">
        <b-form-input
          @change="onChange('quantity')"
          v-model="input.quantity"
          type="number"
          size="sm"
        ></b-form-input>
      </b-form-group>
      <b-form-group class="f-group price-group" label="$To">
        <b-form-input @change="onChange('total')" v-model="input.total" type="number" size="sm"></b-form-input>
      </b-form-group>
    </b-form>
  </div>
</template>
<script>
export default {
  name: "Prices",
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
      this.$emit("change", this.input);
    }
  }
};
</script>