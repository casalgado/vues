import { mount, createLocalVue } from "@vue/test-utils";
import ButtonEdit from "../../src/components/tools/ButtonEdit";
import BootstrapVue from "bootstrap-vue";

const localVue = createLocalVue();
localVue.use(BootstrapVue);

const $router = [];

describe("Component", () => {
  test("is a Vue instance", () => {
    const wrapper = mount(ButtonEdit, { localVue });
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test("renders correctly", () => {
    const wrapper = mount(ButtonEdit, { localVue });
    expect(wrapper.element).toMatchSnapshot();
  });

  test("calls router when edit method is called", () => {
    const wrapper = mount(ButtonEdit, {
      localVue,
      mocks: { $router },
      propsData: { oid: "123", destination: "path/to/destination" },
    });
    wrapper.vm.edit();
    expect(wrapper.vm.$router[0].params.oid).toEqual("123");
    expect(wrapper.vm.$router[0].name).toEqual("path/to/destination");
  });
});

/**
previously wos buttontest.spec.js

import { mount, createLocalVue } from "@vue/test-utils";
import ButtonTest from "../../src/components/tools/ButtonTest";
import BootstrapVue from "bootstrap-vue";

const localVue = createLocalVue();
localVue.use(BootstrapVue);

describe("Component", () => {
  test("is a Vue instance", () => {
    const wrapper = mount(ButtonTest, { localVue });
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test("emits delete event when remove method is called", async () => {
    const wrapper = mount(ButtonTest, {
      localVue,
      propsData: { oid: "123", destination: "path/to/destination" },
    });
    wrapper.vm.remove();
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().delete).toBeTruthy();
  });
});

 */
