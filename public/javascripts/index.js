const todoInput = document.querySelector("input[name='task']");
const submitBtn = document.querySelector(".submit-btn");
const todoBox = document.querySelector(".todos");

class TodoList {
  async getTodos() {
    const response = await fetch("/api");

    const todos = await response.json();

    return todos;
  }

  generateTodoList(todos) {
    let todoList = "";

    todos.forEach((todo) => {
      todoList += this.generateTodoItem(todo.data);
    });

    return `<ul class="todo-list">${todoList}</ul>`;
  }

  generateTodoItem(data) {
    return `<li class="list-item">${data.task}<span class="item-btns" id=${data.id}>
        <button class="btn btn-edit">
          <i class="fa fa-edit" aria-hidden="true"></i>
        </button>
        <button class="btn btn-delete">
          <i class="fa fa-trash" aria-hidden="true"></i>
        </button>
      </span>
    </li>`;
  }

  async render() {
    const todos = await this.getTodos();

    if (todos.length === 0) {
      todoBox.innerHTML = `<p class="empty-item">What you have to do?</p>`;

      return;
    }

    todoBox.innerHTML = this.generateTodoList(todos);

    const editBtns = document.querySelectorAll(".btn-edit");
    const deleteBtns = document.querySelectorAll(".btn-delete");

    deleteBtns.forEach((deleteBtn) => {
      deleteBtn.addEventListener("click", function (event) {
        const todoId = this.parentElement.getAttribute("id");

        fetch(`/api/${todoId}`, {
          method: "DELETE",
        }).then((response) => {
          window.location.reload(true);
        });
      });
    });

    editBtns.forEach((editBtn) => {
      editBtn.addEventListener("click", function (event) {
        const editInput = document.createElement("input");
        const doneBtn = document.createElement("button");
        const icon = document.createElement("i");

        editInput.type = "text";

        editInput.className = "edit-input";

        const todoTask = this.parentElement.parentElement.firstChild
          .textContent;

        editInput.setAttribute("value", todoTask);

        icon.classList.add("fa", "fa-check-circle");

        doneBtn.append(icon);

        doneBtn.className = "done-btn";

        const text = this.parentElement.parentElement.firstChild;

        this.parentElement.parentElement.replaceChild(editInput, text);

        const editBtn = this.parentElement.querySelector(".btn-edit");

        this.parentElement.replaceChild(doneBtn, editBtn);

        doneBtn.addEventListener("click", function () {
          const todoId = this.parentElement.getAttribute("id");

          fetch(`/api/${todoId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              task: editInput.value,
            }),
          }).then((response) => {
            window.location.reload(true);
          });
        });
      });
    });
  }
}

const home = new TodoList();

home.render();

todoInput.addEventListener("input", ({ target: { value } }) => {
  const normValue = value.trim();

  if (normValue.length >= 3) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
});

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();

  fetch(`/api`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      task: todoInput.value,
    }),
  }).then((response) => {
    window.location.pathname = "/";
  });
});
