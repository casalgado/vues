<template>
  <div id="controls" v-if="period">
    <button @click="previous" class="btn fas fa-caret-right fa-lg">
      <svg viewBox="0 0 49.2 89.3">
        <path
          d="M49.2,3.8v81.8c0,3.4-4,5-6.4,2.7L1.1,47.7c-1.5-1.5-1.5-3.8,0-5.3L42.8,1.1C45.1-1.3,49.2,0.4,49.2,3.8z"
        />
      </svg>
    </button>
    <h6 id="date" @click="togglePeriod">{{ currentDate() }}</h6>
    <button @click="next" class="btn">
      <svg viewBox="0 0 49.2 89.3">
        <path
          d="M0,3.8v81.8c0,3.4,4,5,6.4,2.7l41.7-40.5c1.5-1.5,1.5-3.8,0-5.3L6.4,1.1C4.1-1.3,0,0.4,0,3.8z"
        />
      </svg>
    </button>
  </div>
</template>
<script>
import moment from "moment";
export default {
  name: "Pagination",
  props: {
    period: String,
  },
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
    togglePeriod() {
      this.$store.commit("togglePeriod");
    },
    currentDate() {
      let period = this.$store.state.period;
      let date = this.$store.state.date;

      if (period == "day") {
        return moment(date).format("dddd DD MMM");
      } else if (period == "month") {
        return moment(date).format("MMMM");
      } else {
        return `${moment(date)
          .startOf(period)
          .format("DD MMM")}  -  ${moment(date)
          .endOf(period)
          .format("DD MMM")}`;
      }
    },
  },
  mounted() {
    if (this.period && this.period != "") {
      this.setPeriod(this.period);
    }
  },
};
</script>
<style scoped>
#controls {
  position: sticky;
  top: 0px;
  background-color: var(--color-secondary);
  align-content: center;
  align-items: baseline;
  padding-top: 5px;
  padding-bottom: 5px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 10px;
  border-bottom: 1px solid var(--color-neutral);
}

#date {
  grid-column: span 3;
  font-weight: 500;
  cursor: pointer;
}

svg {
  width: 9px;
  height: 18px;
  fill: var(--color-neutral);
}
</style>
