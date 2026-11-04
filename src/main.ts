import "./style.css";
import { browserFrames, createSaveStatus } from "./save-status.ts";
import { browserStorage, loadTodos, loadView, saveTodos, saveView } from "./storage.ts";
import {
  addTodo,
  clearDone,
  isTodoView,
  removeTodo,
  TODO_VIEWS,
  toggleTodo,
  visibleTodos,
  type Todo,
  type TodoList,
  type TodoView,
} from "./todos.ts";

/** The label of each view's button. */
const VIEW_LABEL: Record<TodoView, string> = {
  all: "All",
  active: "Active",
  done: "Done",
};

/** Declared before `start` runs, which reads it on the first render. */
const EMPTY_VIEW: Record<TodoView, string> = {
  all: "Nothing to do yet.",
  active: "No active todos.",
  done: "No done todos.",
};

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
        ${TODO_VIEWS.map((view) => `<button type="button" data-view="${view}">${VIEW_LABEL[view]}</button>`).join("")}
      </div>
      <ul class="todo__list"></ul>
      <p class="todo__empty"></p>
      <button type="button" class="todo__clear" hidden>Clear done</button>
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
  const clear = root.querySelector<HTMLButtonElement>(".todo__clear");
  const viewButtons = [...root.querySelectorAll<HTMLButtonElement>(".todo__views [data-view]")];
  if (!form || !input || !list || !empty || !status || !clear) return;

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
    empty.textContent = EMPTY_VIEW[todos.length === 0 ? "all" : view];
    clear.hidden = !todos.some((todo) => todo.done);
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
    const buttonView = button.dataset["view"];
    if (isTodoView(buttonView)) button.addEventListener("click", () => showView(buttonView));
  }

  /** The button hides once the done todos are gone, so focus goes to the input. */
  clear.addEventListener("click", () => {
    update(clearDone(todos));
    input.focus();
  });

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
