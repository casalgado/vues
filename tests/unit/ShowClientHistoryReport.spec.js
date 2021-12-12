import { shallowMount, createLocalVue } from "@vue/test-utils";
import ShowClientHistoryReport from "../../src/components/pages/show/ShowClientHistoryReport";
import BootstrapVue from "bootstrap-vue";
jest.mock("@/firebase");

const localVue = createLocalVue();
localVue.use(BootstrapVue);

describe("Component", () => {
  test("is a Vue instance", () => {
    const wrapper = shallowMount(ShowClientHistoryReport, {
      localVue,
    });
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
