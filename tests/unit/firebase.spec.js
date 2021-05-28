const firebase = require("@firebase/testing"); //<--- You want this to be the top guy!!!
const admin = require("firebase-admin");
const mockdata = require("./mockdata");
import {
  save,
  getAll,
  getOneWhere,
  getAllWhere,
  getAllOrdersWhereProduct,
  getById,
  getByDateRange,
  getClientListWithMostUsedFirst,
} from "./../../src/firebaseMethods";
import moment from "moment";

const projectId = "es-alimento";
process.env.GCLOUD_PROJECT = projectId;
process.env.FIRESTORE_EMULATOR_HOST = "localhost:8080";
let app = admin.initializeApp({
  projectId: projectId,
  databaseURL: "http://localhost:9000/?ns=es-alimento",
});
let database = firebase.database(app);
moment.updateLocale("es", {
  week: {
    dow: 0,
    doy: moment.localeData("es").firstDayOfYear(),
  },
});

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

describe("can save() to database", () => {
  let ref = database.ref();
  let path = "testPath";
  let order;
  let orderKey;
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
});

describe("can getAll() records", () => {
  let ref = database.ref();
  let returns;

  it("gets the correct amount of clients", async () => {
    let path = "clients";
    let numberOfRecords = Object.keys(mockdata.mockdata[path]).length;
    await getAll(ref, path).then((val) => {
      returns = val;
    });
    expect(returns.length).toEqual(numberOfRecords);
  });

  it("gets the correct amount of orders", async () => {
    let path = "orders";
    let numberOfRecords = Object.keys(mockdata.mockdata[path]).length;
    await getAll(ref, path).then((val) => {
      returns = val;
    });
    expect(returns.length).toEqual(numberOfRecords);
  });
});

describe("can getOneWhere() prop matches input", () => {
  let ref = database.ref();
  let returns;

  it("gets correct client", async () => {
    await getOneWhere(ref, "clients", "name", "carlos alberto salgado").then(
      (val) => {
        returns = val;
      }
    );
    expect(returns.name).toEqual("carlos alberto salgado");
  });

  it("gets correct order", async () => {
    await getOneWhere(ref, "orders", "client", "carlos alberto salgado").then(
      (val) => {
        returns = val;
      }
    );
    expect(returns.client).toEqual("carlos alberto salgado");
  });
});

describe("can getAllWhere() prop matches input", () => {
  let ref = database.ref();
  let client = "carlos alberto salgado";
  let orders = mockdata.mockdata.orders;
  let returns;

  it("gets correct orders when given client", async () => {
    let returnedClientOrders = 0;
    let mockbaseClientOrders = 0;

    Object.keys(orders).forEach((k) => {
      if (orders[k].client == client) {
        mockbaseClientOrders += 1;
      }
    });
    await getAllWhere(ref, "orders", "client", client).then((val) => {
      returns = val;
    });
    returns.forEach((e) => {
      if (e.client == client) {
        returnedClientOrders += 1;
      }
    });
    expect(mockbaseClientOrders).toEqual(returnedClientOrders);
  });

  it("gets correct orders when given paid status", async () => {
    let returnedUnpaidOrders = 0;
    let mockbaseUnpaidOrders = 0;

    Object.keys(orders).forEach((k) => {
      if (orders[k].paid == "") {
        mockbaseUnpaidOrders += 1;
      }
    });
    await getAllWhere(ref, "orders", "paid", "").then((val) => {
      returns = val;
    });
    returns.forEach((e) => {
      if (e.paid == "") {
        returnedUnpaidOrders += 1;
      }
    });
    expect(mockbaseUnpaidOrders).toEqual(returnedUnpaidOrders);
  });

  it("gets correct order", async () => {
    await getOneWhere(ref, "orders", "client", "carlos alberto salgado").then(
      (val) => {
        returns = val;
      }
    );
    expect(returns.client).toEqual("carlos alberto salgado");
  });
});

describe("can getAllOrdersWhereProduct()", () => {
  let ref = database.ref();
  let product = "original grande";
  let orders = mockdata.mockdata.orders;
  let returns;

  it("gets all orders for product", async () => {
    let returnedOrders = [];
    let mockbaseOrders = [];
    let totalOrders1 = 0;

    Object.keys(orders).forEach((k) => {
      let order = orders[k];
      let products = order.products;
      for (let i = 0; i < products.length; i++) {
        if (products[i].name == product) {
          mockbaseOrders.push(`${order.client}-${order.date}`);
          totalOrders1 += 1;
          break;
        }
      }
    });
    await getAllOrdersWhereProduct(ref, product).then((val) => {
      returns = val;
    });
    returns.forEach((e) => {
      returnedOrders.push(`${e.client}-${e.date}`);
    });
    expect(returnedOrders).toEqual(mockbaseOrders);
  });
});

