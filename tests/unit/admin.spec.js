import { shallowMount } from "@vue/test-utils";
import Admin from "@/components/Admin.vue";

describe("Admin.vue", () => {
  it("displays a non authorized message", () => {
    const msg = "submit";
    const wrapper = shallowMount(Admin, {
      propsData: {
        msg: msg,
      },
    });

    console.log(wrapper.props());

    expect(wrapper.find("span").text()).toBe("Not Authorized");
    expect(wrapper.find("button").text()).toBe("submit");
  });
});
