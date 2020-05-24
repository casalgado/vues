<template>
  <table>
    <tr @click="toggleExpanded">
      <td class="tdn">Producto</td>
      <td class="tdv">Ctd</td>
      <td class="tdt">Total</td>
    </tr>
    <tr v-for="(value, name) in this.summary" :key="name">
      <td class="tdn">{{ name }}:</td>
      <td class="tdv">{{ value.quantity }}</td>
      <td class="tdt">{{ value.total }}</td>
    </tr>
  </table>
</template>
<script>
import numeral from "numeral";
import { getAll } from "@/firebase";
export default {
  name: "OrdersSummary",
  props: {
    objects: Array,
  },
  data() {
    return {
      products: [],
      expanded: false,
    };
  },
  computed: {
    summary: function() {
      let products = [];

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
      let keys = Object.keys(report);
      keys.forEach((e) => {
        report[e].total = numeral(report[e].total).format("0,0");
      });
      const ordered = {};
      Object.keys(report)
        .sort()
        .forEach(function(key) {
          ordered[key] = report[key];
        });
      ordered.total = { quantity: "-", total: numeral(glotal).format("0,0") };
      return ordered;
    },
  },
  methods: {
    toggleExpanded: function() {
      this.expanded = !this.expanded;
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
