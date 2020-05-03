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
    </b-container>
  </div>
</template>
<script>
import { ordersMixin } from "../../../mixins/ordersMixin";
import Table from "../../table/Table";
import Pagination from "../../table/Pagination";
import { getByDate } from "@/firebase";
import { mapState } from "vuex";

export default {
  name: "showOrders",
  mixins: [ordersMixin],
  components: {
    Table,
    Pagination,
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
    };
  },
  computed: mapState(["ref", "date", "period"]),
  methods: {
    getObjects: function() {
      getByDate(`${this.ref}/orders`, "date", this.date, this.period).then(
        (e) => {
          this.tableProduce.objects = JSON.parse(JSON.stringify(e));
          this.tableProduce.formattedObjects = this.format(
            JSON.parse(JSON.stringify(e))
          );
        }
      );
      getByDate(`${this.ref}/orders`, "deliver", this.date, this.period).then(
        (e) => {
          this.tableDeliver.objects = JSON.parse(JSON.stringify(e));
          this.tableDeliver.formattedObjects = this.format(
            JSON.parse(JSON.stringify(e))
          );
        }
      );
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
