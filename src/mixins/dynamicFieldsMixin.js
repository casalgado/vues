import { save, update, getOneWhere } from "@/firebase";
import { cquotes } from "@/alertQuotes";
import moment from "moment";

export const dynamicFieldsMixin = {
  methods: {
    addProduct() {
      let id = this.form.products.length;
      this.form.products.push({
        id: id,
        active: true,
        name: "",
        unitPrice: 1,
        quantity: 1,
        total: 1,
      });
    },
    updateField(payload) {
      this.form.products[payload.id].name = payload.name;
      this.form.products[payload.id].unitPrice = payload.unitPrice;
      this.form.products[payload.id].quantity = payload.quantity;
      this.form.products[payload.id].total = payload.total;
    },
    removeField(payload) {
      this.form.products[payload.id].active = false;
    },

    submit(evt) {
      this.$v.$touch();
      console.log("0");
      evt.preventDefault();
      if (this.$v.$invalid) {
        console.log("invalid");
        this.submitStatus = "ERROR";
      } else {
        let quote = cquotes[Math.floor(Math.random() * cquotes.length)];
        console.log("1");
        this.$fire({
          title: `"${quote.quote}"`,
          text: `- ${quote.unit}`,
          showCancelButton: true,
        }).then((alertStatus) => {
          console.log("2");
          if (alertStatus.dismiss) {
            console.log("dismiss");
          } else {
            let form = Object.assign({}, this.form);
            let products = this.form.products.filter((e) => e.active == true);

            let total = 0;
            for (let i = 0; i < products.length; i++) {
              delete products[i].id;
              delete products[i].active;
              total += parseInt(products[i].total);
              form.products.push(products[i]);
            }
            form.total = total;
            form.products = products;
            form.date = moment(form.date).format();
            form.deliver = moment(form.deliver).format();
            if (form.client) {
              form.client = form.client.toLowerCase();
            }
            if (form.provider) {
              form.provider = form.provider.toLowerCase();
            }
            if (this.oid === "") {
              save(`${this.path}`, form, this).then((id) => {
                if (this.path == "orders") {
                  // save new client
                  if (!this.options.client.includes(form.client)) {
                    save(
                      `clients`,
                      {
                        name: form.client.toLowerCase(),
                        birthday: "",
                        since: moment().format(),
                      },
                      this
                    ).then((cid) => {
                      update("clients/" + cid + "/history", {
                        [id]: {
                          date: form.date,
                          products: form.products,
                        },
                      });
                    });
                  }
                  // add client to optionsForMenus list
                  update("optionsForMenus/clients", {
                    [id]: { name: form.client },
                  });
                  // update client order history
                  getOneWhere("clients", "name", form.client).then((obj) => {
                    if (obj) {
                      let ck = obj.id;
                      update("clients/" + ck + "/history", {
                        [id]: {
                          date: form.date,
                          products: form.products,
                        },
                      });
                    }
                  });
                  this.reset();
                } else if (this.path == "expenses") {
                  form.provider = form.provider.toLowerCase();
                  // add provider to optionsForMenus list
                  update("optionsForMenus/providers", {
                    [id]: { name: form.provider },
                  });
                  // update provider order history
                  getOneWhere("providers", "name", form.provider).then(
                    (obj) => {
                      if (!obj) {
                        console.log("new p");

                        save(
                          `/providers`,
                          { name: this.form.provider },
                          this
                        ).then((ck) => {
                          console.log(ck);
                          update("providers/" + ck + "/history", {
                            [id]: {
                              date: form.date,
                              products: form.products,
                            },
                          });
                        });
                      }
                      console.log("old p");
                      console.log(obj.id);
                      let ck = obj.id;
                      update("providers/" + ck + "/history", {
                        [id]: {
                          date: form.date,
                          products: form.products,
                        },
                      });
                    }
                  );
                  this.reset();
                }
                // this.$router.push({ path: "/" });
              });
            } else {
              if (form.paid !== "") {
                form.paid = moment(form.paid).format();
              }
              update(`${this.path}/${this.oid}`, form, this.oid).then((id) => {
                if (this.path == "orders") {
                  // update client order history
                  getOneWhere("clients", "name", form.client).then((obj) => {
                    let ck = obj.id;
                    update("clients/" + ck + "/history", {
                      [id]: {
                        date: form.date,
                        products: form.products,
                      },
                    });
                  });
                  this.reset();
                } else if (this.path == "expenses") {
                  // update provider order history
                  getOneWhere("providers", "name", form.provider).then(
                    (obj) => {
                      let ck = obj.id;
                      update("providers/" + ck + "/history", {
                        [id]: {
                          date: form.date,
                          products: form.products,
                        },
                      });
                    }
                  );
                  this.reset();
                }
              });
            }
          }
        });
      }
    },
  },
};
