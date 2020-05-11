<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col xs="12" md="6" class="dashcol pr-0 pl-0">
          <h6 id="title">{{ tableProduce.title }}</h6>
          <Pagination period="day" />
          <Table :table="tableProduce" :sidebar="false" />
        </b-col>
        <b-col xs="12" md="6" class="dashcol pr-0 pl-0">
          <h6 id="title">{{ tableDeliver.title }}</h6>
          <Pagination period="day" />
          <Table :table="tableDeliver" :sidebar="false" />
        </b-col>
      </b-row>
      <b-card id="toolbox" v-if="this.selected.length > 0">
        <ButtonEdit
          v-if="this.selected.length == 1"
          :oid="this.oid"
          :key="this.oid"
          destination="EditOrder"
        />
        <ClientSnippet :oid="this.oid" :key="this.oid + 'i'" />
      </b-card>
    </b-container>
    <Landing v-if="!this.user" />
  </div>
</template>
<script>
import { ordersMixin } from "../../../mixins/ordersMixin";
import Table from "../../table/Table";
import Landing from "../../Landing";
import ButtonEdit from "../../tools/ButtonEdit";
import ClientSnippet from "../../tools/ClientSnippet";
import Pagination from "../../table/Pagination";
import { getByDateRange } from "@/firebase";
import { mapState } from "vuex";

export default {
  name: "showOrders",
  mixins: [ordersMixin],
  components: {
    Table,
    Pagination,
    ButtonEdit,
    ClientSnippet,
    Landing,
  },
  data() {
    return {
      tableProduce: {
        title: "Producir",
        fields: [
          {
            key: "client",
            label: "Cliente",
            sortable: true,
            tdClass: "justifyLeft slim dashOrderClient",
            thClass: "slim",
          },
          {
            key: "products",
            label: "Productos",
            sortable: true,
            tdClass: "justifyLeft slim orderProduct",
            thClass: "slim",
          },
        ],
        formattedObjects: [],
        objects: [],
        selectMode: "single",
      },
      tableDeliver: {
        title: "Entregar",
        fields: [
          {
            key: "client",
            label: "Cliente",
            sortable: true,
            tdClass: "justifyLeft slim dashOrderClient",
            thClass: "slim",
          },
          {
            key: "products",
            label: "Productos",
            sortable: true,
            tdClass: "justifyLeft slim orderProduct",
            thClass: "slim",
          },
        ],
        formattedObjects: [],
        objects: [],
        selectMode: "single",
      },
      oid: "",
      path: "orders",
    };
  },
  computed: {
    user: function() {
      return true;
    },
    ...mapState(["uid", "ref", "date", "period", "selected"]),
  },
  methods: {
    getObjects: function() {
      getByDateRange(`orders`, "date", this.date, this.period).then((e) => {
        this.tableProduce.objects = JSON.parse(JSON.stringify(e));
        this.tableProduce.formattedObjects = this.format(
          JSON.parse(JSON.stringify(e))
        );
      });
      getByDateRange(`orders`, "deliver", this.date, this.period).then((e) => {
        this.tableDeliver.objects = JSON.parse(JSON.stringify(e));
        this.tableDeliver.formattedObjects = this.format(
          JSON.parse(JSON.stringify(e))
        );
      });
    },
  },
  beforeRouteUpdate() {
    this.getObjects();
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
    ref() {
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
<style scoped>
@media only screen and (min-width: 768px) {
  .dashcol {
    padding-right: 5px !important;
    padding-left: 5px !important;
  }
}
@media screen {
  #page {
    display: grid;
  }

  #title {
    width: 100%;
  }
}

@media print {
  #container,
  #title,
  #sidebar-content {
    display: none;
  }

  #page {
    color: black;
    display: grid;
  }
}
</style>
