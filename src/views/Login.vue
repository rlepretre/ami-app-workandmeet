<template>
  <ion-page>
    <ion-header class="ion-no-border ion-margin-top">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title class="ion-text-center" size="large">Log in</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <form @submit.prevent="signInWithEmailAndPassword(email, password)">
        <ion-item>
          <ion-label position="floating">Email</ion-label>
          <ion-input type="email" v-model="email"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Password</ion-label>
          <ion-input type="password" v-model="password" ></ion-input>
        </ion-item>
        <ion-button
          expand="block"
          color="primary"
          class="ion-margin"
          type="submit"
          shape="round"
        >
          Sign in
        </ion-button>
      </form>
      <p class="ion-text-center">or</p>
      <ion-button
        fill="outline"
        class="ion-margin"
        shape="round"
        expand="block"
        disabled
      >
        <ion-icon color="danger" slot="start" :icon="logoGoogle"></ion-icon>Sign
        in with Google</ion-button
      >
      <ion-button
        fill="outline"
        class="ion-margin"
        shape="round"
        expand="block"
        disabled
      >
        <ion-icon slot="start" :icon="logoFacebook"></ion-icon>Sign in with
        Facebook</ion-button
      >
      <ion-button
        fill="outline"
        class="ion-margin"
        shape="round"
        expand="block"
        router-link="/register"
        disabled
      >
        <ion-icon color="dark" slot="start" :icon="logoApple"></ion-icon>Sign in
        with Apple</ion-button
      >
      <ion-text color="primary">
        <h5 class="ion-text-center">
          Don't have an account?
          <router-link to="/register">Sign up</router-link>
        </h5>
      </ion-text>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { logoGoogle, logoFacebook, logoApple } from "ionicons/icons";

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonButton,
  IonLabel,
  IonItem
} from "@ionic/vue";

import firebase from "firebase";
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "Authentication",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonInput,
    IonItem,
    IonLabel,
    IonButton
  },
  setup() {
    const router = useRouter();

    const state = reactive({
      name: "",
      email: "",
      password: "",
      errorMsg: ""
    });
    const signInWithEmailAndPassword = async (
      email: string,
      password: string
    ) => {
      try {
        if (!email || !password) {
          state.errorMsg = "Email and Password Required";
          return;
        }
        await firebase.auth().signInWithEmailAndPassword(email, password);
        router.push("/tabs/explore");
      } catch (error) {
        state.errorMsg = error.message;
      }
    };

    return {
      ...toRefs(state),
      signInWithEmailAndPassword,
      logoGoogle,
      logoFacebook,
      logoApple
    };
  }
};
</script>