<template>
  <ion-page>
    <ion-header class="ion-no-border ion-margin-top">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title class="ion-text-center">{{ workspace.name }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div v-if="workspace.imagesUrl">
        <ion-slides pager="true" :options="slideOpts">
          <ion-slide v-for="imageUrl in workspace.imagesUrl" :key="imageUrl">
            <img :src="imageUrl" />
          </ion-slide>
        </ion-slides>
      </div>
      <ion-list>
        <ion-list-header>Your host</ion-list-header>
        <ion-item>
          <ion-avatar slot="start">
            <img src="../assets/avatar.png" />
          </ion-avatar>
          <ion-label>
            <h2>{{ host.firstname }} {{ host.name }}</h2>
            <p>{{ host.email }}</p>
          </ion-label>
        </ion-item>
        <ion-list-header>Features</ion-list-header>
        <ion-item class="ion-margin-end" v-if="workspace.wifi">
          <ion-icon slot="start" color="primary" :icon="wifiOutline"></ion-icon>
          <ion-label>
            <h2>Wi-Fi</h2>
            <p>This workspace offers free wifi</p>
          </ion-label>
        </ion-item>
        <ion-item class="ion-margin-end" v-if="workspace.power">
          <ion-icon
            slot="start"
            color="primary"
            :icon="batteryChargingOutline"
          ></ion-icon>
          <ion-label>
            <h2>Power Plugs</h2>
            <p>
              This workspace has available power plugs in order to charge your
              electronic devices
            </p>
          </ion-label>
        </ion-item>
        <ion-item class="ion-margin-end" v-if="workspace.wc">
          <ion-icon slot="start" color="primary" :icon="manOutline"></ion-icon>
          <ion-label>
            <h2>Toilets</h2>
            <p>This workspace has an access to bathrooms</p>
          </ion-label>
        </ion-item>
        <ion-item class="ion-margin-end" v-if="workspace.coffee">
          <ion-icon slot="start" color="primary" :icon="cafeOutline"></ion-icon>
          <ion-label>
            <h2>Coffee</h2>
            <p>You will be able to either buy or make coffee</p>
          </ion-label>
        </ion-item>
        <ion-item class="ion-margin-end" v-if="workspace.parking">
          <ion-icon slot="start" color="primary" :icon="carOutline"></ion-icon>
          <ion-label>
            <h2>Coffee</h2>
            <p>
              This workspace has its own parking lot for easier access with your
              car
            </p>
          </ion-label>
        </ion-item>
        <ion-list-header>Disponibilities</ion-list-header>
        <ion-item v-for="dispo in workspace.dispos" :key="dispo">
          <ion-label>
            <h2>{{ dispo.dayOfTheWeek }}</h2>
            <h3>{{ dispo.start }} - {{ dispo.end }}</h3>
          </ion-label>
        </ion-item>
      </ion-list>
      <div class="ion-margin">
        <ion-text>
          <h2>Description</h2>
          {{ workspace.description }}
        </ion-text>
      </div>
      <ion-row style="height: 50px"></ion-row>
      <ion-button
        :router-link="{
          name: 'NewBooking',
          params: { id: workspace.id },
        }"
        shape="round"
        class="fixed-bot ion-margin"
        >Book now</ion-button
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
  IonSlide,
  IonSlides,
  IonList,
  IonListHeader
} from "@ionic/vue";
import firebase from "firebase";
import { ref, defineComponent } from "vue";

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
  dispos: any[];
}

export default defineComponent({
  name: "Workspace",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonBackButton,
    IonSlide,
    IonSlides,
    IonList,
    IonListHeader,
    IonButton
  },
  props: { id: { default: "", required: true } },

  setup(props) {
    const workspace = ref({});
    const host = ref({});
    const dispos: any[] = [];
    const imagesUrl: string[] = [];

    firebase
      .firestore()
      .collection("workspaces")
      .doc(props.id)
      .get()
      .then(async doc => {
        await firebase
          .firestore()
          .collection("images")
          .where("workspace", "==", doc.id)
          .get()
          .then(images => {
            images.forEach(image => {
              imagesUrl.push(image.data().imageUrl);
            });
          });

        await firebase
          .firestore()
          .collection("dispos")
          .where("workspace", "==", doc.id)
          .get()
          .then(d => {
            d.forEach(dispo => {
              dispos.push(dispo.data());
            });
          });

        await firebase
          .firestore()
          .collection("users")
          .doc(doc.data()?.userId)
          .get()
          .then(h => {
            host.value = h.data() || {};
          });

        workspace.value = {
          id: doc.id,
          spots: doc.data()?.spots,
          coffee: doc.data()?.coffee,
          power: doc.data()?.power,
          wifi: doc.data()?.wifi,
          description: doc.data()?.description,
          userId: doc.data()?.userId,
          parking: doc.data()?.parking,
          address: doc.data()?.address,
          name: doc.data()?.name,
          wc: doc.data()?.wc,
          price: doc.data()?.price,
          phone: doc.data()?.phone,
          imagesUrl: imagesUrl,
          dispos: dispos
        };
      });
    console.log(host);

    return {
      host,
      workspace,
      batteryChargingOutline,
      wifiOutline,
      cafeOutline,
      manOutline,
      womanOutline,
      carOutline
    };
  }
});
</script>

<style scoped>
.slides {
  width: 400px;
  height: 350px;
  margin: auto auto;
}
.fixed-bot {
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>