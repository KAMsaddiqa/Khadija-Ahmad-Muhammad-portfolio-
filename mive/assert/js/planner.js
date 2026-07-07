/* ==========================================
   ACADEMIC PLANNER
========================================== */

const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const searchTask = document.getElementById("searchTask");

let tasks = JSON.parse(localStorage.getItem("plannerTasks")) || [];
let currentFilter = "all";

/* ==========================================
   SAVE & LOAD
========================================== */

function saveTasks() {
    localStorage.setItem("plannerTasks", JSON.stringify(tasks));
}

function loadTasks() {
    renderTasks();
    updateDashboard();
}

/* ==========================================
   ADD TASK
========================================== */

if (taskForm) {

    taskForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const title = document.getElementById("taskTitle").value.trim();
        const category = document.getElementById("taskCategory").value;
        const priority = document.getElementById("taskPriority").value;
        const dueDate = document.getElementById("taskDate").value;

        if (!title || !dueDate) {
            alert("Please complete all required fields.");
            return;
        }

        const task = {

            id: Date.now(),

            title,

            category,

            priority,

            dueDate,

            completed: false

        };

        tasks.unshift(task);

        saveTasks();

        renderTasks();

        updateDashboard();

        taskForm.reset();

    });

}

/* ==========================================
   RENDER TASKS
========================================== */

function renderTasks() {

    if (!taskList) return;

    taskList.innerHTML = "";

    let filtered = [...tasks];

    if (currentFilter === "completed") {

        filtered = filtered.filter(task => task.completed);

    }

    if (currentFilter === "pending") {

        filtered = filtered.filter(task => !task.completed);

    }

    const keyword = searchTask ? searchTask.value.toLowerCase() : "";

    if (keyword !== "") {

        filtered = filtered.filter(task =>
            task.title.toLowerCase().includes(keyword)
        );

    }

    if (filtered.length === 0) {

        taskList.innerHTML = `
            <div class="card">
                <h3>No Tasks Found</h3>
                <p>Add a new academic task to begin.</p>
            </div>
        `;

        return;
    }

    filtered.forEach(task => {

        const item = document.createElement("div");

        item.className = task.completed ? "task completed" : "task";

        item.innerHTML = `

            <div class="task-header">

                <div>

                    <h3>${task.title}</h3>

                    <p>

                        <strong>Category:</strong> ${task.category}

                    </p>

                    <p>

                        <strong>Priority:</strong> ${task.priority}

                    </p>

                    <p>

                        <strong>Due:</strong> ${task.dueDate}

                    </p>

                </div>

                <div class="task-buttons">

                    <button class="complete-btn"
                        onclick="toggleTask(${task.id})">

                        ${task.completed ? "Undo" : "Complete"}

                    </button>

                    <button class="edit-btn"
                        onclick="editTask(${task.id})">

                        Edit

                    </button>

                    <button class="delete-btn"
                        onclick="deleteTask(${task.id})">

                        Delete

                    </button>

                </div>

            </div>

        `;

        taskList.appendChild(item);

    });

}

/* ==========================================
   COMPLETE TASK
========================================== */

function toggleTask(id) {

    tasks = tasks.map(task => {

        if (task.id === id) {

            task.completed = !task.completed;

        }

        return task;

    });

    saveTasks();

    renderTasks();

    updateDashboard();

}

/* ==========================================
   DELETE TASK
========================================== */

function deleteTask(id) {

    if (!confirm("Delete this task?")) return;

    tasks = tasks.filter(task => task.id !== id);

    saveTasks();

    renderTasks();

    updateDashboard();

}

/* ==========================================
   EDIT TASK
========================================== */

function editTask(id) {

    const task = tasks.find(task => task.id === id);

    if (!task) return;

    const newTitle = prompt("Edit Task", task.title);

    if (newTitle === null) return;

    if (newTitle.trim() === "") return;

    task.title = newTitle.trim();

    saveTasks();

    renderTasks();

}

/* ==========================================
   SEARCH
========================================== */

if (searchTask) {

    searchTask.addEventListener("keyup", renderTasks);

}

/* ==========================================
   FILTER BUTTONS
========================================== */

document.querySelectorAll(".filter-btn").forEach(button => {

    button.addEventListener("click", function () {

        currentFilter = this.dataset.filter;

        document.querySelectorAll(".filter-btn").forEach(btn => {

            btn.classList.remove("btn");

            btn.classList.add("btn-outline");

        });

        this.classList.remove("btn-outline");

        this.classList.add("btn");

        renderTasks();

    });

});

/* ==========================================
   DASHBOARD
========================================== */

function updateDashboard() {

    const total = tasks.length;

    const completed = tasks.filter(task => task.completed).length;

    const pending = total - completed;

    const percentage = total === 0
        ? 0
        : Math.round((completed / total) * 100);

    document.getElementById("totalTasks").textContent = total;

    document.getElementById("completedTasks").textContent = completed;

    document.getElementById("pendingTasks").textContent = pending;

    document.getElementById("completionRate").textContent =
        percentage + "%";

    const progress = document.getElementById("plannerProgress");

    const progressText = document.getElementById("progressText");

    if (progress) {

        progress.style.width = percentage + "%";

    }

    if (progressText) {

        progressText.textContent =
            percentage + "% Completed";

    }

}

/* ==========================================
   INITIALIZE
========================================== */

loadTasks();