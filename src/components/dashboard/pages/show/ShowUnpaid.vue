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

export default {
  name: "ShowUnpaid",
  components: {
    Table
  },
  data() {
    return {
      table: {
        title: "Por Cobrar",
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
        pagination: ""
      }
    };
  },
  computed: mapState(["ref", "date", "period"]),
  methods: {
    getObjects: function() {
      getAllWithProp(`${this.ref}/orders`, "paid", "").then(e => {
        console.log(e);
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