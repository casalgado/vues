<template>
  <b-button @click="edit" variant="primary">edit</b-button>
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
        name: "EditOrder",
        params: { oid: this.oid },
      });
    },
  },
  mounted() {},
};
</script>
<style scoped></style>
