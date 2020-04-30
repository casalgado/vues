<template>
  <div>
    <b-container fluid>
      <b-row>
        <h4 id="title">Dashboard</h4>
      </b-row>
      <b-row>
        <b-col>
          <Table :table="tableProduce" :sidebar="false" />
        </b-col>
        <b-col>
          <Table :table="tableDeliver" :sidebar="false" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
// import PrintOrders from "../../print/PrintOrders";
import Table from "../../table/Table";
import { getByDate, getByDateDeliver } from "@/firebase";
import moment from "moment";
import { mapState } from "vuex";

export default {
  name: "showOrders",
  components: {
    Table,
  },
  data() {
    return {
      tableProduce: {
        title: "Producir",
        fields: [
          {
            key: "client",
            label: "Clientes",
            sortable: true,
            tdClass: "justifyLeft",
          },
          {
            key: "products",
            label: "Productos",
            sortable: true,
            tdClass: "justifyLeft",
          },
          {
            key: "quantity",
            label: "C",
            sortable: true,
          },
        ],
        formattedObjects: [],
        objects: [],
        selectMode: "single",
        pagination: "day",
      },
      tableDeliver: {
        title: "Entregar",
        fields: [
          {
            key: "client",
            label: "Clientes",
            sortable: true,
            tdClass: "justifyLeft",
          },
          {
            key: "products",
            label: "Productos",
            sortable: true,
            tdClass: "justifyLeft",
          },
          {
            key: "quantity",
            label: "C",
            sortable: true,
          },
        ],
        formattedObjects: [],
        objects: [],
        selectMode: "single",
        pagination: "day",
      },
    };
  },
  computed: mapState(["ref", "date", "period"]),
  methods: {
    getObjects: function() {
      getByDate(`${this.ref}/orders`, this.date, this.period).then((e) => {
        this.tableProduce.objects = JSON.parse(JSON.stringify(e));
        this.tableProduce.formattedObjects = this.format(
          JSON.parse(JSON.stringify(e))
        );
      });
      getByDateDeliver(`${this.ref}/orders`, this.date, this.period).then(
        (e) => {
          this.tableDeliver.objects = JSON.parse(JSON.stringify(e));
          this.tableDeliver.formattedObjects = this.format(
            JSON.parse(JSON.stringify(e))
          );
        }
      );
    },
    format: function(objects) {
      let items = objects.map((e) => {
        let clone = [...e.products];
        e.products = e.products.map((e) => e.name).join("<br />");
        e.quantity = clone.map((e) => e.quantity).join("<br />");
        e.date = moment(e.date).format("DD/MM");
        if (e.paid == "") {
          // @refactor
          e.paid = "";
        } else {
          e.paid = moment(e.paid).format("DD/MM");
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
<style scoped>
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
