let $idNumber = 0

const mainFunction = () => {
    prepareDOMElements();
    prepareDOMEvents();
    
    dateTimePicker();
}

function prepareDOMElements(){
    $toDoInput = document.querySelector('.toDoInput');
    $dateInput = document.querySelector('.dateInput')
    $addNewTask = document.querySelector('.addBtn');
    $alertInfo = document.querySelector('.alertInfo');
    $listContainer = document.querySelector('.listContainer');
    $defaultTask = $listContainer.querySelector('.taskContainer');
    $ulList = $listContainer.querySelector('ul');
    // let $idNumber = 0;
}

function prepareDOMEvents(){
    $addNewTask.addEventListener('click', addNewTask)
    $toDoInput.addEventListener('keyup', enterConfirm)
}

function addNewTask () {
    if ($toDoInput.value !== "") {
        $idNumber++;
        $newTaskContainer = $defaultTask.cloneNode(true);
        $newTaskContainer.setAttribute('id', `task-${$idNumber}`)

        //name
        let name = $newTaskContainer.querySelector('.task');
        name.innerText = $toDoInput.value;

        //deadline
        let date = $newTaskContainer.querySelector('.deadline');
        const newDate = new Date($dateInput.value);
        let dateString = newDate.toUTCString();

        date.innerText = dateString.slice(0, dateString.length-7);

        //time remaining
        timeCounter();

        $ulList.appendChild($newTaskContainer);

        $toDoInput.value = "";
        $alertInfo.innerText = "";

    } else {
        $alertInfo.innerText = "Type task name!"
    }
}

        function timeCounter() {
            let timeleftContainer = $newTaskContainer.querySelector('.timeleft');
            let endDate = new Date($dateInput.value).getTime();
    
            console.log($dateInput.value);
    
            let timer = setInterval(function() {
                let now = new Date().getTime();
                let remaining = endDate - now;
    
                if (remaining >= 0) {
                    let days = Math.floor(remaining / (1000*60*60*24));
                    let hours = Math.floor((remaining % (1000*60*60*24)) / (1000*60*60));
                    let mins = Math.floor(((remaining % (1000 * 60 * 60)) / (1000 * 60)));
                    let secs = Math.floor((remaining % (1000 * 60)) / 1000);
    
                    console.log(days, hours, mins);
    
                    if (days+hours+mins === 0) {
                        timeleftContainer.innerHTML = ("0" + secs).slice(-2) + "seconds!"
                    } else if (days+hours === 0) {
                        timeleftContainer.innerHTML = ("0" + mins).slice(-2) + "m, " + ("0" + secs).slice(-2) + "s"
                    } else if (days === 0) {
                        timeleftContainer.innerHTML = ("0" + hours).slice(-2) + "h, " + ("0" + mins).slice(-2) + "m"
                    } else {
                        timeleftContainer.innerHTML = days + "d, " + ("0" + hours).slice(-2) + "h, " + ("0" + mins).slice(-2) + "m"
                    }
                }
            
    
            }, 1000)
        }


function taskModify (newTaskContainer) {
    // let name = $listContainer
}


function enterConfirm() {
    if (event.keyCode === 13) {
        addNewTask();
    }
}

// date time picker
const dateTimePicker = () => {
    dateTimeConfig = {
        enableTime: true,
        altInput: true,
        time_24hr: true,
        altFormat: "F j, Y (H:i)",
        minDate: "today",
    }
    
    flatpickr("#datetime", dateTimeConfig
    );
}

document.addEventListener("DOMContentLoaded", mainFunction)

