export interface Todo {
  readonly id: string;
  readonly title: string;
  readonly done: boolean;
}

export type TodoList = readonly Todo[];

export type CreateId = () => string;

const defaultCreateId: CreateId = () => crypto.randomUUID();

/** Appends a todo with the trimmed title; a blank title returns the same list. */
export function addTodo(
  todos: TodoList,
  title: string,
  createId: CreateId = defaultCreateId,
): TodoList {
  const trimmed = title.trim();
  if (trimmed === "") return todos;
  return [...todos, { id: createId(), title: trimmed, done: false }];
}

/** Flips the done state of the todo with this id. */
export function toggleTodo(todos: TodoList, id: string): TodoList {
  return todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo));
}

/** Removes the todo with this id. */
export function removeTodo(todos: TodoList, id: string): TodoList {
  return todos.filter((todo) => todo.id !== id);
}

/** The todos the user chose to see: every todo, only the active ones, or only the done ones. */
export type TodoView = "all" | "active" | "done";

export const TODO_VIEWS: readonly TodoView[] = ["all", "active", "done"];

/** The todos shown in this view, in their saved order. */
export function visibleTodos(todos: TodoList, view: TodoView): TodoList {
  if (view === "all") return todos;
  return todos.filter((todo) => todo.done === (view === "done"));
}
