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
    <ion-content>
      <ion-list>
        <ion-item-sliding>
          <ion-item
            v-for="workspace in myWorkspaces"
            :key="workspace"
            button
            @click="buttonClick(workspace)"
          >
            <ion-avatar slot="start">
              <img :src="workspace.imagesUrl[0]" />
            </ion-avatar>
            <ion-label>
              <h2>{{ workspace.name }}</h2>
              <h3>{{ workspace.address }}</h3>
              <p>{{ workspace.description }}</p>
            </ion-label>
          </ion-item>
          <ion-item-options side="end">
            <ion-item-option color="danger" expandable>
              Delete
            </ion-item-option>
          </ion-item-options>
        </ion-item-sliding>
      </ion-list>
      <ion-button
        router-link="/tabs/create-workspace"
        shape="round"
        class="fixed-bot ion-margin"
        >Create a new workspace</ion-button
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
  IonButton,
  IonItemOption,
  IonItemOptions,
  IonItemSliding
} from "@ionic/vue";
import firebase from "firebase";
import { ref } from "vue";
import { useRouter } from 'vue-router';

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
  name: "MyWorkspaces",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonButton,
    IonItemOption,
    IonItemOptions,
    IonItemSliding
  },
  setup() {
    const myWorkspaces = ref<Workspace[]>([]);
    const user = firebase.auth().currentUser;
    const router = useRouter();
    console.log(user?.uid);

    const buttonClick = (workspace: any) => {
      console.log(workspace);
      
      router.push({
            name: 'Workspace',
            params: { id: workspace.id },
          })
    };

    firebase
      .firestore()
      .collection("workspaces")
      .where("userId", "==", user?.uid)
      .get()
      .then(snapshot => {
        snapshot.forEach(async doc => {
          const imagesUrl: string[] = [];

          await firebase
            .firestore()
            .collection("images")
            .where("workspace", "==", doc.id)
            .get()
            .then(images => {
              images.forEach(image => {
                console.log("the images object is ");
                console.log(image.data().imageUrl);
                imagesUrl.push(image.data().imageUrl);
              });
            });

          myWorkspaces.value.push({
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
          console.log(doc.data());
        });
      });
    return {
      myWorkspaces,
      buttonClick
    };
  }
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