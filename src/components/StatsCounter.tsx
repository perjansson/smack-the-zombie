import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { responsiveWidth } from 'react-native-responsive-dimensions'
import { useOrientationResponsiveHeight, useOrientationResponsiveWidth } from '../util'

interface StatsCounterProps {
  value: number
}

export const StatsCounter = ({ value }: StatsCounterProps) => {
  const containerStyle = {
    height: useOrientationResponsiveHeight(25, 15),
  }

  const textStyle = {
    marginLeft: -useOrientationResponsiveWidth(6, 4),
    fontSize: useOrientationResponsiveHeight(12, 10),
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.text, textStyle]}>{value}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: responsiveWidth(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'permanent-marker',
    color: '#126328',
  },
})
