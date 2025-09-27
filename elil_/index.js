const TODO_LS_DATA_KEY = 'todo_data';

const todoForm = document.querySelector('#todoTaskForm');
const todoTaskInput = document.querySelector('#todoTaskInput');
const todoList = document.querySelector('#todoList');

window.addEventListener('load', () => {
  let todoLsData = localStorage.getItem(TODO_LS_DATA_KEY) || [];
  console.log('todoLsData:::', todoLsData);
  if (!Array.isArray(todoLsData)) {
    todoLsData = JSON.parse(todoLsData);
    console.log('todoLsData:::', todoLsData);
  }

  todoLsData.forEach((todoItem) => {
    const li = document.createElement('li');
    li.textContent = todoItem;
    todoList.appendChild(li);
  })
})


todoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const valueFromInput = todoTaskInput.value;

  let todoLsData = localStorage.getItem(TODO_LS_DATA_KEY) || [];

  if (!Array.isArray(todoLsData)) {
    todoLsData = JSON.parse(todoLsData);
    console.log('todoLsData:::', todoLsData);
  }
  todoLsData.push(valueFromInput);
  localStorage.setItem(TODO_LS_DATA_KEY, JSON.stringify(todoLsData));
  
  todoForm?.reset();
})

