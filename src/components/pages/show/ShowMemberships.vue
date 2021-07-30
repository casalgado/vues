<template>
  <div>
    <h6 id="title">Calendario Membresias</h6>
    <table id="calendario">
      <thead>
        <tr>
          <th>cliente</th>
          <th>{{ weeksFromTodayString(0) }}</th>
          <th>{{ weeksFromTodayString(1) }}</th>
          <th>{{ weeksFromTodayString(2) }}</th>
          <th>{{ weeksFromTodayString(3) }}</th>
          <th>{{ weeksFromTodayString(4) }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="member in memberships" :key="member.id">
          <td>{{ member.clientName }}</td>
          <td>
            <p>{{ dayOfTheWeekForClient(0, member.id) }}</p>
            <p
              v-for="p in productsForTheWeekForClient(0, member.id)"
              :key="p.name"
            >
              {{ p.quantity }} {{ p.name }}
            </p>
          </td>
          <td>
            <p>{{ dayOfTheWeekForClient(1, member.id) }}</p>
            <p
              v-for="p in productsForTheWeekForClient(1, member.id)"
              :key="p.name"
            >
              {{ p.quantity }} {{ p.name }}
            </p>
          </td>
          <td>
            <p>{{ dayOfTheWeekForClient(2, member.id) }}</p>
            <p
              v-for="p in productsForTheWeekForClient(2, member.id)"
              :key="p.name"
            >
              {{ p.quantity }} {{ p.name }}
            </p>
          </td>
          <td>
            <p>{{ dayOfTheWeekForClient(3, member.id) }}</p>
            <p
              v-for="p in productsForTheWeekForClient(3, member.id)"
              :key="p.name"
            >
              {{ p.quantity }} {{ p.name }}
            </p>
          </td>
          <td>
            <p>{{ dayOfTheWeekForClient(4, member.id) }}</p>
            <p
              v-for="p in productsForTheWeekForClient(4, member.id)"
              :key="p.name"
            >
              {{ p.quantity }} {{ p.name }}
            </p>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td></td>
          <td>
            <b-button
              variant="info"
              class="createProductsForWeekButton"
              @click="CreateProductsForWeek(0)"
            >
              Crear Pedidos</b-button
            >
          </td>
          <td>
            <b-button
              variant="info"
              class="createProductsForWeekButton"
              @click="CreateProductsForWeek(1)"
            >
              Crear Pedidos</b-button
            >
          </td>
          <td>
            <b-button
              variant="info"
              class="createProductsForWeekButton"
              @click="CreateProductsForWeek(2)"
            >
              Crear Pedidos</b-button
            >
          </td>
          <td>
            <b-button
              variant="info"
              class="createProductsForWeekButton"
              @click="CreateProductsForWeek(3)"
            >
              Crear Pedidos</b-button
            >
          </td>
          <td>
            <b-button
              variant="info"
              class="createProductsForWeekButton"
              @click="CreateProductsForWeek(4)"
            >
              Crear Pedidos</b-button
            >
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import moment from "moment";
import { getAll, update, getOneWhere, save } from "@/firebase";
export default {
  name: "ShowMemberships",
  data() {
    return {
      absoluteStartDate: "2021-06-06",
      mockMemberships: [
        {
          clientId: "-M6xAgG8jSknkjX48g7d",
          clientName: "client 1",
          startDate: "2021-06-06",
          weekdaySelection: {
            w1: 2,
            w2: 2,
            w3: 2,
          },
          plan: {
            w1: [
              { name: "pan original", quantity: "1" },
              { name: "pan integral de semillas", quantity: "1" },
            ],
            w2: [
              { name: "pan original", quantity: "1" },
              { name: "pan integral de zaatar", quantity: "1" },
            ],
            w3: [{ name: "pan original", quantity: "1" }],
          },
        },
        {
          clientId: "-M6xAgGBzMQCZUr9m8zj",
          clientName: "client 2",
          startDate: "2021-06-13",
          weekdaySelection: {
            w1: 1,
            w2: null,
            w3: 5,
          },
          plan: {
            w1: [
              { name: "pan original sin avena", quantity: "1" },
              { name: "pan de chocolate", quantity: "1" },
            ],
            w2: [],
            w3: [{ name: "pan de masa madre mediano", quantity: "1" }],
            w4: [],
          },
        },
        {
          clientId: "-MZdFk171FcKoxDBZflS",
          clientName: "client 3",
          startDate: "2021-06-20",
          weekdaySelection: {
            w1: 1,
          },
          plan: {
            w1: [{ name: "pan de masa madre mediano", quantity: "1" }],
            w2: [{ name: "pan de masa madre mediano", quantity: "1" }],
            w3: [{ name: "pan de masa madre mediano", quantity: "1" }],
            w4: [{ name: "pan de masa madre mediano", quantity: "1" }],
          },
        },
        {
          clientId: "-M6xAgGIh0auEJ7Ufq0Y",
          clientName: "client 4",
          startDate: "2021-06-24",
          weekdaySelection: {
            w1: 1,
          },
          plan: {
            w1: [{ name: "pan de zaatar", quantity: "1" }],
          },
        },
      ],
      memberships: [],
    };
  },
  methods: {
    weeksFromTodayString(num) {
      return `${moment()
        .add(num, "week")
        .startOf("week")
        .format("DD")}  -  ${moment()
        .add(num, "week")
        .endOf("week")
        .format("DD MMM")}`;
    },
    dayOfTheWeekForClient(weeksFromToday, id) {
      const membership = this.getMembershipById(id);
      const relativeWeek = this.relativeWeek(weeksFromToday, id);
      return this.weekdayBasedOnRelativeWeek(
        membership.weekdaySelection[relativeWeek]
      );
    },
    weekdayBasedOnRelativeWeek(weekday) {
      return [
        null,
        "lunes",
        "martes",
        "miercoles",
        "jueves",
        "viernes",
        "sabado",
      ][weekday];
    },
    getMembershipById(id) {
      return this.memberships.filter((e) => e.id == id)[0];
    },
    relativeWeek(weeksFromToday, id) {
      /* this method takes in the member id, the number of weeks from today,
      it returns a string of the type w1, w2, w3. This corresponds to the 
      'relative' week we are in, in terms of the clients membership */
      const membership = this.getMembershipById(id);
      const range = Object.keys(membership.weekdaySelection).length;
      return `w${
        ((this.weeksSinceAbsoluteStartDate() -
          this.weeksSinceAbsoluteStartDate(membership.startDate) +
          weeksFromToday) %
          range) +
        1
      }`;
    },
    productsForTheWeekForClient(weeksFromToday, id) {
      const membership = this.getMembershipById(id);
      // console.log(range);
      const relativeWeek = this.relativeWeek(weeksFromToday, id);
      return membership.plan[relativeWeek];
    },
    getOrderDate(weeksFromToday, membership) {
      let relativeWeek = this.relativeWeek(weeksFromToday, membership.id);
      return moment()
        .startOf("week")
        .add(weeksFromToday, "week")
        .add(membership.weekdaySelection[relativeWeek], "day")
        .format();
    },
    CreateProductsForWeek(weeksFromToday) {
      let orders = [];
      for (let i = 0; i < this.memberships.length; i++) {
        const membership = this.memberships[i];
        console.log(membership.clientName);
        let products = this.productsForTheWeekForClient(
          weeksFromToday,
          membership.id
        );
        if (products) {
          let total = 0;
          for (let i = 0; i < products.length; i++) {
            delete products[i].id;
            delete products[i].active;
            total += parseInt(products[i].total);
          }
          let date = this.getOrderDate(weeksFromToday, membership);
          let order = {
            client: membership.clientName,
            date: date,
            dateCreated: "",
            deliver: "",
            paid: "",
            comment: "membresia",
            paymentMethod: "transferencia",
            products: products,
            sameDayDelivery: "",
            total: total,
          };
          orders.push(order);
        }
      }
      for (let i = 0; i < orders.length; i++) {
        save("orders", orders[i]).then((orderId) => {
          getOneWhere("clients", "name", orders[i].client).then((obj) => {
            if (obj) {
              let ck = obj.id;
              update("clients/" + ck + "/history", {
                [orderId]: {
                  date: orders[i].date,
                  products: orders[i].products,
                },
              });
            }
          });
        });
      }
    },

    weeksSinceAbsoluteStartDate(date = moment(this.absoluteStartDate)) {
      /* 
        The weeksSinceAbsoluteStartDate helps keep track of what products to make each week.
        It starts counting weeks from an absolute start date.
        This counter increases by one per week. 
        Each member has a starting week for their membership.
        Using the starting week, and the current week, we can know what products to make. 
      */
      const yearDelta =
        moment(date).year() - moment(this.absoluteStartDate).year();
      return (
        moment(date).week() +
        yearDelta * 52 -
        moment(this.absoluteStartDate).week()
      );
    },
  },
  mounted() {
    getAll("memberships").then((memberships) => {
      this.memberships = memberships;
    });
  },
};
</script>

<style scoped>
table {
  margin: 0 auto;
}

#calendario > tbody > tr > td > p {
  margin: 0px;
  text-align: left;
}

#calendario > tbody > tr {
  border-bottom: 1px solid var(--color-neutral);
}

#calendario > tbody > tr:first-child {
  border-top: 1px solid var(--color-neutral);
}

#calendario > tbody > tr > td {
  padding: 10px;
  border-left: 1px solid var(--color-neutral);
}

#calendario > tbody > tr > td:last-child {
  border-right: 1px solid var(--color-neutral);
}

th {
  padding: 15px;
}
</style>