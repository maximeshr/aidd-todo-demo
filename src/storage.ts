import { TODO_VIEWS, type Todo, type TodoList, type TodoView } from "./todos.ts";

/** The part of the Web Storage API the app uses. */
export type TodoStorage = Pick<Storage, "getItem" | "setItem">;

const STORAGE_KEY = "aidd-todo-demo:todos";
const VIEW_KEY = "aidd-todo-demo:view";

/** The browser's local storage, or `null` when reaching it throws (storage disabled). */
export function browserStorage(): TodoStorage | null {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function isTodo(value: unknown): value is Todo {
  if (typeof value !== "object" || value === null) return false;
  const { id, title, done } = value as Record<string, unknown>;
  return typeof id === "string" && typeof title === "string" && typeof done === "boolean";
}

/** The saved list, or an empty list when there is none or it cannot be read. */
export function loadTodos(storage: TodoStorage | null): TodoList {
  try {
    const raw = storage?.getItem(STORAGE_KEY);
    if (raw == null) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.every(isTodo) ? parsed : [];
  } catch {
    return [];
  }
}

/** Saves the list; returns whether it was saved. */
export function saveTodos(storage: TodoStorage | null, todos: TodoList): boolean {
  return saveItem(storage, STORAGE_KEY, JSON.stringify(todos));
}

/** The saved view, or `all` when there is none or it cannot be read. */
export function loadView(storage: TodoStorage | null): TodoView {
  try {
    const raw = storage?.getItem(VIEW_KEY);
    return TODO_VIEWS.find((view) => view === raw) ?? "all";
  } catch {
    return "all";
  }
}

/** Saves the view; returns whether it was saved. */
export function saveView(storage: TodoStorage | null, view: TodoView): boolean {
  return saveItem(storage, VIEW_KEY, view);
}

function saveItem(storage: TodoStorage | null, key: string, value: string): boolean {
  if (storage === null) return false;
  try {
    storage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}
