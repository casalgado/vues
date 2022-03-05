import { shallowMount, createLocalVue } from "@vue/test-utils";
import ShowClientHistoryReport from "../../src/components/pages/show/ShowClientHistoryReport";
import BootstrapVue from "bootstrap-vue";
import {
  ordersFromDatabase,
  formattedTables,
  datesForPeriods,
  newClients,
} from "./showClientHistoryReportMockData";
jest.mock("@/firebase");
jest.mock("@/firebaseInit");

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

describe("Component", () => {
  test("formattedTablesMethod", () => {
    const wrapper = shallowMount(ShowClientHistoryReport, {
      localVue,
      data() {
        return {
          ordersFromDatabase: ordersFromDatabase,
          datesForPeriods: datesForPeriods,
          newClients: newClients,
        };
      },
    });
    expect(wrapper.vm.formattedTables).toStrictEqual(formattedTables);
  });
});
