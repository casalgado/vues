<template>
  <div id="container">
    <div id="header">
      <Header />
    </div>
    <div id="nav">
      <Nav />
    </div>
    <div id="main">
      <Main />
    </div>
  </div>
</template>
<script>
import Nav from "@/components/layout/Nav";
import Main from "@/components/layout/Main";
import Header from "@/components/layout/Header";
export default {
  name: "Dashboard",
  components: {
    Nav,
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
}

#header {
  grid-column-start: 1;
  grid-column-end: 5;
}

#nav {
  height: 80vh;
  background-color: oldlace;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

#main {
  height: 80vh;
  background-color: whitesmoke;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
</style>