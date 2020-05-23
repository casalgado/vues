<template>
  <b-button
    v-if="this.paid == 'success' || this.paid == 'danger'"
    :variant="this.paid"
    class="toolbox-button"
    @click="togglePaid"
  >
    <div v-if="this.paid == 'success'">paid</div>
    <div v-else>unpaid</div>
  </b-button>
</template>
<script>
import { getById, updateSingleProp } from "@/firebase";
import moment from "moment";
import { mapState } from "vuex";

export default {
  name: "ButtonPaid",
  props: {
    ids: Array,
  },
  data() {
    return {
      objects: [],
    };
  },
  computed: {
    selected() {
      return this.$store.state.selected;
    },
    paid() {
      let yes = 0;
      let no = 0;
      this.objects.forEach((o) => {
        o.paid == "" ? no++ : yes++;
      });
      if (yes == no) {
        return "dark";
      } else if (no == 0) {
        return "success";
      } else if (yes == 0) {
        return "danger";
      } else {
        return "dark";
      }
    },
    ...mapState(["ref"]),
  },
  watch: {
    selected() {
      this.getOrders();
    },
  },
  mounted() {
    this.getOrders();
  },
  methods: {
    togglePaid: function() {
      if (this.paid == "danger" || this.paid == "dark") {
        this.$fire({
          title: `Set ${this.ids.length} orders Paid?`,
          showCancelButton: true,
        }).then(() => {
          this.ids.forEach((i) => {
            updateSingleProp(`orders`, `${i}`, "paid", moment().format(), this);
          });
        });
      } else if (this.paid == "success") {
        this.$fire({
          title: `Set ${this.ids.length} orders Unpaid?`,
          showCancelButton: true,
        }).then(() => {
          this.ids.forEach((i) => {
            updateSingleProp(`orders`, `${i}`, "paid", "", this);
          });
        });
      }
    },
    getOrders: function() {
      this.objects = [];
      this.ids.forEach((i) => {
        getById("orders", `${i}`).then((e) => {
          this.objects.push(e);
        });
      });
    },
  },
};
</script>
<style scoped></style>
