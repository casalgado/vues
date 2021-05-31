const firebase = require("@firebase/testing");
const admin = require("firebase-admin");
const mockdata = require("./mockdata");
import { save, update, remove } from "../../src/firebaseMethods";

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

it("can read database", async () => {
  let order;
  let ref = "orders/-M6xAbfdqG_-rzKqRv4w";
  await database
    .ref(ref)
    .once("value")
    .then((snap) => {
      order = snap.val();
    });
  expect(order.client).toEqual("adriana martin");
});

describe("can save(), update() and remove()", () => {
  let ref = database.ref();
  let path = "testPath";
  let order;
  let orderKey;
  let clientCarlosAS = {
    address: "cra 57 # 85 - 85",
    birthday: "",
    category: "",
    cc: "123456789",
    comment: "",
    dateCreated: "2021-02-17T09:51:01-05:00",
    email: "casalgado86@gmail.com",
    name: "testclient",
    phone: "123123123",
  };
  let clientId;
  let returnedClient;
  let deletedClient;

  it("saves strings and numbers", async () => {
    await save(ref, path, { propOne: "valueOne", propTwo: 2 });
    await ref
      .child(path)
      .once("value")
      .then((snap) => {
        order = snap.val();
        orderKey = Object.keys(order)[0];
      });
    expect(order[orderKey].propOne).toEqual("valueOne");
    expect(order[orderKey].propTwo).toEqual(2);
  });

  it("saves an object to the correct path", async () => {
    await save(ref, "clients", clientCarlosAS).then((id) => {
      clientId = id;
    });
    await ref
      .child("clients")
      .once("value")
      .then((snap) => {
        returnedClient = snap.val()[clientId];
      });
    expect(returnedClient).toEqual(clientCarlosAS);
  });

  it("updates a record when given an object", async () => {
    clientCarlosAS.address = "carrera";
    await update(ref, `clients/${clientId}`, clientCarlosAS);
    await ref
      .child("clients")
      .once("value")
      .then((snap) => {
        returnedClient = snap.val()[clientId];
      });
    expect(returnedClient.address).toEqual("carrera");
  });

  it("updates only a prop of a record", async () => {
    await update(ref, `clients/${clientId}`, { address: "calle" });
    await ref
      .child("clients")
      .once("value")
      .then((snap) => {
        returnedClient = snap.val()[clientId];
      });
    expect(returnedClient.address).toEqual("calle");
  });

  it("removes record", async () => {
    let oldClient;
    await remove(ref, "clients", clientId);
    await ref
      .child(`deleteHistory/${clientId}`)
      .once("value")
      .then((snap) => {
        deletedClient = snap.val();
      });
    await ref
      .child(`clients/${clientId}`)
      .once("value")
      .then((snap) => {
        oldClient = snap.val();
      });
    returnedClient.id = deletedClient.id;
    returnedClient.path = deletedClient.path;
    expect(deletedClient).toEqual(returnedClient);
    expect(oldClient).toEqual(null);
  });
});
