import { shallowMount } from "@vue/test-utils";
import Admin from "@/components/Admin.vue";
import sinon from "sinon";

describe("Admin.vue", () => {
  const spy = sinon.spy();
  it("sinon", async () => {
    const msg = "submit";
    const wrapper = shallowMount(Admin, {
      methods: {
        boo: function() {
          this.name = "esteban";
        },
        $fire: function() {
          return {};
        },
      },
      propsData: {
        msg: msg,
      },
    });

    const fake = sinon.fake.returns("bnot");
    console.log(wrapper.vm.$data.name);
    fake();
    expect(wrapper.find("span").text()).toBe("Not Authorized");
    expect(wrapper.find("button").text()).toBe("btn");
    wrapper.find("button").trigger("click");
    wrapper.vm.$emit("delete");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().delete).toBeTruthy();
    console.log(wrapper.vm.$data.name);
  });
});
