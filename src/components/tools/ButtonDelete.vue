<template>
  <b-button @click="remove" variant="danger" class="toolbox-button"
    >borrar</b-button
  >
</template>
<script>
import { remove, getOneWhere, getById, update } from "@/firebase";
export default {
  name: "ButtonDelete",
  props: {
    oid: String,
    path: String,
  },
  methods: {
    remove: function() {
      if (confirm("Seguro que deseas borrar?")) {
        let oid = this.oid;
        remove(this.path, oid).then(() => {
          this.$emit("delete");
          if (this.path === "orders") {
            getById("deleteHistory", oid).then((o) => {
              console.log(o);
              getOneWhere("clients", "name", o.client).then((c) => {
                update(`clients/${c.id}/history`, { [oid]: null });
                update("optionsForMenus/clients", {
                  [oid]: null,
                });
              });
            });
          } else if (this.path === "expenses") {
            getById("deleteHistory", oid).then((o) => {
              getOneWhere("providers", "name", o.provider).then((c) => {
                update(`providers/${c.id}/history`, { [oid]: null });
                update("optionsForMenus/providers", {
                  [oid]: null,
                });
              });
            });
          } else if (this.path === "clients") {
            update("optionsForMenus/clients", {
              [oid]: null,
            });
          }
        });
      }
    },
  },
  mounted() {},
};
</script>
<style scoped></style>
