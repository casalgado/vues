<template>
  <div>
    <img alt="Es Alimento logo" src="https://i.imgur.com/tETJGS8.jpg" />
    <div>
      <input
        v-model="email"
        ref="emailField"
        type="email"
        placeholder="email"
      />
      <input v-model="password" type="password" placeholder="password" />
      <button @click="submit">submit</button>
      <button @click="show">show</button>
      <button @click="logout">logout</button>
    </div>
  </div>
</template>

<script>
// test
import firebase from "firebase";

export default {
  name: "Landing",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  mounted() {},
  methods: {
    submit() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.email = "";
          this.password = "";
          this.$router.push({ path: "/dashboard" });
          alert("user signed in successfully");
        })
        .catch((err) => {
          this.error = err.message;
        });
    },
    show() {
      alert(JSON.stringify(firebase.auth().currentUser));
    },
    logout() {
      firebase.auth().signOut();
    },
  },
};
</script>
<style scoped>
img {
  width: 100%;
  max-width: 520px;
}

input {
  color: white;
}
</style>
