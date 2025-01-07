<template>
    <v-data-table :headers="headers" :items="items" :search="search" item-value="name" class="main">
        <!-- Status kolom met dynamische kleur en icoon -->
        <template v-slot:item.status="{ item }" class="pa-3">
            <v-chip :color="item.status === 'Active' ? 'green' : 'red'" label dark>
                {{ item.status }}
            </v-chip>
        </template>
    </v-data-table>
</template>



<script setup>
import { ref, onMounted } from 'vue';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc, onSnapshot } from "firebase/firestore";

// Firebase-configuratie
const firebaseConfig = {
    apiKey: "AIzaSyAIpUdHpSEk8ahMIO59T-BAx7n5_BcRYW4",
    authDomain: "printer-aid.firebaseapp.com",
    databaseURL: "https://printer-aid-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "printer-aid",
    storageBucket: "printer-aid.firebasestorage.app",
    messagingSenderId: "636113573034",
    appId: "1:636113573034:web:1476a0e2c26c595232acd3",
    measurementId: "G-BFZTJTGYRC"
};

// Initialiseer Firebase en Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Data voor de tabel
const search = ref('');
const headers = ref([
    { title: 'First Name', align: 'start', key: 'namefirst' },
    { title: 'Last Name', align: 'start', key: 'namelast' },
    { title: 'Printer', align: 'start', key: 'printer' },
    { title: 'Email', align: 'start', key: 'email' },
    { title: 'Start Time', align: 'start', key: 'timestart' },
    { title: 'End Time', align: 'start', key: 'timeend' },
    { title: 'Print Time', align: 'start', key: 'timeprint' },
    { title: 'Date', align: 'start', key: 'date' },
    { title: 'Status', align: 'start', key: 'status' },
]);
const items = ref([]);

// Functie om de Firestore-database te laden
async function loadItems() {
    const querySnapshot = await getDocs(collection(db, "prints"));
    items.value = [];
    querySnapshot.forEach((doc) => {
        items.value.push({ id: doc.id, ...doc.data() });
    });
}

// Abonneer je op updates van de Firestore-collectie
function listenForChanges() {
    const unsub = onSnapshot(collection(db, "prints"), (querySnapshot) => {
        items.value = [];
        querySnapshot.forEach((doc) => {
            items.value.push({ id: doc.id, ...doc.data() });
        });
    });

    // Dit zorgt ervoor dat de listener kan worden gestopt als dat nodig is
    return unsub;
}

// Laad items wanneer de pagina wordt geladen (herstart of voor de eerste keer)
onMounted(async () => {
    await loadItems();
    listenForChanges();
});
</script>

<style scoped>
html,
body {
    margin: 0px;
    padding: 0;
    height: 100%;
}

.pa-2 {
    margin-inline: 12px;
}

.v-data-table-footer {
    margin-inline: 12px;
}

thead {
    background-color: #f9fafc;
}

tr>*>* {
    display: flex;
    justify-content: left;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-weight: 900;
    font-size: 1.02rem;
    color: #5a5b5c
}

.v-data-table__tr>*>*>* {
    display: flex;
    flex-direction: row;
    justify-content: left;
}

.v-data-table__td {
    color: black;
    font-weight: 200;
}
</style>
