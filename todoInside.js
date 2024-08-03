import { todo, saveTodoData } from "./todo.js";
import { autoAdjustHeight } from "./textAreaAlert.js";
//console.log(todo)
const customAlert = document.querySelector('.custom-alert');
const todoContainer = document.querySelector('.todo-container');
const todoContainerCompleted = document.querySelector('.complete-todo-container');
export function editing() {
  const todoInputValue = document.querySelectorAll('.input-todo-text');
  todoInputValue.forEach(todoValue => {
    todoValue.addEventListener('click', (event) => {
      const contentId = event.target.getAttribute('data-input-id');
      const inputValue = event.target.value;
      const computedStyle = window.getComputedStyle(event.target); // Get the computed style of the element
      const backgroundColor = computedStyle.backgroundColor; // Get the background color
      const index = todo.findIndex(todo => todo.id === Number(contentId));
      const originalImportantStatus = todo[index].important;
      const originalStatus = todo[index].status;
      //console.log(todo[index].important)
      // Check if the background color matches
      let category = '';
      let color = '';
      if (backgroundColor === 'rgb(255, 103, 99)') {
        //console.log('School');
        category = 'School';
        color = '#FF6763';
      } else if (backgroundColor === 'rgb(255, 178, 72)') {
        //console.log('Work')
        category = 'Work';
        color = '#FFB248';
      } else if (backgroundColor === 'rgb(230, 230, 53)') {
        //console.log('Personal')
        category = 'Personal';
        color = '#e6e635';
      } else if (backgroundColor === 'rgb(153, 231, 155)') {
        //console.log('Shopping')
        color = '#99E79B';
        category = 'Shopping';
      }
      //console.log("Content ID:", contentId);
      //console.log("Input Value:", inputValue);
      let inputEditHTML = '';
      // <input class="input-todo-checkbox" type="checkbox" data-checkbox-alert-id="${contentId}" ${todo[index].status ? 'checked' : 'unchecked'}>
      inputEditHTML += `
      <div class="custom-alert-container">
      <div class="custom-alert-content">
        <img src="img/clover.png" class="alert-clover-img">
        <span class="close-btn">&times;</span>
        <div class="top-section-alert">
          <p>Category: <span style="color: ${color};">${category}</span></p>
        </div>
        <div class="mid-section-alert">
          <div class="input-content-alert" data-content-id="${contentId}" style="background-color:${color};">
          <span class="important-symbol" data-important-alert-id="${contentId}"; style="display: ${todo[index].important ? 'block' : 'none'}";>!</span>
          <input class="input-todo-text input-todo-text-alert" type="text" value="${inputValue}" data-input-id="${contentId}" style="background-color:${color}; ${todo[index].status ? 'text-decoration: line-through;' : ''}; margin-left: ${todo[index].important ? '0px' : '8px' }" >
          </div>
          <div class="marking-as-important">
            <p class="marking-as-important-text">Mark As Important</p>
            <div class="checkbox-wrapper-9">
            <input class="tgl tgl-flat" id="cb4-9" type="checkbox" ${todo[index].important ? 'checked' : 'unchecked'}>
            <label class="tgl-btn" for="cb4-9" data-checkbox-important-id="${contentId}"></label>  
            </div>
          </div>
          <div class="reminder-container-button">
            <button class="reminder-alert">Add details</button>
            <img class="reminder-icon" src="img/reminder.png">
          </div>
          <div class="reminder-container">
            <div class="reminder-content">
              <div class="reminder-content-text item1">
                <input type="checkbox" class="reminder-checkbox-input-text ">
                <p>One</p> 
              </div>
              <div class="reminder-content-text item2">
                <input type="checkbox" class="reminder-checkbox-input-text">
                <p>Two</p> 
              </div>
              <div class="reminder-content-text item3">
                <input type="checkbox" class="reminder-checkbox-input-text">
                <p>Three</p> 
              </div>
              <div class="reminder-content-text item4">
                <input type="checkbox" class="reminder-checkbox-input-text ">
                <p>Four</p> 
              </div>
              <div class="reminder-content-text item5">
                <input type="checkbox" class="reminder-checkbox-input-text">
                <p>Five</p> 
              </div>
              <div class="reminder-content-text item6">
                <input type="checkbox" class="reminder-checkbox-input-text">
                <p>Six</p> 
              </div>
              <div class="reminder-content-text item7">
                <input type="checkbox" class="reminder-checkbox-input-text ">
                <p>Seven</p> 
              </div>
              <div class="reminder-content-text item8">
                <input type="checkbox" class="reminder-checkbox-input-text">
                <p>Eight</p> 
              </div>
              <div class="reminder-content-text item9">
                <input type="checkbox" class="reminder-checkbox-input-text">
                <p>Nine</p> 
              </div>
              <div class="reminder-content-text item10">
                <input type="checkbox" class="reminder-checkbox-input-text ">
                <p>Ten</p> 
              </div>  
              <div class="reminder-content-text item11">
                <input type="checkbox" class="reminder-checkbox-input-text ">
                <p>Eleven</p> 
              </div>  
              <div class="reminder-content-text item12">
                <input type="checkbox" class="reminder-checkbox-input-text ">
                <p>Twelve</p> 
              </div>  
              <div class="reminder-content-text item13">
                <input type="checkbox" class="reminder-checkbox-input-text ">
                <p>Thirteeasdas</p> 
              </div>  
              <div class="reminder-content-text item14">
                <input type="checkbox" class="reminder-checkbox-input-text ">
                <p>Fourteen</p> 
              </div>  
              <div class="reminder-content-text item15">
                <input type="checkbox" class="reminder-checkbox-input-text ">
                <p>Fifteen</p> 
              </div>  
            </div>
          </div>
          <div class="about-alert">
            <h3>About:</h3>
          </div>
          <div class="text-area-container-alert">
            <textarea class="text-area-alert" rows="7"></textarea>
          </div>
          </div>
        </div>
        <div class="bottom-section-alert">
          <button class="edit-button edit-button-alert"><img src="img/save.png" class="save-icon"></button>
          <button class="delete-button-alert delete-button delete-button-alert"><img src="img/delete.png" class="delete-icon"></button>
        </div>
    </div>
      `;
      const contentToDelete = document.querySelector(`[data-content-id="${contentId}"]`)
      customAlert.style.display = 'flex';
      customAlert.style.animationName = 'fadeIn';
      customAlert.innerHTML = inputEditHTML;
      const todoSymbolImportant = document.querySelector(`[data-important-id="${contentId}"]`);
      const todoSymbolImportantAlert = document.querySelector(`[data-important-alert-id="${contentId}"]`);
      const todoImportant = document.querySelector(`.tgl`);
      const todoInputCheckbox = document.querySelector(`[data-checkbox-alert-id="${contentId}"]`);
      const todoInputCheckBoxOutside = document.querySelector(`[data-checkbox-input-id="${contentId}"]`);
      const editOutside = document.querySelector(`[data-edit-id="${contentId}"]`);
      const inputOutside = document.querySelector(`[data-input-id="${contentId}"]`);
      const alertInput = document.querySelector('.input-todo-text-alert');
      const saveDataButton = document.querySelector(`.save-icon`);
      const deleteDatabutton = document.querySelector(`.delete-button-alert`);
      /*todoInputCheckbox.addEventListener('change', () => {
        if (todoInputCheckbox.checked) {
          todoContainerCompleted.appendChild(contentToDelete);
          todoInputCheckBoxOutside.checked = true;
          editOutside.style.display = 'none';
          inputOutside.style.textDecoration = 'line-through';
          alertInput.style.textDecoration = 'line-through';
          todo[index].status = true;
        } else {
          todoContainer.appendChild(contentToDelete);
          editOutside.style.display = 'flex';
          inputOutside.style.textDecoration = '';
          alertInput.style.textDecoration = '';
          todoInputCheckBoxOutside.checked = false;
          todo[index].status = false;
        }
      });
      */
        todoImportant.addEventListener('change', (event) => {
          if (event.target.checked) {
            todo[index].important = true;
            //todoSymbolImportant.style.display = 'block';
            todoSymbolImportantAlert.style.display = 'block';
            alertInput.style.margin = '0px'
            //todoSymbolImportant.textContent = '!';
            //console.log(todo)
            console.log(todoSymbolImportant)
            console.log('checked');
          } else {
            //todoSymbolImportant.style.display = 'none';
            todoSymbolImportantAlert.style.display = 'none';
            alertInput.style.margin = '8px'
            //todoSymbolImportant.textContent = '';
            todo[index].important = false;
            //console.log(todo)
            console.log(todoSymbolImportant);
            console.log('unchecked');
          }
        });
        saveDataButton.addEventListener('click', () => {
          if (alertInput.value.trim() === '') {
            alert('Empty Text');
            return;
          }
          savingTodo();
          saveTodoData();
          todoSymbolImportant.style.display = todo[index].important ? 'flex' : 'none';
          todoSymbolImportant.textContent = todo[index].important ? '!' : '';
          setTimeout(() => {
            customAlert.style.display = 'none';
          }, 300)
        });
        deleteDatabutton.addEventListener('click', () => {
          contentToDelete.remove();
          todo.splice(index, 1);
          saveTodoData();
              const customAlert = document.querySelector('.custom-alert');
              customAlert.style.animationName = '';
              customAlert.style.animationName = 'fadeOut';
              setTimeout(() => {
                customAlert.style.display = 'none';
              }, 300)
        });
        function savingTodo() {
          if (index !== -1) {
              todo[index].text = alertInput.value;
              const inputOutside = document.querySelector(`[data-input-id="${contentId}"]`);
              //console.log(inputOutside.value);
              inputOutside.value = alertInput.value
              //console.log('Todo item updated:', todo[index]);
              console.log('close')
              saveTodoData();
              const customAlert = document.querySelector('.custom-alert');
              customAlert.style.animationName = '';
              customAlert.style.animationName = 'fadeOut';
              setTimeout(() => {
                customAlert.style.display = 'none';
              }, 300);
            }};
        document.addEventListener('click', (event) => {
          if (event.target.classList.contains('close-btn')) {
            todo[index].important = originalImportantStatus;
            todo[index].status = originalStatus;
            const customAlert = document.querySelector('.custom-alert');
            customAlert.style.animationName = '';
            customAlert.style.animationName = 'fadeOut';
            //console.log(originalStatus);
            //originalStatus ? todoContainerCompleted.appendChild(contentToDelete) : todoContainer.appendChild(contentToDelete);
            //todoInputCheckBoxOutside.checked = originalStatus;
            //todoInputCheckbox.checked = originalStatus;
            //editOutside.style.display = originalStatus ? 'none' : 'flex';
            inputOutside.style.textDecoration = originalStatus ? 'line-through' : '';
            alertInput.style.textDecoration = originalStatus ? 'line-through' : '';
            setTimeout(() => {
              customAlert.style.display = 'none';
            }, 300);
            return todoImportant;
          }
        });
        autoAdjustHeight()
    });
  });
};