<template>
  <div id="page">
    <p v-for="(p, i) in products" :key="i">{{ p }}</p>
    {{ products }}
  </div>
</template>

<script>
export default {
  name: "PrintProduction",
  props: {
    orders: Array,
  },
  data() {
    return {
      products: [],
    };
  },
  methods: {
    productList: function () {
      let products = [];
      this.orders.forEach((e) => {
        console.log(e);
        e.products.forEach((p) => {
          console.log(p);
          products.push(p);
        });
      });
      this.products = products;
    },
  },
  watch: {
    orders: function () {
      this.productList();
    },
  },
};
</script>

<style scoped>
</style>