<template>
  <div>
    <Table :table="table" />
  </div>
</template>
<script>
import Table from "../../table/Table";
import { getAll } from "@/firebase";
import { mapState } from "vuex";
import moment from "moment";

export default {
  name: "Clients",
  components: {
    Table,
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
            tdClass: "justifyLeft",
          },
          {
            key: "birthday",
            label: "Cumple",
            sortable: true,
          },
          {
            key: "phone",
            label: "Telefono",
            sortable: true,
          },
          {
            key: "address",
            label: "Direccion",
            sortable: true,
          },
          {
            key: "comment",
            label: "Comentario",
            sortable: true,
          },
        ],
        formattedObjects: [],
        objects: [],
        selectMode: "single",
        pagination: "",
      },
    };
  },
  computed: mapState(["ref", "date", "period"]),
  methods: {
    getObjects: function() {
      getAll(`${this.ref}/clients`).then((e) => {
        this.table.objects = JSON.parse(JSON.stringify(e));
        this.table.formattedObjects = this.format(
          JSON.parse(JSON.stringify(e))
        );
      });
    },
    format: function(objects) {
      let items = objects.map((e) => {
        if (e.birthday !== "") {
          e.birthday = moment(e.birthday).format("MMM DD");
        }
        return e;
      });
      return items;
    },
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
