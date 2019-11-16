<template>
  <div class="f-group select-group">
    <b-button @click="toggleCreate" variant="info">+</b-button>
    <b-form-input v-if="create" id="unit" v-model="input" type="text" size="sm"></b-form-input>
    <b-form-select v-else v-model="input" :options="clients" size="sm"></b-form-select>
  </div>
</template>
<script>
export default {
  name: "SelectGroup",
  data() {
    return {
      input: "",
      create: false,
      clients: [{ value: "", text: "cliente" }, { value: "c", text: "ciieosu" }]
    };
  },
  methods: {
    toggleCreate() {
      this.create = !this.create;
    }
  }
};
</script>