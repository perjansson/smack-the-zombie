import React, { memo, createRef } from 'react'
import { View, StyleSheet } from 'react-native'
import * as Animatable from 'react-native-animatable'
import Constants from 'expo-constants'

import { useOrientationResponsiveHeight, useOrientationResponsiveWidth } from '../util'
import { Tile } from '../types'
import { GameTile } from './GameTile'

interface GameGridProps {
  grid: Tile[]
  onSelect: (tile: Tile) => void
}

const imageRefs = {}

export const GameGrid = memo(({ grid, onSelect }: GameGridProps) => {
  const containerStyle = {
    marginTop: useOrientationResponsiveHeight(25, 15) - Constants.statusBarHeight,
    marginHorizontal: useOrientationResponsiveWidth(2, 10),
    height: useOrientationResponsiveHeight(50, 70),
  } as object

  const gameTileContainerStyle = {
    width: `${100 / 3}%`,
    maxWidth: `${100 / 3}%`,
    height: `${100 / 3}%`,
  }

  return (
    <View style={[styles.container, containerStyle]}>
      {grid.map((tile: Tile) => {
        const imageRef = createRef<Animatable.Image>()
        imageRefs[tile.id] = imageRef

        return (
          <GameTile
            key={tile.id}
            gameTile={tile}
            onSelect={onSelect}
            imageRef={imageRef}
            containerStyle={gameTileContainerStyle}
          />
        )
      })}
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
})
