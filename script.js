import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import {
    getDatabase,
    ref,
    push,
    onValue,
    remove
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";

// Firebase Config
const firebaseConfig = {
    databaseURL: "https://grocery-list-9aeb2-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Database Reference
const groceryListInDB = ref(database, "grocery-list");

// DOM Elements
const inputEl = document.getElementById("grocery-input");
const addBtn = document.getElementById("add-btn");
const deleteAllBtn = document.getElementById("delete-all-btn");
const groceryList = document.getElementById("grocery-list");

// Add Item
addBtn.addEventListener("click", function () {

    let input = inputEl.value.trim();

    if (input === "") {
        alert("Please enter an item!");
        return;
    }

    push(groceryListInDB, input);

    inputEl.value = "";
});

// Display Items
onValue(groceryListInDB, function (snapshot) {

    groceryList.innerHTML = "";

    if (snapshot.exists()) {

        let items = Object.values(snapshot.val());

        for (let item of items) {

            groceryList.innerHTML += `
                <li>${item}</li>
            `;
        }

    } else {

        groceryList.innerHTML = `
            <li>No items here... yet</li>
        `;
    }
});

// Delete All Items
deleteAllBtn.addEventListener("dblclick", function () {

    remove(groceryListInDB);

    alert("All items deleted!");
});