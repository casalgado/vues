const firebase = require("@firebase/testing");
const admin = require("firebase-admin");
const mockdata = require("./mockdata");
import { renameProduct } from "../../src/firebaseMethods";
jest.unmock("firebase");

const projectId = "es-alimento";
process.env.GCLOUD_PROJECT = projectId;
process.env.FIRESTORE_EMULATOR_HOST = "localhost:8080";
let app = admin.initializeApp({
  projectId: projectId,
  databaseURL: "http://localhost:9000/?ns=es-alimento",
});
let database = firebase.database(app);

let tick = Date.now();
function log(arg) {
  let time = Math.round(((Date.now() - tick) / (1000 * 60)) * 10) / 10;
  let msg = `${arg}: ${time}mins`;
  // console.log(msg);
}

beforeEach(async () => {
  database
    .ref()
    .set(mockdata.mockdata)
    .then((k) => {
      console.log(k);
    });
  await setTimeout(0);
});

describe("renameProduct() in orders", () => {
  let ref = database.ref();
  let oldname = "pan integral de semillas mediano";
  let newname = "poriginalp";

  it("renames existing orders", async () => {
    let oldProductOrders = 0;
    let newProductOrders = 0;
    log(1);
    await ref
      .child("orders")
      .once("value")
      .then((snap) => {
        let orders = snap.val();
        let okeys = Object.keys(orders);
        for (let i = 0; i < okeys.length; i++) {
          let products = orders[okeys[i]].products;
          if (products) {
            for (let j = 0; j < products.length; j++) {
              let p = products[j];
              if (p.name == oldname) {
                oldProductOrders += 1;
              }
            }
          }
        }
      });
    log(2);
    await renameProduct(ref, oldname, newname);
    log(3);
    await ref
      .child("orders")
      .once("value")
      .then((snap) => {
        let orders = snap.val();
        let okeys = Object.keys(orders);
        for (let i = 0; i < okeys.length; i++) {
          let products = orders[okeys[i]].products;
          if (products) {
            for (let j = 0; j < products.length; j++) {
              let p = products[j];
              if (p.name == newname) {
                newProductOrders += 1;
              }
            }
          }
        }
      });
    log(4);
    expect(oldProductOrders).toEqual(newProductOrders);
  });

  it("check that no orders remain with oldname", async () => {
    log(5);
    let oldProductOrders = 0;
    await renameProduct(ref, oldname, newname);
    log(6);
    await ref
      .child("orders")
      .once("value")
      .then((snap) => {
        let orders = snap.val();
        let okeys = Object.keys(orders);
        for (let i = 0; i < okeys.length; i++) {
          let products = orders[okeys[i]].products;
          if (products) {
            for (let j = 0; j < products.length; j++) {
              let p = products[j];
              if (p.name == oldname) {
                oldProductOrders += 1;
              }
            }
          }
        }
      });
    log(7);
    expect(oldProductOrders).toEqual(0);
  });
});

describe("renameProduct() in client history", () => {
  let ref = database.ref();
  let oldname = "original grande";
  let newname = "poriginalp";

  it("renames existing orders", async () => {
    let oldProductClientHistory = 0;
    let newProductClientHistory = 0;
    log(1);
    await ref
      .child("clients")
      .once("value")
      .then((snap) => {
        let clients = snap.val();
        let ckeys = Object.keys(clients);
        for (let k = 0; k < ckeys.length; k++) {
          let client = clients[ckeys[k]];
          if (client.history) {
            let orders = client.history;
            let okeys = Object.keys(orders);
            for (let i = 0; i < okeys.length; i++) {
              let products = orders[okeys[i]].products;
              if (products) {
                for (let j = 0; j < products.length; j++) {
                  let p = products[j];
                  if (p.name == oldname) {
                    oldProductClientHistory += 1;
                  }
                }
              }
            }
          }
        }
      });
    log(2);
    await renameProduct(ref, oldname, newname);
    log(3);
    await ref
      .child("clients")
      .once("value")
      .then((snap) => {
        let clients = snap.val();
        let ckeys = Object.keys(clients);
        for (let k = 0; k < ckeys.length; k++) {
          let client = clients[ckeys[k]];
          if (client.history) {
            let orders = client.history;
            let okeys = Object.keys(orders);
            for (let i = 0; i < okeys.length; i++) {
              let products = orders[okeys[i]].products;
              if (products) {
                for (let j = 0; j < products.length; j++) {
                  let p = products[j];
                  if (p.name == newname) {
                    newProductClientHistory += 1;
                  }
                }
              }
            }
          }
        }
      });
    log(4);
    expect(oldProductClientHistory).toEqual(newProductClientHistory);
  });

  it("check that no orders remain with oldname", async () => {
    log(5);
    let oldProductClientHistory = 0;
    await renameProduct(ref, oldname, newname);
    log(6);
    await ref
      .child("clients")
      .once("value")
      .then((snap) => {
        let clients = snap.val();
        let ckeys = Object.keys(clients);
        for (let k = 0; k < ckeys.length; k++) {
          let client = clients[ckeys[k]];
          if (client.history) {
            let orders = client.history;
            let okeys = Object.keys(orders);
            for (let i = 0; i < okeys.length; i++) {
              let products = orders[okeys[i]].products;
              if (products) {
                for (let j = 0; j < products.length; j++) {
                  let p = products[j];
                  if (p.name == oldname) {
                    oldProductClientHistory += 1;
                  }
                }
              }
            }
          }
        }
      });
    log(7);
    expect(oldProductClientHistory).toEqual(0);
  });
});
