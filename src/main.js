import "./firebase";
import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import BootstrapVue from "bootstrap-vue";
import VueSimpleAlert from "vue-simple-alert";
import vuePositionSticky from "vue-position-sticky";
import JsonCSV from "vue-json-csv";
// import Print from 'vue-print-nb';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "./assets/global.css";

Vue.use(vuePositionSticky);

// Vue.use(Print);
Vue.use(BootstrapVue);

Vue.use(VueSimpleAlert, { background: "#1d1c1c" });

Vue.component("downloadCsv", JsonCSV);

Vue.directive("click-outside", {
  bind: function(el, binding, vnode) {
    el.clickOutsideEvent = function(event) {
      // here I check that click was outside the el and his childrens
      if (!(el == event.target || el.contains(event.target))) {
        // and if it did, call method provided in attribute value
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener("click", el.clickOutsideEvent);
  },
  unbind: function(el) {
    document.body.removeEventListener("click", el.clickOutsideEvent);
  },
});

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
