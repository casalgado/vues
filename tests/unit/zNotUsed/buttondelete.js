import { shallowMount, createLocalVue } from "@vue/test-utils";
import ButtonDelete from "@/components/tools/ButtonDelete";
import moment from "moment";
import BootstrapVue from "bootstrap-vue";
import sinon from "sinon";

const localVue = createLocalVue();
localVue.use(BootstrapVue);

localVue.directive("click-outside", {
  bind: function(el, binding, vnode) {
    el.clickOutsideEvent = function(event) {
      if (!(el == event.target || el.contains(event.target))) {
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener("click", el.clickOutsideEvent);
  },
  unbind: function(el) {
    document.body.removeEventListener("click", el.clickOutsideEvent);
  },
});

afterEach(() => {
  sinon.restore();
});

describe("Runs calls remove method when button is clicked", () => {
  const spy = sinon.spy();
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
    propsData: {
      oid: "123",
      path: "clients",
    },
  });
  it("emits delete event whet button clicked", async () => {
    wrapper.find("#cbtn").trigger("click");

    await wrapper.vm.$nextTick();
    expect(spy.called).toBeTruthy();
  });
});
