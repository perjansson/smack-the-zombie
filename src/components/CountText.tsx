import React, { useEffect } from 'react'
import { StyleSheet, Animated } from 'react-native'
import { useOrientationResponsiveHeight, useOrientationResponsiveWidth } from '../util'

interface CountTextProps {
  value: number
}

export const CountText = ({ value }: CountTextProps) => {
  const scale = new Animated.Value(0.3)

  useEffect(() => {
    scale.setValue(0.3)

    Animated.parallel([
      Animated.timing(scale, {
        delay: 50,
        toValue: 1,
        duration: 100,
      }),
    ]).start()
  }, [value])

  const textStyle = {
    marginLeft: -useOrientationResponsiveWidth(6, 4),
    fontSize: useOrientationResponsiveHeight(12, 10),
    transform: [{ scale }],
  }

  return <Animated.Text style={[styles.text, textStyle]}>{value}</Animated.Text>
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'permanent-marker',
    color: '#126328',
  },
})
