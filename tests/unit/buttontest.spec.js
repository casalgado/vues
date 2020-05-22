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
