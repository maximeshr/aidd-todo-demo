import "./style.css";
import { browserStorage, loadTodos, saveTodos } from "./storage.ts";
import { addTodo, removeTodo, toggleTodo, type Todo, type TodoList } from "./todos.ts";

const app = document.querySelector<HTMLDivElement>("#app");

if (app) {
  app.innerHTML = `
    <main class="todo">
      <h1>AIDD Todo</h1>
      <form class="todo__form">
        <input class="todo__input" name="title" aria-label="New todo" placeholder="What needs to be done?" autocomplete="off" />
        <button type="submit">Add</button>
      </form>
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
  if (!form || !input || !list || !empty || !status) return;

  const storage = browserStorage();
  let todos: TodoList = loadTodos(storage);

  const update = (next: TodoList): void => {
    todos = next;
    render();
    announceSave(status, saveTodos(storage, todos));
  };

  const actions: TodoActions = {
    toggle: (id) => {
      update(toggleTodo(todos, id));
      focusTodo(list, id);
    },
    remove: (id) => {
      const index = todos.findIndex((todo) => todo.id === id);
      update(removeTodo(todos, id));
      const neighbor = todos[Math.min(index, todos.length - 1)];
      if (neighbor) focusTodo(list, neighbor.id);
      else input.focus();
    },
  };

  const render = (): void => {
    list.replaceChildren(...todos.map((todo) => renderTodo(todo, actions)));
    empty.hidden = todos.length > 0;
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const next = addTodo(todos, input.value);
    if (next === todos) return;
    update(next);
    input.value = "";
  });

  render();
}

/** Shows the not-saved message on failure and clears it on success; a repeated failure is announced again. */
function announceSave(status: HTMLElement, saved: boolean): void {
  status.textContent = "";
  if (!saved) requestAnimationFrame(() => (status.textContent = "The list was not saved."));
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
