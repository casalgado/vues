<template>
  <b-button @click="edit" variant="primary" class="toolbox-button"
    >editar</b-button
  >
</template>
<script>
export default {
  name: "ButtonEdit",
  props: {
    oid: String,
    destination: String,
  },
  methods: {
    edit: function() {
      this.$router.push({
        name: this.destination,
        params: { oid: this.oid },
      });
    },
  },
  mounted() {},
};
</script>
<style scoped></style>
