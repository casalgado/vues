<template>
  <div class="f-group select-group">
    <b-button
      v-if="this.allowText"
      id="toggle-button"
      @click="toggleSelect"
      variant="info"
      >+</b-button
    >
    <label :for="value" v-if="!this.allowText">{{ this.label }}</label>
    <b-form-select
      v-if="select"
      :value="value"
      @input="$emit('input', $event)"
      :options="options"
      class="custom-input"
      size="sm"
    ></b-form-select>
    <b-form-input
      v-else
      :value="value"
      @input="$emit('input', $event)"
      class="custom-input"
      type="text"
      size="sm"
      placeholder="..."
    ></b-form-input>
  </div>
</template>
<script>
export default {
  name: "InputSelect",
  props: {
    options: Array,
    label: String,
    value: String,
    allowText: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      select: true,
    };
  },
  methods: {
    toggleSelect() {
      this.select = !this.select;
    },
  },
};
</script>
<style scoped>
#toggle-button {
  height: 30px;
  width: 30px;
  padding: 0px;
}
</style>
