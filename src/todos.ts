export interface Todo {
  readonly id: string;
  readonly title: string;
  readonly done: boolean;
}

export type TodoList = readonly Todo[];

export type CreateId = () => string;

const defaultCreateId: CreateId = () => crypto.randomUUID();

/** Appends a todo with the trimmed title, or returns the same list when the title is blank */
export const addTodo = (
  todos: TodoList,
  title: string,
  createId: CreateId = defaultCreateId,
): TodoList => {
  const trimmed = title.trim();

  if (trimmed === "") {
    return todos;
  }

  return [...todos, { id: createId(), title: trimmed, done: false }];
};

/** Flips the done state of the todo with this id */
export const toggleTodo = (todos: TodoList, id: string): TodoList =>
  todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo));

/** Removes the todo with this id */
export const removeTodo = (todos: TodoList, id: string): TodoList =>
  todos.filter((todo) => todo.id !== id);

/** Removes every done todo, keeping the active ones in order. With no done todo, returns the same list */
export const clearDone = (todos: TodoList): TodoList =>
  todos.some((todo) => todo.done) ? todos.filter((todo) => !todo.done) : todos;

/** Every view, in display order: the single source of the `TodoView` names and of the view buttons */
export const TODO_VIEWS = ["all", "active", "done"] as const;

/** The todos the user chose to see: every todo, only the active ones, or only the done ones */
export type TodoView = (typeof TODO_VIEWS)[number];

/** Whether this value names a view */
export const isTodoView = (value: unknown): value is TodoView =>
  TODO_VIEWS.some((view) => view === value);

/** The todos shown in this view, in their saved order */
export const visibleTodos = (todos: TodoList, view: TodoView): TodoList => {
  if (view === "all") {
    return todos;
  }

  return todos.filter((todo) => todo.done === (view === "done"));
};
