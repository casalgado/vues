<template>
  <div>
    <Table :table="table" />
    <!-- change printorders to 'invoice' -->
    <!-- <PrintOrders :objects="table.objects" /> -->
  </div>
</template>
<script>
import { ordersMixin } from "../../../mixins/ordersMixin";
import Table from "../../table/Table";
import { getByDateRange } from "@/firebase";
import { mapState } from "vuex";

export default {
  name: "ShowCashIn",
  mixins: [ordersMixin],
  components: {
    Table,
  },
  data() {
    return {
      table: {
        title: "Ingresos",
        fields: [
          {
            key: "client",
            label: "Clientes",
            sortable: true,
            tdClass: "justifyLeft allwaysUnpaid",
          },
          {
            key: "products",
            label: "Productos",
            sortable: true,
            tdClass: "justifyLeft allwaysUnpaid",
          },
          {
            key: "total",
            label: "Total",
            sortable: true,
            tdClass: "allwaysUnpaid",
          },
        ],
        formattedObjects: [],
        objects: [],
        selectMode: "multi",
        pagination: "day",
      },
    };
  },
  computed: mapState(["date", "period"]),
  methods: {
    getObjects: function() {
      getByDateRange(`orders`, "paid", this.date, this.period).then((e) => {
        this.table.objects = JSON.parse(JSON.stringify(e));
        this.table.formattedObjects = this.format(
          JSON.parse(JSON.stringify(e))
        );
      });
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
