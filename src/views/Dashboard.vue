<template>
  <div id="container" class="shadow-2">
    <div id="header">
      <Header />
    </div>
    <div id="nav" class="shadow-1">
      <DashNav />
    </div>
    <div id="main" class="shadow-1">
      <Main />
    </div>
  </div>
</template>
<script>
import DashNav from "@/components/layout/DashNav";
import Main from "@/components/layout/Main";
import Header from "@/components/layout/Header";
export default {
  name: "Dashboard",
  components: {
    DashNav,
    Main,
    Header
  }
};
</script>
<style scoped>
#container {
  display: grid;
  grid-template-columns: 1fr 4fr;
  color: #c4761a;
  background-color: #c4761a;
  border-radius: 5px;
}

#header {
  grid-column-start: 1;
  grid-column-end: 5;
  color: whitesmoke;
}

#nav {
  height: 80vh;
  background-color: oldlace;
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
}

#main {
  height: 80vh;
  background-color: whitesmoke;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
}
</style>