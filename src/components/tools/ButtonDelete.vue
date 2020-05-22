<template>
  <b-button variant="danger" class="toolbox-button" @click="remove()">
    borrar
  </b-button>
</template>
<script>
import { remove, getOneWhere, getById, update } from "@/firebase";
import { dquotes } from "@/alertQuotes";

export default {
  name: "ButtonDelete",
  props: {
    oid: String,
    path: String,
  },
  mounted() {},
  methods: {
    remove: function() {
      this.$emit("delete");
      let quote = dquotes[Math.floor(Math.random() * dquotes.length)];
      this.$fire({
        title: `"${quote.quote}"`,
        text: `- ${quote.unit}`,
        showCancelButton: true,
      }).then((alertStatus) => {
        if (alertStatus.dismiss) {
          console.log("dismiss");
        } else {
          let oid = this.oid;
          remove(this.path, oid).then(() => {
            this.$emit("delete");
            if (this.path === "orders") {
              getById("deleteHistory", oid).then((o) => {
                console.log(o);
                getOneWhere("clients", "name", o.client).then((c) => {
                  if (c) {
                    update(`clients/${c.id}/history`, { [oid]: null });
                    update("optionsForMenus/clients", {
                      [oid]: null,
                    });
                  } else {
                    alert("client no longer in database");
                  }
                });
              });
            } else if (this.path === "expenses") {
              getById("deleteHistory", oid).then((o) => {
                getOneWhere("providers", "name", o.provider).then((c) => {
                  if (c) {
                    update(`providers/${c.id}/history`, { [oid]: null });
                    update("optionsForMenus/providers", {
                      [oid]: null,
                    });
                  } else {
                    alert("provider no longer in database");
                  }
                });
              });
            } else if (this.path === "clients") {
              update("optionsForMenus/clients", {
                [oid]: null,
              });
            }
          });
        }
      });
    },
  },
};
</script>
<style scoped></style>
