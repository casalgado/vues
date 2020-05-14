<template>
  <div>
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
    </b-card>
  </div>
</template>
<script>
import { ordersMixin } from "@/mixins/ordersMixin";
import { toolboxMixin } from "@/mixins/toolboxMixin";
import ButtonPaid from "../../tools/ButtonPaid";
import ButtonEdit from "../../tools/ButtonEdit";
import Table from "../../table/Table";
import Pagination from "../../table/Pagination";
import TableTotals from "../../table/TableTotals";
import { getAllWhere } from "@/firebase";
import { mapState } from "vuex";

export default {
  name: "ShowUnpaid",
  components: {
    Table,
    TableTotals,
    Pagination,
    ButtonPaid,
    ButtonEdit,
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
  computed: mapState(["ref", "date", "period", "selected"]),
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
      getAllWhere(`orders`, "paid", "").then((e) => {
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
