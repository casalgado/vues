vue<template>
  <div>
    <!-- <p @click="download">test</p> -->
    <download-csv
      class="btn btn-default export-button"
      :data="formattedObjects"
      :name="filename"
    >
      <p>Exportar por Producto</p>
    </download-csv>
  </div>
</template>
<script>
import moment from "moment";
import numeral from "numeral";
import { getAll } from "@/firebase";
export default {
  name: "ButtonExportOrdersByProduct",
  props: {
    objects: Array,
  },
  data() {
    return {
      emails: {},
      products: [],
    };
  },
  computed: {
    selected() {
      return this.$store.state.selected;
    },
    formattedObjects() {
      let productNames = Object.keys(this.summary);
      console.log(this.summary);
      let fmo = [];
      let date = this.dateString();
      productNames.forEach((p) => {
        let q = this.summary[p].quantity;
        let t = this.summary[p].total;
        let avg = t / q;
        fmo.push({
          fecha: date,
          producto: p,
          cantidad: q,
          total: t,
          promedio: avg,
        });
      });
      return fmo;
    },
    filename() {
      let string = "Venta por Producto ";
      string += this.dateString();
      return (string += ".csv");
    },
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
      let glantity = 0;
      products.forEach((p) => {
        let keys = Object.keys(report);
        glotal += parseInt(p.total);
        glantity += parseInt(p.quantity);
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
        report[e].total = parseInt(numeral(report[e].total).format("00"));
      });
      const ordered = {};
      Object.keys(report)
        .sort()
        .forEach(function(key) {
          ordered[key] = report[key];
        });
      ordered.total = {
        quantity: parseInt(numeral(glantity).format("00")),
        total: parseInt(numeral(glotal).format("00")),
      };
      return ordered;
    },
  },
  methods: {
    download: function() {
      console.log(this.summary);
    },
    dateString() {
      let period = this.$store.state.period;
      let date = this.$store.state.date;
      let string = "";
      if (period == "day") {
        string += moment(date).format("dddd DD MMM");
      } else if (period == "month") {
        string += moment(date).format("MMMM");
      } else {
        string += `${moment(date)
          .startOf(period)
          .format("DD MMM")}  -  ${moment(date)
          .endOf(period)
          .format("DD MMM")}`;
      }
      return string;
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
p {
  color: white;
  border: 1px solid white;
  border-radius: 5px;
  padding: 5px;
  margin: 0 auto;
}

p:hover {
  background-color: var(--color-primary);
}

.export-button {
  width: 220px;
  padding: 0px;
  margin: 0 auto;
}
</style>
