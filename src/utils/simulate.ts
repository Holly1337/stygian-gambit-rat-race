import {advanceRat, getInitialRaceState, RaceState} from "../state/state.ts";
import {calcTotalTime} from "./time.ts";

let quickest = Number.POSITIVE_INFINITY
let slowest = Number.NEGATIVE_INFINITY

const isRaceFinished = (state: RaceState): boolean => {
  return state.rats.every(rat => rat.isFinished)
}

export const simulateRace = (): RaceState => {
  const state = getInitialRaceState()
  let isFinished = isRaceFinished(state)
  while (!isFinished) {
    state.rats = state.rats.map(rat => advanceRat(rat))
    isFinished = isRaceFinished(state)
  }
  return state
}

export const simulateRaces = (count: number): RaceState[] => {
  const races: RaceState[] = []
  for (let i = 0; i < count; i++) {
    races.push(simulateRace())
  }
  return races
}

const getRacePlacements = (race: RaceState): Record<string, number> => {
  const placements: Record<string, number> = {}
  const sortedTimeResults: Array<{ name: string, time: number}> = race.rats
    .map(rat => ({ name: rat.name, time: calcTotalTime(rat) }))
    .sort((a, b) => a.time - b.time)

  if (sortedTimeResults[0].time < quickest) quickest = sortedTimeResults[0].time
  if (sortedTimeResults[8].time > slowest) slowest = sortedTimeResults[8].time

  race.rats.forEach((rat) => {
    placements[rat.name] = sortedTimeResults.findIndex(r => r.name === rat.name) + 1
  })

  return placements
}

export const createRaceStatistics = (sampleSize: number) => {
  const races = simulateRaces(sampleSize)
  const raceStatsPerRat: Record<string, number[]> = {}
  const averagePlacementPerRat: Record<string, number> = {}
  const percentagePerPlace: Record<string, Record<number, number>> = {}

  // map placements to rat names
  races.forEach(race => {
    const placements = getRacePlacements(race)
    Object.entries(placements).forEach(([name, place]) => {
      if (!Array.isArray(raceStatsPerRat[name])) {
        raceStatsPerRat[name] = []
      }
      raceStatsPerRat[name].push(place)
    })
  })
  // calculate average place per rat and sort by average placement
  Object.entries(raceStatsPerRat).forEach(([name, placements]) => {
    const sum = placements.reduce((prev, curr) => prev + curr, 0)
    averagePlacementPerRat[name] = sum / sampleSize
  })
  const sortedStats = Object.entries(averagePlacementPerRat)
    .map(([name, average]) => [name, average])
    .sort(([_nameA, averageA], [_nameB, averageB]) => (averageA as number) - (averageB as number))

  // calc place percentage
  Object.entries(raceStatsPerRat).forEach(([name, placements]) => {
    const p = [
      placements.filter((place) => place === 1).length / sampleSize,
      placements.filter((place) => place === 2).length / sampleSize,
      placements.filter((place) => place === 3).length / sampleSize,
      placements.filter((place) => place === 4).length / sampleSize,
      placements.filter((place) => place === 5).length / sampleSize,
      placements.filter((place) => place === 6).length / sampleSize,
      placements.filter((place) => place === 7).length / sampleSize,
      placements.filter((place) => place === 8).length / sampleSize,
      placements.filter((place) => place === 9).length / sampleSize,
    ]
    percentagePerPlace[name] = {
      1: p[0],
      2: p[1],
      3: p[2],
      4: p[3],
      5: p[4],
      6: p[5],
      7: p[6],
      8: p[7],
      9: p[8],
    }
  })

  console.log(raceStatsPerRat)
  console.log(averagePlacementPerRat)
  console.log(sortedStats)
  console.log(percentagePerPlace)
  console.log({ quickest, slowest })
}
