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
