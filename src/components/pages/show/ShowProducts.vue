<template>
  <div>
    <Table :table="table" />
    <b-card v-if="this.selected.length > 0" id="toolbox">
      <ButtonEdit
        v-if="this.selected.length == 1"
        :oid="this.oid"
        destination="EditProduct"
      />
      <ButtonDelete
        v-if="this.selected.length == 1"
        :oid="this.oid"
        :path="this.path"
        @delete="getObjects()"
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
import numeral from "numeral";

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
            key: "recipe",
            label: "receta",
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
  },
  methods: {
    getObjects: function () {
      getAll(`products`).then((e) => {
        this.table.objects = JSON.parse(JSON.stringify(e));
        this.table.formattedObjects = this.format(
          JSON.parse(JSON.stringify(e))
        );
      });
    },
    format: function (objects) {
      let items = objects.map((e) => {
        e.price = numeral(e.price).format("0,0");
        return e;
      });
      return items;
    },
  },
};
</script>
