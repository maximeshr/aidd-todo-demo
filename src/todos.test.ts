import { describe, expect, it } from "vite-plus/test";
import { addTodo, removeTodo, toggleTodo, visibleTodos, type TodoList } from "./todos.ts";

function sequentialIds() {
  let next = 0;
  return () => `id-${++next}`;
}

describe("addTodo", () => {
  it("appends a todo, not done, in insertion order", () => {
    const createId = sequentialIds();
    const todos = addTodo(addTodo([], "first", createId), "second", createId);
    expect(todos).toEqual([
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
    expect(todos.map((todo) => todo.id)).toEqual(["id-1", "id-2"]);
  });

  it("does not mutate its input", () => {
    const todos: TodoList = [];
    addTodo(todos, "new");
    expect(todos).toEqual([]);
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
    expect(done[1]?.done).toBe(true);
    expect(toggleTodo(done, "id-2")[1]?.done).toBe(false);
  });

  it("keeps the other todos and their order after a toggle and a removal", () => {
    const result = removeTodo(toggleTodo(three, "id-1"), "id-2");
    expect(result).toEqual([
      { id: "id-1", title: "a", done: true },
      { id: "id-3", title: "c", done: false },
    ]);
    expect(three.every((todo) => !todo.done)).toBe(true);
  });
});

describe("visibleTodos", () => {
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
    expect(ids(visibleTodos(todos, view))).toEqual(expected);
  });

  it("returns an empty list when no todo fits the view", () => {
    expect(visibleTodos(todos.slice(1, 3), "done")).toEqual([]);
  });

  it("does not mutate its input", () => {
    const copy = structuredClone(todos);
    visibleTodos(todos, "active");
    expect(todos).toEqual(copy);
  });
});
