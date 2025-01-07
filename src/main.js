import { createApp } from 'vue'
import { createApp } from 'vue';          // Import Vue
import { createVuetify } from 'vuetify';  // Import Vuetify
import 'vuetify/styles'; 
import App from './App.vue'

const vuetify = createVuetify();         // Create Vuetify instance

app.use(vuetify);                        // Use Vuetify with your app
createApp(App).mount('#app')
