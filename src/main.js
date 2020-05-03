import "./firebase";
import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import BootstrapVue from "bootstrap-vue";
import VueSimpleAlert from "vue-simple-alert";
// import Print from 'vue-print-nb';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "./assets/global.css";

// Vue.use(Print);
Vue.use(BootstrapVue);

Vue.use(VueSimpleAlert, { background: "#1d1c1c" });

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
