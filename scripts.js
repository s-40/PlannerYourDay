const calendarBody = document.getElementById('calendar-body');
const currentMonthDisplay = document.getElementById('currentMonth');
const prevMonthButton = document.getElementById('prevMonth');
const nextMonthButton = document.getElementById('nextMonth');
const tasks = {};

const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
];

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let currentMonth = new Date();

function updateCalendar() {
    currentMonthDisplay.innerText = months[currentMonth.getMonth()] + ' ' + currentMonth.getFullYear();
    calendarBody.innerHTML = '';
    
    const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

    let date = new Date(firstDay);
    date.setDate(1 - date.getDay());

    while (date <= lastDay) {
        const row = document.createElement('tr');
        for (let i = 0; i < 7; i++) {
            const cell = document.createElement('td');
            cell.innerText = date.getDate();
            row.appendChild(cell);
            date.setDate(date.getDate() + 1);
        }
        calendarBody.appendChild(row);
    }
}

prevMonthButton.addEventListener('click', () => {
    currentMonth.setMonth(currentMonth.getMonth() - 1);
    updateCalendar();
});

nextMonthButton.addEventListener('click', () => {
    currentMonth.setMonth(currentMonth.getMonth() + 1);
    updateCalendar();
});

updateCalendar();

function openTaskWindow(date) {
    const taskWindow = document.getElementById('taskWindow');
    const p1Value = document.getElementById('p1Value');
    const p2Value = document.getElementById('p2Value');
    const taskList = document.getElementById('taskList');

    p1Value.textContent = months[currentMonth.getMonth()] + ' ' + currentMonth.getFullYear();
    p2Value.textContent = date;

    taskList.innerHTML = '';

    if (tasks[date]) {
        tasks[date].forEach(task => {
            const taskItem = document.createElement('tr');
            taskItem.innerHTML = `<td>${task}</td>`;
            taskList.appendChild(taskItem);
        });
    }

    taskWindow.style.display = 'block';
}

const dayNumbers = document.querySelectorAll('td div');

dayNumbers.forEach(number => {
    number.addEventListener('click', () => {
        const date = number.textContent;
        openTaskWindow(`${currentMonth.getFullYear()}-${currentMonth.getMonth() + 1}-${date}`);
    });
});


function openTaskManagerTab(dayOfWeek, month, year) {
    const taskManagerURL = `planner.html?dayOfWeek=${dayOfWeek}&month=${month}&year=${year}`;
    window.open(taskManagerURL, '_blank');
}

calendarBody.addEventListener('click', (e) => {
    const cell = e.target.closest('td');
    if (cell && cell.innerText.trim() !== "") {
        const selectedDate = cell.innerText;
        const dayOfWeek = days[cell.cellIndex === 0 ? 6 : cell.cellIndex - 0]; // Determine the day of the week
        const month = months[currentMonth.getMonth()];
        const year = currentMonth.getFullYear();
        openTaskManagerTab(dayOfWeek, month, year);
    }
});