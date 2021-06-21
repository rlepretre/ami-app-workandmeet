<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { defineComponent, onBeforeMount } from "vue";
import { useRouter, useRoute } from "vue-router";
import firebase from "firebase";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    
    onBeforeMount(() => {
      firebase.auth().onAuthStateChanged(user => {
        if (!user) {
          router.replace("/login");
        } else if (route.path == "/login" || route.path == '/register') {
          router.replace('/tabs/explore')
        }
      });
    });
  }
});
</script>