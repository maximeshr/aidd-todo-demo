/** Schedules a function for the next frame and returns an id that `cancel` accepts */
export interface FrameScheduler {
  request: (onFrame: () => void) => number;
  cancel: (id: number) => void;
}

export const browserFrames: FrameScheduler = {
  request: (onFrame) => requestAnimationFrame(onFrame),
  cancel: (id) => {
    cancelAnimationFrame(id);
  },
};

/** Shows the not-saved message on failure and clears it on success. A repeated failure is announced again */
export const createSaveStatus = (
  status: Pick<HTMLElement, "textContent">,
  frames: FrameScheduler,
) => {
  let pending: number | undefined;

  return (saved: boolean): void => {
    if (pending !== undefined) {
      frames.cancel(pending);
    }

    pending = undefined;
    status.textContent = "";

    if (!saved) {
      pending = frames.request(() => {
        status.textContent = "The list was not saved.";
      });
    }
  };
};
