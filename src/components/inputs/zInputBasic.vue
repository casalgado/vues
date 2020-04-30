<template>
  <b-form-group class="f-group text-group" :label="label" :label-for="label">
    <b-form-input class="custom-input" v-model="input" :type="type" size="sm"></b-form-input>
    <b-button @click="load">load</b-button>
  </b-form-group>
</template>
<script>
export default {
  name: "InputBasic",
  props: {
    type: String,
    label: String,
    property: String,
    value: String
  },
  data() {
    return {
      input: "",
      payload: {}
    };
  },
  methods: {
    load() {
      console.log(this.value);
      this.input = "2020-02-05";
    }
  },
  watch: {
    input() {
      this.payload[this.property] = this.input;
      this.$store.commit("updateActiveForm", this.payload);
    }
  },
  mounted() {
    console.log(this.value);
    this.input = this.value;
  }
};

// activeForm() {
//       console.log("this.activeForm[this.property]");
//       this.input = this.activeForm[this.property];
//     }
//   },
//   mounted() {
//     console.log("mounted");
//     console.log(this.activeForm[this.property]);
//     this.input = this.activeForm[this.property];
//   }
</script>
