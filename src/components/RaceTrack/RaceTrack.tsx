import styles from './RaceTrack.module.scss'
import {useState} from "react";
import {Rat} from "../Rat/Rat.tsx";

export const RaceTrack = () => {
  const [keys, setKeys] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9])
  const restartRace = (): void => {
    const newKeys: number[] = []
    for (let i = 0; i < keys.length; i++) {
      newKeys.push(Math.random())
    }
    setKeys(newKeys)
  }

  return (

    <div>
      <button
        className={styles.startButton}
        onClick={restartRace}
      >
        Start Race
      </button>
      <div className={styles.track}>
        <Rat key={keys[0]} bonus={0} name={'Asmodeus'} />
        <Rat key={keys[1]} bonus={1} name={'Mephisto'} />
        <Rat key={keys[2]} bonus={0} name={'Baalzebul'} />
        <Rat key={keys[3]} bonus={2} name={'Glasya'} />
        <Rat key={keys[4]} bonus={1} name={'Levistus'} />
        <Rat key={keys[5]} bonus={2} name={'Fierna'} />
        <Rat key={keys[6]} bonus={1} name={'Mammon'} />
        <Rat key={keys[7]} bonus={0} name={'Dispater'} />
        <Rat key={keys[8]} bonus={2} name={'Zariel'} />
      </div>
    </div>
  )
}
