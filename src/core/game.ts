import { Tile } from '../types'
import localStorage from '../localStorage'

export interface GameCoreInterface {
  startGame: () => void
  select: (tile: Tile) => boolean
  getStats: () => Stats
}

export interface GameCoreCallbacks {
  onCountdownStart: () => void
  onGameStart: () => void
  onGameTilesChange: (gameTiles: Tile[]) => void
  onGameSpeedChange: (gameSpeed: Speed) => void
  onGameOver: (stats: Stats) => void
}

export interface Speed {
  timerMs: number
  delayMs: number
}

export interface Stats {
  startTime: number
  stopTime: number
  totalTime: string
  numberOfSelections: number
}

const START_TIMER_MS = 5000
const DELAY_TIMER_MS = 3000
const LEVEL_INTERVAL = 3
const MAX_LEVEL_INTERVAL = 15

const TIMER_FACTOR = 0.75
const DELAY_FACTOR = 0.75

export class GameCore implements GameCoreInterface {
  callbacks: GameCoreCallbacks

  stats: Stats
  gameTiles: Tile[]
  currentActive: Tile
  currentTimerMs: number
  currentDelayMs: number
  currentLevelInterval: number
  timeoutId: number

  constructor(callbacks: GameCoreCallbacks) {
    this.callbacks = callbacks
  }

  randomizeNewActive = (callback?: () => void) => {
    const min = 0
    const max = this.gameTiles.length
    const newActiveIndex = Math.floor(Math.random() * (max - min + 1)) + min
    const newActive = this.gameTiles[newActiveIndex]

    if (!newActive || this.currentActive === newActive) {
      this.randomizeNewActive(callback)
    } else {
      // Not the first time
      if (this.currentActive) {
        this.currentActive.active = false
        this.currentActive = undefined

        if (this.stats.numberOfSelections % this.currentLevelInterval === 0) {
          this.currentTimerMs = this.currentTimerMs * TIMER_FACTOR
          this.currentDelayMs = this.currentDelayMs * DELAY_FACTOR
          this.currentLevelInterval = Math.min(MAX_LEVEL_INTERVAL, this.currentLevelInterval * 2)
          this.callbacks.onGameSpeedChange({
            timerMs: this.currentTimerMs,
            delayMs: this.currentDelayMs,
          })
        }
      }

      this.callbacks.onGameTilesChange(this.gameTiles)

      setTimeout(() => {
        newActive.active = true
        this.currentActive = newActive
        this.callbacks.onGameTilesChange(this.gameTiles)
        this.startTimer()
        callback && callback()
      }, this.currentDelayMs)
    }
  }

  startTimer = () => {
    this.timeoutId = setTimeout(this.stopGame, this.currentTimerMs)
  }

  startGame = () => {
    this.currentTimerMs = START_TIMER_MS
    this.currentDelayMs = DELAY_TIMER_MS
    this.currentLevelInterval = LEVEL_INTERVAL
    this.gameTiles = new Array(9).fill(null).map((_, i) => ({ id: i, active: false }))
    this.callbacks.onCountdownStart()
    this.callbacks.onGameTilesChange(this.gameTiles)
    this.randomizeNewActive(() => {
      this.stats = {
        startTime: new Date().getTime(),
        stopTime: undefined,
        totalTime: undefined,
        numberOfSelections: 0,
      }
      this.callbacks.onGameStart()
    })
  }

  stopGame = async () => {
    this.stats.stopTime = new Date().getTime()
    this.stats.totalTime = new Date(Math.floor(this.stats.stopTime - this.stats.startTime))
      .toISOString()
      .substr(11, 8)
    await localStorage.setStat(this.stats)
    this.callbacks.onGameOver(this.stats)
  }

  select = (tile: Tile) => {
    // Check that there is not already a selection ongoing (no this.timeoutId)
    if (this.timeoutId !== undefined && this.currentActive === tile) {
      clearTimeout(this.timeoutId)
      this.timeoutId === undefined
      this.stats.numberOfSelections++
      this.randomizeNewActive()
      return true
    }

    return false
  }

  getStats = () => this.stats
}
