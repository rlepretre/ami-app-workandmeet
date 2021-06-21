<template>
  <ion-page>
    <ion-header class="ion-no-border ion-margin-top">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title class="ion-text-center">Add your workspace</ion-title>
        <ion-progress-bar value="0.40"></ion-progress-bar>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <h1 class="ion-margin-start">Features</h1>
      <form @submit.prevent="next(power, wifi, coffee, parking, wc)">
        <ion-list>
          <ion-item>
            <ion-icon
              slot="start"
              color="primary"
              :icon="batteryChargingOutline"
            ></ion-icon>
            <ion-label>Available power plugs</ion-label>
            <ion-toggle v-model="power"></ion-toggle>
          </ion-item>
          <ion-item>
            <ion-icon
              slot="start"
              color="primary"
              :icon="wifiOutline"
            ></ion-icon>
            <ion-label>Available wifi</ion-label>
            <ion-toggle v-model="wifi"></ion-toggle>
          </ion-item>
          <ion-item>
            <ion-icon
              slot="start"
              color="primary"
              :icon="cafeOutline"
            ></ion-icon>
            <ion-label>Coffee machine</ion-label>
            <ion-toggle v-model="coffee"></ion-toggle>
          </ion-item>
          <ion-item>
            <ion-icon
              slot="start"
              color="primary"
              :icon="carOutline"
            ></ion-icon>
            <ion-label>Free parking</ion-label>
            <ion-toggle v-model="parking"></ion-toggle>
          </ion-item>
          <ion-item>
            <ion-icon
              slot="start"
              color="primary"
              :icon="manOutline"
            ></ion-icon>
            <ion-label>Restrooms</ion-label>
            <ion-toggle v-model="wc"></ion-toggle>
          </ion-item>
        </ion-list>
        <ion-button
          type="submit"
          class="ion-margin"
          expand="block"
          shape="round"
          >Next</ion-button
        >
      </form>
      <ion-button
        @click="cancel"
        color="medium"
        class="ion-margin"
        expand="block"
        shape="round"
        >Cancel</ion-button
      >
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  batteryChargingOutline,
  wifiOutline,
  cafeOutline,
  manOutline,
  womanOutline,
  carOutline
} from "ionicons/icons";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonBackButton,
  IonButton,
  IonToggle
} from "@ionic/vue";
import { reactive } from "@vue/reactivity";
import { toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import firebase from "firebase";

export default {
  name: "CreateWorkspace",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonBackButton,
    IonButton,
    IonToggle
  },

  setup() {
    const route = useRoute();
    const router = useRouter();

    const docRefId = "" + route.params.id;
    console.log("the ref is " + docRefId);

    const state = reactive({
      power: false,
      wifi: false,
      coffe: false,
      parking: false,
      wc: false
    });

    const next = (
      power: boolean,
      wifi: boolean,
      coffee: boolean,
      parking: boolean,
      wc: boolean
    ) => {
      console.log(route.params.id);
      console.log(docRefId);

      firebase
        .firestore()
        .collection("workspaces")
        .doc(docRefId)
        .set(
          {
            power,
            wifi,
            coffee,
            parking,
            wc
          },
          { merge: true }
        )
        .then(() => {
          console.log("Document written with ID: ", docRefId);
          router.push({ name: "AddPictures", params: { id: docRefId } });
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    };

    const cancel = () => {
      if (!docRefId) {
        router.push("/tabs/myworkspaces");
      } else {
        firebase
          .firestore()
          .collection("workspaces")
          .doc(docRefId)
          .delete()
          .then(() => {
            router.push("/tabs/myworkspaces");
          })
          .catch(function(error) {
            console.error("Error deleting document: ", error);
          });
      }
    };
    return {
      ...toRefs(state),
      next,
      cancel,
      batteryChargingOutline,
      wifiOutline,
      cafeOutline,
      manOutline,
      womanOutline,
      carOutline
    };
  }
};
</script>