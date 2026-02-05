import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");

const createLocalDate = (dateInput) => {
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  return date;
};

const counter = new TodoCounter(initialTodos, ".counter__text");

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", {
    handleToggleComplete: (isChecked) => {
      counter.updateCompleted(isChecked);
    },

    handleDelete: (wasCompleted) => {
      counter.updateTotal(false);
      if (wasCompleted) {
        counter.updateCompleted(false);
      }
    },
  });

  return todo.getView();
};

const newToDoValidator = new FormValidator(validationConfig, addTodoForm);
newToDoValidator.enableValidation();

const todoSection = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todoElement = generateTodo(item);
    todoSection.addItem(todoElement);
  },
  containerSelector: ".todos__list",
});

todoSection.renderItems();

const addTodoPopupWithForm = new PopupWithForm(
  "#add-todo-popup",
  (inputValues) => {
    const name = inputValues.name;
    const dateInput = inputValues.date;

    const dueDate = dateInput ? createLocalDate(dateInput) : null;
    const id = uuidv4();

    const values = { name, dueDate, id, completed: false };
    const todoElement = generateTodo(values);

    todoSection.addItem(todoElement);
    counter.updateTotal(true);

    newToDoValidator.resetValidation();
    addTodoPopupWithForm.close();
  },
);

addTodoPopupWithForm.setEventListeners();

addTodoButton.addEventListener("click", () => {
  newToDoValidator.resetValidation();
  addTodoPopupWithForm.open();
});
