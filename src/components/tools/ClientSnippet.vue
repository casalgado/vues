<template>
  <div id="client-snippet">
    <p>
      <img src="../../assets/icons_name.svg" class="icon" /> {{ this.name }}
    </p>
    <p>
      <img src="../../assets/icons_phone.svg" class="icon" /> {{ this.phone }}
    </p>
    <p>
      <img src="../../assets/icons_address.svg" class="icon" />
      {{ this.address }}
    </p>
    <p>
      <img src="../../assets/icons_birthday.svg" class="icon" />
      {{ this.birthday }}
    </p>
    <p>
      <img src="../../assets/icons_email.svg" class="icon" /> {{ this.email }}
    </p>
    <p>
      <img src="../../assets/icons_comment.svg" class="icon" />
      {{ this.comment }}
    </p>
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
      email: "",
      comment: "",
    };
  },
  mounted() {
    getById("orders", this.oid).then((order) => {
      getOneWhere("clients", "name", order.client).then((client) => {
        if (client.birthday) {
          client.birthday = moment(client.birthday).format("MMMM DD");
        }
        this.name = client.name;
        this.address = client.address;
        this.phone = client.phone;
        this.birthday = client.birthday;
        this.email = client.email;
        this.comment = order.comment;
      });
    });
  },
};
</script>
<style scoped>
.icon {
  width: 14px;
  height: 14px;
  position: relative;
  top: -2px;
}

#client-snippet {
  padding-top: 15px;
}

#client-snippet p {
  margin-bottom: 2px;
}
</style>
