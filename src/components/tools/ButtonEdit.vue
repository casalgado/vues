<template>
  <b-button variant="primary" class="toolbox-button" @click="edit">editar</b-button>
</template>
<script>
export default {
  name: "ButtonEdit",
  props: {
    oid: String,
    destination: String,
  },
  mounted() {},
  methods: {
    edit: function() {
      this.$router.push({
        name: this.destination,
        params: { oid: this.oid },
      });
    },
  },
};
</script>
<style scoped></style>
