<template>
  <div>
    <h6 id="title">{{ table.title }}</h6>
    <Pagination :period="table.pagination" />
    <Table :table="table" />
    <b-card v-if="selected.length > 0" id="toolbox">
      <p v-if="development">{{ oid }}</p>
      <ButtonEdit
        v-if="selected.length == 1"
        :oid="oid"
        destination="EditClient"
      />
      <ButtonDelete
        v-if="selected.length == 1"
        :oid="oid"
        :path="path"
        @:delete="getObjects()"
      />

      <b-button variant="dark" class="toolbox-button" @click="getAllClients">
        todos
      </b-button>
      <ClientHistorySummary :key="oid" :dbref="ref" :cid="oid" />
    </b-card>
    <b-button variant="dark" class="toolbox-button" @click="getAllClients">
      todos
    </b-button>
  </div>
</template>
<script>
import Table from "../../table/Table";
import Pagination from "../../table/Pagination";
import ButtonEdit from "../../tools/ButtonEdit";
import ButtonDelete from "../../tools/ButtonDelete";
import ClientHistorySummary from "../../tools/ClientHistorySummary";
import { getAll, getByDateRange } from "@/firebase";
import { mapState } from "vuex";
import moment from "moment";

export default {
  name: "ShowClients",
  components: {
    Table,
    ClientHistorySummary,
    ButtonEdit,
    ButtonDelete,
    Pagination,
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
            key: "phone",
            label: "Tel",
            sortable: true,
          },
          {
            key: "lastOrder",
            label: "Ult",
            sortable: true,
          },
          {
            key: "birthday",
            label: "Cumple",
            sortable: true,
          },
          {
            key: "address",
            label: "Dir",
            sortable: true,
          },
        ],
        formattedObjects: [],
        objects: [],
        selectMode: "single",
        pagination: "week",
      },
      oid: "",
      path: "clients",
    };
  },
  computed: {
    development: function() {
      const environment = process.env.NODE_ENV;
      if (environment === "development") {
        return true;
      } else {
        return false;
      }
    },
    ...mapState(["ref", "date", "period", "selected"]),
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
  mounted() {
    this.getObjects();
    if (window.innerWidth <= 767) {
      this.table.fields = this.table.fields.filter(
        (e) => e.key == "name" || e.key == "address"
      );
    }
  },
  methods: {
    getObjects: function() {
      getByDateRange(`clients`, "since", this.date, this.period).then((e) => {
        this.table.objects = JSON.parse(JSON.stringify(e));
        this.table.formattedObjects = this.format(
          JSON.parse(JSON.stringify(e))
        );
      });
    },
    getAllClients: function() {
      getAll("clients").then((e) => {
        this.table.objects = JSON.parse(JSON.stringify(e));
        this.table.formattedObjects = this.format(
          JSON.parse(JSON.stringify(e))
        );
      });
    },
    format: function(objects) {
      let items = objects.map((e) => {
        e.since = moment(e.since).format("YYYY/MM/DD");
        e.lastOrder = this.getLastOrder(e);
        if (e.birthday !== "") {
          e.birthday = moment(e.birthday).format("MMM DD");
        }
        return e;
      });
      return items;
    },
    getLastOrder(o) {
      const h = o.history;
      let d = [];
      if (h) {
        Object.keys(h).forEach((k) => {
          d.push(h[k]["date"]);
        });
        let ult = moment().diff(moment(d.sort()[d.length - 1]), "days");
        return `${ult} d`;
      } else {
        return "-";
      }
    },
  },
};
</script>
