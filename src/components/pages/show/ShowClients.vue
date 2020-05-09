<template>
  <div>
    {{ this.cid }}
    <Table :table="table" />
    <b-card id="toolbox" v-if="this.selected.length > 0">
      <ButtonEdit
        v-if="this.selected.length == 1"
        :oid="this.cid"
        destination="EditClient"
      />
      <ClientHistorySummary :dbref="this.ref" :cid="this.cid" :key="this.cid" />
    </b-card>
  </div>
</template>
<script>
import Table from "../../table/Table";
import ButtonEdit from "../../tools/ButtonEdit";
import ClientHistorySummary from "../../tools/ClientHistorySummary";
import { getAll } from "@/firebase";
import { mapState } from "vuex";
import moment from "moment";

export default {
  name: "Clients",
  components: {
    Table,
    ClientHistorySummary,
    ButtonEdit,
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
        ],
        formattedObjects: [],
        objects: [],
        selectMode: "single",
        pagination: "",
        cid: "",
      },
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
      this.cid = this.selected[0].id;
    },
  },
};
</script>
