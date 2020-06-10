import moment from "moment";
import numeral from "numeral";

// change name to formatProducts mixin
export const ordersMixin = {
  methods: {
    format: function(objects) {
      let items = objects.map((e) => {
        let clone = [...e.products];
        e.products = e.products.map((e) => e.name);
        e.quantity = clone.map((e) => e.quantity);
        for (let i = 0; i < e.products.length; i++) {
          e.products[i] = `${e.quantity[i]}  ${e.products[i]}`;
        }
        e.products = e.products.join("<br />");
        e.date = moment(e.date).format("MM/DD");
        if (e.total >= 1000000) {
          e.total =
            numeral(e.total)
              .divide(1000)
              .format("0,0") + "k";
        } else if (e.total % 1000 == "0") {
          e.total = numeral(e.total).format("0,0a");
        } else {
          e.total =
            numeral(e.total)
              .divide(1000)
              .format("0.0") + "k";
        }
        if (e.paid == "") {
          // refator
          e.paid = "";
        } else {
          e.paid = moment(e.paid).format("MM/DD");
        }
        return e;
      });
      return items;
    },
  },
};
