class Todo {
  constructor(data, selector, { handleToggleComplete, handleDelete } = {}) {
    this._data = data;
    this._templateElement = document.querySelector(selector);

    this._handleToggleComplete = handleToggleComplete;
    this._handleDelete = handleDelete;
  }

  _setEventListeners() {
    this._todoCheckboxEl.addEventListener("change", (evt) => {
      const isChecked = evt.target.checked;
      this._data.completed = isChecked;

      if (this._handleToggleComplete) {
        this._handleToggleComplete(isChecked);
      }
    });

    this._todoDeleteBtn.addEventListener("click", () => {
      if (this._handleDelete) {
        this._handleDelete(this._data.completed);
      }
      this._todoElement.remove();
    });
  }

  _generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");

    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  _formatDueDate() {
    if (!this._data.dueDate) return "";

    const dueDate =
      this._data.dueDate instanceof Date
        ? this._data.dueDate
        : new Date(this._data.dueDate);

    if (Number.isNaN(dueDate.getTime())) return "";

    return `Due: ${dueDate.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })}`;
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    this._todoNameEl = this._todoElement.querySelector(".todo__name");
    this._todoDate = this._todoElement.querySelector(".todo__date");
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    this._todoNameEl.textContent = this._data.name;
    this._todoDate.textContent = this._formatDueDate();

    this._generateCheckboxEl();
    this._setEventListeners();

    return this._todoElement;
  }
}

export default Todo;
