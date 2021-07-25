<template>
  <ion-page>
    <ion-header class="ion-no-border ion-margin-top">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title class="ion-text-center">Add your workspace</ion-title>
        <ion-progress-bar value="0.60"></ion-progress-bar>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <h1 class="ion-margin-start">Add pictures</h1>
      <ion-grid>
        <ion-row>
          <ion-col size="6" :key="photo" v-for="photo in photos">
            <ion-img :src="photo.webviewPath"></ion-img>
          </ion-col>
        </ion-row>
      </ion-grid>
      <ion-button
        @click="takePhoto()"
        color="secondary"
        type="submit"
        class="ion-margin fixed-bot-three"
        expand="block"
        shape="round"
        ><ion-icon slot="start" :icon="camera"></ion-icon>Add a
        picture</ion-button
      >
      <ion-button
        @click="next"
        color="primary"
        class="ion-margin fixed-bot-two"
        expand="block"
        shape="round"
        >Next</ion-button
      >
      <ion-button
        router-direction="back"
        @click="cancel"
        color="medium"
        class="ion-margin fixed-bot-one"
        expand="block"
        shape="round"
        >Cancel</ion-button
      >
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { camera, trash, close } from "ionicons/icons";
import {
  IonPage,
  IonHeader,
  IonIcon,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonButton
} from "@ionic/vue";
import { usePhotoGallery } from "@/composables/usePhotoGallery";
import firebase from "firebase";
import { useRouter, useRoute } from "vue-router";

export default {
  name: "AddPictures",
  components: {
    IonPage,
    IonHeader,
    IonIcon,
    IonToolbar,
    IonTitle,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonImg,
    IonButton
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const docRefId = "" + route.params.id;
    console.log("the add pics ref is " + docRefId);

    const { photos, takePhoto } = usePhotoGallery(docRefId);

    const next = () => {
        router.push({ name: "AddDispo", params: { id: docRefId } });
    }

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
      photos,
      cancel,
      takePhoto,
      next,
      camera,
      trash,
      close
    };
  }
};
</script>

<style scoped>
.fixed-bot-one {
  position: fixed;
  left: 0;
  bottom: 42px;
  right: 0;
}

.fixed-bot-two {
  position: fixed;
  left: 0;
  bottom: 92px;
  right: 0;
}

.fixed-bot-three {
  position: fixed;
  left: 0;
  bottom: 142px;
  right: 0;
}
</style>