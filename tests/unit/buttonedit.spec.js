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
