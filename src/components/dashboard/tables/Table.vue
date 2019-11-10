<template>
  <div>
    <Pagination />
    <router-view :objects="items"></router-view>
  </div>
</template>
<script>
import Pagination from "@/components/dashboard/tables/Pagination.vue";
import { database } from "../../../firebase";
import moment from "moment";

export default {
  name: "Table",
  components: {
    Pagination
  },
  data() {
    return {
      items: [],
      state: this.$store.state.date
    };
  },
  computed: {
    currentDate() {
      return `${this.$store.state.date}`;
    },
    currentPeriod() {
      return `${this.$store.state.period}`;
    },
    currentSheet() {
      return `${this.$route.params.sheet}`;
    }
  },
  created() {
    this.getObjects();
  },
  watch: {
    currentDate() {
      this.getObjects();
    },
    currentPeriod() {
      this.getObjects();
    }
  },
  methods: {
    getObjects: function() {
      database
        .ref(`esalimento/${this.currentSheet}`)
        .orderByChild("date")
        .startAt(
          moment(this.currentDate)
            .startOf(this.currentPeriod)
            .format()
        )
        .endAt(
          moment(this.currentDate)
            .endOf(this.currentPeriod)
            .format()
        )
        .once("value")
        .then(function(snapshot) {
          let data = snapshot.val();
          let objects = [];
          for (let key in data) {
            objects.push(data[key]);
          }
          return objects;
        })
        .then(objects => {
          this.items = objects;
        });
    }
  }
};
</script>
<style scoped>
</style>