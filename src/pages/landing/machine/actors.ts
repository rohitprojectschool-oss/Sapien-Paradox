import { fromCallback } from "xstate/actors";
import type { LandingEvent, ReadingPace } from "./types";

const paceCadences: Record<ReadingPace, number> = {
  crawl: 4500,
  steady: 3000,
  soar: 1900,
};

export const paceActor = fromCallback<LandingEvent, { pace: ReadingPace }>(
  ({ sendBack, input }) => {
    const pace = input?.pace ?? "steady";
    const cadence = paceCadences[pace];
    const intervalId = setInterval(() => {
      sendBack({ type: "PACE_TICK", pace });
    }, cadence);

    return () => clearInterval(intervalId);
  }
);
