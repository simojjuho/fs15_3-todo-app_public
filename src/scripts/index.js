//Variables

let section = document.querySelector('section')
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
let haveTasks = document.getElementById('have-tasks')

let tasks = []
let amountOfTasks = tasks.length

//Event listeners

window.addEventListener('load', function(){
    //I know this is a bit overkill for this app but had to do it just because
    taskAmount.innerText = amountOfTasks
})

//This could be either here or in the functions part. Now it's here.
function assignTaskListeners() {
    Array.from(singleTasks).forEach((elem) => {
      const toggleActiveTask = () => {
        elem.classList.toggle('active-task');
        addItemBtn.style.display = 'none';
        form.style.display = 'none'
        haveTasks.style.display = 'none'
        const editBtn = createButton("edit");
        assignEditListener(editBtn, elem);
        const deleteBtn = createButton("delete");
        assignDelListener(deleteBtn, elem);
        elem.appendChild(editBtn);
        elem.appendChild(deleteBtn);
        console.log('element: ',elem)
        console.log('parent: ', elem.parentElement)
        elem.removeEventListener('click', toggleActiveTask);
      };
      elem.addEventListener('click', toggleActiveTask);
    });
}


function assignDelListener(button, item) {
    button.addEventListener('click', function(){
        button.parentElement.parentElement.removeChild(item)
        item.classList.toggle("active-task");
        addItemBtn.style.display = "block";
        form.style.display = "flex";
    })
}

function assignEditListener(button, item){
    button.addEventListener('click', function(){
        item.querySelector('.edit-btn').remove()
        button.removeEventListener('click', assignEditListener)

        let id = item.querySelector('span').innerText
        const newForm = document.createElement('form')

        const newTask = document.createElement('input')
        newTask.value = item.querySelector('h2').innerText
        const newDlInput = document.createElement('input')
        newDlInput.value = item.querySelector('.deadline').innerText
        console.log(newDlInput.value)
        newDlInput.attributes.type = 'date'

        const select = createSelectElement()

        const newSaveBtn = createButton('Save')
        newSaveBtn.innerText = 'save'

        newForm.appendChild(newTask)
        newForm.appendChild(newDlInput)
        newForm.appendChild(select);
        newForm.appendChild(newSaveBtn)
        newForm.classList.add('active')
        item.appendChild(newForm)
        newForm.style.display = 'flex'
        assignSaveBtnListener(newSaveBtn, item, id, newTask, newDlInput, select, newForm)

        
    })
}

function assignSaveBtnListener(newSaveBtn, item, id, newTask, newDlInput, select, newForm){
    newSaveBtn.addEventListener('click', function(e){
        e.preventDefault()
        const newObj = {
            id: id,
            task: newTask.value,
            deadline: newDlInput.value,
            status: select.value
        }
        tasks = tasks.map(task => task.id === newObj.id ? newObj : task )
        item.querySelector('h2').innerText = newTask.value
        item.querySelector('.deadline').innerText = newDlInput.value
        item.querySelector('div').style.borderLeftColor = getBorderColor(select.value)
        console.log(newDlInput.value, select.value)

        item.removeChild(newForm)
    })
}


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
function assignCreateTaskListener(){
    confirmBtn.addEventListener('click', function(e){
        e.preventDefault()
        const newObject = createObject();
        const newElement = createTaskElement(newObject)
        itemsContainer.appendChild(newElement)
        assignTaskListeners()
    })
}

assignCreateTaskListener()


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
function createTaskElement (object){
    const newElem = document.createElement('li')
    newElem.classList.add('items__container__task')
    const borderColor = getBorderColor(object.status)
    const newDiv = document.createElement('div')
    newDiv.style.borderLeft = `3px solid ${borderColor}`
    const newSpan = createTextElement(object.id, 'span')
    const newH2 = createTextElement(object.task, 'h2')
    const newPrg = createDateInput(object.deadline)
    newDiv.appendChild(newSpan)
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
    return status === 'not-started'
        ? 'red'
        : status === 'in-progress'
        ? 'yellow'
        :'green'
}

function createButton(buttonText){
    const newBtn = document.createElement('button')
    newBtn.classList.add('task-button', `${buttonText}-btn`)
    newBtn.innerText = buttonText
    return newBtn
}

function createTextElement(text, type, additionalText='') {
    const newElem = document.createElement(type)
    newElem.innerHTML = `${additionalText} <span>${text}</span>`
    return newElem
}

function createDateInput(text) {
    const newElem = document.createElement('p')
    const newSpan = document.createElement('span')
    newSpan.classList.add('deadline')
    newSpan.innerText = text
    const deadlineText = document.createElement('span')
    deadlineText.innerText = "Deadline: "
    newElem.appendChild(deadlineText)
    newElem.appendChild(newSpan)
    return newElem
}

function createSelectElement(){
    // create select element
    const select = document.createElement('select');
    select.id = 'status';

    // create option elements
    const inProgressOption = document.createElement('option');
    inProgressOption.value = 'in-progress';
    inProgressOption.text = 'In progress';

    const notStartedOption = document.createElement('option');
    notStartedOption.value = 'not-started';
    notStartedOption.text = 'Not started';

    const doneOption = document.createElement('option');
    doneOption.value = 'done';
    doneOption.text = 'Done';

    // add option elements to select element
    select.appendChild(inProgressOption);
    select.appendChild(notStartedOption);
    select.appendChild(doneOption);
    
    console.log(select)

    return select
}