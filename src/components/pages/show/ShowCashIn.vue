<template>
  <div>
    <h6 id="title">{{ table.title }}</h6>
    <Pagination period="day" />
    <Table :table="table" />
    <TableTotals :objects="this.table.objects" />
    <b-card v-if="this.selected.length > 0" id="toolbox">
      <TableTotals :objects="this.selected" />
      <ButtonEdit
        v-if="this.selected.length == 1"
        :oid="this.oids[0]"
        destination="EditOrder"
      />
    </b-card>
    <!-- change printorders to 'invoice' -->
    <!-- <PrintOrders :objects="table.objects" /> -->
  </div>
</template>
<script>
import { ordersMixin } from "../../../mixins/ordersMixin";
import Table from "../../table/Table";
import TableTotals from "../../table/TableTotals";
import ButtonEdit from "../../tools/ButtonEdit";
import Pagination from "../../table/Pagination";
import { getByDateRange } from "@/firebase";
import { mapState } from "vuex";

export default {
  name: "ShowCashIn",
  components: {
    Table,
    Pagination,
    TableTotals,
    ButtonEdit,
  },
  mixins: [ordersMixin],
  data() {
    return {
      table: {
        title: "Ingresos",
        fields: [
          {
            key: "client",
            label: "Clientes",
            sortable: true,
            tdClass: "justifyLeft",
          },
          {
            key: "products",
            label: "Productos",
            sortable: true,
            tdClass: "justifyLeft",
          },
          {
            key: "total",
            label: "Total",
            sortable: true,
            tdClass: "",
          },
        ],
        formattedObjects: [],
        objects: [],
        selectMode: "multi",
        pagination: "day",
      },
      oids: [],
      path: "orders",
    };
  },
  computed: mapState(["date", "period", "selected"]),
  watch: {
    date() {
      this.getObjects();
    },
    period() {
      this.getObjects();
    },
    selected() {
      if (this.selected[0]) {
        this.oids = this.selected.map((e) => {
          return e.id;
        });
      }
    },
  },
  mounted() {
    this.getObjects();
  },
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
