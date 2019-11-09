<template>
  <div>
    <input type="email" v-model="email" placeholder="email" />
    <input type="password" v-model="password" placeholder="password" />
    <button @click="submit">submit</button>
    <button @click="show">show</button>
    <button @click="logout">logout</button>
  </div>
</template>


<script>
import firebase from "firebase";

export default {
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
          alert("user signed in successfully");
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