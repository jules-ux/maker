<template>
    <v-data-table :headers="headers" :items="items" :search="search" item-value="name" class="main">
        <!-- Checkbox kolom -->
        
        <template v-slot:body="{ items }">
            <tr v-for="item in items" :key="item.id">
                <td>{{ item.namefirst }}</td>
                <td>{{ item.namelast }}</td>
                <td>{{ item.printer }}</td>
                <td>{{ item.email }}</td>
                <td>{{ item.timestart }}</td>
                <td>{{ item.timeend }}</td>
                <td>{{ item.timeprint }}</td>
                <td>{{ item.date }}</td>
                <td>
                    <v-chip :color="item.status === 'Active' ? 'green' : 'red'" label dark>
                        {{ item.status }}
                    </v-chip>
                </td>
            </tr>
        </template>
    </v-data-table>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, onSnapshot, deleteDoc, doc } from "firebase/firestore";

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
    { title: 'First Name', key: 'namefirst', align: 'start' },
    { title: 'Last Name', key: 'namelast', align: 'start' },
    { title: 'Printer', key: 'printer', align: 'start' },
    { title: 'Email', key: 'email', align: 'start' },
    { title: 'Start Time', key: 'timestart', align: 'start' },
    { title: 'End Time', key: 'timeend', align: 'start' },
    { title: 'Print Time', key: 'timeprint', align: 'start' },
    { title: 'Date', key: 'date', align: 'start' },
    { title: 'Status', key: 'status', align: 'start' },
]);
const items = ref([]);
const selectedItems = ref([]);

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
    onSnapshot(collection(db, "prints"), (querySnapshot) => {
        items.value = [];
        querySnapshot.forEach((doc) => {
            items.value.push({ id: doc.id, ...doc.data() });
        });
    });
}

// Verwijder geselecteerde items uit Firestore
async function deleteSelected() {
    for (const id of selectedItems.value) {
        await deleteDoc(doc(db, "prints", id));
    }
    selectedItems.value = [];
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
    margin: 0;
    padding: 0;
    height: 100%;
}

.main {
    margin: 0px;
}

.v-data-table th {
    text-align: left;
}

.v-btn {
    margin-bottom: 16px;
}



</style>