<template>
  <b-button :variant="this.paid" @click="togglePaid">
    <div>paid</div>
  </b-button>
</template>
<script>
import { getById, update } from "@/firebase";
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
  methods: {
    togglePaid: function() {
      if (this.paid == "danger" || this.paid == "dark") {
        this.$confirm(`Set ${this.ids.length} orders Paid?`).then(() => {
          this.ids.forEach((i) => {
            update(`${this.ref}/orders/${i}`, "paid", moment().format(), this);
          });
        });
      } else if (this.paid == "success") {
        this.$confirm(`Set ${this.ids.length} orders Unpaid?`).then(() => {
          this.ids.forEach((i) => {
            update(`${this.ref}/orders/${i}`, "paid", "", this);
          });
        });
      }
    },
  },
  watch: {
    selected() {
      console.log("t");
      this.objects = [];
      this.ids.forEach((i) => {
        console.log(i);
        getById(`${this.ref}/orders/${i}`).then((e) => {
          this.objects.push(e);
        });
      });
    },
  },
  mounted() {
    console.log("p");
    this.objects = [];
    this.ids.forEach((i) => {
      console.log(i);
      getById(`${this.ref}/orders/${i}`).then((e) => {
        this.objects.push(e);
      });
    });
  },
};
</script>
<style scoped></style>
