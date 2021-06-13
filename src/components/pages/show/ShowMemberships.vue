<template>
  <div>
    <h6 id="title">Calendario Membresias</h6>
    <table id="calendario">
      <tr>
        <th>cliente</th>
        <th>{{ weeksFromTodayString(0) }}</th>
        <th>{{ weeksFromTodayString(1) }}</th>
        <th>{{ weeksFromTodayString(2) }}</th>
        <th>{{ weeksFromTodayString(3) }}</th>
        <th>{{ weeksFromTodayString(4) }}</th>
      </tr>
      <tr v-for="member in mockMemberships" :key="member.clientId">
        <td>{{ member.clientName }}</td>
        <td>
          <p
            v-for="p in productsForTheWeekForClient(0, member.clientId)"
            :key="p.name"
          >
            {{ p.quantity }} {{ p.name }}
          </p>
        </td>
        <td>
          <p
            v-for="p in productsForTheWeekForClient(1, member.clientId)"
            :key="p.name"
          >
            {{ p.quantity }} {{ p.name }}
          </p>
        </td>
        <td>
          <p
            v-for="p in productsForTheWeekForClient(2, member.clientId)"
            :key="p.name"
          >
            {{ p.quantity }} {{ p.name }}
          </p>
        </td>
        <td>
          <p
            v-for="p in productsForTheWeekForClient(3, member.clientId)"
            :key="p.name"
          >
            {{ p.quantity }} {{ p.name }}
          </p>
        </td>
        <td>
          <p
            v-for="p in productsForTheWeekForClient(4, member.clientId)"
            :key="p.name"
          >
            {{ p.quantity }} {{ p.name }}
          </p>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import moment from "moment";
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
          plan: {
            w1: [{ name: "pan de zaatar", quantity: "1" }],
          },
        },
      ],
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
    productsForTheWeekForClient(weeksFromToday, id) {
      const membership = this.mockMemberships.filter(
        (e) => e.clientId == id
      )[0];
      const range = Object.keys(membership.plan).length;
      console.log(range);
      const relativeWeek =
        ((this.weeksSinceAbsoluteStartDate() -
          this.weeksSinceAbsoluteStartDate(membership.startDate) +
          weeksFromToday) %
          range) +
        1;
      return membership.plan[`w${relativeWeek}`];
    },
    weeksSinceAbsoluteStartDate(date = moment("2021-06-24")) {
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
};
</script>

<style scoped>
table {
  margin: 0 auto;
}

#calendario > tr > td > p {
  margin: 0px;
  text-align: left;
}

#calendario > tr {
  border-bottom: 1px solid var(--color-neutral);
}

#calendario > tr:last-child {
  border-top: 1px solid var(--color-neutral);
}

#calendario > tr > td {
  padding: 10px;
  border-left: 1px solid var(--color-neutral);
}

#calendario > tr > td:last-child {
  border-right: 1px solid var(--color-neutral);
}

th {
  padding: 15px;
}
</style>