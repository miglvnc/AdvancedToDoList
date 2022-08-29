const mainFunction = () => {
    prepareDOMElements();
    
    prepareDOMEvents();
    
    btnsDisabledCheck();
    
    dateTimePicker();
}

function prepareDOMElements(){
    $toDoInput = document.querySelector('.toDoInput');
    $dateInput = document.querySelector('.dateInput')
    $addNewTask = document.querySelector('.addBtn');
    $alertInfo = document.querySelector('.alertInfo');
    $listContainer = document.querySelector('.listContainer');
    $defaultTask = document.querySelector('.taskContainer');
    $ulList = $listContainer.querySelector('ul');

    $completeBtn = document.querySelector('.complete')

    let allTasks;
    let allCompleteBtns;
    let allEditBtns;
    let allRemoveBtns;

    let currentTask;
    let currentDate;

    let timer;

    let remaining;



    popUpTools = document.querySelector('.popUpEditTask');
    popUpEditSmallDev = document.querySelector('.popUpTools');

    sortFilterBtns = document.querySelectorAll('.sortFilterBtn');

    $finishedTasksBtn = document.querySelector('.onlyDone');
    $currentTasksBtn = document.querySelector('.onlyActive');
    $allTasksBtn = document.querySelector('.showAll');

    $sortByTime = document.querySelector('.sortByTime');
    $sortByName = document.querySelector('.sortByName');
    
}

function prepareDOMEvents(){
    $addNewTask.addEventListener('click', tasksManipulate);
    $toDoInput.addEventListener('keyup', enterConfirm);

    $finishedTasksBtn.addEventListener('click', filterFinished);
    $currentTasksBtn.addEventListener('click', filterCurrent);
    $allTasksBtn.addEventListener('click', removeFilters);

    $sortByTime.addEventListener('click', sortByTime)
    $sortByName.addEventListener('click', sortByName)

    // $ulList.addEventListener('click', checkToolsClick)
};

function tasksManipulate () {
    addNewTask();
};

function filterFinished(){
    btnsRemoveStyleClass('filter');
    $finishedTasksBtn.classList.add('btnActive')
    
    let allTasks = $listContainer.querySelectorAll('li');
    allTasks.forEach(task => {
        if (!task.classList.contains('taskDone')) {
            task.classList.add('taskFinishedFilter')
        } else if (task.classList.contains('taskDone')) {
            task.classList.remove('taskFinishedFilter')
        }
    });

    arrAllTasks = Array.from(allTasks);
    // arrAllTasks.pop(); // pop sample task
    let checkAlertInfo = arrAllTasks.every(element => element.classList.contains('taskFinishedFilter'))

    console.log(checkAlertInfo);

    if (!checkAlertInfo) {
        $alertInfo.style.display = "none";
    } else {
        $alertInfo.style.display = "inline-block";
        $alertInfo.innerHTML = "All tasks are pending!"
    }


};

function filterCurrent(){
    btnsRemoveStyleClass('filter');
    $currentTasksBtn.classList.add('btnActive')
    
    let allTasks = $listContainer.querySelectorAll('li');
    allTasks.forEach(task => {
        if (task.classList.contains('taskDone')) {
            task.classList.add('taskFinishedFilter')
        } else if (!task.classList.contains('taskDone')) {
            task.classList.remove('taskFinishedFilter')
        }
    });

    arrAllTasks = Array.from(allTasks);
    // arrAllTasks.pop(); // pop sample task
    let checkAlertInfo = arrAllTasks.every(element => element.classList.contains('taskFinishedFilter'))

    console.log(checkAlertInfo);

    if (checkAlertInfo) {
        $alertInfo.style.display = "inline-block";
        $alertInfo.innerHTML = "All tasks are finished!"
    } else {
        $alertInfo.style.display = "none";
    }
};

function removeFilters(){
    btnsRemoveStyleClass('filter');
    $allTasksBtn.classList.add('btnActive')
    
    let allTasks = $listContainer.querySelectorAll('li');
    allTasks.forEach(task => {
        console.log(task);
        task.classList.remove('taskFinishedFilter')
    });

    if (allTasks.length > 0) {
        $alertInfo.style.display = "none"
    }

};

function btnsRemoveStyleClass(check){
    if (check === 'filter') {
        $finishedTasksBtn.classList.remove('btnActive');
        $currentTasksBtn.classList.remove('btnActive');
        $allTasksBtn.classList.remove('btnActive');
    } else if (check === 'sort') {
        $sortByTime.classList.remove('btnActive');
        $sortByName.classList.remove('btnActive');
    }
};

function sortBtnsRemoveStyleClass(){
    $finishedTasksBtn.classList.remove('btnActive')
    $currentTasksBtn.classList.remove('btnActive')
    $allTasksBtn.classList.remove('btnActive')
};

