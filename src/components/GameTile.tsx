import React, { memo, useRef } from 'react'
import { Tile } from '../types'
import { TouchableWithoutFeedback, View, StyleSheet } from 'react-native'
import * as Animatable from 'react-native-animatable'

const inactiveImage = require('../../assets/inactive.png')
const activeImage = require('../../assets/active.png')

export type AnimateFn = (animationFnName?: string) => void

interface GameTileProps {
  gameTile?: Tile
  onSelect: (gameTile, animateFn: AnimateFn) => void
  imageRef?: React.MutableRefObject<Animatable.Image>
  containerStyle?: object
}

export const GameTile = memo(({ gameTile, onSelect, imageRef, containerStyle }: GameTileProps) => {
  function handleOnPress() {
    onSelect(gameTile, animate)
  }

  function animate(animationFnName?: string) {
    if (animationFnName !== undefined) {
      imageRef.current[animationFnName]()
    }
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableWithoutFeedback onPressIn={handleOnPress}>
        <Animatable.Image
          ref={imageRef as any}
          source={gameTile.active ? activeImage : inactiveImage}
          resizeMode="contain"
          style={styles.image}
        />
      </TouchableWithoutFeedback>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    padding: '3%',
  },
  image: {
    width: '98%',
    height: '98%',
  },
})
