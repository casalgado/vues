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

    <OrdersSummary
      v-if="false"
      :dbref="this.ref"
      :objects="this.table.objects"
    />
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
import OrdersSummary from "../../tools/OrdersSummary";
import { getByDateRange } from "@/firebase";
import { mapState } from "vuex";

export default {
  name: "showOrders",
  components: {
    Table,
    TableTotals,
    Pagination,
    ButtonPaid,
    OrdersSummary,
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
    ...mapState(["date", "period"]),
  },
  methods: {
    getObjects: function() {
      getByDateRange(`orders`, "date", this.date, this.period).then((e) => {
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
