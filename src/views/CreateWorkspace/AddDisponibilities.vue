<template>
  <ion-page>
    <ion-header class="ion-no-border ion-margin-top">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title class="ion-text-center">Add your workspace</ion-title>
        <ion-progress-bar :value="progress"></ion-progress-bar>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <h1 class="ion-margin-start">Add disponibilities</h1>
      <form @submit.prevent="next(power, wifi, coffee, parking, wc)">
        <div :key="dispo.id" v-for="dispo in dispos">
          <ion-grid class="ion-margin-top">
            <ion-row>
              <ion-col>
                <ion-item>
                  <ion-label color="primary">Day of the week</ion-label>
                  <ion-select v-model="dispo.dayOfTheWeek">
                    <ion-select-option
                      :value="weekday"
                      v-for="weekday in weekdays"
                      :key="weekday"
                      >{{ weekday }}</ion-select-option
                    >
                  </ion-select>
                </ion-item>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col>
                <ion-item>
                  <ion-label color="primary">Start</ion-label>
                  <ion-datetime
                    v-model="dispo.start"
                    display-format="HH:mm"
                  ></ion-datetime>
                </ion-item>
              </ion-col>
              <ion-col>
                <ion-item>
                  <ion-label color="primary">End</ion-label>
                  <ion-datetime
                    v-model="dispo.end"
                    display-format="HH:mm"
                  ></ion-datetime>
                </ion-item>
              </ion-col>
            </ion-row>
          </ion-grid>
        </div>
        <ion-button
          type="submit"
          class="ion-margin"
          expand="block"
          shape="round"
          >Confirm creation</ion-button
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
      <ion-modal
        :is-open="isOpenRef"
        css-class="my-custom-class"
        @didDismiss="setOpen(false)"
      >
        <MyModal :data="data"></MyModal>
      </ion-modal>
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
  IonButton,
  IonDatetime,
  IonSelect,
  IonSelectOption
} from "@ionic/vue";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import firebase from "firebase";

export interface Disponibility {
  id: number;
  dayOfTheWeek: string;
  start: string;
  end: string;
  workspace: string;
}

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
    IonDatetime,
    IonSelect,
    IonSelectOption
  },

  setup() {
    const route = useRoute();
    const router = useRouter();
    const progress = ref(0.8);

    const weekdays = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ];

    const dispos = ref<Disponibility[]>([
      {
        id : 0,
        dayOfTheWeek: "Monday",
        start: "08:00",
        end: "17:00",
        workspace: ""
      },
      {
        id : 1,
        dayOfTheWeek: "Tuesday",
        start: "08:00",
        end: "17:00",
        workspace: ""
      },
      {
        id : 2,
        dayOfTheWeek: "Wednesday",
        start: "08:00",
        end: "17:00",
        workspace: ""
      },
      {
        id : 3,
        dayOfTheWeek: "Thursday",
        start: "08:00",
        end: "17:00",
        workspace: ""
      },
      {
        id : 4,
        dayOfTheWeek: "Friday",
        start: "08:00",
        end: "17:00",
        workspace: ""
      }
    ]);

    const docRefId = "" + route.params.id;
    console.log("my ref id is dispo" + docRefId);

    const next = () => {
      console.log(route.params.id);
      console.log(docRefId);
      console.log(dispos);
      dispos.value.forEach(dispo => {
        dispo.workspace = docRefId;
        firebase
          .firestore()
          .collection("dispos")
          .add(dispo)
          .then(() => {
            console.log("Document written with ID: ", docRefId);
            progress.value = 1;
            router.push("/tabs/myworkspaces");
          })
          .catch(function(error) {
            console.error("Error adding document: ", error);
          });
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
      progress,
      dispos,
      weekdays,
      next,
      cancel
    };
  }
};
</script>