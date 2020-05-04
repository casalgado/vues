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
    dbref: String,
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
      the three lines in this block can me toggled to display full list of products
      or only the ones present on current table. Used to facilitate copying and pasting to sheets.
      */
      products = this.products.map((e) => {
        return { name: e.name, quantity: 0, total: 0 };
      });

      this.objects.forEach((e) => {
        e.products.forEach((p) => {
          products.push(p);
        });
      });
      let report = {};
      products.forEach((p) => {
        let keys = Object.keys(report);
        if (keys.includes(p.name)) {
          report[p.name].quantity = report[p.name].quantity + p.quantity;
          report[p.name].total = report[p.name].total + p.total;
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
      return ordered;
    },
  },
  mounted() {
    getAll(`${this.dbref}/products`).then((p) => {
      console.log(p);
      this.products = p;
    });
  },
};
</script>
<style scoped>
#tdn {
  text-align: left;
}
</style>
