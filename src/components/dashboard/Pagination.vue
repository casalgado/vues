<template>
  <div class="border">
    <h4 id="date">{{currentDate()}}</h4>
    <div id="grid">
      <button @click="previous" class="btn btn-warning">prev</button>
      <button @click="setPeriod('day')" class="btn btn-warning">day</button>
      <button @click="setPeriod('week')" class="btn btn-warning">week</button>
      <button @click="setPeriod('month')" class="btn btn-warning">month</button>
      <button @click="next" class="btn btn-warning">next</button>
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
.arrow-right {
  width: 0;
  height: 0;
  border-top: 12px solid transparent;
  border-bottom: 12px solid transparent;

  border-left: 12px solid var(--color-background);
  cursor: pointer;
}
#grid {
  align-content: center;
  margin: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 10px;
}
</style>