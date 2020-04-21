import React from 'react'
import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'
import { LinearGradient } from 'expo-linear-gradient'

interface ScreenBackgroundProps {
  children: React.ReactNode
  colors: string[]
  style?: object
}

export function ScreenBackground({ children, colors }: ScreenBackgroundProps) {
  return (
    <LinearGradient colors={colors} style={styles.background}>
      {children}
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    padding: '2%',
  },
})
