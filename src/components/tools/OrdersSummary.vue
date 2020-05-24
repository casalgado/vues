<template>
  <table>
    <tr v-for="(value, name) in this.summary" :key="name">
      <td id="tdn">{{ name }}:</td>
      <td id="tdv">{{ value.quantity }}</td>
      <td id="tdt">{{ value.total }}</td>
    </tr>
  </table>
</template>
<script>
import { getAll } from "@/firebase";
export default {
  name: "OrdersSummary",
  props: {
    objects: Array,
    expanded: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      products: [],
    };
  },
  computed: {
    summary: function() {
      let products = [];
      /*
      the three lines below this block can be toggled to display full list of products
      or only the ones present on current table. Used to facilitate copying and pasting to sheets.
      */

      if (this.expanded) {
        products = this.products.map((e) => {
          return { name: e.name, quantity: 0, total: 0 };
        });
      }

      this.objects.forEach((e) => {
        e.products.forEach((p) => {
          products.push(p);
        });
      });
      let report = {};
      let glotal = 0;
      products.forEach((p) => {
        let keys = Object.keys(report);
        glotal += parseInt(p.total);
        if (keys.includes(p.name)) {
          report[p.name].quantity =
            parseInt(report[p.name].quantity) + parseInt(p.quantity);
          report[p.name].total =
            parseInt(report[p.name].total) + parseInt(p.total);
        } else {
          report[p.name] = { quantity: p.quantity, total: p.total };
        }
      });
      const ordered = {};
      Object.keys(report)
        .sort()
        .forEach(function(key) {
          ordered[key] = report[key];
        });
      ordered.total = { quantity: "-", total: glotal };
      return ordered;
    },
  },
  mounted() {
    getAll(`products`).then((p) => {
      this.products = p;
    });
  },
};
</script>
<style scoped>
#tdn,
#tdv,
#tdt {
  text-align: left;
}

#tdv,
#tdt {
  padding-left: 10px;
}
</style>
