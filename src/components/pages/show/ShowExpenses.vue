<template>
  <div>
    <h6 id="title">{{ table.title }}</h6>
    <Pagination :period="table.pagination" />
    <Table :table="table" />
    <TableTotals :objects="this.table.objects" />
    <b-card id="toolbox" v-if="this.selected.length > 0">
      <TableTotals :objects="this.selected" />
      {{ this.selectedIds }}
    </b-card>
  </div>
</template>
<script>
import { toolboxMixin } from "@/mixins/toolboxMixin";
import Table from "../../table/Table";
import Pagination from "../../table/Pagination";
import TableTotals from "../../table/TableTotals";
import { getByDateRange } from "@/firebase";
import { mapState } from "vuex";
import moment from "moment";
import numeral from "numeral";

export default {
  name: "ShowExpenses",
  mixins: [toolboxMixin],
  components: {
    Table,
    Pagination,
    TableTotals,
  },
  props: { pagination: String },
  data() {
    return {
      table: {
        title: "Gastos",
        fields: [
          {
            key: "date",
            label: "Fecha",
            sortable: true,
          },
          {
            key: "provider",
            label: "Proveedor",
            sortable: true,
          },
          {
            key: "name",
            label: "Nombre",
            sortable: true,
          },
          {
            key: "total",
            label: "Total",
            sortable: true,
          },
        ],
        formattedObjects: [],
        objects: [],
        selectMode: "single",
        pagination: "week",
      },
    };
  },
  computed: { ...mapState(["date", "period"]) },
  methods: {
    getObjects: function() {
      getByDateRange(`expenses`, "date", this.date, this.period).then((e) => {
        this.table.objects = JSON.parse(JSON.stringify(e));
        this.table.formattedObjects = this.format(
          JSON.parse(JSON.stringify(e))
        );
      });
    },
    format: function(objects) {
      let items = objects.map((e) => {
        e.date = moment(e.date).format("MM/DD");
        if (e.quantity == 1) {
          e.quantity = "";
        }
        e.name = `${e.quantity}  ${e.name}`.trim();
        if (e.total % 1000 == "0") {
          e.total = numeral(e.total).format("0,0a");
        } else {
          e.total =
            numeral(e.total)
              .divide(1000)
              .format("0.0") + "k";
        }
        return e;
      });
      return items;
    },
  },
  created() {
    if (this.pagination) {
      this.table.pagination = "day";
      this.table.title = "Egresos";
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
    },
  },
};
</script>
