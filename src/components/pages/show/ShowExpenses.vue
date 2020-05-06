<template>
  <div>
    <h6 id="title">{{ table.title }}</h6>
    <Pagination :period="table.pagination" />
    <Table :table="table" />
    <TableTotals :objects="this.table.objects" />
    <b-card id="toolbox" v-if="this.selected.length > 0">
      <TableTotals :objects="this.selected" />
      <ButtonEdit
        v-if="this.selected.length == 1"
        :oid="this.selectedIds[0]"
        destination="EditExpense"
      />
    </b-card>
  </div>
</template>
<script>
import { toolboxMixin } from "@/mixins/toolboxMixin";
import { ordersMixin } from "@/mixins/ordersMixin";
import Table from "../../table/Table";
import ButtonEdit from "../../tools/ButtonEdit";
import Pagination from "../../table/Pagination";
import TableTotals from "../../table/TableTotals";
import { getByDateRange } from "@/firebase";
import { mapState } from "vuex";

export default {
  name: "ShowExpenses",
  mixins: [toolboxMixin, ordersMixin],
  components: {
    Table,
    Pagination,
    TableTotals,
    ButtonEdit,
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
            key: "products",
            label: "Items",
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
        this.table.formattedObjects.forEach((o) => {
          o.products = this.removeOneFromQuantites(o.products);
        });
        console.log(this.table.formattedObjects);
      });
    },
    removeOneFromQuantites: function(string) {
      return string
        .split("<br />")
        .map((s) => {
          if (s[0] == "1" && s[1] == " ") {
            return s.substr(1).trim();
          } else {
            return s;
          }
        })
        .join("<br />");
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
