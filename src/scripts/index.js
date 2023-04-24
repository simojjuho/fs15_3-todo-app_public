//TODO: if time, check the animation, when opening the form

//Variables

let addItemBtn = document.getElementById('add-item-btn')
let form = document.getElementById('section__form')
let taskInput = document.getElementById('task-input')
let deadlineInput = document.getElementById('deadline-input')
let statusInput = document.getElementById('status-input')
let cancelBtn = document.getElementById('cancel-btn')
let confirmBtn = document.getElementById('confirm-btn')
let itemsContainer = document.getElementById('items__container')
let tasks = []

//Event listeners

//Open form
addItemBtn.addEventListener('click', function() {
    form.classList.toggle('active')
    addItemBtn.style.display = 'none'
})

//Close form
cancelBtn.addEventListener('click', function (e) {
    e.preventDefault()
    form.classList.toggle('active')
    emptyFields()
    addItemBtn.style.display = 'block'
})

confirmBtn.addEventListener('click', function(e){
    e.preventDefault()
    const newObject = createObject();
    const newElement = createElement(newObject)
    itemsContainer.appendChild(newElement)
})

// Fuctions


//Creating the object from values in the form.
function createObject (){
    const newObject = {
        id: createId(),
        task: taskInput.value,
        deadline: deadlineInput.value,
        status: statusInput.value
    }
    emptyFields()
    tasks = [...tasks, newObject]
    return newObject;
}
// Creating the element to store.
function createElement (object){
    const newElem = document.createElement('li')
    newElem.classList.add('items__container__task')
    const borderColor = getBorderColor(object.status)
    const newDiv = document.createElement('div')
    newDiv.style.borderLeft = `3px solid ${borderColor}`
    newDiv.innerHTML = `<h2>${object.task}</h2>Deadline: ${object.deadline}`
    newElem.appendChild(newDiv)
    return newElem;
}

//Create id for the new object
function createId(){
    if(tasks.length === 0) return 0;
    console.log(tasks)
    return tasks[tasks.length - 1].id + 1
}

// Emptying the input fields after storing their values
function emptyFields() {
    taskInput.innerText = ''
    deadlineInput.innerText = ''
}

// Gets border color for the element.
function getBorderColor(status){
    return status === 'Not started'
        ? 'red'
        : status === 'In progress'
        ? 'yellow'
        :'green'
}