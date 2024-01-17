import {RatState} from "../state/state.ts";

export const calcTotalTime = (rat: RatState): number => {
  const { distance, steps, lastRoll } = rat
  if (lastRoll === null) {
    return NaN
  }
  const timeUntilSecondLastStep = steps - 1;
  const overflow = distance - 100

  const lastStepSize = lastRoll - overflow
  const timeForLastStep = Math.round(lastStepSize / lastRoll * 100) / 100
  const time = timeUntilSecondLastStep + timeForLastStep

  return time
}
