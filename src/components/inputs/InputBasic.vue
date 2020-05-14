<template>
  <b-form-group class="f-group text-group" :label="label" :label-for="label">
    <b-form-input
      class="custom-input"
      :value="value"
      :type="type"
      size="sm"
      @input="$emit('input', $event)"
    />
  </b-form-group>
</template>
<script>
export default {
  name: "InputBasic",
  props: {
    type: String,
    label: String,
    value: String,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
