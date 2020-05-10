import { save, update, getOneWhere } from "@/firebase";
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
        console.log("1");
        this.$fire({
          text: "¿continuar?",
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
              total += products[i].total;
              form.products.push(products[i]);
            }
            form.total = total;
            form.products = products;
            form.date = moment(form.date).format();
            form.delivered = moment(form.delivered).format();

            if (this.oid === "") {
              save(`${this.path}`, form, this).then((id) => {
                if (this.path == "orders") {
                  // save new client
                  if (!this.options.client.includes(this.form.client)) {
                    save(
                      `clients`,
                      { name: this.form.client, birthday: "" },
                      this
                    );
                  }
                  // add client to optionsForMenus list
                  update("optionsForMenus/clients", {
                    [id]: { name: form.client },
                  });
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
                  this.$router.push({ name: "ShowOrders" });
                } else if (this.path == "expenses") {
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
                  this.$router.push({ name: "ShowExpenses" });
                }
                // this.$router.push({ path: "/" });
              });
            } else {
              form.paid = moment(form.paid).format();
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
                  this.$router.push({ name: "ShowOrders" });
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
                  this.$router.push({ name: "ShowExpenses" });
                }
              });
            }
          }
        });
      }
    },
    reset(evt) {
      if (evt) {
        evt.preventDefault();
      }
      this.form = {
        client: "",
        date: "",
        delivered: "",
        paid: "",
        products: [
          {
            id: 0,
            active: true,
            name: "",
            unitPrice: 1,
            quantity: 1,
            total: 1,
          },
        ],
      };
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
