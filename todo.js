export const todo = JSON.parse(localStorage.getItem('todo')) || [];
export const arrowButton = JSON.parse(localStorage.getItem('arrow')) || [{on: ''}];
export const arrowButtonComplete= JSON.parse(localStorage.getItem('arrowComplete')) || [{on: ''}];
const todoContainer = document.querySelector('.todo-container');
const completedContainer = document.querySelector('.complete-todo-container');
export function todoRender() {
  let todoHTML = '';
  let completedHTML = '';

  todo.forEach((todos) => {
    let color = '';
    let category = '';
    if (todos.category === 'school') {
      color = '#FF6763';
      category = 'school';
    } else if (todos.category === 'work') {
      color = '#FFB248';
      category = 'work';
    } else if (todos.category === 'personal') {
      color = '#e6e635';
      category = 'personal';
    } else if (todos.category === 'shopping') {
      color = '#99E79B';
      category = 'shopping';
    } else {
      color = '#ffffff';
      category = 'none';
    }
    //<button class="edit-button" data-edit-id="${todos.id}" ${todos.status ? 'style="display: none;"' : ''}><img src="img/edit.png" class="edit-icon" data-edit-id="${todos.id}"></button>
    const todoItemHTML = `
      <div class="todo-content ${category}" data-content-id="${todos.id}" id="${category}" style="background-color:${color};">
      <input type="checkbox" class="input-todo-checkbox" data-checkbox-input-id="${todos.id}" ${todos.status ? 'checked' : ''}>
      <span class="important-symbol-input" ${todos.important ? '' : 'style="display: none;"'} data-important-id="${todos.id}">!</span>
      <input class="input-todo-text" value="${todos.text}" type="text" data-input-id="${todos.id}" style="background-color:${color}; ${todos.status ? 'text-decoration: line-through;' : ''}" readonly>
      <button class="delete-button" data-delete-id="${todos.id}"><img src="img/delete.png" class="delete-icon" data-delete-id="${todos.id}">
      </button></div>
    `; 
    if (todos.status === true) {
      completedHTML += todoItemHTML;
    } else {
      todoHTML += todoItemHTML;
    }
  });
  document.querySelector('.todo-container').innerHTML = todoHTML;
  document.querySelector('.complete-todo-container').innerHTML = completedHTML;

  const checkboxes = document.querySelectorAll('.input-todo-checkbox');
  checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', (event) => {
    
    const checkboxId = Number(event.target.getAttribute('data-checkbox-input-id'));
    const todoContent = event.target.closest('.todo-content');
    const todoId = todo.find(todo => todo.id === checkboxId);
    const editButton = document.querySelector(`[data-edit-id="${todoId.id}"]`)
    const inputText = document.querySelector(`[data-input-id="${todoId.id}"]`);
    //console.log('Checkbox with ID:', checkboxId, 'changed');
    if (event.target.checked) {
      todoId.status = true;
      completedContainer.appendChild(todoContent);
      //editButton.style.display = 'none';
      inputText.style.textDecoration = 'line-through';
      //console.log(todoId.status);
      saveTodoData();
    } else {
      todoId.status = false;
      todoContainer.appendChild(todoContent);
      //editButton.style.display = 'flex';
      inputText.style.textDecoration = 'none';
      //console.log(todoId.status);
      saveTodoData();
    }
  });
});

/*const editButtons = document.querySelectorAll('.edit-button');
editButtons.forEach(editButton => {
  editButton.addEventListener('click', (event) => {
    const EditId = Number(event.target.getAttribute('data-edit-id'));
    const inputText = document.querySelector(`[data-input-id="${EditId}"]`);
    const index = todo.findIndex(todo => todo.id === EditId);
    if (inputText.hasAttribute('readonly')) {
      inputText.removeAttribute('readonly');
      inputText.focus();
      inputText.setSelectionRange(inputText.value.length, inputText.value.length);
      editButton.innerHTML = `<img src="img/save.png" class="edit-icon" data-edit-id="${EditId}">`;
      //console.log(EditId);
    } else {
      if(inputText.value.trim() === '') {
        alert('Empty text.')
        inputText.focus();
        return;
      }
      inputText.addEventListener('keydown', (event) => {
        if (event.keyCode === 13) {
          saveTodo()
        }
      });
      saveTodo()
    }
    function saveTodo() {
      inputText.setAttribute('readonly', true);
      todo[index].text = inputText.value
      editButton.innerHTML = `<img src="img/edit.png" class="edit-icon" data-edit-id="${EditId}">`;
      //console.log(todo)
      saveTodoData()
    }
  });
});
*/
const deleteButtons = document.querySelectorAll('.delete-button');
deleteButtons.forEach(deleteButton => {
  deleteButton.addEventListener('click', (event) => {
    const deleteID = Number(event.target.getAttribute('data-delete-id'));
    const contentID = document.querySelector(`[data-content-id="${deleteID}"]`);
    const index = todo.findIndex(todo => todo.id === deleteID);

    contentID.remove();
    todo.splice(index, 1);
    saveTodoData()
    //console.log(deleteID)
    //console.log(todo);
  });
});
}
export function saveTodoData() {
  localStorage.setItem('todo', JSON.stringify(todo));
};