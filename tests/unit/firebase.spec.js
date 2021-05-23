const firebase = require("@firebase/testing"); //<--- You want this to be the top guy!!!
const admin = require("firebase-admin");
const mockdata = require("./mockdata");

const projectId = "es-alimento";
let ref = "orders/-M6xAbfdqG_-rzKqRv4w";
process.env.GCLOUD_PROJECT = projectId;
process.env.FIRESTORE_EMULATOR_HOST = "localhost:8080";
let app = admin.initializeApp({
  projectId: projectId,
  databaseURL: "http://localhost:9000/?ns=es-alimento",
});
let database = firebase.database(app);

beforeAll(async () => {
  database
    .ref()
    .set(mockdata.mockdata)
    .then((k) => {
      console.log(k);
    });
  await setTimeout(10000);
});

test("knows basic addition", () => {
  const add = 1 + 2;
  expect(add).toBe(3);
});

it("can read database", async () => {
  let order;
  await database
    .ref(ref)
    .once("value")
    .then((snap) => {
      order = snap.val();
    });
  expect(order.client).toEqual("adriana martin");
});
