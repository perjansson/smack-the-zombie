import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { useResponsiveWidth } from 'react-native-responsive-dimensions'
import { useOrientationResponsiveHeight } from '../util'
import { CountText } from './CountText'

interface CountDownProps {
  initialValue: number
}

const TIME_PADDING_MS = 250

export const CountDown = ({ initialValue }: CountDownProps) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    const timeoutIds = []
    new Array(initialValue)
      .fill(null)
      .map((_, i) => (i + 1) * 1000)
      .forEach(time =>
        timeoutIds.push(setTimeout(() => setValue(value => value - 1), time - TIME_PADDING_MS))
      )
    return () => timeoutIds.map(id => clearTimeout(id))
  }, [])

  const containerStyle = {
    width: useResponsiveWidth(100),
    height: useOrientationResponsiveHeight(25, 15),
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <CountText value={value} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})
