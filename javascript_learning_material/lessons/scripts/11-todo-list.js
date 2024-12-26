
const todoList = [ 
  {
    name  : 'make din dins',
    date: '2020-23-3',
  },
  {
    name  : 'make din dins',
    date: '2020-23-3',
  },
];

function renderTodoList() {

  let todoListHTML = '';

  for (let i = 0; i < todoList.length; i++) {
    const todoObject = todoList[i];
    //const name = todoObject.name; 
    //const date = todoObject.date;
    const { name, date } = todoObject; //the same as writing the above
    

    const html = `
    <p>${name} ${date}
      <button onClick="
          todoList.splice(${i}, 1);
          renderTodoList();
          ">
        Delete
      </button>
    </p>
    `;
    todoListHTML += html;
  }
  
  //console.log(todoListHTML);
  
  document.querySelector('.js-todo-list').innerHTML = todoListHTML;
  
}

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