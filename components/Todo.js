export class Todo {
  constructor(data, selector, handleCheck, handleDelete) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
    this._handleCheck = handleCheck;
    this._handleDelete = handleDelete;
  }

  _setEventListeners(todoElement) {
    const checkboxEl = todoElement.querySelector(".todo__completed");
    const deleteBtn = todoElement.querySelector(".todo__delete-btn");

    deleteBtn.addEventListener("click", () => {
      const isChecked = checkboxEl.checked;

      if (typeof this._handleDelete === "function") {
        this._handleDelete({ ...this._data, completed: isChecked });
      }

      todoElement.remove();
    });

    checkboxEl.addEventListener("change", () => {
      const isChecked = checkboxEl.checked;
      this._handleCheck(isChecked);
    });
  }

  getView() {
    const todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    const todoNameEl = todoElement.querySelector(".todo__name");
    const todoCheckboxEl = todoElement.querySelector(".todo__completed");
    const todoLabel = todoElement.querySelector(".todo__label");
    const todoDate = todoElement.querySelector(".todo__date");

    todoNameEl.textContent = this._data.name;
    todoCheckboxEl.checked = this._data.completed;

    todoCheckboxEl.id = `todo-${this._data.id}`;
    todoLabel.setAttribute("for", `todo-${this._data.id}`);

    const dueDate = new Date(this._data.date);
    if (!isNaN(dueDate)) {
      todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }

    this._setEventListeners(todoElement);
    return todoElement;
  }
}
