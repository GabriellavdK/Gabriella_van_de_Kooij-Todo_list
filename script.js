import { deleteData, getData, postData } from "./api-client.js";

const todoItemlist = document.getElementsByTagName("ul")[0];
const buttonNewTask = document.getElementsByTagName("button")[0];

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

// Nieuwe To do toevoegen
const addNewTasktoList = (input) => {
  const newTask = document.createElement("li");
  const newInput = document.createElement("input");
  const newLabel = document.createElement("label");
  const newImg = document.createElement("img");
  newInput.type = "checkbox";
  newLabel.innerHTML = `${input}`;
  newImg.src = "images/trash-can.png";
  todoItemlist.appendChild(newTask);
  newTask.appendChild(newInput);
  newTask.appendChild(newLabel);
  const deleteButton = newTask.appendChild(newImg);
  // Vanaf hier de code voor de klik op de delete button
  deleteButton.addEventListener("click", (event) => {
    event.preventDefault();
    const labelTextCurrentId =
      event.target.parentElement.getElementsByTagName("label")[0].textContent;
    deleteTodoFromApi(labelTextCurrentId);
  });
};

// Functionaliteit om een To do te verwijderen uit de lijst
async function deleteTodoFromApi(labelTextCurrentId) {
  const data = await receiveData(getData);
  const detailsDeletedItem = data.find(
    (i) => i.description == labelTextCurrentId
  );
  await receiveData(deleteData, detailsDeletedItem);
  // Vanaf hier de code om de To do visueel uit de html/lijst te verwijderen
  const getLabels = Array.from(document.getElementsByTagName("label"));
  getLabels
    .find((i) => i.textContent == labelTextCurrentId)
    .parentElement.remove();
  return;
}

// Functionaliteit van de knop "Add"
buttonNewTask.addEventListener("click", (event) => {
  event.preventDefault();
  let valueNewTodo = document.getElementsByTagName("input")[0];
  let input = valueNewTodo.value;
  let newTodo = { description: input, done: false };
  if (input == "") {
    alert("Het veld is nog leeg!");
  } else {
    receiveData(postData, newTodo);
    addNewTasktoList(input);
    valueNewTodo.value = "";
  }
});

async function loadPage() {
  const data = await receiveData(getData);
  data.forEach((i) => addNewTasktoList(i.description));
}
loadPage();
