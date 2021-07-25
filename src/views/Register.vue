<template>
  <ion-page>
    <ion-header class="ion-no-border ion-margin-top">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title class="ion-text-center" size="large">Register</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <form
        @submit.prevent="
          signUpWithEmailAndPassword(
            firstname,
            name,
            email,
            password,
            passwordConfirmation
          )
        "
      >
        <ion-grid class="ion-text-center">
          <ion-row>
            <ion-col>
              <ion-item>
                <ion-label position="floating">Firstname</ion-label>
                <ion-input type="text" v-model="firstname"></ion-input>
              </ion-item>
            </ion-col>
            <ion-col>
              <ion-item>
                <ion-label position="floating">Name</ion-label>
                <ion-input type="text" v-model="name"></ion-input>
              </ion-item>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-item>
                <ion-label position="floating">Email</ion-label>
                <ion-input type="email" v-model="email"></ion-input>
              </ion-item>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-item>
                <ion-label position="floating">Password</ion-label>
                <ion-input type="password" v-model="password"></ion-input>
              </ion-item>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-item>
                <ion-label position="floating">Password confirmation</ion-label>
                <ion-input
                  type="password"
                  v-model="passwordConfirmation"
                ></ion-input>
              </ion-item>
            </ion-col>
          </ion-row>
        </ion-grid>
        <ion-button
          type="submit"
          value="Register"
          class="ion-margin"
          shape="round"
          expand="block"
          >Sign up</ion-button
        >
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
        up with Google</ion-button
      >
      <ion-button
        fill="outline"
        class="ion-margin"
        shape="round"
        expand="block"
        disabled
      >
        <ion-icon slot="start" :icon="logoFacebook"></ion-icon>Sign up with
        Facebook</ion-button
      >
      <ion-button
        fill="outline"
        class="ion-margin"
        shape="round"
        expand="block"
        disabled
      >
        <ion-icon color="dark" slot="start" :icon="logoApple"></ion-icon>Sign up
        with Apple</ion-button
      >
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonLabel,
  IonItem,
  IonPage,
  IonIcon,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonBackButton,
  IonInput,
  IonButton
} from "@ionic/vue";
import { logoGoogle, logoFacebook, logoApple } from "ionicons/icons";
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import firebase from "firebase";

export default {
  name: "Register",
  components: {
    IonPage,
    IonBackButton,
    IonIcon,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonInput,
    IonButton,
    IonLabel,
    IonItem
  },

  setup() {
    const router = useRouter();

    const state = reactive({
      firstname: "",
      name: "",
      email: "",
      password: "",
      errorMsg: ""
    });

    const signUpWithEmailAndPassword = async (
      firstname: string,
      name: string,
      email: string,
      password: string,
      passwordConfirmation: string
    ) => {
      try {
        if (!firstname || !name || !email || !password) {
          state.errorMsg = "Name, Email, and Password Required";
          console.log("Name, Email, and Password Required");
          
          return;
        } else if (password != passwordConfirmation) {
          state.errorMsg = "Passwords do not match"
          console.log("password do not match");
          
        }
        const authRes = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
        firebase
          .firestore()
          .collection("users")
          .doc(authRes.user?.uid)
          .set({
            firstname,
            name,
            email
          });
        router.push("/tabs/explore");
      } catch (error) {
        state.errorMsg = error.message;
      }
    };
    return {
      ...toRefs(state),
      signUpWithEmailAndPassword,
      logoGoogle,
      logoFacebook,
      logoApple
    };
  }
};
</script>

<style scoped>
</style>
