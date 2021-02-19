<template>
  <div>
    <div id="table-cont">
      <h6 id="title">{{ table.title }}</h6>
      <Pagination :period="table.pagination" />
      <Table :table="table" />
      <TableTotals :objects="table.objects" />
      <b-card v-if="selected.length > 0" id="toolbox">
        <!-- <p v-if="development">{{ oids }}</p> -->
        <!-- refactor below into a separate component -->
        <ul v-if="screenxs && selected.length == 1">
          <li v-for="p in onlyProducts" :key="p">
            {{ p }}
          </li>
        </ul>
        <TableTotals :objects="selected" />
        <ButtonPaid :ids="oids" />
        <ButtonEdit
          v-if="selected.length == 1"
          :oid="oids[0]"
          destination="EditOrder"
        />
        <ButtonDelete
          v-if="selected.length == 1"
          :oid="oids[0]"
          :path="path"
          @delete="getObjects()"
        />
        <b-button
          v-if="sameClient && !screenxs"
          variant="info"
          class="toolbox-button"
          @click="print"
        >
          factura
        </b-button>
      </b-card>
      <b-button variant="dark" class="post-table-button" @click="toggleSummary">
        venta por producto
      </b-button>
      <b-button variant="dark" class="post-table-button" @click="toggleByDay">
        produccion por dia
      </b-button>
      <b-button variant="dark" class="post-table-button" @click="showYear">
        mostrar {{ year }}</b-button
      >
      <OrdersSummary v-if="showSummary" :objects="table.objects" />
      <OrdersByDay v-if="showByDay" :objects="table.objects" />
      <ButtonExportOrdersByClient :objects="table.objects" />
      <ButtonExportOrdersByProduct :objects="table.objects" />
    </div>
    <!-- change printorders to 'invoice' -->
    <PrintOrders :objects="table.objects" />
  </div>
</template>
<script>
import PrintOrders from "../../print/PrintOrders";
import { ordersMixin } from "@/mixins/ordersMixin";
import ButtonPaid from "../../tools/ButtonPaid";
import ButtonEdit from "../../tools/ButtonEdit";
import ButtonDelete from "../../tools/ButtonDelete";
import Table from "../../table/Table";
import Pagination from "../../table/Pagination";
import TableTotals from "../../table/TableTotals";
import OrdersSummary from "../../tools/OrdersSummary";
import OrdersByDay from "../../tools/OrdersByDay";
import ButtonExportOrdersByClient from "../../tools/ButtonExportOrdersByClient";
import ButtonExportOrdersByProduct from "../../tools/ButtonExportOrdersByProduct";
import { getByDateRange } from "@/firebase";
import { mapState } from "vuex";
import moment from "moment";

export default {
  name: "ShowOrders",
  components: {
    Table,
    TableTotals,
    Pagination,
    ButtonPaid,
    OrdersSummary,
    OrdersByDay,
    ButtonExportOrdersByClient,
    ButtonExportOrdersByProduct,
    ButtonEdit,
    ButtonDelete,
    PrintOrders,
  },
  mixins: [ordersMixin],
  data() {
    return {
      table: {
        title: "Ventas",
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
          {
            key: "paymentMethod",
            label: "",
            sortable: true,
            tdClass: "justifyCenter slim slimmer",
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
      showSummary: false,
      showByDay: false,
    };
  },
  computed: {
    onlyProducts: function() {
      return this.selected[0].products.split("<br />");
    },
    screenxs: function() {
      return window.innerWidth <= 767;
    },
    development: function() {
      const environment = process.env.NODE_ENV;
      if (environment === "development") {
        return true;
      } else {
        return false;
      }
    },
    sameClient: function() {
      let objects = this.selected;
      if (objects.length > 0) {
        let client = objects[0].client;
        return (
          objects.map((e) => e.client).filter((e) => e == client).length ==
          objects.length
        );
      } else {
        return false;
      }
    },
    year: function() {
      return moment(this.date).format("YYYY");
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
    this.getObjects();
    if (this.screenxs) {
      this.table.fields = this.table.fields.filter(
        (e) =>
          e.key == "date" ||
          e.key == "client" ||
          e.key == "total" ||
          e.key == "paymentMethod"
      );
    }
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
    toggleSummary: function() {
      this.showSummary = !this.showSummary;
    },
    toggleByDay: function() {
      this.showByDay = !this.showByDay;
    },
    print: function() {
      window.print();
    },
    showYear: function() {
      this.$store.commit("setPeriod", { period: "year" });
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
  #invoice {
    display: none;
    padding-bottom: 300px;
  }
}

@media print {
  @page {
    margin: 0;
  }
  body {
    margin: 1.6cm;
  }
  #table-cont {
    display: none;
  }

  #invoice {
    padding: 1cm 1.6cm 1cm 1.6cm;
    color: black;
    display: grid;
  }
}

ul {
  padding-left: 0px;
}

li {
  list-style-type: none;
  text-align: center;
}
</style>
