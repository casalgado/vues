<template>
  <b-form-group class="f-group text-group" label="label" label-for="input">
    <b-form-input v-model="input" type="text" size="sm"></b-form-input>
  </b-form-group>
</template>
<script>
export default {
  name: "TextGroup",
  data() {
    return {
      input: ""
    };
  }
};
</script>