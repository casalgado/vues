<template>
  <div id="container" class="border">
    <h4 id="date">{{currentDate()}}</h4>
    <div id="grid">
      <button @click="previous" class="btn btn-primary">prev</button>
      <button @click="setPeriod('day')" class="btn btn-primary">day</button>
      <button @click="setPeriod('week')" class="btn btn-primary">week</button>
      <button @click="setPeriod('month')" class="btn btn-primary">month</button>
      <button @click="next" class="btn btn-primary">next</button>
    </div>
  </div>
</template>
<script>
import moment from "moment";
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
    },
    currentDate() {
      let period = this.$store.state.period;
      let date = this.$store.state.date;
      if (period == "day") {
        return moment(date).format("dddd DD MMM");
      } else {
        return `${moment(date)
          .startOf(period)
          .format("DD MMM")}  -  ${moment(date)
          .endOf(period)
          .format("DD MMM")}`;
      }
    }
  }
};
</script>
<style scoped>
#grid {
  align-content: center;
  margin: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 10px;
}

#container {
  position: sticky;
  top: 0px;
  background-color: var(--color-secondary);
}
</style>