function btnsDisabledCheck() {
    let allTasks = $listContainer.querySelectorAll('li')
    if (allTasks.length <= 0) {
        sortFilterBtns.forEach(btn=> {
            btn.setAttribute('disabled', 'disabled')
            btn.style.cursor = "not-allowed"
            removeFilters();
        });
    } else {
        sortFilterBtns.forEach(btn=> {
            btn.removeAttribute('disabled', 'disabled')
            btn.style.cursor = "pointer"
        });
    }

};

function sortByTime() {
    btnsRemoveStyleClass('sort')
    $sortByTime.classList.add('btnActive');
    let taskList = $listContainer.querySelector('#taskList');
        [...taskList.children].sort(function (a, b) {
            if (a.classList.contains('taskDone')) {
                return 1
            } else if (b.classList.contains('taskDone')) {
                return -1
            } else {
                if (a.value > b.value) {
                    return 1
                } else {
                    return -1
                }
            }
        })
        .forEach((node) => taskList.appendChild(node))

};
function sortByName() {
    btnsRemoveStyleClass('sort')
    $sortByName.classList.add('btnActive');
    let taskList = $listContainer.querySelector('#taskList');
    // console.log(a.children[0].children[2].innerText = "Exceeded!");
    [...taskList.children].sort(function (a, b) {
            if (a.children[1].children[0].value > b.children[1].children[0].value) {
                return 1
            } else {
                return -1
            }
        })
        .forEach((node) => taskList.appendChild(node))

};


function alertInfoCheck() {
    let allTasks = $listContainer.querySelectorAll('li');
    console.log(allTasks.length);
    if (allTasks.length <= 0){
        $alertInfo.style.display = "inline-block";
        $alertInfo.innerHTML = "Add your first task!";
    }
};

let $idNumber = 0; // for new id for task

function addNewTask () {
    if ($toDoInput.value !== "" && $dateInput.value !== "") {
        $alertInfo.style.display = "none"
        $idNumber++;
        $newTaskContainer = $defaultTask.cloneNode(true);
        $newTaskContainer.setAttribute('id', `task-${$idNumber}`)

        //name
        let name = $newTaskContainer.querySelector('.task');
        name.value = $toDoInput.value;

        //deadline
        let date = $newTaskContainer.querySelector('.deadline');
        const newDate = new Date($dateInput.value);
        let dateString = newDate.toUTCString();

        date.innerText = dateString.slice(0, dateString.length-7);

        //time remaining
        timeCounter($newTaskContainer, $dateInput.value);
 
        //add task to list
        $newTaskContainer.classList.add('animateTask')
        $ulList.prepend($newTaskContainer);

        //clear input
        $toDoInput.value = "";
        $alertInfo.innerText = "";

        // allTasks = $ulList.querySelectorAll('li');
        completeBtn = $newTaskContainer.querySelector('.complete');
        editBtn = $newTaskContainer.querySelector('.edit');
        removeBtn = $newTaskContainer.querySelector('.remove');

        dateTimePicker();

        deleteForm = $newTaskContainer.querySelectorAll('.dateInput');

        // dateTimePicker duplicate inputs, so 2 of them is removed.
        deleteForm[2].remove();
        deleteForm[3].remove();
        
        completeBtn.addEventListener('click', function(){

            getThisContainers(this);

            taskContainer.classList.toggle('taskDone');
            taskContainer.querySelector('.timeleft').classList.toggle('taskDoneDate');
            taskContainer.querySelector('.date').classList.toggle('dateTaskDone');

            let allBtns = tools.children;

            for (i = 0; i < allBtns.length; i++) {
                allBtns[i].classList.toggle('btnBackground');
            }
            
            if (taskContainer.querySelector('.timeleft').innerHTML !== "Done!") {
                taskContainer.querySelector('.timeleft').innerHTML = "Done!";
            } else {
                taskContainer.querySelector('.timeleft').innerHTML = "Counting...";
            }

            filterActiveActionCheck();
        })

        removeBtn.addEventListener('click', function(){

            getThisContainers(this);

            taskContainer.classList.add('removeTask');

            setTimeout(function(){
                taskContainer.remove();
                alertInfoCheck();
                btnsDisabledCheck();
                filterActiveActionCheck();
            }, 450)
        })

        editBtn.addEventListener('click', function(){

            getThisContainers(this);

            if(this.innerHTML == "edit") {
                this.innerHTML = 'save';
                name.removeAttribute('readonly');
                name.classList.add('editActive');
                name.focus();

                taskContainer.querySelectorAll('.dateInput')[0].classList.remove('hideDateInput');
                taskContainer.querySelectorAll('.dateInput')[1].classList.remove('hideDateInput');
                taskContainer.querySelector('.deadline').classList.add('hideDeadline');       
                
                tools.querySelector('.complete').classList.add('btnHide');
                
            } else {
                name.setAttribute('readonly', 'readonly');
                this.innerHTML = 'edit';
                name.classList.remove('editActive');
                
                this.parentElement.querySelector('.complete').classList.remove('btnHide');
                
                taskContainer.querySelectorAll('.dateInput')[0].classList.add('hideDateInput');
                taskContainer.querySelectorAll('.dateInput')[1].classList.add('hideDateInput');
                taskContainer.querySelector('.deadline').classList.remove('hideDeadline');
                
                // console.log(this.parentElement.parentElement.parentElement.querySelectorAll('.dateInput'));
                if(taskContainer.querySelectorAll('.dateInput')[0].value !== ""){
                    const newDate = new Date(taskContainer.querySelectorAll('.dateInput')[0].value);
                    let dateString = newDate.toUTCString();
                    
                    taskContainer.querySelector('.deadline').innerHTML = dateString.slice(0, dateString.length-7);

                    clearInterval(timer)
                    timeCounter(taskContainer, taskContainer.querySelectorAll('.dateInput')[0].value);
                }
            }
        })

        filterActiveActionCheck();
        btnsDisabledCheck();

        btnsRemoveStyleClass('sort');
        
    } else {
        $alertInfo.innerText = "Type task name and pick deadline!"
    }
    
};

