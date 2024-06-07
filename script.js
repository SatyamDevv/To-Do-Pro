document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.getElementById("add-todo-button");
  const recordButton = document.getElementById("record-todo-button");
  const todoInput = document.getElementById("todo-input");
  const todoList = document.getElementById("todo-list");
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
  addTodoItem("Go to GYM");

  addButton.addEventListener("click", () => {
    const task = todoInput.value.trim();
    if (task) {
      addTodoItem(task);
      todoInput.value = "";
    }
  });

  recognition.onresult = function (event) {
    // The result is an array of SpeechRecognitionResult objects
    var transcript = event.results[0][0].transcript;
    let edittext = prompt("You Said", transcript);
    if (edittext !== null) {
      if (edittext) {
        addTodoItem(edittext.trim());
        e.target.parentElement.remove();
      }
    } else {
      alert("Enter text");
    }
  };
  recordButton.addEventListener("click", () => {
    recognition.start();
  });

  todoList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-button")) {
      e.target.parentElement.remove();
    } else if (e.target.classList.contains("markdone-button")) {
      todoList.appendChild(e.target.parentElement);
      e.target.parentElement.querySelector("h4").style.textDecoration =
        "line-through";
    } else if (e.target.classList.contains("edit-button")) {
      let edittext = prompt("Edit Task", "");
      if (edittext !== null) {
        if (edittext) {
          addTodoItem(edittext.trim());
          e.target.parentElement.remove();
        } else {
          alert("Enter text");
        }
      } else {
        alert("Enter text");
      }
    }
  });

  function addTodoItem(task) {
    const li = document.createElement("li");
    li.className = "todo-item";
    li.innerHTML = `
            <h4>${task}</h4>
            <button class="delete-button">❌</button>
            <button class="markdone-button">✅</button>
            <button class="edit-button">📝</button>
        `;
    // Add the new task at the start of the list
    todoList.insertBefore(li, todoList.firstChild);
  }
});
