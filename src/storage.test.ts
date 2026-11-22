import { describe, expect, it } from "vite-plus/test";
import { loadTodos, loadView, saveTodos, saveView } from "./storage.ts";
import type { TodoStorage } from "./storage.ts";
import type { TodoList } from "./todos.ts";

function memoryStorage(initial: Record<string, string> = {}): TodoStorage {
  const items = new Map(Object.entries(initial));

  return {
    getItem: (key) => items.get(key) ?? null,
    setItem: (key, value) => {
      items.set(key, value);
    },
  };
}

const failing = (): never => {
  throw new DOMException("storage unavailable", "SecurityError");
};

const todos: TodoList = [
  { id: "a", title: "buy milk", done: true },
  { id: "b", title: "call the bank", done: false },
];

describe("loadTodos and saveTodos", () => {
  it("loads back the saved list", () => {
    const storage = memoryStorage();
    expect(saveTodos(storage, todos)).toBeTruthy();
    expect(loadTodos(storage)).toStrictEqual(todos);
  });

  it("loads an empty list when nothing was saved", () => {
    expect(loadTodos(memoryStorage())).toStrictEqual([]);
  });

  it.each([
    ["invalid JSON", "not json"],
    ["an object", "{}"],
    ["a malformed item", JSON.stringify([{ id: "a", title: "x" }])],
    ["a non-object item", JSON.stringify(["x"])],
  ])("loads an empty list from %s", (_case, raw) => {
    expect(loadTodos(memoryStorage({ "aidd-todo-demo:todos": raw }))).toStrictEqual([]);
  });

  it("loads an empty list without storage or when reading throws", () => {
    expect(loadTodos(null)).toStrictEqual([]);
    expect(loadTodos({ getItem: failing, setItem: failing })).toStrictEqual([]);
  });

  it("reports a failed save without throwing", () => {
    expect(saveTodos(null, todos)).toBeFalsy();
    expect(saveTodos({ getItem: () => null, setItem: failing }, todos)).toBeFalsy();
  });
});

describe("loadView and saveView", () => {
  it.each(["all", "active", "done"] as const)("loads back the saved %s view", (view) => {
    const storage = memoryStorage();
    expect(saveView(storage, view)).toBeTruthy();
    expect(loadView(storage)).toBe(view);
  });

  it("keeps the view apart from the saved list", () => {
    const storage = memoryStorage();
    saveTodos(storage, todos);
    saveView(storage, "done");
    expect(loadTodos(storage)).toStrictEqual(todos);
  });

  it.each([
    ["nothing saved", {}],
    ["an unknown view", { "aidd-todo-demo:view": "later" }],
    ["an unreadable view", { "aidd-todo-demo:view": '{"view":"done"}' }],
  ])("loads all from %s", (_case, initial: Record<string, string>) => {
    expect(loadView(memoryStorage(initial))).toBe("all");
  });

  it("loads all without storage or when reading throws", () => {
    expect(loadView(null)).toBe("all");
    expect(loadView({ getItem: failing, setItem: failing })).toBe("all");
  });

  it("reports a failed save without throwing", () => {
    expect(saveView(null, "done")).toBeFalsy();
    expect(saveView({ getItem: () => null, setItem: failing }, "done")).toBeFalsy();
  });
});
