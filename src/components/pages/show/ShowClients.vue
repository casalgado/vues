<template>
  <div>
    <Table :table="table" />
    <b-card id="toolbox" v-if="this.selected.length > 0">
      <ButtonEdit
        v-if="this.selected.length == 1"
        :oid="this.oid"
        destination="EditClient"
      />
      <ButtonDelete
        v-if="this.selected.length == 1"
        :oid="this.oid"
        :path="this.path"
      />
      <ClientHistorySummary :dbref="this.ref" :cid="this.oid" :key="this.oid" />
    </b-card>
  </div>
</template>
<script>
import Table from "../../table/Table";
import ButtonEdit from "../../tools/ButtonEdit";
import ButtonDelete from "../../tools/ButtonDelete";
import ClientHistorySummary from "../../tools/ClientHistorySummary";
import { getAll } from "@/firebase";
import { mapState } from "vuex";
import moment from "moment";

export default {
  name: "ShowClients",
  components: {
    Table,
    ClientHistorySummary,
    ButtonEdit,
    ButtonDelete,
  },
  data() {
    return {
      table: {
        title: "Clientes",
        fields: [
          {
            key: "since",
            label: "Desde",
            sortable: true,
            tdClass: "justifyLeft",
          },
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
        ],
        formattedObjects: [],
        objects: [],
        selectMode: "single",
        pagination: "",
      },
      oid: "",
      path: "clients",
    };
  },
  computed: {
    ...mapState(["ref", "date", "period", "selected"]),
  },
  methods: {
    getObjects: function() {
      getAll(`clients`).then((e) => {
        this.table.objects = JSON.parse(JSON.stringify(e));
        this.table.formattedObjects = this.format(
          JSON.parse(JSON.stringify(e))
        );
      });
    },
    format: function(objects) {
      let items = objects.map((e) => {
        e.since = moment(e.since).format("YYYY/MM/DD");
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
    selected() {
      if (this.selected[0]) {
        this.oid = this.selected[0].id;
      }
    },
  },
};
</script>
