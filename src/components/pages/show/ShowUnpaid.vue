<template>
  <div>
    <div id="table-cont">
      <h6 id="title">{{ table.title }}</h6>
      <Pagination :period="table.pagination" />
      <Table :table="table" />
      <TableTotals :objects="this.table.objects" />
      <b-card v-if="this.selected.length > 0" id="toolbox">
        <TableTotals :objects="this.selected" />
        <ButtonPaid :ids="this.selectedIds" />
        <ButtonEdit
          v-if="this.selected.length == 1"
          :oid="this.oids[0]"
          destination="EditOrder"
        />
        <b-button
          v-if="sameClient"
          variant="info"
          class="toolbox-button"
          @click="print"
        >
          factura
        </b-button>
      </b-card>
    </div>
    <PrintOrders :objects="table.objects" />
  </div>
</template>
<script>
import PrintOrders from "../../print/PrintOrders";
import { ordersMixin } from "@/mixins/ordersMixin";
import { toolboxMixin } from "@/mixins/toolboxMixin";
import ButtonPaid from "../../tools/ButtonPaid";
import ButtonEdit from "../../tools/ButtonEdit";
import Table from "../../table/Table";
import Pagination from "../../table/Pagination";
import TableTotals from "../../table/TableTotals";
import { getAllWhere } from "@/firebase";
import { mapState } from "vuex";
import moment from "moment";

export default {
  name: "ShowUnpaid",
  components: {
    Table,
    TableTotals,
    Pagination,
    ButtonPaid,
    ButtonEdit,
    PrintOrders,
  },
  mixins: [ordersMixin, toolboxMixin],
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
            key: "daysAgo",
            label: "D",
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
      oids: [],
      path: "orders",
    };
  },
  computed: {
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
    console.log(moment());
  },
  methods: {
    getObjects: function() {
      getAllWhere(`orders`, "paid", "").then((e) => {
        this.table.objects = JSON.parse(JSON.stringify(e));
        this.table.formattedObjects = this.format(
          JSON.parse(JSON.stringify(e))
        );
        console.log(this.table.formattedObjects);
      });
    },
    print: function() {
      window.print();
    },
  },
};
</script>
<style scoped>
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
</style>
