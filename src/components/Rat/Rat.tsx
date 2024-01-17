import styles from './Rat.module.scss'
import {clsx} from "clsx";
import {useEffect, useRef, useState} from "react";
import ratImage from './rat.png'
import {rollD20} from "../../utils/dice.ts";


interface Props {
  bonus: number
  name?: string
}

export const Rat = (props: Props) => {
  const { bonus, name } = props
  const [left, setLeft] = useState(0)
  const [steps, setSteps] = useState(0)
  const [lastRoll, setLastRoll] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const intervalRef = useRef(0);

  const run = (): void => {
    const result = rollD20()
    setLeft((left) => {
      const actualBonus = Math.round(Math.random() * bonus * 100) / 100
      const speed = Math.max(1, result + actualBonus)
      const next = left + speed
      if (next >= 100) {
        setLastRoll(speed)
        clearInterval(intervalRef.current)
      }
      return next;
    })
    setSteps(steps => steps + 1)
  }

  useEffect(() => {
    const interval = setInterval(run, 1000)
    intervalRef.current = interval
    return () => {
      clearInterval(intervalRef.current)
    }
  }, []);

  const totalDistance = left
  const timeUntilSecondLast = steps - 1
  const overflow = totalDistance - 100

  const lastStepSize = lastRoll - overflow
  const timeForLastStep = Math.round(lastStepSize / lastRoll * 100) / 100
  const time = timeUntilSecondLast + timeForLastStep

  return (
    <>
      <div className={styles.track}>
        <div className={styles.labelWrapper}>
          <div className={styles.label}>
            <span>{name}</span>
            <span>{isFinished && `${time.toFixed(2)}s`}</span>
          </div>
        </div>
        <div className={styles.flag}></div>
        <img
          className={clsx(styles.rat)}
          style={{
            left: `${Math.min(left, 100)}%`,
            transform: 'scaleX(-1)'
          }}
          onTransitionEnd={() => {
            if (left >= 100) {
              setIsFinished(true)
            }
          }}
          src={ratImage} alt="rat test"
          height={64}
        />
      </div>
    </>
  )
}
