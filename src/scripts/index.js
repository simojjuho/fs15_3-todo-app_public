//Variables

let addItemBtn = document.getElementById('add-item-btn')
let form = document.getElementById('section__form')
let taskInput = document.getElementById('task-input')
let deadlineInput = document.getElementById('deadline-input')
let statusInput = document.getElementById('status-input')
let cancelBtn = document.getElementById('cancel-btn')
let confirmBtn = document.getElementById('confirm-btn')
let itemsContainer = document.getElementById('items__container')
let taskAmount = document.getElementById('task-amount')
let singleTasks = document.getElementsByClassName('items__container__task')
let tasks = []
let amountOfTasks = tasks.length

//Event listeners

window.addEventListener('load', function(){
    //I know this is a bit overkill for this app but had to do it just because
    taskAmount.innerText = amountOfTasks
})

//This could be either here or in the functions part. Now it's here.
function assignTaskListeners() {
    console.log(singleTasks);
    Array.from(singleTasks).forEach((elem) => {
      const toggleActiveTask = () => {
        elem.classList.toggle("active-task");
        addItemBtn.style.display = "none";
        form.style.display = "none";
        console.log(this);
        const editBtn = createButton("edit");
        assignEditListener(editBtn);
        const deleteBtn = createButton("delete");
        assignDelListener(deleteBtn);
        elem.appendChild(editBtn);
        elem.appendChild(deleteBtn);
        elem.removeEventListener("click", toggleActiveTask);
      };
      elem.addEventListener("click", toggleActiveTask);
    });
  }



function assignEditListener(button){
    button.addEventListener('click', function(){
       
    })
}

const newElem = createElement({id: 1, task: "Do better", deadline: 2023-04-25})
itemsContainer.appendChild(newElem)
assignTaskListeners()



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

// Add a new task item
confirmBtn.addEventListener('click', function(e){
    e.preventDefault()
    const newObject = createObject();
    const newElement = createElement(newObject)
    itemsContainer.appendChild(newElement)
    assignTaskListeners()
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
    const newH2 = createTextElement(object.task, 'h2')
    const newPrg = createTextElement(`Deadline: ${object.deadline}`, 'p')
    newDiv.appendChild(newH2)
    newDiv.appendChild(newPrg)
    newElem.appendChild(newDiv)
    return newElem;
}

//Create id for the new object
function createId(){
    if(tasks.length === 0) return 0;
    return tasks[tasks.length - 1].id + 1
}

// Emptying the input fields after storing their values
function emptyFields() {
    taskInput.value = ''
    deadlineInput.value = ''
}

// Gets border color for the element.
function getBorderColor(status){
    return status === 'Not started'
        ? 'red'
        : status === 'In progress'
        ? 'yellow'
        :'green'
}

function createButton(buttonText){
    const newBtn = document.createElement('button')
    newBtn.classList.add('task-button', `${buttonText}-btn`)
    newBtn.innerText = buttonText
    return newBtn
}

function createTextElement(text, type) {
    const newElem = document.createElement(type)
    newElem.innerText = text
    return newElem
}