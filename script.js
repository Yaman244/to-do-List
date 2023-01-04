let inputField = document.getElementById('new-task');
let addButton = document.getElementById('add');

let tasksParent = document.getElementById('tasks-list');
//let tasks = document.querySelectorAll('#tasks-list li ');




let taArr = [];
if(localStorage.getItem('item')){
    taArr = JSON.parse(localStorage.getItem('item'))
}


getDataFromLocal();



addButton.onclick = () => {
    if(inputField.value){
        addElementToArray(inputField.value);
        inputField.value = "";
    } 
    deletTaskwith()
}

function addElementToArray(val) {
    const task = {
        id : Date.now(),
        text : val,
        completed: false
    }
    taArr.push(task);
    addElementToList(taArr);
    addTasksTolocalStorage(taArr);
    deletTaskwith(taArr)
    
}




function addElementToList(elements) {
    tasksParent.innerHTML = "";
    elements.forEach(e => {
        let card = document.createElement('li');
            if(e.completed){
                card.innerHTML = `<button class="delet " data-id="${e.id}"> X </button>
            <input type="checkbox" name="done" class="done" id='${e.id}' checked>
            <p class="task">${e.text}</p>`;
            } else {
                card.innerHTML = `<button class="delet" data-id="${e.id}"> X </button>
            <input type="checkbox" name="done" class="done" id='${e.id}' >
            <p class="task">${e.text}</p>`;
            }
        tasksParent.appendChild(card);
    });
    checkChecked(elements);
};


function addTasksTolocalStorage(arr) {
    window.localStorage.setItem('item', JSON.stringify(taArr))
};

function getDataFromLocal() {
    let lsData = window.localStorage.getItem('item');
    if(lsData){
        tasks = JSON.parse(lsData);
        addElementToList(tasks)
        deletTaskwith(tasks)
    }
    
};

function checkChecked(modifyingArry) {
    modifyingArry.forEach(e => {
        let checkbox = document.getElementById(`${e.id}`);
        checkbox.addEventListener('change' , () => {
            if(e.completed){
                e.completed = false;
                checkbox.setAttribute('checked', '')
            }else {
                e.completed = true;
                checkbox.removeAttribute('checked')
            }
            addTasksTolocalStorage(taArr)
        })
    })
};
checkChecked(taArr);

function deletTaskwith(taskid){
    taArr = taArr.filter( task => task.id != taskid)
    addTasksTolocalStorage(taArr);
    console.log(taArr)


    let deletTask = document.querySelectorAll('.delet');

    deletTask.forEach(elem => {
        elem.addEventListener('click', (e) =>{
            deletTaskwith(e.target.dataset.id)
            e.target.parentElement.remove();
            console.log(e.target.dataset.id)
        })  
    })
}




let clear = document.querySelector('.clear');

clear.addEventListener('click', () => {
    taArr = [];
    addElementToList(taArr)
    addTasksTolocalStorage(taArr)
})