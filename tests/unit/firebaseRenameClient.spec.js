const firebase = require("@firebase/testing");
const admin = require("firebase-admin");
const mockdata = require("./mockdata");
import { renameClient } from "../../src/firebaseMethods";

const projectId = "es-alimento";
process.env.GCLOUD_PROJECT = projectId;
process.env.FIRESTORE_EMULATOR_HOST = "localhost:8080";
let app = admin.initializeApp({
  projectId: projectId,
  databaseURL: "http://localhost:9000/?ns=es-alimento",
});
let database = firebase.database(app);

beforeEach(async () => {
  database
    .ref()
    .set(mockdata.mockdata)
    .then((k) => {
      console.log(k);
    });
  await setTimeout(0);
});

describe("renameClient() orders", () => {
  let ref = database.ref();
  let oldname = "carlos alberto salgado";
  let newname = "mr salgado";

  it("renames existing orders", async () => {
    let oldClientOrders = 0;
    let newClientOrders = 0;
    // query to find how many existing orders with client oldname
    await ref
      .child("orders")
      .once("value")
      .then((snap) => {
        let orders = snap.val();
        let orderKeys = Object.keys(orders);
        for (let i = 0; i < orderKeys.length; i++) {
          if (orders[orderKeys[i]].client == oldname) {
            oldClientOrders += 1;
          }
        }
      });

    await renameClient(ref, oldname, newname);

    // find number of orders with newclient name
    await ref
      .child("orders")
      .once("value")
      .then((snap) => {
        let orders = snap.val();
        let orderKeys = Object.keys(orders);
        for (let i = 0; i < orderKeys.length; i++) {
          if (orders[orderKeys[i]].client == newname) {
            newClientOrders += 1;
          }
        }
      });
    expect(oldClientOrders).toEqual(newClientOrders);
  });

  it("check that no orders remain with oldname", async () => {
    let oldClientOrders = 0;
    await renameClient(ref, oldname, newname);
    await ref
      .child("orders")
      .once("value")
      .then((snap) => {
        let orders = snap.val();
        let orderKeys = Object.keys(orders);
        for (let i = 0; i < orderKeys.length; i++) {
          if (orders[orderKeys[i]].client == oldname) {
            oldClientOrders += 1;
          }
        }
      });
    expect(oldClientOrders).toEqual(0);
  });
});

describe("renameClient() options for menus", () => {
  let ref = database.ref();
  let oldname = "judy hazbun";
  let newname = "judith elena";
  let oldClientOptions = 0;
  let newClientOptions = 0;

  it("renames all options", async () => {
    // query to find how many existing options with client oldname
    await ref
      .child("optionsForMenus/clients")
      .once("value")
      .then((snap) => {
        let options = snap.val();
        let optionKeys = Object.keys(options);
        for (let i = 0; i < optionKeys.length; i++) {
          if (options[optionKeys[i]].name == oldname) {
            oldClientOptions += 1;
          }
        }
      });
    await renameClient(ref, oldname, newname);

    // find number of options with newclient name
    await ref
      .child("optionsForMenus/clients")
      .once("value")
      .then((snap) => {
        let options = snap.val();
        let optionKeys = Object.keys(options);
        for (let i = 0; i < optionKeys.length; i++) {
          if (options[optionKeys[i]].name == newname) {
            newClientOptions += 1;
          }
        }
      });
    expect(oldClientOptions).toEqual(newClientOptions);
  });

  it("check that no options remain with oldname", async () => {
    let oldClientOptions = 0;
    await renameClient(ref, oldname, newname);
    await ref
      .child("orders")
      .once("value")
      .then((snap) => {
        let options = snap.val();
        let oKeys = Object.keys(options);
        for (let i = 0; i < oKeys.length; i++) {
          if (options[oKeys[i]].client == oldname) {
            oldClientOptions += 1;
          }
        }
      });
    expect(oldClientOptions).toEqual(0);
  });
});
