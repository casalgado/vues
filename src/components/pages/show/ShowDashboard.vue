<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col xs="12" md="6" class="dashcol pr-0 pl-0">
          <h6 id="title">{{ tableProduce.title }}</h6>
          <Pagination period="day" />
          <Table :table="tableProduce" :sidebar="false" />
          <b-button
            variant="dark"
            class="post-table-button"
            @click="showSummaryProduce = !showSummaryProduce"
          >
            por producto
          </b-button>
          <OrdersSummary
            v-if="showSummaryProduce"
            :objects="tableProduce.objects"
            :onlyQuantities="true"
          />
        </b-col>
        <b-col xs="12" md="6" class="dashcol pr-0 pl-0">
          <h6 id="title">{{ tableDeliver.title }}</h6>
          <Pagination period="day" />
          <Table :table="tableDeliver" :sidebar="false" />
        </b-col>
      </b-row>
      <b-card v-if="selected.length > 0" id="toolbox">
        <ButtonPaid :ids="this.oids" />
        <ButtonEdit
          v-if="selected.length == 1"
          :key="this.oids[0]"
          :oid="this.oids[0]"
          destination="EditOrder"
        />
        <ClientSnippet :key="this.oids[0] + 'i'" :oid="this.oids[0]" />
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
import ButtonPaid from "../../tools/ButtonPaid";
import ClientSnippet from "../../tools/ClientSnippet";
import OrdersSummary from "../../tools/OrdersSummary";
import Pagination from "../../table/Pagination";
import { getByDateRange } from "@/firebase";
import { mapState } from "vuex";

export default {
  name: "ShowDashboard",
  components: {
    Table,
    Pagination,
    ButtonEdit,
    ClientSnippet,
    Landing,
    ButtonPaid,
    OrdersSummary,
  },
  mixins: [ordersMixin],
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
      oids: [],
      path: "orders",
      showSummaryProduce: false,
      showSummaryDeliver: false,
    };
  },
  computed: {
    user: function() {
      return true;
    },
    ...mapState(["uid", "date", "period", "selected"]),
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
        this.oids = this.selected.map((e) => {
          return e.id;
        });
      }
    },
  },
  mounted() {
    this.getObjects();
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
};
</script>
<style scoped>
@media only screen and (min-width: 768px) {
  .dashcol {
    padding-right: 5px !important;
    padding-left: 5px !important;
  }
}
@media only screen and (max-width: 668px) {
  #toolbox {
    width: 100vw;
    left: 0;
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
