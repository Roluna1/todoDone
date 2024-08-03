import { todo, saveTodoData, todoRender, arrowButton, arrowButtonComplete } from "./todo.js";
import { editing } from "./todoInside.js";
const addTodoButton = document.querySelector('.add-todo-button');
const todoContainer = document.querySelector('.todo-container');
const completedContainer = document.querySelector('.complete-todo-container');
const taskTodoArrow = document.querySelector('.arrow-todo');
const taskCompletedArrow = document.querySelector('.task-completed-arrow');
const allCategory = document.querySelector('.category-text.all');
const schoolCategory = document.querySelector('.category-text.school')
const workCategory = document.querySelector('.category-text.work');
const personalCategory = document.querySelector('.category-text.personal');
const shoppingCategory = document.querySelector('.category-text.shopping');
const todoReload = document.querySelector('.top-section');
let todoId = localStorage.getItem('todoId');
function categoryAll() {
  schoolCategory.style.opacity = '.5';
  workCategory.style.opacity = '.5';
  personalCategory.style.opacity = '.5';
  shoppingCategory.style.opacity = '.5';
}
categoryAll()
function CategoryClick(category, hideSelectors) {
  const allSelectors = ['.todo-content.school', '.todo-content.work', '.todo-content.shopping', '.todo-content.personal', '.todo-content.none'];
  const categorySelectors = hideSelectors.split(',').flatMap(selector => allSelectors.filter(s => s.includes(selector.trim())));
  const otherSelectors = allSelectors.filter(s => !categorySelectors.includes(s));

  category.addEventListener('click', () => {
    allCategory.style.opacity = '.5';
    schoolCategory.style.opacity = '.5';
    workCategory.style.opacity = '.5';
    personalCategory.style.opacity = '.5';
    shoppingCategory.style.opacity = '.5';

    category.style.opacity = '1';

    categorySelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(hide => {
        hide.style.display = 'flex';
      });
    });

    otherSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(hide => {
        hide.style.display = 'none';
      });
    });
  });
}
CategoryClick(allCategory, 'none, school, work, personal, shopping');
CategoryClick(schoolCategory, 'school');
CategoryClick(workCategory, 'work');
CategoryClick(personalCategory, 'personal');
CategoryClick(shoppingCategory, 'shopping');

