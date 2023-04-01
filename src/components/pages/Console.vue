<template>
  <div>
    <button class="btn btn-info" @click="getTotalSalesByMonth">
      Venta por b2b/b2c
    </button>
    <button class="btn btn-info" @click="getNewClientsByMonth">
      Clientes nuevos por mes
    </button>

    <button class="btn btn-info" @click="getSalesByProduct">
      B2C por producto
      <!-- grandes tamaños combinan original e integral -->
    </button>

    <button class="btn btn-info" @click="activeClients">
      clientes activos
    </button>

    {{ b2bclients }}
  </div>
</template>
<script>
import { ref } from "@/firebaseInit";
import { getAll, update, getAllWhere } from "@/firebaseMethods";
import product_codes from "../../lib/product_codes";
import { b2bClients } from "../../lib/b2bclients";
import moment from "moment";
export default {
  name: "Console",
  data() {
    return {
      products: [],
      orders: [],
      b2bclients: b2bClients,
      flavorCodes: {
        "0101": "original",
        "0102": "integral",
        "0103": "queso",
        "0104": "zaatar",
        "0105": "uva",
        "0106": "banano",
        "0107": "semillas",
        "0108": "ajonjoli",
        "0109": "chocolate",
        "0110": "pimienta",
        "0111": "zanahoria",
        "0113": "aceituna",
      },
    };
  },
  methods: {
    addProductCodesToProducts: function () {
      getAll(ref, "products").then((e) => {
        this.products = e;
        for (let i = 0; i < e.length; i++) {
          console.log(e[i]);
          let code;
          let product_object = product_codes.filter(
            (element) => element.name == e[i].name
          )[0];
          if (product_object) {
            code = product_object.codigo;
            update(ref, `products/${e[i].id}`, { code: code });
          }
        }
      });
    },
    addProductCodesToProductsinMemberships: function () {
      getAll(ref, "memberships").then((e) => {
        for (let i = 0; i < e.length; i++) {
          const m = e[i];
          console.log(e[i].id);
          let orders = Object.keys(m.plan);
          for (let j = 0; j < orders.length; j++) {
            const products = m.plan[orders[j]];
            for (let k = 0; k < products.length; k++) {
              let code;
              let product_object = product_codes.filter(
                (element) => element.name == products[k].name
              )[0];
              console.log(product_object);
              if (product_object) {
                code = product_object.codigo;
              } else {
                this.products.push(products[k].name);
                code = "";
              }
              products[k].code = code;
            }
          }
          console.log(m.plan);
          update(ref, `memberships/${m.id}`, { plan: m.plan });
        }
        // this.products = e;
        // for (let i = 0; i < e.length; i++) {
        //   console.log(e[i]);
        //   let code;
        //   let product_object = product_codes.filter(
        //     (element) => element.name == e[i].name
        //   )[0];
        //   if (product_object) {
        //     code = product_object.codigo;
        //     update(ref, `products/${e[i].id}`, { code: code });
        //   }
        // }
      });
    },
    addProductCodesToOrders: function () {
      let oliveBreads = [
        "integral pan de aceituna pequeño",
        "integral pan de aceituna mediano",
        "integral pan de aceituna grande",
        "pan grande aceituna",
        "pan mediano aceituna",
        "pan pequeño aceituna",
      ];
      let count = 0;
      console.log(oliveBreads);
      getAll(ref, "orders").then((e) => {
        this.orders = e;
        for (let i = 0; i < e.length; i++) {
          let containsOliveBread = false;
          let products = e[i].products;
          //console.log(e[i]);
          for (let k = 0; k < products.length; k++) {
            if (oliveBreads.includes(products[k].name)) {
              containsOliveBread = true;
            }
            let code;
            let product_object = product_codes.filter(
              (element) => element.name == products[k].name
            )[0];
            //if (containsOliveBread) console.log("***", product_object);
            //console.log(product_object);
            if (product_object) {
              code = product_object.codigo;
            } else {
              this.products.push(products[k].name);
              code = "";
            }
            products[k].code = code;
          }
          if (containsOliveBread) {
            count++;
            console.log(e[i].id);
            // console.log({
            //   products: products,
            // });

            update(ref, `orders/${e[i].id}`, { products: products });
          }
        }
        console.log(count, "orders modified");
      });
    },
    addProductCodesToProductsinElDiario: function () {
      getAllWhere(ref, "orders", "client", "el diario cafe").then((e) => {
        for (let i = 0; i < e.length; i++) {
          let products = e[i].products;
          for (let k = 0; k < products.length; k++) {
            let code;
            let product_object = product_codes.filter(
              (element) => element.name == products[k].name
            )[0];
            if (product_object) {
              code = product_object.codigo;
            } else {
              this.products.push(products[k].name);
              code = "";
            }
            products[k].code = code;
          }
          console.log(products);
          update(ref, `orders/${e[i].id}`, { products: products });
        }
      });
    },
    encryptClientNames: function () {
      // getAll(ref, "clients").then((e) => {
      //   for (let i = 0; i < e.length; i++) {
      //     update(ref, `clients/${e[i].id}`, { name: this.encrypt(e[i].name) });
      //   }
      // });
      // let clients_each_name;
      // getAll(ref, "memberships").then((e) => {
      //   for (let i = 0; i < e.length; i++) {
      //     update(ref, `memberships/${e[i].id}`, {
      //       clientName: this.encrypt(e[i].clientName),
      //     });
      //   }
      // });
      // getAll(ref, "orders").then((e) => {
      //   for (let i = 0; i < e.length; i++) {
      //     update(ref, `orders/${e[i].id}`, {
      //       client: this.encrypt(e[i].client),
      //     });
      //   }
      // });
      // getAll(ref, "optionsForMenus/clients").then((e) => {
      //   for (let i = 0; i < e.length; i++) {
      //     console.log(`optionsForMenus/clients/${e[i].name}`);
      //     update(ref, `optionsForMenus/clients/${e[i].id}`, {
      //       name: this.encrypt(e[i].name),
      //     });
      //   }
      // });
      // let memberships_each_clientName;
      // let optionsForMenus_clients_each_name;
      // let orders_each_client;
    },
    encrypt: function (str) {
      var alphabet = [
        "k",
        "n",
        "y",
        "e",
        "i",
        "z",
        "a",
        "p",
        "g",
        "ú",
        "v",
        "j",
        "h",
        "á",
        "l",
        "s",
        "u",
        "ñ",
        "é",
        "t",
        "f",
        "r",
        "q",
        "w",
        "c",
        "d",
        "m",
        "o",
        "b",
        "í",
        "x",
        "ó",
      ];
      let result = [];
      for (let i = 0; i < str.length; i++) {
        for (let j = 0; j < alphabet.length; j++) {
          if (str[i] === alphabet[j]) {
            result.push(alphabet[(j + 9) % alphabet.length]);
          }
        }
      }

      return result.join("");
    },
    getTotalSalesByMonth: function () {
      console.log("called");
      let report = {};
      getAll(ref, "orders").then((e) => {
        e.forEach((order) => {
          if (order.total > 0) {
            let yearstring = order.date.split("T")[0].split("-")[0];
            let monthstring = order.date.split("T")[0].split("-")[1];
            let clientType = this.b2bclients.includes(order.client)
              ? "b2b"
              : "b2c";

            if (report[yearstring] == undefined) {
              console.log("year");
              report[yearstring] = {};
            }

            if (report[yearstring][monthstring] == undefined) {
              console.log("month");
              report[yearstring][monthstring] = {
                b2c: 0,
                b2b: 0,
                all: 0,
                b2cQty: 0,
                b2bQty: 0,
              };
            }

            if (clientType == "b2b") {
              report[yearstring][monthstring].b2b += order.total;
              report[yearstring][monthstring].b2bQty++;
            } else {
              report[yearstring][monthstring].b2c += order.total;
              report[yearstring][monthstring].b2cQty++;
            }
            report[yearstring][monthstring].all += order.total;
          }
        });
        let rows = [
          [
            "mes",
            "b2c",
            "cantitad b2c",
            "ticket b2c",
            "b2b",
            "cantidad b2b",
            "ticket b2b",
            "b2c%",
            "b2b%",
            "total",
          ],
        ];
        Object.keys(report).forEach((year) => {
          Object.keys(report[year]).forEach((month) => {
            console.log(`${year}-${month}`);
            rows.push([
              `${year}-${month}`,
              report[year][month]["b2c"],
              report[year][month]["b2cQty"],
              parseInt(report[year][month]["b2c"]) /
                parseInt(report[year][month]["b2cQty"]),
              report[year][month]["b2b"],
              report[year][month]["b2bQty"],
              parseInt(report[year][month]["b2b"]) /
                parseInt(report[year][month]["b2bQty"]),
              report[year][month]["b2c"] / report[year][month]["all"],
              report[year][month]["b2b"] / report[year][month]["all"],
              report[year][month]["all"],
            ]);
          });
        });

        console.log(rows);
        this.downloadCSV(rows, "venta total");
      });
    },
    activeClients: function () {
      let years = ["2019", "2020", "2021", "2022"];
      const theshold = 3;

      return new Promise((resolve) => {
        ref
          .child("clients")
          .orderByChild("since")
          .on("value", (snap) => {
            let objects = [];
            snap.forEach((csnap) => {
              let key = csnap.key;
              let data = csnap.val();
              data.id = key;
              objects.push(data);
            });
            resolve(objects);
          });
      }).then((c) => {
        let clients = c.filter((e) => !this.b2bclients.includes(e.name));
        console.log(clients);
        let currentMonth = "";
        let months = [];

        // get months
        years.forEach((year) => {
          for (let i = 1; i < 13; i++) {
            currentMonth = `${year}-${i}`;
            months.push(moment(currentMonth).format());
          }
        });
        // get total and active clients per month
        const report = {};
        months.forEach((month) => {
          console.log("-----------");
          console.log(month);
          report[month] = { active: 0, total: 0 };
          clients.forEach((client) => {
            if (client.since < month) {
              if (client.history) {
                // relative value based on current month
                const lastOrderDate = Object.values(client.history)
                  .map((e) => e.date)
                  .filter((e) => e <= month)
                  .sort()
                  .reverse()[0];
                const cutoff = moment(month)
                  .subtract(theshold, "months")
                  .format();
                const isActive = lastOrderDate > cutoff;
                if (isActive) {
                  report[month].active++;
                }
                report[month].total++;
              }
            }
          });
        });
        console.log(report);
        let rows = [["mes", "activos", "total", "%"]];
        Object.keys(report).forEach((date) => {
          let dateString = moment(date)
            .subtract(1, "month")
            .format()
            .substring(0, 7);
          rows.push([
            dateString,
            report[date].active,
            report[date].total,
            report[date].active / report[date].total,
          ]);
        });
        this.downloadCSV(rows, "activos");
      });
    },
    getNewClientsByMonth: function () {
      console.log("called");
      let report = {};
      let accumulated = 0;
      getAll(ref, "clients").then((c) => {
        let clients = c.filter((e) => !this.b2bclients.includes(e.name));
        clients.forEach((client) => {
          if (client.history) {
            let year = client.since.split("T")[0].split("-")[0];
            let month = client.since.split("T")[0].split("-")[1];
            let since = `${year}-${month}`;
            if (report[since] == undefined) {
              report[since] = { current: 0 };
            }
            report[since].current += 1;
            accumulated += 1;
            report[since].accumulated = accumulated;
          }
        });
        // below is to determine how many active clients per month
        // active clients means they ordered at least once in the past 3 months

        console.log(report);
        let rows = [["mes", "nuevos clientes", "acumulado"]];
        Object.keys(report).forEach((date) => {
          rows.push([date, report[date].current, report[date].accumulated]);
        });

        this.downloadCSV(rows, "clientes");
      });
      console.log("end");
    },
    getSalesByProduct: function () {
      return new Promise((resolve) => {
        ref
          .child("orders")
          .orderByChild("date")
          .on("value", (snap) => {
            let objects = [];
            snap.forEach((csnap) => {
              let key = csnap.key;
              let data = csnap.val();
              data.id = key;
              objects.push(data);
            });
            resolve(objects);
          });
      }).then((e) => {
        let report = {};
        e.forEach((order) => {
          if (order.total > 0 && !this.b2bclients.includes(order.client)) {
            let year = order.date.split("T")[0].split("-")[0];
            let month = order.date.split("T")[0].split("-")[1];
            let date = `${year}-${month}`;
            if (report[date] == undefined) {
              report[date] = {};
            }
            order.products.forEach((p) => {
              if (p.code) {
                let productType = p.code.substring(0, 2);
                if (productType == "01") {
                  let flavorCode = p.code.substring(0, 4);
                  let flourCode = p.code.substring(4, 5);
                  let sizeCode = p.code.substring(5, 6);
                  if (report[date][flavorCode] == undefined) {
                    report[date][flavorCode] = {
                      name: p.name,
                      flour: {
                        1: 0,
                        2: 0,
                      },
                      size: {
                        0: 0,
                        1: 0,
                        2: 0,
                        3: 0,
                      },
                    };
                  }
                  report[date][flavorCode]["size"][sizeCode] += parseInt(
                    p.total
                  );
                  report[date][flavorCode]["flour"][flourCode] += parseInt(
                    p.quantity
                  );
                }
              }
            });
          }
        });
        console.log(report);
        // at this point, report has been created with all pertinent data.
        // what follows is the organization of that data in two reports, a detailed one and a summarized one
        // first step is to create the first row of each of the reports
        let detailed = ["mes"];
        let summarized = ["mes"];
        Object.keys(this.flavorCodes).forEach((code) => {
          let name = this.flavorCodes[code];
          detailed.push([
            `${name}-tot`,
            `${name}-min`,
            `${name}-peq`,
            `${name}-med`,
            `${name}-gra`,
            `${name}-bla`,
            `${name}-int`,
          ]);
          summarized.push(name);
        });

        let detailedReport = [];
        let summarizedReport = [];
        detailedReport.push(detailed.flat());
        summarizedReport.push(summarized.flat());

        // now we have to populate array with the data for each month
        Object.keys(report).forEach((month) => {
          let detailedRow = [month];
          let summarizedRow = [month];
          let monthValues = report[month];

          // add zeroes for empty products in month
          Object.keys(this.flavorCodes)
            .sort()
            .forEach((code) => {
              if (monthValues[code] == undefined) {
                monthValues[code] = {
                  flour: {
                    1: 0,
                    2: 0,
                  },
                  size: {
                    0: 0,
                    1: 0,
                    2: 0,
                    3: 0,
                  },
                };
              }
            });

          // add data to row for each product
          Object.keys(this.flavorCodes)
            .sort()
            .forEach((code) => {
              let sizes = monthValues[code]["size"];
              let total = sizes[0] + sizes[1] + sizes[2] + sizes[3];
              detailedRow.push([
                total,
                sizes[0],
                sizes[1],
                sizes[2],
                sizes[3],
                monthValues[code]["flour"][1],
                monthValues[code]["flour"][2],
              ]);
              summarizedRow.push(total);
            });
          console.log(".");
          detailedReport.push(detailedRow.flat());
          summarizedReport.push(summarizedRow.flat());
        });

        this.downloadCSV(detailedReport, "productos-detalle");
        this.downloadCSV(summarizedReport, "productos-resumen");
      });
    },
    downloadCSV: function (arrayOfArrays, name) {
      console.log(arrayOfArrays);
      var csv = "";
      arrayOfArrays.forEach(function (row) {
        csv += row.join(",");
        csv += "\n";
      });
      var hiddenElement = document.createElement("a");
      hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
      hiddenElement.target = "_blank";
      hiddenElement.download = `${name}.csv`;
      hiddenElement.click();
    },
  },
  mounted() {},
};
</script>
<style scoped>
button {
  margin: 15px;
}
</style>
