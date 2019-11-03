<template>
  <div id="container" class="shadow-2">
    <div id="header">
      <Header />
    </div>
    <div id="nav" class>
      <DashNav />
    </div>
    <div id="main" class>
      <router-view />
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
  grid-template-columns: 1fr 4fr;
  color: var(--color-primary);
  background-color: var(--color-primary);
  border-radius: var(--border-radius-large);
}

#header {
  grid-column-start: 1;
  grid-column-end: 5;
  color: var(--color-neutral);
}

#nav {
  min-height: 80vh;
  background-color: var(--color-neutral);
  border-bottom-left-radius: var(--border-radius-large);
  border-top-left-radius: var(--border-radius-large);
  border-right: 1px solid var(--color-primary);
}

#main {
  min-height: 80vh;
  background-color: var(--color-neutral);
  border-bottom-right-radius: var(--border-radius-large);
  border-top-right-radius: var(--border-radius-large);
}
</style>