import { shallowMount } from "@vue/test-utils";
import ButtonDelete from "@/components/tools/ButtonDelete";

describe("Runs remove method with correct arguments", () => {
  const wrapper = shallowMount(ButtonDelete);
  wrapper.setProps({ oid: "123456789", path: "clients" });
  it("renders delete button field", () => {});
});
