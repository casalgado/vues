<template>
  <div id="sidebar">
    <div id="sidebar-content">
      <p>
        <br />Selected:
        <br />
        {{ selected.length }}
        <br />Objects:
        <br />
        {{ objects.length }}
        <br />Total:
        <br />
        {{ totals }}
        <br />Reporte:
        <br />
      </p>
      <table id="reportContainer">
        <tr>
          <th>producto</th>
          <th>cantidad</th>
          <th>total</th>
        </tr>
        <div v-for="(value, name) in this.detailedReport" :key="name">
          <tr>
            <td id="tdn">{{ name }}:</td>
            <td id="tdv">{{ value.quantity }}</td>
            <td id="tdt">{{ value.total }}</td>
          </tr>
        </div>
      </table>

      <div v-if="selectedOne" class="crud-buttons">
        <ButtonPaid :oid="selected[0].id" :path="'orders'" />
        <ButtonEdit :oid="selected[0].id" :path="'orders'" />
        <b-button>delete</b-button>
      </div>
      <div v-if="selectedMany" class="crud-buttons">
        <b-button>paid</b-button>
        <b-button>edit</b-button>
        <b-button>delete</b-button>
      </div>
      <div v-if="sameClient">
        <b-button onclick="window.print()">Save and Print</b-button>
      </div>
      <div>
        <b-button @click="exportTable">export</b-button>
      </div>
    </div>
  </div>
</template>
<script>
import ButtonPaid from "./../buttons/ButtonPaid";
import ButtonEdit from "./../buttons/ButtonEdit";
import { getAll } from "@/firebase";
import { mapState } from "vuex";
import moment from "moment";
import numeral from "numeral";
export default {
  name: "Sidebar",
  components: { ButtonPaid, ButtonEdit },
  data() {
    return {
      products: [],
    };
  },
  props: {
    objects: Array,
  },
  methods: {
    exportTable: function() {
      let flattened = [];
      this.objects.forEach((e) => {
        console.log(e);
        e.date = moment(e.date).format("DD-MM-YYYY");
        e.paid = moment(e.paid).format("DD/MM");
        delete e.bug_probe;
        if (e.products) {
          e.products.forEach((p) => {
            let c = Object.assign({}, e);
            c.product = p.name;
            c.quantity = p.quantity;
            c.unitPrice = p.unitPrice;
            c.total = p.total;
            flattened.push(c);
          });
        } else {
          flattened.push(e);
        }
      });
      console.log(flattened);
      let header = Object.keys(flattened[0]);
      let rows = flattened.map((e) => {
        delete e.products;
        return Object.values(e);
      });
      let csvContent = header + rows.map((e) => e.join(",")).join("\n");
      console.log(csvContent);
    },
  },
  computed: {
    selected() {
      return this.$store.state.selected;
    },
    sameClient: function() {
      if (this.selected.length > 0) {
        let client = this.selected[0].client;
        return (
          this.selected.map((e) => e.client).filter((e) => e == client)
            .length == this.selected.length
        );
      } else {
        return false;
      }
    },
    totals: function() {
      if (this.objects.length > 0 && this.objects[0].total) {
        if (this.selected.length == 0) {
          return numeral(
            this.objects.reduce((a, b) => ({
              total: parseInt(a.total) + parseInt(b.total),
            })).total
          ).format("0,0");
        } else {
          return numeral(
            this.objects.reduce((a, b) => ({
              total: parseInt(a.total) + parseInt(b.total),
            })).total
          ).format("0,0");
        }
      } else {
        return "-";
      }
    },
    selectedOne: function() {
      return this.selected.length == 1;
    },
    selectedMany: function() {
      return this.selected.length > 1;
    },
    detailedReport: function() {
      let show = "n";
      if (show == "y") {
        let products = [];
        /*
      the three lines in this block can me toggled to display full list of products 
      or only the ones present on current table. Used to facilitate copying and pasting to sheets. 

      products = this.products.map((e) => {
        return { name: e.name, quantity: 0, total: 0 };
      });
      */
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
      } else {
        return {};
      }
    },
    ...mapState(["ref"]),
  },
  mounted() {
    getAll(`${this.ref}/products`).then((products) => {
      this.products = products;
    });
  },
};
</script>
<style scoped>
#sidebar-content {
  position: sticky;
  top: 0px;
}
</style>
