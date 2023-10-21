function getQueryParameter(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const dayOfWeek = getQueryParameter('dayOfWeek');
const month = getQueryParameter('month');
const year = getQueryParameter('year');

const dayOfWeekElement = document.getElementById('dayOfWeek');
const monthElement = document.getElementById('month');
const yearElement = document.getElementById('year');

dayOfWeekElement.textContent = dayOfWeek;
monthElement.textContent = month;
yearElement.textContent = year;


const selectedDate = getQueryParameter('date');

const dateElement = document.getElementById('selectedDate');
dateElement.textContent = selectedDate;


window.addEventListener("message", function (e) {
    if (e.origin === window.location.origin) {
        const selectedDate = e.data;
    }
});

function addTask() {
    const newTaskInput = document.getElementById("newTask");
    const taskList = document.getElementById("taskList");

    const taskText = newTaskInput.value.trim();

    newTaskInput.value = "";

    if (taskText !== "") {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <label>
                <input type="checkbox">
                ${taskText}
            </label>
        `;

        taskList.appendChild(listItem);
    }
}
