<template>
  <vue-position-sticky :offsetTop="0">
    <b-container v-if="period" fluid class="paginationControls">
      <button class="btn fas fa-caret-right fa-lg" @click="previous">
        <svg viewBox="0 0 49.2 89.3">
          <path
            d="M49.2,3.8v81.8c0,3.4-4,5-6.4,2.7L1.1,47.7c-1.5-1.5-1.5-3.8,0-5.3L42.8,1.1C45.1-1.3,49.2,0.4,49.2,3.8z"
          />
        </svg>
      </button>
      <h6 id="date" @click="togglePeriod">{{ currentDate() }}</h6>
      <button class="btn" @click="next">
        <svg viewBox="0 0 49.2 89.3">
          <path
            d="M0,3.8v81.8c0,3.4,4,5,6.4,2.7l41.7-40.5c1.5-1.5,1.5-3.8,0-5.3L6.4,1.1C4.1-1.3,0,0.4,0,3.8z"
          />
        </svg>
      </button>
    </b-container>
  </vue-position-sticky>
</template>
<script>
import moment from "moment";
export default {
  name: "Pagination",
  props: {
    period: String,
  },
  mounted() {
    if (this.period && this.period != "") {
      this.setPeriod(this.period);
    }
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
};
</script>
<style scoped>
.paginationControls {
  background-color: var(--color-secondary);
  align-content: center;
  align-items: baseline;
  padding-top: 5px;
  padding-bottom: 5px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 10px;
  border-bottom: 1px solid var(--color-neutral);
  max-width: 680px;
}

#date {
  grid-column: span 3;
  font-weight: 600;
  cursor: pointer;
}

svg {
  width: 9px;
  height: 18px;
  fill: var(--color-neutral);
}
</style>
