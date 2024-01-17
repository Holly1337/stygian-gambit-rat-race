import {rollD20} from "../utils/dice.ts";

export interface RatState {
  name: string
  bonus: number
  distance: number
  steps: number
  lastRoll: number | null
  isFinished: boolean
}

export interface RaceState {
  state: 'waiting' | 'racing' | 'finished'
  rats: RatState[]
}

const getInitialRatState = ({ name, bonus}: {name: string, bonus: number}): RatState => ({
  name,
  bonus,
  distance: 0,
  steps: 0,
  lastRoll: null,
  isFinished: false
})

export const getInitialRaceState = (): RaceState => {
  const rats = [
    getInitialRatState({bonus: 0, name: 'Asmodeus'}),
    getInitialRatState({bonus: 1, name: 'Mephisto'}),
    getInitialRatState({bonus: 0, name: 'Baalzebub'}),
    getInitialRatState({bonus: 2, name: 'Glasya'}),
    getInitialRatState({bonus: 1, name: 'Levistus'}),
    getInitialRatState({bonus: 2, name: 'Fierna'}),
    getInitialRatState({bonus: 1, name: 'Mammon'}),
    getInitialRatState({bonus: 0, name: 'Dispater'}),
    getInitialRatState({bonus: 2, name: 'Zariel'}),
  ]

  return {
    state: 'waiting',
    rats
  }
}

export const advanceRat = (rat: RatState): RatState => {
  const { bonus, distance } = rat

  if (distance >= 100) {
    return {
      ...rat,
      isFinished: true
    }
  }

  const diceRoll = rollD20();
  const actualBonus = Math.round(Math.random() * bonus * 100) / 100
  const speed = Math.max(1, diceRoll + actualBonus) // use Math.max in case bonus is negative, to prevent the rat from going back
  const nextDistance = distance + speed
  let lastRoll = rat.lastRoll

  if (nextDistance >= 100) {
    lastRoll = speed
  }

  return {
    ...rat,
    distance: nextDistance,
    lastRoll,
    steps: rat.steps + 1,
  }
}

export  const finishRatRace = (rat: RatState): RatState => {
  return {
    ...rat,
    isFinished: true
  }
}
