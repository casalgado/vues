<template>
  <div>
    <Table :table="table" />
    <!-- change printorders to 'invoice' -->
    <PrintOrders :objects="table.objects" />
  </div>
</template>
<script>
import PrintOrders from "../print/PrintOrders";
import Table from "../table/Table";
import { getByDate } from "@/firebase";
import moment from "moment";
import { mapState } from "vuex";

export default {
  name: "showOrders",
  components: {
    Table,
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
  computed: mapState(["ref", "date", "period"]),
  methods: {
    getObjects: function() {
      // let ref = this.ref + "/orders"
      // change "orders" to ref
      getByDate("orders", this.date, this.period).then(e => {
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
        e.date = moment(e.date).format("DD/MM");
        if (e.paid == "") {
          // @refactor
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