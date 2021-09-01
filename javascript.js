const addTaskBtn = document.getElementById("add-task-btn");
const deskTaskInput = document.getElementById("description-task");
const todosWrapper = document.querySelector(".todoList");
let counter = document.querySelector(".pendingNumb");
let lis = document.querySelectorAll(".aboutLi");
let done = document.getElementById("donaDo");



let tasks;
// !localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'))
if (!localStorage.tasks) {
    tasks = [];
} else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
}

let todoItemElems = [];

function Task(description) {
    this.description = description;
    this.completed = false;
}

const createTemplate = (task, index) => {
    return ` <li class="aboutLi ${task.completed ? "checked" : ""}">
        ${
            task.description
        } <input onclick="completeTask(${index})" type="checkbox" ${
        task.completed ? "checked" : ""
    }/><i onclick="deleteTask(${index})" 
            ><img src="./icon/litter.png" alt=""
        /></i>
        </li> `;
};

const filterTasks = () => {
    const activeTasks =
        tasks.length && tasks.filter((item) => item.completed == false);
    const completedTasks =
        tasks.length && tasks.filter((item) => item.completed == true);
    tasks = [...activeTasks, ...completedTasks];
};

const fillHtmlList = () => {
    todosWrapper.innerHTML = "";
    if (tasks.length > 0) {
        filterTasks();
        tasks.forEach((item, index) => {
            todosWrapper.innerHTML += createTemplate(item, index);
        });
        todoItemElems = document.querySelectorAll(".aboutLi");
    }
    counter.innerHTML = tasks.length;
};

fillHtmlList(); //?????

const updateLocal = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

const completeTask = (index) => {
    tasks[index].completed = !tasks[index].completed;
    if (tasks[index].completed) {
        todoItemElems[index].classList.add("checked");
    } else {
        todoItemElems[index].classList.remove("checked");
    }
    updateLocal();
    fillHtmlList();
};

function add() {
    let text = deskTaskInput.value;
    if (text !== "") {
        tasks.push(new Task(text));
        updateLocal();
        fillHtmlList(); //????????????????????????
        deskTaskInput.value = "";
    }
}

addTaskBtn.addEventListener("click", () => {
    add();
});

const deleteTask = (index) => {
    todoItemElems[index].classList.add("delition");
    setTimeout(() => {
        tasks.splice(index, 1);
        updateLocal();
        fillHtmlList();
    }, 500);
};
let clearAll = document.getElementById("clear");

clearAll.addEventListener("click", () => {
    tasks = [];
    localStorage.setItem("tasks", JSON.stringify(tasks));
    updateLocal();
    fillHtmlList();
});

done.addEventListener("click", () => {
    tasks.forEach((item) => {
        item.completed = true;
    });
    updateLocal();
    fillHtmlList();
});
deskTaskInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        add();
    }
});
let returnAll = document.getElementById("reCall");

returnAll.addEventListener("click", () => {
    tasks.forEach((item) => {
        item.completed = false;
    });
    updateLocal();
    fillHtmlList();
});
