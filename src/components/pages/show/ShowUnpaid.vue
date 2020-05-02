<template>
  <div>
    <Table :table="table" />
  </div>
</template>
<script>
import { ordersMixin } from "../../../mixins/ordersMixin";
import Table from "../../table/Table";
import { getAllWithProp } from "@/firebase";
import { mapState } from "vuex";

export default {
  name: "ShowUnpaid",
  mixins: [ordersMixin],
  components: {
    Table,
  },
  data() {
    return {
      table: {
        title: "Por Cobrar",
        fields: [
          {
            key: "date",
            label: "Fecha",
            sortable: true,
            tdClass: "justifyLeft slim",
            thClass: "slim",
          },
          {
            key: "client",
            label: "Cliente",
            sortable: true,
            tdClass: "justifyLeft slim orderClient",
            thClass: "slim",
          },
          {
            key: "products",
            label: "Productos",
            sortable: true,
            tdClass: "justifyLeft slim orderProduct",
            thClass: "slim",
          },
          {
            key: "total",
            label: "Total",
            sortable: true,
            tdClass: "justifyLeft slim",
            thClass: "slim",
          },
        ],
        formattedObjects: [],
        objects: [],
        selectMode: "multi",
        pagination: "",
      },
    };
  },
  computed: mapState(["ref", "date", "period"]),
  methods: {
    getObjects: function() {
      getAllWithProp(`${this.ref}/orders`, "paid", "").then((e) => {
        console.log(e);
        this.table.objects = JSON.parse(JSON.stringify(e));
        this.table.formattedObjects = this.format(
          JSON.parse(JSON.stringify(e))
        );
      });
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
