<template>
  <div>
    <img alt="Es Alimento logo" src="https://i.imgur.com/tETJGS8.jpg" />
    <div>
      <input type="email" v-model="email" placeholder="email" />
      <input type="password" v-model="password" placeholder="password" />
      <button @click="submit">submit</button>
      <button @click="show">show</button>
      <button @click="logout">logout</button>
    </div>
  </div>
</template>


<script>
import firebase from "firebase";

export default {
  name: "Landing",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    submit() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.email = "";
          this.password = "";
          this.$router.replace({ name: "dashboard" });
          alert("user signed in successfully");
        })
        .catch(err => {
          this.error = err.message;
        });
    },
    show() {
      alert(JSON.stringify(firebase.auth().currentUser));
    },
    logout() {
      firebase.auth().signOut();
    }
  }
};
</script>
<style scoped>
img {
  width: 100%;
  max-width: 520px;
}
</style>