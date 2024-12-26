
const todoList = [ 
  {
    name  : 'make din dins',
    date: '2020-23-3',
  },
  {
    name  : 'make wash up',
    date: '2020-23-3',
  },
];

function renderTodoList() {

  let todoListHTML = '';

  todoList.forEach((todoObject, index) => {

    const { name, date } = todoObject; //the same as writing the above
    const html = `
    <p>${name} ${date}
      <button class="js-delete-todo-button">
        Delete
      </button>
    </p>
    `;
    todoListHTML += html;
  });
  
  document.querySelector('.js-todo-list').innerHTML = todoListHTML;

  // querySelectorAll will give ALL the elements on the page that have the class, and return it as an array
  document.querySelectorAll('.js-delete-todo-button')
    .forEach((deleteButton, index) => { // since it is an array, foreach can be used
      deleteButton.addEventListener('click', () => {
        todoList.splice(index, 1);
        renderTodoList();
      });
   });
  
}

document.querySelector('.js-add-todo-button').addEventListener('click', () => {
  addTodo();
});

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;
  
  const dateInputElement = document.querySelector('.js-date-input')
  const date = dateInputElement.value;

  todoList.push(
    {
      //name : name,
      //date : date,
      name, // if the variable names are the same, then use shorthand method
      date
    }
  );
  console.log(todoList);

  inputElement.value = '';

  renderTodoList();
}