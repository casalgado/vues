<template>
  <div>
    <b-form-group class="f-group price-group" label="$Un">
      <b-form-input v-model="input.unitPrice" type="number" size="sm"></b-form-input>
    </b-form-group>
    <b-form-group class="f-group price-group" label="Ctd">
      <b-form-input v-model="input.quantity" type="number" size="sm"></b-form-input>
    </b-form-group>
    <b-form-group class="f-group price-group" label="$To">
      <b-form-input v-model="input.total" type="number" size="sm"></b-form-input>
    </b-form-group>
  </div>
</template>
<script>
export default {
  name: "Prices",
  props: {
    property: String
  },
  data() {
    return {
      input: {
        unitPrice: 0,
        quantity: 0,
        total: 0
      },
      payload: {}
    };
  },
  computed: {
    change() {
      return this.input.unitPrice + this.input.quantity + this.input.total;
    }
  },
  watch: {
    change() {
      this.payload[this.property] = this.input;
      this.$emit("change", this.payload);
    }
  }
};
</script>