import { shallowMount } from "@vue/test-utils";
import Landing from "@/components/Landing.vue";

describe("Renders input fields", () => {
  const wrapper = shallowMount(Landing);
  const { vm } = wrapper;
  it("renders email field", () => {
    expect(vm.$refs.emailField).toBeTruthy();
  });
});
