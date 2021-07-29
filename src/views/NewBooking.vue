<template>
  <ion-page>
    <ion-header class="ion-no-border ion-margin-top">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title class="ion-text-center">New Booking</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
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
        <ion-list-header>Disponibilities</ion-list-header>
        <ion-item v-for="dispo in workspace.dispos" :key="dispo">
          <ion-label>
            <h2>{{ dispo.dayOfTheWeek }}</h2>
            <h3>{{ dispo.start }} - {{ dispo.end }}</h3>
          </ion-label>
        </ion-item>
        <ion-list-header>Pick your time</ion-list-header>
        <ion-item>
          <ion-label>Date</ion-label>
          <ion-datetime :value="date" placeholder="Select Date"></ion-datetime>
        </ion-item>
        <ion-item>
          <ion-label>Start Time</ion-label>
          <ion-datetime
            @ionChange="computePrice(workspace.price)"
            display-format="HH:mm"
            picker-format="HH:mm"
            v-model="start"
          ></ion-datetime>
        </ion-item>
        <ion-item>
          <ion-label>Ending Time</ion-label>
          <ion-datetime
            @ionChange="computePrice(workspace.price)"
            display-format="HH:mm"
            picker-format="HH:mm"
            v-model="end"
          ></ion-datetime>
        </ion-item>
        <ion-item><ion-label>Price</ion-label> {{ price }}€ </ion-item>
      </ion-list>
      <ion-button
        @click="confirmBooking(start, end, price)"
        expand="block"
        shape="round"
        class="ion-margin"
        >Confirm Booking
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import router from "@/router";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonBackButton,
  IonDatetime,
  IonItem,
  IonList,
  IonListHeader,
  IonLabel,
  IonButton
} from "@ionic/vue";
import firebase from "firebase";
import { ref, defineComponent } from "vue";
import { LocalNotifications } from "@capacitor/local-notifications";

export default defineComponent({
  name: "Workspace",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonBackButton,
    IonDatetime,
    IonItem,
    IonList,
    IonListHeader,
    IonLabel,
    IonButton
  },
  props: { id: { default: "", required: true } },

  setup(props) {
    const timeStringToFloat = (time: string) => {
      const hoursMinutes = time.split(/[.:]/);
      const hours = parseInt(hoursMinutes[0], 10);
      const minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
      return hours + minutes / 60;
    };
    const today = new Date();
    const workspace = ref<any>({});
    const host = ref({});
    const dispos: any[] = [];
    const imagesUrl: string[] = [];
    const price = ref(0);

    const date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

    const start = ref(today.getHours() + ":" + today.getMinutes());

    const end = ref(today.getHours() + 1 + ":" + today.getMinutes());

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
        price.value =
          (timeStringToFloat(end.value) - timeStringToFloat(start.value)) *
          doc.data()?.price;
      });

    const computePrice = (hourlyPrice: number) => {
      price.value =
        (timeStringToFloat(end.value) - timeStringToFloat(start.value)) *
        hourlyPrice;
      console.log(start.value);
      console.log(end.value);
      console.log(price.value);
    };

    const confirmBooking = async (
      start: string,
      end: string,
      price: string
    ) => {
      const workspaceId = props.id;
      const userId = await firebase.auth().currentUser?.uid;
      firebase
        .firestore()
        .collection("bookings")
        .add({
          date,
          start,
          end,
          price,
          userId,
          workspaceId
        })
        .then(async docRef => {
          console.log("Booking confirmed with ID: ", docRef.id);
          console.log(new Date(Date.parse(date + " " + start)));
          const canSend = await LocalNotifications.requestPermissions();
          if (canSend) {
            LocalNotifications.schedule({
              notifications: [
                {
                  title: "Work And Meet",
                  body:
                    "Your reservation at" +
                    workspace.value.name +
                    "starts now!",
                  id: 1,
                  schedule: { at: new Date(Date.parse(date + " " + start)) },
                  sound: "",
                  attachments: undefined,
                  actionTypeId: "",
                  extra: null
                }
              ]
            });
            LocalNotifications.schedule({
              notifications: [
                {
                  title: "Work And Meet",
                  body:
                    "Your reservation at" + workspace.value.name + "ends now!",
                  id: 1,
                  schedule: { at: new Date(Date.parse(date + " " + end)) },
                  sound: "",
                  attachments: undefined,
                  actionTypeId: "",
                  extra: null
                }
              ]
            });
          }
          router.push("/tabs/explore");
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    };
    const testNotif = () => {
      console.log(new Date(Date.parse(date + " " + start.value)));
    };

    return {
      workspace,
      host,
      date,
      start,
      end,
      price,
      testNotif,
      computePrice,
      confirmBooking
    };
  }
});
</script>