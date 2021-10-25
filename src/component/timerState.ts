import { createContext } from "react";

const timerState={
    delay:0,
    datePaused: 0,
    paused: false,
    running: false,
    dateStart: Date.now()
}

export type TimerState = typeof timerState;
const timeContext = createContext<typeof timerState>(timerState);

export default timeContext;
