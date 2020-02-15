<template>
  <div>
    <Table :table="table" />
  </div>
</template>
<script>
import Table from "./Table";
import { getAll, getByDate } from "@/firebase";
import { mapState } from "vuex";
import { moment } from "moment";

export default {
  name: "Invoices",
  components: {
    Table
  },
  data() {
    return {
      table: {
        title: "Facturas",
        fields: [
          {
            key: "name",
            label: "Nombre",
            sortable: true,
            tdClass: "justifyLeft"
          },
          {
            key: "email",
            label: "Mail",
            sortable: true
          },
          {
            key: "phone",
            label: "Telefono",
            sortable: true
          },
          {
            key: "address",
            label: "Direccion",
            sortable: true
          },
          {
            key: "comment",
            label: "Comentario",
            sortable: true
          }
        ],
        formattedObjects: [],
        objects: [],
        selectMode: "single",
        pagination: "false"
      }
    };
  },
  computed: mapState(["date", "period"]),
  methods: {
    getObjects: function() {
      getByDate("invoices", this.date, this.period).then(e => {
        this.table.objects = JSON.parse(JSON.stringify(e));
        this.table.formattedObjects = this.format(
          JSON.parse(JSON.stringify(e))
        );
      });
    },
    format: function(objects) {
      console.log(objects);
      return false;
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
