<template>
  <div>
    <Table :table="table" />
  </div>
</template>
<script>
import Table from "../../table/Table";
import { getAllWithProp } from "@/firebase";
import moment from "moment";
import { mapState } from "vuex";
import numeral from "numeral";

export default {
  name: "ShowUnpaid",
  components: {
    Table,
  },
  data() {
    return {
      table: {
        title: "Por Cobrar",
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
        pagination: "",
      },
    };
  },
  computed: mapState(["ref", "date", "period"]),
  methods: {
    getObjects: function() {
      getAllWithProp(`${this.ref}/orders`, "paid", "").then((e) => {
        console.log(e);
        this.table.objects = JSON.parse(JSON.stringify(e));
        this.table.formattedObjects = this.format(
          JSON.parse(JSON.stringify(e))
        );
      });
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
        e.date = moment(e.date).format("DD/MM");
        e.total = numeral(e.total).format("0,0a");
        if (e.paid == "") {
          // @refactor
          e.paid = "";
        } else {
          e.paid = moment(e.paid).format("DD/MM");
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
