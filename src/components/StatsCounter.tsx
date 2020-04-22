import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useResponsiveWidth } from 'react-native-responsive-dimensions'
import { useOrientationResponsiveHeight } from '../util'
import { CountText } from './CountText'

interface StatsCounterProps {
  value: number
}

export const StatsCounter = ({ value }: StatsCounterProps) => {
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
