import { isTodoView } from "./todos.ts";
import type { Todo, TodoList, TodoView } from "./todos.ts";

/** The part of the Web Storage API the app uses */
export type TodoStorage = Pick<Storage, "getItem" | "setItem">;

const STORAGE_KEY = "aidd-todo-demo:todos";
const VIEW_KEY = "aidd-todo-demo:view";

/** The browser's local storage, or `null` when reaching it throws (storage disabled) */
export const browserStorage = (): TodoStorage | null => {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
};

const isTodo = (value: unknown): value is Todo =>
  typeof value === "object" &&
  value !== null &&
  "id" in value &&
  typeof value.id === "string" &&
  "title" in value &&
  typeof value.title === "string" &&
  "done" in value &&
  typeof value.done === "boolean";

const saveItem = (storage: TodoStorage | null, key: string, value: string): boolean => {
  if (storage === null) {
    return false;
  }

  try {
    storage.setItem(key, value);

    return true;
  } catch {
    return false;
  }
};

/** The saved list, or an empty list when there is none or it cannot be read */
export const loadTodos = (storage: TodoStorage | null): TodoList => {
  try {
    const raw = storage?.getItem(STORAGE_KEY);

    if (raw === null || raw === undefined) {
      return [];
    }

    const parsed: unknown = JSON.parse(raw);

    return Array.isArray(parsed) && parsed.every(isTodo) ? parsed : [];
  } catch {
    return [];
  }
};

/** Saves the list and returns whether it was saved */
export const saveTodos = (storage: TodoStorage | null, todos: TodoList): boolean =>
  saveItem(storage, STORAGE_KEY, JSON.stringify(todos));

/** The saved view, or `all` when there is none or it cannot be read */
export const loadView = (storage: TodoStorage | null): TodoView => {
  try {
    const raw = storage?.getItem(VIEW_KEY);

    return isTodoView(raw) ? raw : "all";
  } catch {
    return "all";
  }
};

/** Saves the view and returns whether it was saved */
export const saveView = (storage: TodoStorage | null, view: TodoView): boolean =>
  saveItem(storage, VIEW_KEY, view);
