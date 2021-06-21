import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';

// Above the createApp() line
import { defineCustomElements } from '@ionic/pwa-elements/loader';

// Call the element loader after the platform has been bootstrapped
defineCustomElements(window);

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';
import firebase from 'firebase';



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5DWw8_gbvTHx5r7gSUQSqaDvy_G3wGAg",
  authDomain: "app-workandmeet.firebaseapp.com",
  projectId: "app-workandmeet",
  storageBucket: "app-workandmeet.appspot.com",
  messagingSenderId: "1078151248497",
  appId: "1:1078151248497:web:ddde155cc5deedf7d1f9d0",
  measurementId: "G-S19DP7K8LX"
};

firebase.initializeApp(firebaseConfig)

const app = createApp(App)
  .use(IonicVue,{
    mode: "ios",
  })
  .use(router);
  
router.isReady().then(() => {
  app.mount('#app');
});