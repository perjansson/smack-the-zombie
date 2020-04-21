import React, { useReducer, useState, useRef, useMemo, useCallback, useEffect } from 'react'
import { Audio } from 'expo-av'

import { GameCore, Stats, Speed, GameCoreInterface } from '../core/game'
import { reducer, initialState } from '../reducer'
import { ScreenBackground } from './ScreenBackground'
import { StartGameModal } from './StartGameModal'
import { GameGrid } from './GameGrid'
import { Tile } from '../types'

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

  const callbacks = useMemo(
    () => ({
      onChange: (gameTiles: Tile[]) => setTiles([...gameTiles]),
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
    dispatch({ type: 'start_game' })
    gameCoreRef.current.startGame()
  }, [])

  const handleOnSelect = useCallback(tile => {
    const wasHit = gameCoreRef.current.select(tile)
    if (wasHit) {
      playSound(smackSoundInstance.current)
    }
  }, [])

  const { viewState, gameStats } = state

  return (
    <ScreenBackground>
      {viewState === 'not_started' && (
        <StartGameModal text="Smack the Corona" onStart={handleOnStart} />
      )}
      {viewState === 'started' && tiles.length > 0 && (
        <GameGrid grid={tiles} onSelect={handleOnSelect} />
      )}
      {viewState === 'finished' && (
        <StartGameModal
          text="Game over"
          subText={`You survived ${gameStats.numberOfSelections} smacks!`}
          onStart={handleOnStart}
        />
      )}
    </ScreenBackground>
  )
}
