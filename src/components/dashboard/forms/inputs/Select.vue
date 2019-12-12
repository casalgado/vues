<template>
  <div class="f-group select-group">
    <b-button id="toggle-button" @click="toggleCreate" variant="info">+</b-button>
    <b-form-input
      v-if="create"
      v-model="input"
      class="custom-input"
      type="text"
      size="sm"
      placeholder="..."
    ></b-form-input>
    <b-form-select v-else v-model="input" :options="options" class="custom-input" size="sm"></b-form-select>
  </div>
</template>
<script>
export default {
  name: "Select",
  props: {
    options: Array,
    label: String,
    property: String
  },
  data() {
    return {
      input: "",
      create: false,
      payload: {}
    };
  },
  watch: {
    input() {
      this.payload[this.property] = this.input;
      this.$emit("change", this.payload);
    }
  },
  methods: {
    toggleCreate() {
      this.create = !this.create;
    }
  }
};
</script>
<style scoped>
#toggle-button {
  justify-self: center;
  height: 30px;
  width: 30px;
  padding: 0px;
}
</style>