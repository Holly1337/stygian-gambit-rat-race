import {useEffect, useRef, useState} from "react";
import styles from "./RaceTrack.module.scss";
import {advanceRat, getInitialRaceState, RaceState, RatState} from "../../state/state.ts";
import {DumbRat} from "../Rat/DumbRat.tsx";
import {calcTotalTime} from "../../utils/time.ts";

export const SmartTrack = () => {
  const [raceState, setRaceState] = useState(getInitialRaceState())
  const intervalRef = useRef(0)
  const allOverFinishLine = raceState.rats.every(rat => rat.isFinished)

  const finishRace = () => {
    clearInterval(intervalRef.current)
    setRaceState(state => ({...state, state: 'finished'}))
  }

  useEffect(() => {
    if (allOverFinishLine) {
      finishRace()
    }
  }, [allOverFinishLine])

  const simulateStep = (): void => {
    setRaceState((raceState) => {
      return {
        ...raceState,
        rats: raceState.rats.map(advanceRat),
      }
    })
  }

  const startRace = (): void => {
    clearInterval(intervalRef.current)
    setRaceState({
      ...getInitialRaceState(),
      state: 'racing'
    })
    simulateStep()
    intervalRef.current = setInterval(simulateStep, 1000)
  }

  const resetRace = (): void => {
    clearInterval(intervalRef.current)
    setRaceState({
      ...getInitialRaceState()
    })
  }
  
  const ratPosition = (rat: RatState, race: RaceState): number => {
    const ratsFinished = race.rats
      .filter(rat => rat.isFinished)
      .sort((a, b) => {
        const timeA = calcTotalTime(a)
        const timeB = calcTotalTime(b)
        return timeA - timeB
      })

    return ratsFinished.findIndex(finishedRat => finishedRat.name === rat.name) + 1
  }

  return (
    <div>
      {raceState.state === 'waiting' && (
        <button
          className={styles.startButton}
          onClick={startRace}
        >
          Start Race
        </button>
      )}
      {raceState.state === 'finished' && (
        <button
          className={styles.startButton}
          onClick={resetRace}
        >
          Reset Race
        </button>
      )}
      {raceState.state === 'racing' && (
        <button
          className={styles.startButton}
          onClick={resetRace}
        >
          Cancel Race
        </button>
      )}
      <div className={styles.track}>
        {raceState.rats.map((rat) => (
          <DumbRat
            key={rat.name}
            position={ratPosition(rat, raceState)}
            state={rat}
          />
        ))}
      </div>
    </div>
  )
}
