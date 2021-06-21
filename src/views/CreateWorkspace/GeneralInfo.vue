<template>
  <ion-page>
    <ion-header class="ion-no-border ion-margin-top">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title class="ion-text-center">Add your workspace</ion-title>
        <ion-progress-bar value="0.20"></ion-progress-bar>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <h1 class="ion-margin-start">General informations</h1>
      <form
        @submit.prevent="
          next(name, phone, address, price, spots, description)
        "
      >
        <ion-item>
          <ion-label color="primary" position="floating">Place name</ion-label>
          <ion-input clear-input type="text" v-model="name"> </ion-input>
        </ion-item>
        <ion-item>
          <ion-label color="primary" position="floating"
            >Phone number</ion-label
          >
          <ion-input clear-input type="tel" v-model="phone"> </ion-input>
        </ion-item>
        <ion-item>
          <ion-label color="primary" position="floating">Address</ion-label>
          <ion-input clear-input type="text" v-model="address"> </ion-input>
        </ion-item>
        <ion-item>
          <ion-label color="primary" position="floating"
            >Price per hour</ion-label
          >
          <ion-input clear-input type="number" v-model="price"> </ion-input>
        </ion-item>
        <ion-item>
          <ion-label color="primary" position="floating"
            >Available spots</ion-label
          >
          <ion-input clear-input type="number" v-model="spots"> </ion-input>
        </ion-item>
        <ion-item>
          <ion-label color="primary" position="floating"
            >Add a description</ion-label
          >
          <ion-textarea v-model="description"></ion-textarea>
        </ion-item>
        <ion-button
          type="submit"
          class="ion-margin"
          expand="block"
          shape="round"
          >Next</ion-button
        >
      </form>
      <ion-button
        router-direction="back"
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
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonBackButton,
  IonInput,
  IonButton,
  IonTextarea
} from "@ionic/vue";
import { reactive } from "@vue/reactivity";
import { toRefs } from "vue";
import { useRouter } from "vue-router";
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
    IonInput,
    IonButton,
    IonTextarea
  },

  setup() {
    const router = useRouter();

    let docRefId = '';

    const state = reactive({
      name: "",
      phone: "",
      address: "",
      price: 0,
      spots: 0,
      description: ""
    });

    const next = (
      name: string,
      phone: string,
      address: string,
      price: number,
      spots: number,
      description: string
    ) => {
      console.log(state);
      firebase
        .firestore()
        .collection("workspaces")
        .add({
          name,
          phone,
          address,
          price,
          spots,
          description
        })
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
          docRefId = docRef.id
          router.push({name: 'Features', params: {id: docRef.id}})
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    };

    const cancel = () => {
      if(!docRefId){
        router.push('/tabs/myworkspaces')
      } else {
        firebase.firestore().collection('workspaces').doc(docRefId)
        .delete()
        .then(() =>{
          router.push('/tabs/myworkspaces')
        })
        .catch(function(error) {
          console.error("Error deleting document: ", error);
        });
      }

    }
    return {
      ...toRefs(state),
      next,
      cancel,
    };
  }
};
</script>