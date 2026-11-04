/** Schedules a callback for the next frame; returns an id `cancel` accepts. */
export interface FrameScheduler {
  request(callback: () => void): number;
  cancel(id: number): void;
}

export const browserFrames: FrameScheduler = {
  request: (callback) => requestAnimationFrame(callback),
  cancel: (id) => cancelAnimationFrame(id),
};

/** Shows the not-saved message on failure and clears it on success; a repeated failure is announced again. */
export function createSaveStatus(status: Pick<HTMLElement, "textContent">, frames: FrameScheduler) {
  let pending: number | undefined;
  return (saved: boolean): void => {
    if (pending !== undefined) frames.cancel(pending);
    pending = undefined;
    status.textContent = "";
    if (!saved) pending = frames.request(() => (status.textContent = "The list was not saved."));
  };
}
