<template>
  <b-form-group class="f-group text-group" :label="label" :label-for="label">
    <b-form-input class="custom-input" v-model="input" :type="type" size="sm"></b-form-input>
  </b-form-group>
</template>
<script>
export default {
  name: "Basic",
  props: {
    type: String,
    label: String,
    property: String
  },
  data() {
    return {
      input: "",
      payload: {}
    };
  },
  watch: {
    input() {
      this.payload[this.property] = this.input;
      this.$emit("change", this.payload);
    }
  }
};
</script>