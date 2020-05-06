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
  data() {
    return {
      object: {},
    };
  },
  computed: {},
  methods: {
    edit: function() {
      console.log(this.destination);
      console.log(this.oid);
      // this.$router.push({
      //   name: "EditOrder",
      //   params: { object: this.object },
      // });
    },
  },
  mounted() {},
};
</script>
<style scoped></style>