describe("can getById()", () => {
  let ref = database.ref();
  let returns;
  it("gets correct client with id", async () => {
    const idClientCarlosAS = "-MTkTG-WCMjSyaFSz3YY";
    const clientCarlosAS = {
      address: "cra 57 # 85 - 85",
      birthday: "",
      category: "",
      cc: "1129573675",
      comment: "",
      dateCreated: "2021-02-17T09:51:01-05:00",
      email: "casalgado86@gmail.com",
      name: "carlos alberto salgado",
      phone: "3155433505",
      since: "2021-02-17T09:51:01-05:00",
    };
    await getById(ref, "clients", idClientCarlosAS).then((val) => {
      returns = val;
    });
    expect(returns).toEqual(clientCarlosAS);
  });

  it("gets correct order with id", async () => {
    const idOrderCarlosAS = "-M6xAbryItLEYxc-_aUZ";
    const orderCarlosAS = {
      client: "carlos alberto salgado",
      comment: "",
      date: "2019-02-04T00:00:00-05:00",
      deliver: "2019-02-05T00:00:00-05:00",
      invoice: "",
      lastModified: "2019-07-23T15:36:42-05:00",
      name: "P235",
      paid: "2019-06-01T21:11:13-05:00",
      products: [
        {
          name: "original grande",
          quantity: 1,
          total: 20000,
          unitPrice: 20000,
        },
      ],
      total: 20000,
    };
    await getById(ref, "orders", idOrderCarlosAS).then((val) => {
      returns = val;
    });
    expect(returns).toEqual(orderCarlosAS);
  });
});

describe("can getByDateRange()", () => {
  let ref = database.ref();
  let returns;
  let date = moment("2021-03-11T00:00:00-05:00");
  it("gets orders from same day", async () => {
    await getByDateRange(ref, "orders", "date", date, "day").then((val) => {
      returns = val;
    });
    let wrong = 0;
    returns.forEach((e) => {
      if (!date.isSame(moment(e.date), "day")) {
        wrong += 1;
      }
    });
    expect(wrong).toBe(0);
  });

  it("gets orders from same week", async () => {
    await getByDateRange(ref, "orders", "date", date, "week").then((val) => {
      returns = val;
    });
    let wrong = 0;
    let start = moment(date.format()).startOf("week");
    let end = moment(date.format()).endOf("week");
    returns.forEach((e) => {
      // this first conditional asks, does the record date land outside of range?
      if (!(moment(e.date).isAfter(start) && moment(e.date).isBefore(end))) {
        wrong += 1;
      }
      // this second conditional asks, is the record date the same as the first date of range?
      if (start.isSame(moment(e.date))) {
        wrong -= 1;
      }
      // we need this conditional for cases that record is same date as start of period.
      // this has to be done like this because for moment, if a date is the same as the startOf date, it does not count it as part of that period.
    });
    expect(wrong).toBe(0);
  });
  //
  it("gets orders from same month", async () => {
    await getByDateRange(ref, "orders", "date", date, "month").then((val) => {
      returns = val;
    });
    let wrong = 0;
    let start = moment(date.format()).startOf("month");
    let end = moment(date.format()).endOf("month");
    returns.forEach((e) => {
      // this first conditional asks, does the record date land outside of range?
      if (!(moment(e.date).isAfter(start) && moment(e.date).isBefore(end))) {
        wrong += 1;
      }
      // this second conditional asks, is the record date the same as the first date of range?
      if (start.isSame(moment(e.date))) {
        wrong -= 1;
      }
      // we need this conditional for cases that record is same date as start of period.
      // this has to be done like this because for moment, if a date is the same as the startOf date, it does not count it as part of that period.
    });
    expect(wrong).toBe(0);
  });
});

describe("getClientListWithMostUsedFirst()", () => {
  let ref = database.ref();
  let returns;
  let size = 20;
  it("gets the correct amount of mostUsed", async () => {
    let returnedSize = 0;
    await getClientListWithMostUsedFirst(ref, size).then((val) => {
      returns = val;
    });
    for (let i = 0; i < returns.length; i++) {
      if (returns[i].value) {
        break;
      }
      returnedSize += 1;
    }
    expect(returnedSize).toEqual(size);
  });
});
