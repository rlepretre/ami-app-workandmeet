<template>
  <ion-page>
    <ion-header class="ion-no-border ion-margin-top">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title size="large" class="ion-text-center">My profile</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-item @click="signOut()"><ion-text color="danger"><h5>Log out</h5></ion-text></ion-item>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import firebase from 'firebase';

export default  {
  name: 'Profile',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage },

  setup(){
    const signOut = () => {
      console.log("logging out");
      
      firebase.auth().signOut();
    }
  return {
    signOut,
  }
  }
}
</script>