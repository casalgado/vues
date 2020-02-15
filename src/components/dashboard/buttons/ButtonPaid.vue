<template>
  <b-button @click="togglePaid">
    <div v-if="paid">paid</div>
    <div v-else>unpaid</div>
  </b-button>
</template>
<script>
import { getById } from "@/firebase";
import { mapState } from "vuex";

export default {
  name: "ButtonPaid",
  props: {
    oid: String,
    path: String
  },
  data() {
    return {
      object: {}
    };
  },
  computed: {
    ...mapState(["ref"]),
    paid() {
      return this.object.paid != "";
    }
  },
  methods: {
    togglePaid: function() {
      console.log(this.object);
    }
  },
  mounted() {
    getById(`${this.ref}/${this.path}/${this.oid}`).then(e => {
      this.object = e;
    });
  }
};
</script>
<style scoped>
</style>