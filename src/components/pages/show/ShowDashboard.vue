<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col xs="12" md="6" class="dashcol pr-0 pl-0">
          <Table :table="tableProduce" :sidebar="false" />
        </b-col>
        <b-col xs="12" md="6" class="dashcol pr-0 pl-0">
          <Table :table="tableDeliver" :sidebar="false" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
// import PrintOrders from "../../print/PrintOrders";
import Table from "../../table/Table";
import { getByDate } from "@/firebase";
import moment from "moment";
import { mapState } from "vuex";
import numeral from "numeral";

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
        pagination: "day",
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
        pagination: "day",
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
    format: function(objects) {
      let items = objects.map((e) => {
        let clone = [...e.products];
        e.products = e.products.map((e) => e.name);
        e.quantity = clone.map((e) => e.quantity);
        for (let i = 0; i < e.products.length; i++) {
          e.products[i] = `${e.quantity[i]}  ${e.products[i]}`;
        }
        e.products = e.products.join("<br />");
        e.date = moment(e.date).format("DD/MM");
        if (e.total % 1000 == "0") {
          e.total = numeral(e.total).format("0,0a");
        } else {
          e.total =
            numeral(e.total)
              .divide(1000)
              .format("0.0") + "k";
        }
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
