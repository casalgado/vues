import { render, fireEvent } from "@testing-library/vue";
import Component from "../../../src/components/table/Table.vue";
import VuexTest from "./components/Store/VuexTest";
import { store } from "./components/Store/store";

test("properly handles v-model", async () => {
  const { getByText } = render(
    Component,
    {
      props: {
        table: {
          formattedObjects: { name: "name", age: "age", height: "height" },
        },
      },
    },
    (vue) => {
      vue.use(Vuex);
    }
  );

  // Asserts initial state.
  getByText("Hi, my name is Alice");

  // Get the input DOM node by querying the associated label.

  // Updates the <input> value and triggers an `input` event.
  // fireEvent.input() would make the test fail.

  getByText("Hi, my name is Bob");
});
