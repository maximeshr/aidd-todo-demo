import "./style.css";
import { browserFrames, createSaveStatus } from "./save-status.ts";
import { browserStorage, loadTodos, loadView, saveTodos, saveView } from "./storage.ts";
import {
  addTodo,
  removeTodo,
  TODO_VIEWS,
  toggleTodo,
  visibleTodos,
  type Todo,
  type TodoList,
  type TodoView,
} from "./todos.ts";

const app = document.querySelector<HTMLDivElement>("#app");

if (app) {
  app.innerHTML = `
    <main class="todo">
      <h1>AIDD Todo</h1>
      <form class="todo__form">
        <input class="todo__input" name="title" aria-label="New todo" placeholder="What needs to be done?" autocomplete="off" />
        <button type="submit">Add</button>
      </form>
      <div class="todo__views" role="group" aria-label="Show">
        <button type="button" data-view="all">All</button>
        <button type="button" data-view="active">Active</button>
        <button type="button" data-view="done">Done</button>
      </div>
      <ul class="todo__list"></ul>
      <p class="todo__empty">Nothing to do yet.</p>
      <p class="todo__status" role="status"></p>
    </main>
  `;
  start(app);
}

function start(root: HTMLElement): void {
  const form = root.querySelector<HTMLFormElement>(".todo__form");
  const input = root.querySelector<HTMLInputElement>(".todo__input");
  const list = root.querySelector<HTMLUListElement>(".todo__list");
  const empty = root.querySelector<HTMLParagraphElement>(".todo__empty");
  const status = root.querySelector<HTMLParagraphElement>(".todo__status");
  const viewButtons = [...root.querySelectorAll<HTMLButtonElement>(".todo__views [data-view]")];
  if (!form || !input || !list || !empty || !status) return;

  const storage = browserStorage();
  let todos: TodoList = loadTodos(storage);
  let view: TodoView = loadView(storage);
  let visible: TodoList = [];
  const announceSave = createSaveStatus(status, browserFrames);

  const update = (next: TodoList): void => {
    todos = next;
    render();
    announceSave(saveTodos(storage, todos));
  };

  /** Applies a change to a row, then keeps focus on that row, or on the visible row now at its place once it left the view. */
  const changeRow = (id: string, change: (todos: TodoList, id: string) => TodoList): void => {
    const index = visible.findIndex((todo) => todo.id === id);
    update(change(todos, id));
    const target =
      visible.find((todo) => todo.id === id) ?? visible[Math.min(index, visible.length - 1)];
    if (target) focusTodo(list, target.id);
    else input.focus();
  };

  const actions: TodoActions = {
    toggle: (id) => changeRow(id, toggleTodo),
    remove: (id) => changeRow(id, removeTodo),
  };

  const render = (): void => {
    visible = visibleTodos(todos, view);
    list.replaceChildren(...visible.map((todo) => renderTodo(todo, actions)));
    empty.hidden = visible.length > 0;
    empty.textContent = todos.length === 0 ? "Nothing to do yet." : EMPTY_VIEW[view];
    for (const button of viewButtons) {
      button.setAttribute("aria-pressed", String(button.dataset["view"] === view));
    }
  };

  /** A view is a display preference: it never saves the todos, and a failed save of the view shows nothing. */
  const showView = (next: TodoView): void => {
    view = next;
    saveView(storage, view);
    render();
  };

  for (const button of viewButtons) {
    const buttonView = TODO_VIEWS.find((candidate) => candidate === button.dataset["view"]);
    if (buttonView) button.addEventListener("click", () => showView(buttonView));
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const next = addTodo(todos, input.value);
    if (next === todos) return;
    if (view === "done") showView("all");
    update(next);
    input.value = "";
  });

  render();
}

const EMPTY_VIEW: Record<TodoView, string> = {
  all: "Nothing to do yet.",
  active: "No active todos.",
  done: "No done todos.",
};

/** Rendering replaces the rows, so focus goes back to the checkbox of the todo with this id. */
function focusTodo(list: HTMLElement, id: string): void {
  list
    .querySelector<HTMLInputElement>(`[data-id="${CSS.escape(id)}"] input[type="checkbox"]`)
    ?.focus();
}

interface TodoActions {
  toggle(id: string): void;
  remove(id: string): void;
}

function renderTodo(todo: Todo, actions: TodoActions): HTMLLIElement {
  const item = document.createElement("li");
  item.className = todo.done ? "todo__item todo__item--done" : "todo__item";
  item.dataset["id"] = todo.id;

  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.done;
  checkbox.addEventListener("change", () => actions.toggle(todo.id));
  const title = document.createElement("span");
  title.className = "todo__title";
  title.textContent = todo.title;
  label.append(checkbox, title);

  const remove = document.createElement("button");
  remove.type = "button";
  remove.textContent = "×";
  remove.setAttribute("aria-label", `Delete ${todo.title}`);
  remove.addEventListener("click", () => actions.remove(todo.id));

  item.append(label, remove);
  return item;
}
