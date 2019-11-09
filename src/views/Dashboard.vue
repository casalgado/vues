<template>
  <div id="container" class="shadow-2">
    <div id="header">
      <Header />
    </div>
    <div id="main" class>
      <router-view :key="$route.fullPath" />
    </div>
    <div id="nav" class>
      <DashNav />
    </div>
  </div>
</template>
<script>
import DashNav from "@/components/layout/DashNav";
// import Main from "@/components/layout/Main";
import Header from "@/components/layout/Header";
export default {
  name: "Dashboard",
  components: {
    DashNav,
    Header
  }
};
</script>
<style scoped>
#container {
  display: grid;
  grid-template-columns: 1fr;
  color: var(--color-neutral);
  background-color: var(--color-primary);
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
}

#main {
  background-color: var(--color-secondary);
  margin-bottom: 40px;
}
</style>