import styles from './Rat.module.scss'
import {clsx} from "clsx";
import ratImage from './rat.png'
import {RatState} from "../../state/state.ts";
import {calcTotalTime} from "../../utils/time.ts";

interface Props {
  position: number
  state: RatState
}

export const DumbRat = (props: Props) => {
  const { position } = props
  const { name, distance, isFinished } = props.state

  const time = calcTotalTime(props.state)
  const labelClassName = clsx(
    styles.label,
    position === 1 && styles.gold,
    position === 2 && styles.silver,
    position === 3 && styles.bronze,
    position === 9 && styles.last,
  )

  return (
    <>
      <div className={styles.track}>
        <div className={styles.labelWrapper}>
          <div className={labelClassName}>
            <span style={{ display: "flex", gap: 16}}>
              <span style={{ width: 24 }}>{position > 0 ? position : ''}</span>
              <span>{name}</span>
            </span>
            <span>{isFinished && `${time.toFixed(2)}s`}</span>
          </div>
        </div>
        <div className={styles.flag}></div>
        <img
          className={clsx(styles.rat)}
          style={{
            left: `${Math.min(distance, 100)}%`,
            transform: 'scaleX(-1)'
          }}
          src={ratImage} alt={"rat " + name}
          height={64}
        />
      </div>
    </>
  )
}
