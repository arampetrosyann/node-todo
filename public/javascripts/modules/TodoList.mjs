export default class TodoList {
  constructor(box) {
    if (!(box instanceof Node)) {
      throw new Error("Invalid input!");
    }

    this._box = box;
    this._PATH = "/api/todos/";
    this._ATTRIBUTE = "id";
  }

  get PATH() {
    return this._PATH;
  }

  get ATTRIBUTE() {
    return this._ATTRIBUTE;
  }

  get box() {
    return this._box;
  }

  set box(value) {
    if (!(value instanceof Node)) {
      throw new Error("Invalid input!");
    } else {
      this._box = value;
    }
  }

  async getTodos() {
    const path = this.PATH;

    const response = await fetch(path);

    const todos = await response.json();

    return todos;
  }

  updateTodo(id, todoTask) {
    const path = this.PATH;

    fetch(`${path}${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task: todoTask,
      }),
    }).then((response) => {
      this.render();
    });
  }

  deleteTodo(id) {
    const path = this.PATH;

    fetch(`${path}${id}`, {
      method: "DELETE",
    }).then((response) => {
      this.render();
    });
  }

  deleteEventListener() {
    const deleteBtns = document.querySelectorAll(".btn-delete");

    const attribute = this.ATTRIBUTE;

    deleteBtns.forEach((deleteBtn) => {
      deleteBtn.addEventListener("click", (event) => {
        const todoId = deleteBtn.parentElement.getAttribute(attribute);

        this.deleteTodo(todoId);
      });
    });
  }

  editEventListener() {
    const editBtns = document.querySelectorAll(".btn-edit");

    const attribute = this.ATTRIBUTE;

    editBtns.forEach((editBtn) => {
      editBtn.addEventListener("click", (event) => {
        const editInput = document.createElement("input");
        const doneBtn = document.createElement("button");
        const icon = document.createElement("i");

        editInput.type = "text";

        editInput.placeholder = "Edit..";

        editInput.className = "edit-input";

        editInput.maxLength = 50;

        const todoTask =
          editBtn.parentElement.parentElement.firstChild.textContent;

        editInput.setAttribute("value", todoTask);

        icon.classList.add("fa", "fa-check-circle");

        doneBtn.append(icon);

        doneBtn.className = "done-btn";

        const text = editBtn.parentElement.parentElement.firstChild;

        editBtn.parentElement.parentElement.replaceChild(editInput, text);

        editBtn.parentElement.replaceChild(doneBtn, editBtn);

        if (editInput.value.length < 3) {
        }

        editInput.addEventListener("input", ({ target }) => {
          const normValue = target.value.trim();

          if (normValue.length > 50) {
            target.value = target.value.substring(0, 50);
          }

          if (normValue.length >= 3) {
            doneBtn.disabled = false;
          } else {
            doneBtn.disabled = true;
          }
        });

        doneBtn.addEventListener("click", () => {
          const todoId = doneBtn.parentElement.getAttribute(attribute);

          this.updateTodo(todoId, editInput.value);
        });
      });
    });
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
      this.box.innerHTML = `<p class="empty-item">What you have to do?</p>`;
    } else {
      this.box.innerHTML = this.generateTodoList(todos);

      this.deleteEventListener();

      this.editEventListener();
    }
  }
}
