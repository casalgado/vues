<template>
  <div>
    <Table :table="table" />
    <b-card id="toolbox" v-if="this.selected.length > 0">
      <ButtonEdit
        v-if="this.selected.length == 1"
        :oid="this.oid"
        destination="EditProvider"
      />
    </b-card>
  </div>
</template>
<script>
import Table from "../../table/Table";
import ButtonEdit from "../../tools/ButtonEdit";
import { getAll } from "@/firebase";
import { mapState } from "vuex";

export default {
  name: "ShowProviders",
  components: {
    Table,
    ButtonEdit,
  },
  data() {
    return {
      table: {
        title: "Proveedores",
        fields: [
          {
            key: "name",
            label: "Nombre",
            sortable: true,
            tdClass: "justifyLeft",
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
        ],
        formattedObjects: [],
        objects: [],
        selectMode: "single",
        pagination: "",
        oid: "",
      },
    };
  },
  computed: {
    ...mapState(["ref", "date", "period", "selected"]),
  },
  methods: {
    getObjects: function() {
      getAll(`providers`).then((e) => {
        this.table.objects = JSON.parse(JSON.stringify(e));
        this.table.formattedObjects = this.format(
          JSON.parse(JSON.stringify(e))
        );
      });
    },
    format: function(objects) {
      let items = objects.map((e) => {
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
    selected() {
      this.oid = this.selected[0].id;
    },
  },
};
</script>