function timeCounter(thisTimeContainer, dateInput) {

    let timeleftContainer = thisTimeContainer.querySelector('.timeleft');
    let endDate = new Date(dateInput).getTime();

    console.log(timeleftContainer);
    
    timer = setInterval(function() {
        let now = new Date().getTime();
        remaining = endDate - now;

        timeleftContainer.parentElement.parentElement.value = remaining; // for sorting by time purpose, original value of time remaining
    
        if (remaining >= 0 && timeleftContainer.innerHTML !== "Done!") {
            let days = Math.floor(remaining / (1000*60*60*24));
            let hours = Math.floor((remaining % (1000*60*60*24)) / (1000*60*60));
            let mins = Math.floor(((remaining % (1000 * 60 * 60)) / (1000 * 60)));
            let secs = Math.floor((remaining % (1000 * 60)) / 1000);

            timeCounterConditions(timeleftContainer, days, hours, mins, secs);
                    
        } else if (remaining <= 0 && timeleftContainer.innerHTML !== "Done!") {
            timeleftContainer.innerHTML = "Exceeded!"
            timeleftContainer.classList.add('exceeded')
            timeleftContainer.classList.remove('hourLeft')
        }
            
    }, 1000)
};
 
function timeCounterConditions (timeleftContainer, days, hours, mins, secs) {
    if (days+hours+mins === 0) {
        timeleftContainer.innerHTML = ("0" + secs).slice(-2) + " seconds!"
    } else if (days+hours === 0) {
        timeleftContainer.innerHTML = ("0" + mins).slice(-2) + "m, " + ("0" + secs).slice(-2) + "s"
    } else if (days === 0) {
        timeleftContainer.innerHTML = ("0" + hours).slice(-2) + "h, " + ("0" + mins).slice(-2) + "m"
    } else {
        timeleftContainer.innerHTML = days + "d, " + ("0" + hours).slice(-2) + "h, " + ("0" + mins).slice(-2) + "m"
    }

    if(days === 0 && hours < 1) {
        timeleftContainer.classList.add('hourLeft')
    }
};

function enterConfirm() {
    if (event.key === "Enter") {
        addNewTask();
    }
};

// date time picker
const dateTimePicker = () => {
    dateTimeConfig = {
        enableTime: true,
        altInput: true,
        time_24hr: true,
        altFormat: "F j, Y (H:i)",
        minDate: "today",
    }
    
    flatpickr(".dateInput", dateTimeConfig
    );
    // flatpickr(addNewTask, dateTimeConfig
    // );
};

const dateTimePickerEdit = () => {
    dateTimeConfig = {
        enableTime: true,
        altInput: true,
        time_24hr: true,
        altFormat: "F j, Y (H:i)",
        minDate: "today",
    }
    
    flatpickr(".dateInput", dateTimeConfig
    );
    // flatpickr(addNewTask, dateTimeConfig
    // );
};

function getThisContainers(el){
    tools = el.parentElement;
    taskWrapper = tools.parentElement;
    taskContainer = taskWrapper.parentElement
};

function filterActiveActionCheck(){
    if ($finishedTasksBtn.classList.contains('btnActive')) {
        filterFinished();
    } else if ($currentTasksBtn.classList.contains('btnActive')) {
        filterCurrent();
    };
};

document.addEventListener("DOMContentLoaded", mainFunction)




