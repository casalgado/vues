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
    <b-form-select v-else v-model="input" :options="options2" class="custom-input" size="sm"></b-form-select>
    <b-button @click="load">load</b-button>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "InputSelect",
  props: {
    options: Array,
    label: String,
    property: String,
    value: String
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
      this.$store.commit("updateActiveForm", this.payload);
    },
    activeForm() {
      console.log("w");
      console.log(this.activeForm[this.property]);
      this.input = this.activeForm[this.property];
    }
  },
  methods: {
    toggleCreate() {
      this.create = !this.create;
    },
    load() {
      console.log(this.value);
      this.input = "el caminante";
    }
  },
  computed: {
    ...mapState(["dynamicFields", "activeForm"]),
    options2() {
      let options2 = this.options;
      options2.unshift({ value: "", text: this.label });
      return options2;
    }
  },
  mounted() {
    console.log(this.value);
    this.input = this.value;
  }
};
</script>
<style scoped>
#toggle-button {
  height: 30px;
  width: 30px;
  padding: 0px;
}
</style>