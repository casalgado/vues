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
      if (this.$v.$invalid) {
        console.log("invalid");
        this.submitStatus = "ERROR";
      } else {
        if (confirm("continuar?")) {
          evt.preventDefault();
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
            save(`${this.path}`, form).then((id) => {
              if (this.path == "orders") {
                // add client to optionsForMenus list
                update("optionsForMenus/clients", {
                  [id]: { name: form.client },
                });
                // update client order history
                getOneWhere("clients", "name", form.client).then((objs) => {
                  let ck = objs[0].id;
                  update("clients/" + ck + "/history", {
                    [id]: {
                      date: form.date,
                      products: form.products,
                    },
                  });
                });
              } else if (this.path == "expenses") {
                // add provider to optionsForMenus list
                update("optionsForMenus/providers", {
                  [id]: { name: form.provider },
                });
                // update provider order history
                getOneWhere("providers", "name", form.provider).then((objs) => {
                  let ck = objs[0].id;
                  update("providers/" + ck + "/history", {
                    [id]: {
                      date: form.date,
                      products: form.products,
                    },
                  });
                });
              }
              // this.$router.push({ path: "/" });
            });
          } else {
            update(`${this.path}/${this.oid}`, form, this.oid).then((id) => {
              if (this.path == "orders") {
                // update client order history
                getOneWhere("clients", "name", form.client).then((objs) => {
                  let ck = objs[0].id;
                  update("clients/" + ck + "/history", {
                    [id]: {
                      date: form.date,
                      products: form.products,
                    },
                  });
                });
              } else if (this.path == "expenses") {
                // update provider order history
                getOneWhere("providers", "name", form.provider).then((objs) => {
                  let ck = objs[0].id;
                  update("providers/" + ck + "/history", {
                    [id]: {
                      date: form.date,
                      products: form.products,
                    },
                  });
                });
              }
            });
          }
          // this.$router.push({ path: "/" });
        } else {
          console.log("out");
          evt.preventDefault();
        }
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
