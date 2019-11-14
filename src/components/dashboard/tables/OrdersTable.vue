<template>
  <RenderTable :table="table" />
</template>
<script>
import RenderTable from "./RenderTable";
import { fetchByDate } from "../../../firebase";
import moment from "moment";
import { mapState } from "vuex";

export default {
  name: "OrdersTable",
  components: {
    RenderTable
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
            sortable: true
          },
          {
            key: "products",
            label: "Productos",
            sortable: true
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
        objects: []
      }
    };
  },
  computed: mapState(["date", "period"]),
  methods: {
    getObjects: function() {
      fetchByDate("orders", this.date, this.period).then(e => {
        this.table.objects = this.format(e);
      });
    },
    format: function(objects) {
      let items = objects.map(function(e) {
        let quantity = [...e.products];
        e.products = e.products.map(e => e.name).join(",  ");
        e.quantity = quantity.map(e => e.quantity).join(", ");
        e.total = e.total / 1000 + "k";
        e.date = moment(e.date).format("DD/MM");
        if (e.paid == "") {
          e._rowVariant = "dark";
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