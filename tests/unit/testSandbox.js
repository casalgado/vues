const firebase = require("@firebase/testing");
const PROJECT_ID = "es-alimento";

describe("Component", () => {
  test("knows basic addition", () => {
    const add = 1 + 2;
    expect(add).toBe(3);
  });

  it("can read database", async () => {
    const db = firebase
      .initializeTestApp({
        projectId: PROJECT_ID,
        databaseURL: "https://es-alimento.firebaseio.com",
      })
      .database();
    const testRef = db.ref("backup/clients");
    await firebase.assertSucceeds(testRef.once("value"));
  });
});

import { initializeAdminApp } from "@firebase/rules-unit-testing";
import admin from "firebase-admin";

describe("Component", () => {
  test("knows basic addition", () => {
    const add = 1 + 2;
    expect(add).toBe(3);
  });

  it("can read database", async () => {
    const app = admin.initializeApp({
      projectId: "es-alimento",
      databaseURL: "http://localhost:9000/?ns=es-alimento",
    });
    const db = app.database();
    console.log(db.ref("backup/clients"));
    const testRef = db.ref("backup/clients");
    await firebase.assertSucceeds(testRef.once("value"));
  });
});

import { initializeApp } from "firebase";
import { save } from "./../../src/firebase";

describe("Component", () => {
  test("knows basic addition", () => {
    const add = 1 + 2;
    expect(add).toBe(3);
  });

  it("can read database", async () => {
    let config = {
      projectId: "es-alimento",
      databaseURL: "http://localhost:9000/?ns=es-alimento",
    };
    const app = initializeApp(config);
    const database = app.database();
    database.ref().set({ bestie: "world!" });
    database
      .ref()
      .once("value")
      .then((snap) => console.log(snap.val()));
  });
});
