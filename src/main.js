import { createApp } from 'vue';  // Vue importeren
import { createVuetify } from 'vuetify';  // Vuetify importeren
import 'vuetify/styles';  // Vuetify stijlen importeren
import App from './App.vue';  // Hoofdbestand van je applicatie

const app = createApp(App);  // Maak de Vue-applicatie

const vuetify = createVuetify();  // Maak een Vuetify-instantie

app.use(vuetify);  // Voeg Vuetify toe aan de app

app.mount('#app');  // Mount de app op het juiste element
