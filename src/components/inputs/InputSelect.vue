<template>
  <div class="f-group select-group">
    <b-button
      v-if="this.allowText"
      id="toggle-button"
      variant="info"
      @click="toggleSelect"
    >+</b-button>
    <label v-if="!this.allowText" :for="value">{{ this.label }}</label>
    <b-form-select
      v-if="select"
      :value="value"
      :options="options"
      class="custom-input"
      size="sm"
      @input="$emit('input', $event)"
    />
    <b-form-input
      v-else
      :value="value"
      class="custom-input"
      type="text"
      size="sm"
      placeholder="..."
      @input="$emit('input', $event)"
    />
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
