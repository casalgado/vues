<template>
  <RenderTable :table="table" />
</template>
<script>
import RenderTable from "./RenderTable";
import { fetchByDate } from "../../../firebase";
import { mapState } from "vuex";
import moment from "moment";

export default {
  name: "ExpensesTable",
  components: {
    RenderTable
  },
  data() {
    return {
      table: {
        title: "Gastos",
        fields: [
          {
            key: "date",
            label: "Fecha",
            sortable: true
          },
          {
            key: "provider",
            label: "Proveedor",
            sortable: true
          },
          {
            key: "name",
            label: "Nombre",
            sortable: true
          },
          {
            key: "quantity",
            label: "CTD",
            sortable: true
          },
          {
            key: "total",
            label: "Total",
            sortable: true
          }
        ],
        objects: []
      }
    };
  },
  computed: mapState(["date", "period"]),
  methods: {
    getObjects: function() {
      fetchByDate("expenses", this.date, this.period).then(e => {
        this.table.objects = JSON.parse(JSON.stringify(e));
        this.table.formattedObjects = this.format(
          JSON.parse(JSON.stringify(e))
        );
      });
    },
    format: function(objects) {
      let items = objects.map(e => {
        e.date = moment(e.date).format("DD/MM");
        if (parseFloat(e.total / 1000) > 1) {
          e.total = Math.round(e.total / 100) / 10 + "k";
        }
        if (parseFloat(e.quantity / 1000) > 1) {
          e.quantity = e.quantity / 1000 + " k";
        }
        return e;
      });
      return items;
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
    }
  }
};
</script>
