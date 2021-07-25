<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="explore" href="/tabs/explore">
          <ion-icon :icon="searchOutline" />
          <ion-label>Explore</ion-label>
        </ion-tab-button>

        <ion-tab-button disabled tab="map" href="/tabs/map">
          <ion-icon :icon="mapOutline" />
          <ion-label>Map</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="mybookings" href="/tabs/mybookings">
          <ion-icon :icon="bookOutline" />
          <ion-label>Bookings</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="myworkspaces" href="/tabs/myworkspaces">
          <ion-icon :icon="homeOutline" />
          <ion-label>Workspaces</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="profile" href="/tabs/profile">
          <ion-icon :icon="personCircleOutline" />
          <ion-label>Profile</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage
} from "@ionic/vue";
import {
  searchOutline,
  mapOutline,
  bookOutline,
  homeOutline,
  personCircleOutline
} from "ionicons/icons";


export default {
  name: "Tabs",
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage },

  setup() {
    return {
      searchOutline,
      mapOutline,
      bookOutline,
      homeOutline,
      personCircleOutline,
    };
  }
};
</script>