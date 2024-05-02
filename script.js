firebase.initializeApp({
    apiKey: "AIzaSyB75ibBXZ93NfGie0A9kiNXRzncgSoYhNA",
    authDomain: "plp-apps-f25ef.firebaseapp.com",
    projectId: "plp-apps-f25ef",
    storageBucket: "plp-apps-f25ef.appspot.com",
    messagingSenderId: "792222160315",
    appId: "1:792222160315:web:a702f403b1b1942a84e09e" 
});

const db = firebase.firestore();

//function to add tasks
function addTask(){
    const taskInput = document.getElementById("task-input");
    const task = taskInput.value.trim();
    if (task !== "") {
        db.collection("tasks").add({
            task: task,
            timestamp: firebase.firestore. FieldValue.serverTimestamp(),
        });
        taskInput.value = "";
        console.log("Task added.");
    }
}

// Function to render tasks(display our tasks on our html document)
function renderTasks(doc) {
    const taskList = document.getElementById("task-list");
    const taskItem = document.createElement("li");
    taskItem.className = "task-item"
    taskItem.innerHTML = `
    <span>${doc.data().task}</span>
    <button onclick="deleteTask('${doc.id}')">Delete</button>
    `;
    taskList.appendChild(taskItem);

}

// Real-time listener for tasks
db.collection("tasks")
.orderBy("timestamp", "desc")
.onSnapshot(snapshot => {
    const changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type === "added") {
            renderTasks(change.doc);
        }
    });
});

// Function to delete a task

function deleteTask(id) {
    db.collection("tasks").doc(id).delete();
    //location.reload();
}
