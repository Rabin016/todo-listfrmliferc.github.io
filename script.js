const inputForm = document.getElementById('todoForm');
const ulList = document.getElementById('allList');
const input = document.getElementById('taskInput');
const alartDiv = document.getElementById('alart');
const filters = document.getElementById('filter');

loadEventListeners();

function loadEventListeners() {
    inputForm.addEventListener('submit', addToListFung);
    ulList.addEventListener('click', delTask);
    filters.addEventListener('keyup', sortBy);
    document.addEventListener('DOMContentLoaded', loadLS);
}

function loadLS() {
    let oldTask;
    if (localStorage.getItem('task')===null) {
        oldTask=[];
    }else {
        oldTask=JSON.parse(localStorage.getItem('task'));
    }
    oldTask.forEach(
        function (task) {
            const li = document.createElement('li');
            li.className = 'border border-gray-500 mb-2 px-3 py-2 rounded shadow flex justify-between font-semibold';
            ulList.appendChild(li);
            li.innerHTML = `${task} <i class="fas fa-times-circle my-auto text-blue-500 cursor-pointer hover:text-blue-600"></i>`;
        }
    )
}

function addToListFung(e) {
    const inputValue = input.value;
    if (inputValue === '') {
        alartDiv.innerHTML = `<p class="bg-red-200 text-red-700 py-1 px-2 rounded font-semibold flex justify-between">Please enter any task in "New Task"<i class="fas fa-times-circle my-auto text-red-700 cursor-pointer hover:text-red-800" onClick="delAlart()"></i></p>`;
    } else {
        const li = document.createElement('li');

        li.className = 'border border-gray-500 mb-2 px-3 py-2 rounded shadow flex justify-between font-semibold';

        ulList.appendChild(li);

        li.innerHTML = `${inputValue} <i class="fas fa-times-circle my-auto text-blue-500 cursor-pointer hover:text-blue-600"></i>`;

        let oldTask;
        if (localStorage.getItem('task')===null) {
            oldTask=[];
        }else {
            oldTask=JSON.parse(localStorage.getItem('task'));
        }
        oldTask.push(inputValue);
        localStorage.setItem('task', JSON.stringify(oldTask));

        alartDiv.innerHTML = `<p class="bg-green-200 text-green-700 py-1 px-2 rounded font-semibold flex justify-between">Your new task has been listed in To-do List<i class="fas fa-times-circle my-auto text-gray-700 cursor-pointer hover:text-green-800" onclick="delAlart()"></i></p>`;

        input.value = '';

    }

    e.preventDefault();
}

function delTask(e) {
    if (e.target.parentElement.classList.contains('flex')) {
        e.target.parentElement.remove();
    }
}

function delAlart() {
    alartDiv.removeChild(alartDiv.firstChild);
}

function clearList() {
    while (ulList.firstChild) {
        ulList.removeChild(ulList.firstChild);
    }
}

function sortBy() {
    const filterVal = filters.value.toLowerCase();
    ulList.querySelectorAll('li').forEach(
        function (task) {
            const listedValue = task.textContent;
            if (listedValue.toLowerCase().indexOf(filterVal) != -1) {
                task.style.display = 'flex';
            } else {
                task.style.display = 'none';
            }
        }
    )
}
