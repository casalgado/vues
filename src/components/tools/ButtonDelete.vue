<template>
  <b-button @click="remove" variant="danger" class="toolbox-button"
    >borrar</b-button
  >
</template>
<script>
import { remove } from "@/firebase";
export default {
  name: "ButtonDelete",
  props: {
    oid: String,
    path: String,
  },
  methods: {
    remove: function() {
      if (confirm("Seguro que deseas borrar?")) {
        remove(this.path, this.oid);
      }
    },
  },
  mounted() {},
};
</script>
<style scoped></style>
