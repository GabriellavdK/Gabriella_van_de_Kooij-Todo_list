import { getData, postData } from "./api-client.js";

const todoItemlist = document.getElementsByTagName('ul')[0];
const buttonNewTask = document.getElementsByTagName('button')[0];

// Data ophalen van de API server
async function receiveData(type, input) {
    try {
        let data = await type(input);
        console.log("Received data from api-client.js file.");
        data = await data.json();
        console.log("Converted the data to JSON.");
        return data;
    } catch (err) {
        return console.log(`Error: ${err}`);
    }
}

// Informatie uit bestaande todo list ophalen
async function dataTodoList() {
    const data = await receiveData(getData);
    const descriptionTodo = data.map(i => i.description);
    const statusTodo = data.map(i => i.done);
    console.log(data.find(i => i.description == "jhvhg"));
    console.log(descriptionTodo, statusTodo);
}
dataTodoList();

// Nieuwe Todo toevoegen 
const addNewTasktoList = (newTodo, input) => {
    receiveData(postData, newTodo);
    const newTask = document.createElement('li');
    const newInput = document.createElement('input');
    const newLabel = document.createElement('label');
    const newImg = document.createElement('img');
    newInput.type = 'checkbox';
    newLabel.innerHTML = `${input}`;
    newImg.src = 'images/trash-can.png';
    todoItemlist.appendChild(newTask);
    newTask.appendChild(newInput);
    newTask.appendChild(newLabel);
    newTask.appendChild(newImg);
    const clickDeleteButton = document.querySelectorAll('img')[0]; // Vanaf hier de code voor de klik op de delete button
    clickDeleteButton.addEventListener('click', (event) => {
        event.preventDefault();
        
    })
} 

// Functionaliteit om een todo te verwijderen uit de lijst
const deleteTodo = (data) => {
    console.log(data);
}


// Functionaliteit van de knop "Add"
buttonNewTask.addEventListener('click', (event) => {
    event.preventDefault();
    let valueNewTodo = document.getElementsByTagName('input')[0];
    let input = valueNewTodo.value;
    let newTodo = { description: input, done: false };
    if (input == '') {
        alert('Het veld is nog leeg!');
    } else {
        addNewTasktoList(newTodo, input);
        valueNewTodo.value = '';
    }
})