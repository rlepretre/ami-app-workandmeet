<template>
  <ion-page>
    <ion-header class="ion-no-border ion-margin-top">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title size="large" class="ion-text-center">Explore</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-card v-for="workspace in workspaces" :key="workspace">
        <ion-slides pager="true" :options="slideOpts" >
            <ion-slide v-for="imageUrl in workspace.imagesUrl" :key="imageUrl">
              <img :src="imageUrl" />
            </ion-slide>
        </ion-slides>

        <ion-card-header>
          <ion-card-subtitle>{{ workspace.address }}</ion-card-subtitle>
          <ion-card-title>{{ workspace.name }}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          {{ workspace.description }}
        </ion-card-content>
        <ion-button
          :router-link="{
            name: 'Workspace',
            params: { id: workspace.id },
          }"
          expand="block"
          shape="round"
          >More info</ion-button
        >
      </ion-card>
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
  IonSlides,
  IonSlide,
  IonButton
} from "@ionic/vue";
import firebase from "firebase";
import { ref } from "vue";

export interface Workspace {
  id: string;
  spots: number;
  coffee: boolean;
  power: boolean;
  wifi: boolean;
  description: string;
  userId: string;
  parking: boolean;
  address: string;
  name: string;
  wc: boolean;
  price: number;
  phone: string;
  imagesUrl: string[];
}

export default {
  name: "Explore",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonSlides,
    IonSlide,
    IonButton
  },

  setup() {
    const slideOpts = {
      initialSlide: 1,
      speed: 400
    };
    const workspaces = ref<Workspace[]>([]);
    const user = firebase.auth().currentUser;
    console.log(user?.uid);

    firebase
      .firestore()
      .collection("workspaces")
      .get()
      .then(snapshot => {
        snapshot.forEach(async doc => {
          const imagesUrl: string[] = [];
          console.log(doc.id);

          await firebase
            .firestore()
            .collection("images")
            .where('workspace', '==', doc.id)
            .get()
            .then(images => {
              images.forEach(image => {
                console.log("the images object is ");
                console.log(image.data().imageUrl);
                imagesUrl.push(image.data().imageUrl);
              });
            });

          workspaces.value.push({
            id: doc.id,
            spots: doc.data().spots,
            coffee: doc.data().coffee,
            power: doc.data().power,
            wifi: doc.data().wifi,
            description: doc.data().description,
            userId: doc.data().userId,
            parking: doc.data().parking,
            address: doc.data().address,
            name: doc.data().name,
            wc: doc.data().wc,
            price: doc.data().price,
            phone: doc.data().phone,
            imagesUrl: imagesUrl
          });
          console.log(workspaces.value[0]);
        });
      });

    return {
      slideOpts,
      workspaces
    };
  }
};
</script>

<style scoped>
.slides {
  width: 400px;
  height: 350px;
  margin: auto auto;
}
</style>