<template>
  <div id="client-snippet">
    <p>{{ this.name }}</p>
    <p>{{ this.phone }}</p>
    <p>{{ this.address }}</p>
    <p>{{ this.birthday }}</p>
  </div>
</template>
<script>
import { getById, getOneWhere } from "@/firebase";
import moment from "moment";
export default {
  name: "ClientSnippet",
  props: {
    oid: String,
  },
  data() {
    return {
      name: "",
      address: "",
      phone: "",
      birthday: "",
    };
  },
  mounted() {
    getById("orders", this.oid).then((order) => {
      console.log(order);
      getOneWhere("clients", "name", order.client).then((client) => {
        if (client.birthday) {
          client.birthday = moment(client.birthday).format("MMMM DD");
        }
        this.name = client.name;
        this.address = client.address;
        this.phone = client.phone;
        this.birthday = client.birthday;
      });
    });
  },
};
</script>
<style scoped>
#client-snippet {
  padding-top: 15px;
}

#client-snippet p {
  margin-bottom: 2px;
}
</style>
