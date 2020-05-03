import { save } from "@/firebase";
import moment from "moment";

export const dynamicFieldsMixin = {
  methods: {
    add() {
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
    update(payload) {
      console.log(payload.name);
      this.form.products[payload.id].name = payload.name;
      this.form.products[payload.id].unitPrice = payload.unitPrice;
      this.form.products[payload.id].quantity = payload.quantity;
      this.form.products[payload.id].total = payload.total;
    },
    remove(payload) {
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

          if (this.object.empty) {
            save(`${this.ref}/${this.path}`, form).then(() => {
              // this.$router.push({ path: "/" });
            });
          } else {
            save(`${this.ref}/${this.path}/${this.object.id}`, form).then(
              () => {
                // this.$router.push({ path: "/" });
              }
            );
          }
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
