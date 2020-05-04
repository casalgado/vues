<template>
  <div>
    <h6 id="title">{{ table.title }}</h6>
    <Pagination :period="table.pagination" />
    <Table :table="table" />
    <TableTotals :objects="this.table.objects" />
    <b-card id="toolbox" v-if="this.selected.length > 0">
      <TableTotals :objects="this.selected" />
      <ButtonPaid :ids="this.selectedIds" />
    </b-card>
    <table v-if="this.detailedReport">
      <tr v-for="(value, name) in this.detailedReport" :key="name">
        <td id="tdn">{{ name }}:</td>
        <td id="tdv">{{ value.quantity }}</td>
        <td id="tdt">{{ value.total }}</td>
      </tr>
    </table>

    <!-- change printorders to 'invoice' -->
    <!-- <PrintOrders :objects="table.objects" /> -->
  </div>
</template>
<script>
// import PrintOrders from "../../print/PrintOrders";
import { ordersMixin } from "@/mixins/ordersMixin";
import { toolboxMixin } from "@/mixins/toolboxMixin";
import ButtonPaid from "../../tools/ButtonPaid";
import Table from "../../table/Table";
import Pagination from "../../table/Pagination";
import TableTotals from "../../table/TableTotals";
import { getByDate } from "@/firebase";
import { mapState } from "vuex";

export default {
  name: "showOrders",
  components: {
    Table,
    TableTotals,
    Pagination,
    ButtonPaid,
  },
  mixins: [ordersMixin, toolboxMixin],
  data() {
    return {
      table: {
        title: "Pedidos",
        fields: [
          {
            key: "date",
            label: "Fecha",
            sortable: true,
            tdClass: "justifyLeft slim",
            thClass: "slim",
          },
          {
            key: "client",
            label: "Cliente",
            sortable: true,
            tdClass: "justifyLeft slim orderClient",
            thClass: "slim",
          },
          {
            key: "products",
            label: "Productos",
            sortable: true,
            tdClass: "justifyLeft slim orderProduct",
            thClass: "slim",
          },
          {
            key: "total",
            label: "Total",
            sortable: true,
            tdClass: "justifyLeft slim",
            thClass: "slim",
          },
        ],
        formattedObjects: [],
        objects: [],
        selectMode: "multi",
        pagination: "week",
      },
    };
  },
  computed: {
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
        this.table.objects.forEach((e) => {
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
        return false;
      }
    },
    ...mapState(["ref", "date", "period"]),
  },
  methods: {
    getObjects: function() {
      getByDate(`${this.ref}/orders`, "date", this.date, this.period).then(
        (e) => {
          this.table.objects = JSON.parse(JSON.stringify(e));
          this.table.formattedObjects = this.format(
            JSON.parse(JSON.stringify(e))
          );
        }
      );
    },
  },
  mounted() {
    this.getObjects();
  },
  watch: {
    date() {
      this.getObjects();
    },
    period() {
      this.getObjects();
    },
  },
};
</script>
<style scoped>
#title {
  width: 100%;
  text-align: center;
  font-weight: bold;
}
@media screen {
  #page {
    display: grid;
  }
}

@media print {
  #container,
  #title,
  #sidebar-content {
    display: none;
  }

  #page {
    color: black;
    display: grid;
  }
}
</style>
