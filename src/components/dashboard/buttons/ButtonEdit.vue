<template>
  <b-button @click="edit">edit</b-button>
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
    edit: function() {
      this.$router.push({ name: "EditOrder", params: { id: this.oid } });
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