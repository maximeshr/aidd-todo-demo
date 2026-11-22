import { describe, expect, it } from "vite-plus/test";
import { createSaveStatus } from "./save-status.ts";
import type { FrameScheduler } from "./save-status.ts";

const manualFrames = () => {
  const pending = new Map<number, () => void>();
  let nextId = 0;

  const frames: FrameScheduler = {
    request: (onFrame) => {
      nextId += 1;
      pending.set(nextId, onFrame);

      return nextId;
    },
    cancel: (id) => {
      pending.delete(id);
    },
  };

  const flush = () => {
    const queued = [...pending.values()];
    pending.clear();

    for (const onFrame of queued) {
      onFrame();
    }
  };

  return { frames, flush };
};

describe(createSaveStatus, () => {
  it("shows the message on the next frame after a failed save", () => {
    const status = { textContent: "" };
    const { frames, flush } = manualFrames();
    createSaveStatus(status, frames)(false);
    flush();
    expect(status.textContent).toBe("The list was not saved.");
  });

  it("clears the message after a successful save", () => {
    const status = { textContent: "The list was not saved." };
    createSaveStatus(status, manualFrames().frames)(true);
    expect(status.textContent).toBe("");
  });

  it("shows no message when a success follows a failure within the same frame", () => {
    const status = { textContent: "" };
    const { frames, flush } = manualFrames();
    const announce = createSaveStatus(status, frames);
    announce(false);
    announce(true);
    flush();
    expect(status.textContent).toBe("");
  });
});
