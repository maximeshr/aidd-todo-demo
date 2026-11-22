import { describe, expect, it } from "vite-plus/test";
import {
  addTodo,
  clearDone,
  isTodoView,
  removeTodo,
  TODO_VIEWS,
  toggleTodo,
  visibleTodos,
} from "./todos.ts";
import type { TodoList } from "./todos.ts";

function sequentialIds() {
  let next = 0;

  return () => {
    next += 1;

    return `id-${next}`;
  };
}

describe(addTodo, () => {
  it("appends a todo, not done, in insertion order", () => {
    const createId = sequentialIds();
    const todos = addTodo(addTodo([], "first", createId), "second", createId);
    expect(todos).toStrictEqual([
      { id: "id-1", title: "first", done: false },
      { id: "id-2", title: "second", done: false },
    ]);
  });

  it("trims the title", () => {
    expect(addTodo([], "  buy milk  ", sequentialIds())[0]?.title).toBe("buy milk");
  });

  it.each(["", "   ", "\t\n"])("returns the same list for the blank title %j", (title) => {
    const todos: TodoList = [{ id: "a", title: "keep", done: false }];
    expect(addTodo(todos, title)).toBe(todos);
  });

  it("allows duplicate titles with distinct ids", () => {
    const createId = sequentialIds();
    const todos = addTodo(addTodo([], "walk", createId), "walk", createId);
    expect(todos.map((todo) => todo.id)).toStrictEqual(["id-1", "id-2"]);
  });

  it("does not mutate its input", () => {
    const todos: TodoList = [];
    addTodo(todos, "new");
    expect(todos).toStrictEqual([]);
  });
});

describe("toggleTodo and removeTodo", () => {
  const createId = sequentialIds();

  const three = ["a", "b", "c"].reduce<TodoList>(
    (todos, title) => addTodo(todos, title, createId),
    [],
  );

  it("marks a todo done and back to not done", () => {
    const done = toggleTodo(three, "id-2");
    expect(done[1]).toHaveProperty("done", true);
    expect(toggleTodo(done, "id-2")[1]).toHaveProperty("done", false);
  });

  it("keeps the other todos and their order after a toggle and a removal", () => {
    const result = removeTodo(toggleTodo(three, "id-1"), "id-2");
    expect(result).toStrictEqual([
      { id: "id-1", title: "a", done: true },
      { id: "id-3", title: "c", done: false },
    ]);
    expect(three.every((todo) => !todo.done)).toBeTruthy();
  });
});

describe(visibleTodos, () => {
  const todos: TodoList = [
    { id: "a", title: "a", done: true },
    { id: "b", title: "b", done: false },
    { id: "c", title: "c", done: false },
    { id: "d", title: "d", done: true },
  ];

  const ids = (list: TodoList) => list.map((todo) => todo.id);

  it.each([
    ["all", ["a", "b", "c", "d"]],
    ["active", ["b", "c"]],
    ["done", ["a", "d"]],
  ] as const)("shows the %s todos in saved order", (view, expected) => {
    expect(ids(visibleTodos(todos, view))).toStrictEqual(expected);
  });

  it("returns an empty list when no todo fits the view", () => {
    expect(visibleTodos(todos.slice(1, 3), "done")).toStrictEqual([]);
  });

  it("does not mutate its input", () => {
    const copy = structuredClone(todos);
    visibleTodos(todos, "active");
    expect(todos).toStrictEqual(copy);
  });
});

describe(clearDone, () => {
  const todos: TodoList = [
    { id: "a", title: "a", done: true },
    { id: "b", title: "b", done: false },
    { id: "c", title: "c", done: true },
    { id: "d", title: "d", done: false },
  ];

  it("keeps only the active todos, in saved order and unchanged", () => {
    expect(clearDone(todos)).toStrictEqual([
      { id: "b", title: "b", done: false },
      { id: "d", title: "d", done: false },
    ]);
  });

  it("returns an empty list when every todo is done", () => {
    expect(clearDone(todos.filter((todo) => todo.done))).toStrictEqual([]);
  });

  it("returns the same list when no todo is done", () => {
    const active = todos.filter((todo) => !todo.done);
    const empty: TodoList = [];
    expect(clearDone(active)).toBe(active);
    expect(clearDone(empty)).toBe(empty);
  });

  it("does not mutate its input", () => {
    const copy = structuredClone(todos);
    clearDone(todos);
    expect(todos).toStrictEqual(copy);
  });
});

describe(isTodoView, () => {
  it.each(TODO_VIEWS)("accepts the %s view", (view) => {
    expect(isTodoView(view)).toBeTruthy();
  });

  it.each([null, undefined, "", "All", "{not a view", 0, {}])("rejects %j", (value) => {
    expect(isTodoView(value)).toBeFalsy();
  });
});
