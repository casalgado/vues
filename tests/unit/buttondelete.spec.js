import { shallowMount, createLocalVue } from "@vue/test-utils";
import ButtonDelete from "@/components/tools/ButtonDelete";
import moment from "moment";
import BootstrapVue from "bootstrap-vue";

const localVue = createLocalVue();
localVue.use(BootstrapVue);

localVue.directive("click-outside", {
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

describe("Runs remove method with correct arguments", () => {
  const wrapper = shallowMount(ButtonDelete, {
    localVue,
    mocks: {
      $store: {
        state: {
          user: {
            date: moment().format(),
          },
        },
      },
    },
    computed: {
      selected: function() {
        return [{ id: "123" }];
      },
    },
    methods: {
      getObjects: function() {
        return {};
      },
    },
  });
  console.log(wrapper.props());
  wrapper.setProps({ oid: "123456789", path: "clients" });
  it("renders toolbox when table row selected", () => {
    expect("b-card").toBeTruthy();
  });
});
