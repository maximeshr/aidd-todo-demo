import type { Todo, TodoList } from "./todos.ts";

/** The part of the Web Storage API the app uses. */
export type TodoStorage = Pick<Storage, "getItem" | "setItem">;

const STORAGE_KEY = "aidd-todo-demo:todos";

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
  if (storage === null) return false;
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(todos));
    return true;
  } catch {
    return false;
  }
}
