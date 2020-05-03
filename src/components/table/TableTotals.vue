<template>
  <p id="tableTotals">Total: {{ total }}</p>
</template>
<script>
import numeral from "numeral";
export default {
  name: "TableTotals",
  props: {
    objects: Array,
  },
  computed: {
    selected() {
      return this.$store.state.selected;
    },
    total: function() {
      if (this.objects.length > 0) {
        if (this.selected.length == 0) {
          return numeral(
            this.objects.reduce((a, b) => ({
              total: parseInt(a.total) + parseInt(b.total),
            })).total
          ).format("0,0");
        } else {
          let total = 0;
          this.selected.forEach((e) => {
            total =
              total +
              numeral(e.total.slice(0, -1))
                .multiply(1000)
                .value();
          });
          return numeral(total).format("0,0");
        }
      } else {
        return "-";
      }
    },
  },
};
</script>
<style scoped>
#tableTotals {
  font-weight: bold;
}
</style>
