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
        :oid="this.oid"
        destination="EditExpense"
      />
      <ButtonDelete
        v-if="this.selected.length == 1"
        :oid="this.oid"
        :path="this.path"
      />
    </b-card>
  </div>
</template>
<script>
import { ordersMixin } from "@/mixins/ordersMixin";
import Table from "../../table/Table";
import ButtonEdit from "../../tools/ButtonEdit";
import ButtonDelete from "../../tools/ButtonDelete";
import Pagination from "../../table/Pagination";
import TableTotals from "../../table/TableTotals";
import { getByDateRange } from "@/firebase";
import { mapState } from "vuex";

export default {
  name: "ShowExpenses",
  mixins: [ordersMixin],
  components: {
    Table,
    Pagination,
    TableTotals,
    ButtonEdit,
    ButtonDelete,
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
      oid: "",
      path: "expenses",
    };
  },
  computed: { ...mapState(["date", "period", "selected"]) },
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
    selected() {
      if (this.selected[0]) {
        this.oid = this.selected[0].id;
      }
    },
  },
};
</script>
