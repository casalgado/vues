<template>
  <div>
    <Table :table="table" />
    <b-card id="toolbox" v-if="this.selected.length > 0">
      <ButtonEdit
        v-if="this.selected.length == 1"
        :oid="this.oid"
        destination="EditProduct"
      />
      <ButtonDelete
        v-if="this.selected.length == 1"
        :oid="this.oid"
        :path="this.path"
      />
    </b-card>
  </div>
</template>
<script>
import Table from "../../table/Table";
import ButtonEdit from "../../tools/ButtonEdit";
import ButtonDelete from "../../tools/ButtonDelete";
import { getAll } from "@/firebase";
import { mapState } from "vuex";

export default {
  name: "ShowProducts",
  components: {
    Table,
    ButtonEdit,
    ButtonDelete,
  },
  data() {
    return {
      table: {
        title: "Productos",
        fields: [
          {
            key: "category",
            label: "Categoria",
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
            key: "cost",
            label: "costo",
            sortable: true,
          },
          {
            key: "price",
            label: "venta",
            sortable: true,
          },
        ],
        formattedObjects: [],
        objects: [],
        selectMode: "single",
        pagination: "",
      },
      oid: "",
      path: "products",
    };
  },
  computed: {
    ...mapState(["ref", "date", "period", "selected"]),
  },
  methods: {
    getObjects: function() {
      getAll(`products`).then((e) => {
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
      if (this.selected[0]) {
        this.oid = this.selected[0].id;
      }
    },
  },
};
</script>
