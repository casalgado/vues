import { render, fireEvent } from "@testing-library/vue";
import Component from "../../../src/components/pages/create/CreateMembership.vue";

const firebase = require("@firebase/testing");
const admin = require("firebase-admin");
const mockdata = require("./mockdata");
import {
  save,
  update,
  getClientListWithMostUsedFirst,
  getById,
  getAsOptionsForSelect,
} from "../../src/firebaseMethods";

const projectId = "es-alimento";
process.env.GCLOUD_PROJECT = projectId;
process.env.FIRESTORE_EMULATOR_HOST = "localhost:8080";
let app = admin.initializeApp({
  projectId: projectId,
  databaseURL: "http://localhost:9000/?ns=es-alimento",
});
let database = firebase.database(app);

global.alert = jest.fn();

beforeAll(async () => {
  database
    .ref()
    .set(mockdata.mockdata)
    .then((k) => {
      console.log(k);
    });
  await setTimeout(0);
});

test("properly handles v-model", async () => {
  const { getByText } = render(Component);

  // Asserts initial state.
  getByText("Semana 4");

  // Get the input DOM node by querying the associated label.

  // Updates the <input> value and triggers an `input` event.
  // fireEvent.input() would make the test fail.

  getByText("Semana 5");
});
