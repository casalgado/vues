<template>
  <div>
    <Table :table="table" />
    <!-- change printorders to 'invoice' -->
    <!-- <PrintOrders :objects="table.objects" /> -->
  </div>
</template>
<script>
// import PrintOrders from "../../print/PrintOrders";
import Table from "../../table/Table";
import { getByDate } from "@/firebase";
import moment from "moment";
import { mapState } from "vuex";
import numeral from "numeral";

export default {
  name: "showOrders",
  components: {
    Table,
  },
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
  computed: mapState(["ref", "date", "period"]),
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
    format: function(objects) {
      let items = objects.map((e) => {
        let clone = [...e.products];
        e.products = e.products.map((e) => e.name);
        e.quantity = clone.map((e) => e.quantity);
        for (let i = 0; i < e.products.length; i++) {
          e.products[i] = `${e.quantity[i]}  ${e.products[i]}`;
        }
        e.products = e.products.join("<br />");
        e.date = moment(e.date).format("MM/DD");
        if (e.total % 1000 == "0") {
          e.total = numeral(e.total).format("0,0a");
        } else {
          e.total =
            numeral(e.total)
              .divide(1000)
              .format("0.0") + "k";
        }
        if (e.paid == "") {
          // @refactor
          e.paid = "";
        } else {
          e.paid = moment(e.paid).format("MM/DD");
        }
        return e;
      });
      return items;
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
