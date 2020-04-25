import React, { useReducer, useState, useRef, useMemo, useCallback, useEffect } from 'react'
import { Audio } from 'expo-av'

import { GameCore, Stats, Speed, GameCoreInterface, GameCoreCallbacks } from '../core/game'
import { reducer, initialState } from '../reducer'
import { ScreenBackground } from './ScreenBackground'
import { StartGameModal } from './StartGameModal'
import { GameGrid } from './GameGrid'
import { Tile } from '../types'
import { CountDown } from './CountDown'
import { StatsCounter } from './StatsCounter'

export const Game = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [tiles, setTiles] = useState([] as Tile[])
  const smackSoundInstance = useRef(undefined)
  const gameOverSoundInstance = useRef(undefined)

  const initSounds = async () => {
    const { sound: smackSound } = await Audio.Sound.createAsync(
      require('../../assets/sounds/punch.mp3')
    )
    smackSoundInstance.current = smackSound

    const { sound: gameOverSound } = await Audio.Sound.createAsync(
      require('../../assets/sounds/game-over.mp3')
    )
    gameOverSoundInstance.current = gameOverSound
  }

  useEffect(() => {
    initSounds()
  }, [])

  const playSound = (sound: Audio.Sound) => {
    try {
      sound && sound.playFromPositionAsync(0)
    } catch (error) {
      // Ignore
    }
  }

  const callbacks: GameCoreCallbacks = useMemo(
    () => ({
      onCountdownStart: () => dispatch({ type: 'count_down' }),
      onGameStart: () => dispatch({ type: 'start_game' }),
      onGameTilesChange: (gameTiles: Tile[]) => setTiles([...gameTiles]),
      onGameSpeedChange: (speed: Speed) => {},
      onGameOver: (stats: Stats) => {
        playSound(gameOverSoundInstance.current)
        dispatch({ type: 'game_over', payload: { stats } })
      },
    }),
    []
  )

  const gameCoreRef: React.MutableRefObject<GameCoreInterface> = useRef(new GameCore(callbacks))

  const handleOnStart = useCallback(() => {
    gameCoreRef.current.startGame()
  }, [])

  const handleOnSelect = useCallback(tile => {
    const wasHit = gameCoreRef.current.select(tile)
    if (wasHit) {
      playSound(smackSoundInstance.current)
      dispatch({ type: 'update_stats', payload: gameCoreRef.current.getStats() })
    }
  }, [])

  const { viewState, gameStats } = state

  return (
    <ScreenBackground
      colors={viewState === 'finished' ? ['#62000030', '#620000'] : ['#62000050', '#62000099']}
    >
      {viewState === 'not_started' && (
        <StartGameModal text="Smack the Zombie" onStart={handleOnStart} />
      )}
      {(viewState === 'counting_down' || viewState === 'started') && (
        <>
          {viewState === 'counting_down' && <CountDown initialValue={3} />}
          {viewState === 'started' && <StatsCounter value={gameStats?.numberOfSelections || 0} />}
          <GameGrid grid={tiles} onSelect={handleOnSelect} />
        </>
      )}
      {viewState === 'finished' && (
        <StartGameModal
          text="Game over"
          subText={`${gameStats.numberOfSelections} smacks!`}
          onStart={handleOnStart}
        />
      )}
    </ScreenBackground>
  )
}
