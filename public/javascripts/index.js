import TodoList from "./modules/TodoList.mjs";

const todoInput = document.querySelector("input[name='task']");
const submitBtn = document.querySelector(".submit-btn");
const todoBox = document.querySelector(".todos");

if (window.location.pathname === "/") {
  todoInput.addEventListener("input", ({ target }) => {
    const normValue = target.value.trim();

    if (normValue.length > 50) {
      target.value = target.value.substring(0, 50);
    }

    if (normValue.length >= 3) {
      submitBtn.disabled = false;
    } else {
      submitBtn.disabled = true;
    }
  });

  submitBtn.addEventListener("click", (event) => {
    event.preventDefault();

    fetch(`/api/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task: todoInput.value,
      }),
    }).then((response) => {
      todoInput.value = "";

      home.render();
    });
  });

  const home = new TodoList(todoBox);

  home.render();
}
