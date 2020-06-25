<template>
  <table>
    <tr @click="toggleWeekdayView">
      <td class="tdn">Dia</td>
      <td class="tdt">Total</td>
      <td class="tdt">Promedio</td>
      <td class="tdt"># pedidos</td>
    </tr>
    <tr v-for="(value, name) in this.table" :key="name">
      <td class="tdn">{{ name }}:</td>
      <td class="tdt">{{ value.total }}</td>
      <td class="tdt">{{ value.avg }}</td>
      <td class="tdt">{{ value.count }}</td>
    </tr>
  </table>
</template>
<script>
import numeral from "numeral";
import moment from "moment";
export default {
  name: "OrdersSummary",
  props: {
    objects: Array,
  },
  data() {
    return {
      weekdayView: false,
    };
  },
  computed: {
    table: function() {
      let table = {};
      let glotal = 0;
      this.objects.forEach((e) => {
        let date;
        let expanded = null;
        if (this.weekdayView) {
          date = moment(e.date).format("dddd");
          expanded = moment(e.date).format("MM/DD");
        } else {
          date = moment(e.date).format("MM/DD");
        }
        glotal += e.total;
        if (table[date]) {
          table[date].total += e.total;
          table[date].count += 1;
        } else {
          table[date] = { total: e.total, count: 1 };
        }
        if (expanded) {
          if (table[date].avg) {
            table[date].avg.push(expanded);
          } else table[date].avg = [expanded];
        }
      });
      table.total = { total: glotal };
      let keys = Object.keys(table);
      keys.forEach((e) => {
        table[e].total = numeral(table[e].total).format("0,0");
        if (table[e].avg) {
          table[e].avg = numeral(
            numeral(table[e].total).value() /
              numeral([...new Set(table[e].avg)].length).value()
          ).format("0,0");
        }
      });
      table.total.avg = " ";
      return table;
    },
  },
  methods: {
    toggleWeekdayView: function() {
      this.weekdayView = !this.weekdayView;
    },
  },
  mounted() {},
};
</script>
<style scoped>
.tdn,
.tdv,
.tdt {
  text-align: left;
}

.tdv,
.tdt {
  padding-left: 30px;
}

.tdn {
  padding-right: 30px;
  padding-left: 10px;
}

tr:last-child {
  font-weight: bold;
}

tr:first-child {
  border-bottom: 1px solid var(--color-neutral);
}

table {
  max-width: 680px;
  margin: 0 auto;
}
</style>
