<template>
  <ion-page>
    <ion-header class="ion-no-border ion-margin-top">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title size="large" class="ion-text-center"
          >My workspaces</ion-title
        >
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">

        <ion-button router-link="/tabs/create-workspace" shape="round" class="fixed-bot ion-margin">Create a new workspace</ion-button>

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
  IonButton
} from "@ionic/vue";

export default {
  name: "MyWorkspaces",
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButton }
};
</script>

<style scoped>

.fixed-bot {
    position: fixed;
    left: 0;
    bottom: 50px;
    right: 0;
}

</style>