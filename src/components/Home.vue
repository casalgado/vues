<template>
  <div id="home-container" class="shadow-2">
    <div id="main" class>
      <router-view :key="$route.fullPath" />
    </div>
    <div id="nav">
      <Navigation />
    </div>
  </div>
</template>
<script>
import Navigation from "@/components/Navigation";
import moment from "moment";
import { mapState } from "vuex";
export default {
  name: "Home",
  components: {
    Navigation,
  },
  data() {
    return {
      items: [],
    };
  },
  computed: mapState(["uid"]),
  mounted() {
    this.$store.commit("setDate", { date: moment().format() });
    if (this.uid == null) {
      this.$router.push({ path: "/landing" });
    }
  },
};
</script>
<style scoped>
@media screen {
  #home-container {
    color: var(--color-neutral);
    background-color: var(--color-secondary);
    border-radius: var(--border-radius-small);
    padding-bottom: 100px;
  }

  #header {
    color: var(--color-neutral);
  }

  #nav {
    position: fixed;
    bottom: 0px;
    background-color: var(--color-primary);
    border-top: 1px solid var(--color-neutral);
    width: 100%;
  }

  #main {
    background-color: inherit;
    padding: 5px;
  }
}

@media print {
  #nav {
    display: none;
  }
}
</style>
