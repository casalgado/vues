<template>
  <div>
    <Table :table="table" />
  </div>
</template>
<script>
import Table from "../../table/Table";
import { getByDate } from "@/firebase";
import { mapState } from "vuex";
import moment from "moment";

export default {
  name: "ShowExpenses",
  components: {
    Table
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
        formattedObjects: [],
        objects: [],
        selectMode: "multi",
        pagination: "week"
      }
    };
  },
  computed: mapState(["date", "period"]),
  methods: {
    getObjects: function() {
      getByDate("expenses", this.date, this.period).then(e => {
        this.table.objects = JSON.parse(JSON.stringify(e));
        this.table.formattedObjects = this.format(
          JSON.parse(JSON.stringify(e))
        );
      });
    },
    format: function(objects) {
      let items = objects.map(e => {
        e.date = moment(e.date).format("DD/MM");

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
