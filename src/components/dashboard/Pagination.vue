<template>
  <div class="container">
    <p>current period = {{this.$store.state.period}}</p>
    <button @click="next" class="btn btn-warning">+</button>
    <button @click="previous" class="btn btn-warning">-</button>
    <button @click="setPeriod('day')" class="btn btn-warning">day</button>
    <button @click="setPeriod('week')" class="btn btn-warning">week</button>
    <button @click="setPeriod('month')" class="btn btn-warning">month</button>
    <p>Pagination</p>
    <p>current date = {{this.$store.state.date}}</p>
  </div>
</template>
<script>
export default {
  name: "Pagination",
  methods: {
    next() {
      this.$store.commit("next");
    },
    previous() {
      this.$store.commit("previous");
    },
    setPeriod(string) {
      this.$store.commit("setPeriod", { period: string });
    }
  }
};
</script>
<style scoped>
button {
  margin: 5px;
}

.container {
  border: 1px solid var(--color-background);
}
</style>