addTodoButton.addEventListener('click', () => {
  todoId++
  localStorage.setItem('todoId', todoId.toString());
  const currentID = Number(todoId);
  //console.log(todo);
  //console.log(currentID)
  const todoContent = document.createElement('div');
  todoContent.classList.add('todo-content')
  todoContent.setAttribute('data-content-id', currentID);

  const checkboxElement = document.createElement('input');
  checkboxElement.type = 'checkbox';
  checkboxElement.classList.add('input-todo-checkbox');
  checkboxElement.setAttribute('data-checkbox-input-id', currentID);

  const importantElement = document.createElement('span');
  importantElement.classList.add('important-symbol-input');
  importantElement.textContent = '!';
  importantElement.style.display = 'none';
  importantElement.setAttribute('data-important-id', currentID);

  const inputElement = document.createElement('input');
  inputElement.classList.add('input-todo-text');
  inputElement.setAttribute('data-input-id', currentID);

  const selectOptionContainer = document.createElement('div');
  selectOptionContainer.classList.add('select-option-category');

  const selectOption = document.createElement('select');
  selectOption.classList.add('selecting-category');

  const defaultOption = document.createElement('option');
  defaultOption.disabled = true;
  defaultOption.selected = true;
  defaultOption.value = 'none';
  defaultOption.textContent = 'Select';

  const schoolOption = document.createElement('option');
  schoolOption.value = 'school';
  schoolOption.textContent = 'School';
  
  const workOption = document.createElement('option');
  workOption.value = 'work';
  workOption.textContent = 'Work';

  const personalOption = document.createElement('option');
  personalOption.value = 'personal';
  personalOption.textContent = 'Personal';

  const shoppingOption = document.createElement('option');
  shoppingOption.value = 'shopping';
  shoppingOption.textContent = 'Shopping';

  const checkButton = document.createElement('button');
  checkButton.classList.add('check-button')
  checkButton.innerText = '\u2714';
  checkButton.setAttribute('data-check-id', currentID);

  /*const editButton = document.createElement('button');
  editButton.innerHTML = '<img src="img/edit.png" class="edit-icon">';
  editButton.classList.add('edit-button');
  editButton.style.display = 'none';
  editButton.setAttribute('data-edit-id', currentID);
  */
  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = `<img src="img/delete.png" class="delete-icon" data-delete-id=${currentID}>`;
  deleteButton.classList.add('delete-button');
  deleteButton.style.display = 'none';
  deleteButton.setAttribute('data-delete-id', currentID);

  checkboxElement.disabled = true;
  checkboxElement.style.opacity = '.1';
  todoContent.appendChild(checkboxElement);
  todoContent.appendChild(importantElement);
  todoContent.appendChild(inputElement);
  selectOption.appendChild(defaultOption);
  selectOption.appendChild(schoolOption);
  selectOption.appendChild(workOption);
  selectOption.appendChild(personalOption);
  selectOption.appendChild(shoppingOption);
  selectOptionContainer.appendChild(selectOption);
  todoContent.appendChild(selectOptionContainer);
  todoContent.appendChild(checkButton);
  //todoContent.appendChild(editButton);
  todoContent.appendChild(deleteButton);
  todoContainer.appendChild(todoContent);
  todoContainer.style.display = 'flex';
  taskTodoArrow.style.transform = 'rotate(0deg)';
  inputElement.focus();

  const selectingCategory = todoContent.querySelector('.selecting-category');
  selectingCategory.addEventListener('change', () => {
    const selectedCategory = selectingCategory.value;
    switch (selectedCategory) {
      case 'school':
        todoContent.style.backgroundColor = '#FF6763';
        inputElement.style.backgroundColor = '#FF6763';
        inputElement.focus();
        break;
      case 'work':
        todoContent.style.backgroundColor = '#FFB248';
        inputElement.style.backgroundColor = '#FFB248';
        inputElement.focus();
        break;
      case 'personal':
        todoContent.style.backgroundColor = '#e6e635';
        inputElement.style.backgroundColor = '#e6e635';
        inputElement.focus();
        break;        
      case 'shopping':
        todoContent.style.backgroundColor = '#99E79B';
        inputElement.style.backgroundColor = '#99E79B';
        inputElement.focus();
        break;
      default:
        break;       
    }
  });
  // when check todoObject will push to todoArray
  const checkTodo = document.querySelector(`[data-check-id="${currentID}"]`);
  const inputText = document.querySelector(`[data-input-id="${currentID}"]`);
  checkTodo.addEventListener('click', () => {
  addingTodo()
  arrowButton[0].on = false;
  localStorage.setItem('arrow', JSON.stringify(arrowButton));
  });
function addingTodo() {
  if (selectOption.value === 'none') {
    alert('Please select category')
    return;
  } else {
    if (!inputElement.value.trim()) {
      inputElement.focus();
      alert('Empty text');
      return;
    } else {
      let todoObject = {
        id: currentID,
        text: inputText.value,
        category: selectOption.value,
        status: false,
        important: false
      }
      inputElement.setAttribute('readonly', true)
      checkButton.remove();
      //editButton.style.display = 'flex';
      deleteButton.style.display = 'flex';
      todoContent.setAttribute('id', selectOption.value)
      todoContent.classList.add(`${selectOption.value}`);
      checkboxElement.disabled = false;
      checkboxElement.style.opacity = '1';
      selectOptionContainer.remove();
      todo.push(todoObject);
      saveTodoData();
      editing();
      //console.log(todo);
    }
  }
}
  const checkBoxInput = document.querySelector(`[data-checkbox-input-id="${currentID}"]`);
  checkBoxInput.addEventListener('change', (checkBox) => {
    const checkBoxId = checkBox.target.getAttribute('data-checkbox-input-id');
    const checkBoxElement = document.querySelector(`[data-checkbox-input-id="${checkBoxId}"]`);
    const todoContentId = document.querySelector(`[data-content-id="${checkBoxId}"]`);
    const inputText = document.querySelector(`[data-input-id="${checkBoxId}"]`);
    const index = todo.findIndex(todo => todo.id === currentID);

    if (checkBoxElement.checked) {
      completedContainer.appendChild(todoContentId);
      todo[index].status = true;
      inputText.style.textDecoration = 'line-through';
      editButton.style.display = 'none';
      //console.log(todo);
      saveTodoData()
    } else {
      todoContainer.appendChild(todoContentId);
      todo[index].status = false;
      inputText.style.textDecoration = 'none';
      editButton.style.display = 'flex';
      deleteButton.style.display = 'flex';
      //console.log(todoContent);
      saveTodoData();
    }
  });
  // editing todo
  /*editButton.addEventListener('click', () => {
    const index = todo.findIndex(todo => todo.id === currentID);
    const inputTextValue = document.querySelector(`[data-input-id="${currentID}"]`);
    if (index !== -1) {
      if (editButton.innerHTML === '<img src="img/edit.png" class="edit-icon">') {
        inputTextValue.readOnly = false;
        inputTextValue.focus();
        inputTextValue.setSelectionRange(inputTextValue.value.length, inputTextValue.value.length);
        checkButton.style.display = 'flex';
        editButton.innerHTML = `<img src="img/save.png" class="edit-icon" data-edit-id="${currentID}"]>`;
        //console.log('editing')
      } else {
        // updating text in object inside of todo array
          saveTodo()
      }
      function saveTodo() {
        if (inputTextValue.value.trim() === '') {
          alert('Empty text.')
          inputTextValue.focus();
          return;
        } 
        todo[index].text = inputTextValue.value;
        //console.log("Todo item updated:", todo[index]);
        inputTextValue.readOnly = true;
        editButton.innerHTML = '<img src="img/edit.png" class="edit-icon">';
        saveTodoData()
      }
    }
  });
  */
  const deleteButtonContent = document.querySelector(`[data-delete-id="${todoId}"]`);
  deleteButtonContent.addEventListener('click', (event) => {
    const deleteId = event.target.getAttribute('data-delete-id');
    const todoContentId = document.querySelector(`[data-content-id="${deleteId}"]`);
    const index = todo.findIndex(todo => todo.id === todoId);
    todoContentId.remove();
    todo.splice(index, 1);
    saveTodoData();
    //console.log(todo);
  });
});
taskTodoArrow.addEventListener('click', () => {
  if (todoContainer.style.display !== 'none') {
    todoContainer.style.display = 'none';
    taskTodoArrow.style.transform = 'rotate(180deg)';
    arrowButton[0].on = true;
    localStorage.setItem('arrow', JSON.stringify(arrowButton))
    console.log(arrowButton);

  } else {
    arrowButton[0].on = false;
    localStorage.setItem('arrow', JSON.stringify(arrowButton))
    todoContainer.style.display = 'flex';
    taskTodoArrow.style.transform = 'rotate(0deg)';
    
  }
});
taskCompletedArrow.addEventListener('click', () => {

  if (completedContainer.style.display !== 'none') {
    completedContainer.style.display = 'none';
    taskCompletedArrow.style.transform = 'rotate(180deg)';
    arrowButtonComplete[0].on = true;
    localStorage.setItem('arrowComplete', JSON.stringify(arrowButtonComplete))
  } else {
    arrowButtonComplete[0].on = false;
    localStorage.setItem('arrowComplete', JSON.stringify(arrowButtonComplete))
    completedContainer.style.display = 'flex';
    taskCompletedArrow.style.transform = 'rotate(0deg)';
  }
});
todoReload.addEventListener('click', () => {
  location.reload();
});
if (arrowButton[0].on === true) {
  todoContainer.style.display = 'none';
  taskTodoArrow.style.transform = 'rotate(180deg)';
} else {
  todoContainer.style.display = 'flex';
  taskTodoArrow.style.transform = '';
}
if (arrowButtonComplete[0].on === true) {
  completedContainer.style.display = 'none';
  taskCompletedArrow.style.transform = 'rotate(180deg)';
} else {
  completedContainer.style.display = 'flex';
  taskCompletedArrow.style.transform = '';
}
todoRender();
editing();
console.log(todo);