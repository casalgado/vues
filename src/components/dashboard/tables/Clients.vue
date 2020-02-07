<template>
  <div>
    <Table :table="table" />
  </div>
</template>
<script>
import Table from "./Table";
import { fetchAll } from "../../../firebase";
import { mapState } from "vuex";

export default {
  name: "Clients",
  components: {
    Table
  },
  data() {
    return {
      table: {
        title: "Clientes",
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
        pagination: ""
      }
    };
  },
  computed: mapState(["date", "period"]),
  methods: {
    getObjects: function() {
      fetchAll("clients").then(e => {
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
