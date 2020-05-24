<template>
  <div>
    <h6 id="title">{{ table.title }}</h6>
    <Pagination :period="table.pagination" />
    <Table :table="table" />
    <TableTotals :objects="this.table.objects" />
    <b-card v-if="this.selected.length > 0" id="toolbox">
      <p v-if="this.development">{{ this.oids }}</p>
      <TableTotals :objects="this.selected" />
      <ButtonPaid :ids="this.oids" />
      <ButtonEdit
        v-if="this.selected.length == 1"
        :oid="this.oids[0]"
        destination="EditOrder"
      />
      <ButtonDelete
        v-if="this.selected.length == 1"
        :oid="this.oids[0]"
        :path="this.path"
        @delete="getObjects()"
      />
    </b-card>

    <OrdersSummary
      v-if="true"
      :objects="this.table.objects"
      :expanded="false"
    />
    <!-- change printorders to 'invoice' -->
    <!-- <PrintOrders :objects="table.objects" /> -->
  </div>
</template>
<script>
// import PrintOrders from "../../print/PrintOrders";
import { ordersMixin } from "@/mixins/ordersMixin";
import ButtonPaid from "../../tools/ButtonPaid";
import ButtonEdit from "../../tools/ButtonEdit";
import ButtonDelete from "../../tools/ButtonDelete";
import Table from "../../table/Table";
import Pagination from "../../table/Pagination";
import TableTotals from "../../table/TableTotals";
import OrdersSummary from "../../tools/OrdersSummary";
import { getByDateRange } from "@/firebase";
import { mapState } from "vuex";

export default {
  name: "ShowOrders",
  components: {
    Table,
    TableTotals,
    Pagination,
    ButtonPaid,
    OrdersSummary,
    ButtonEdit,
    ButtonDelete,
  },
  mixins: [ordersMixin],
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
      oids: [],
      path: "orders",
    };
  },
  computed: {
    development: function() {
      const environment = process.env.NODE_ENV;
      if (environment === "development") {
        return true;
      } else {
        return false;
      }
    },
    ...mapState(["ref", "date", "period", "selected"]),
  },
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
    console.log("mounted");
    this.getObjects();
  },
  methods: {
    getObjects: function() {
      getByDateRange(`orders`, "date", this.date, this.period).then((e) => {
        this.table.objects = JSON.parse(JSON.stringify(e));
        this.table.formattedObjects = this.format(
          JSON.parse(JSON.stringify(e))
        );
        this.table.formattedObjects.forEach((e) => {
          e.displayPaid = true;
        });
      });
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
