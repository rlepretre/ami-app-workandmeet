<template>
  <ion-page>
    <ion-header class="ion-no-border ion-margin-top">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title size="large" class="ion-text-center">My bookings</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-refresher slot="fixed" @ionRefresh="getBookings()">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <ion-list>
        <ion-item v-for="booking in myBookings" :key="booking">
          <ion-label>
            <h2>{{ booking.workspace.name }}</h2>
            <p>{{ booking.date }}</p></ion-label
          >
          {{ booking.start }} - {{ booking.end }}
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonList
} from "@ionic/vue";
import firebase from "firebase";
import { ref } from "vue";

export default {
  name: "MyBookings",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonItem,
    IonList
  },

  setup() {
    const user = firebase.auth().currentUser;
    const myBookings = ref<any[]>([]);
    console.log(myBookings.value);

    const getBookings = () => {
      myBookings.value = []
      firebase
      .firestore()
      .collection("bookings")
      .where("userId", "==", user?.uid)
      .get()
      .then(snapshot => {
        snapshot.forEach(async doc => {
          await firebase
            .firestore()
            .collection("workspaces")
            .doc(doc.data().workspaceId)
            .get()
            .then(workspace => {
              const booking = doc.data();
              booking.workspace = workspace.data();
              myBookings.value.push(booking);
            });
        });
      });
    }

    getBookings();

    return {
      myBookings,
      getBookings
    };
  }
};
</script>