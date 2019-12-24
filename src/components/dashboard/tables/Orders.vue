<template>
  <div>
    <RenderTable :table="table" />
    <PrintOrders :objects="table.objects" />
  </div>
</template>
<script>
import PrintOrders from "./structure/PrintOrders";
import RenderTable from "./structure/RenderTable";
import { fetchByDate } from "../../../firebase";
import moment from "moment";
import { mapState } from "vuex";

export default {
  name: "Orders",
  components: {
    RenderTable,
    PrintOrders
  },
  data() {
    return {
      table: {
        title: "Pedidos",
        fields: [
          {
            key: "date",
            label: "Fecha",
            sortable: true
          },
          {
            key: "client",
            label: "Clientes",
            sortable: true,
            tdClass: "justifyLeft"
          },
          {
            key: "products",
            label: "Productos",
            sortable: true,
            tdClass: "justifyLeft"
          },
          {
            key: "quantity",
            label: "CTD",
            sortable: true
          },
          {
            key: "total",
            label: "Total",
            sortable: true
          }
        ],
        formattedObjects: [],
        objects: [],
        selectMode: "multi",
        pagination: "week"
      }
    };
  },
  computed: mapState(["date", "period"]),
  methods: {
    getObjects: function() {
      fetchByDate("orders", this.date, this.period).then(e => {
        this.table.objects = JSON.parse(JSON.stringify(e));
        this.table.formattedObjects = this.format(
          JSON.parse(JSON.stringify(e))
        );
      });
    },
    format: function(objects) {
      let items = objects.map(e => {
        let clone = [...e.products];
        e.products = e.products.map(e => e.name).join("<br />");
        e.quantity = clone.map(e => e.quantity).join("<br />");
        e.total = Math.round(e.total / 100) / 10 + "k";
        e.date = moment(e.date).format("DD/MM");
        if (e.paid == "") {
          // @refactor code below
          e.paid = "";
        } else {
          e.paid = moment(e.paid).format("DD/MM");
        }
        return e;
      });
      return items;
    }
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
    }
  }
};
</script>
<style scoped>
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