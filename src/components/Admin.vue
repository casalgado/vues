<template>
  <div>
    <button @click="boo()">btn</button>
    <span v-if="isAdmin">Admin Privileges</span>
    <span v-else>Not Authorized</span>
    <p>
      {{ msg }}
    </p>
  </div>
</template>

<script>
export default {
  name: "Admin",
  data() {
    return {
      name: "beto",
    };
  },
  props: {
    msg: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    boo: function() {
      this.name = "esteban";
    },
  },
};
</script>
