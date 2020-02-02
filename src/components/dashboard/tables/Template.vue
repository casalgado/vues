<template>
  <div>
    <RenderTable :table="table" />
  </div>
</template>
<script>
import RenderTable from "./structure/RenderTable";
import { fetchAll, fetchByDate } from "../../../firebase";
import { mapState } from "vuex";
import { moment } from "moment";

export default {
  name: "Template",
  components: {
    RenderTable
  },
  data() {
    return {
      table: {
        title: "Template",
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
      fetchByDate("ref", this.date, this.period).then(e => {
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
