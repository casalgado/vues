<template>
  <div id="container" class="shadow-2">
    <div id="main" class>
      <router-view :key="$route.fullPath" />
    </div>
    <div id="nav">
      <DashNav />
    </div>
  </div>
</template>
<script>
import DashNav from "@/components/dashboard/DashNav";
export default {
  name: "Dashboard",
  components: {
    DashNav
  },
  data() {
    return {
      items: []
    };
  }
};
</script>
<style scoped>
@media screen {
  #container {
    display: grid;
    grid-template-columns: 1fr;
    color: var(--color-neutral);
    background-color: var(--color-secondary);
    border-radius: var(--border-radius-small);
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