import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useResponsiveHeight } from 'react-native-responsive-dimensions'

import { useOrientationResponsiveWidth } from '../util'
import localStorage from '../localStorage'

export const TopList = () => {
  const [topThreeResults, setTopThreeResults] = useState([])
  useEffect(() => {
    const getTopThreeResults = async () => {
      const allResults = await localStorage.getStats()
      return allResults.slice(0, 3)
    }

    getTopThreeResults().then(setTopThreeResults)
  }, [])

  const containerStyle = {
    marginVertical: useResponsiveHeight(2),
    width: useOrientationResponsiveWidth(70, 30),
  }

  const textContainerStyle = {
    height: useResponsiveHeight(10 / 3),
  }
  const topListTextStyle = {
    marginBottom: useResponsiveHeight(1.5),
    fontSize: useResponsiveHeight(3),
  }

  const textStyle = {
    fontSize: useResponsiveHeight(2),
  }

  return (
    <>
      <View style={[styles.container, containerStyle]}>
        {topThreeResults.length > 0 && (
          <Text style={[styles.topListText, topListTextStyle]}>
            Top {topThreeResults.length} results
          </Text>
        )}
        {topThreeResults.map((result, i) => (
          <View key={i} style={[styles.textContainer, textContainerStyle]}>
            <Text style={[styles.text, textStyle, { paddingLeft: 10, textAlign: 'left' }]}>
              {new Date(result.startTime).toLocaleDateString()}
            </Text>
            <Text style={[styles.text, textStyle, { paddingRight: 10, textAlign: 'right' }]}>
              {result.numberOfSelections}
            </Text>
          </View>
        ))}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  textContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#062e11',
  },
  topListText: {
    fontFamily: 'permanent-marker',
    color: '#062e11',
    textAlign: 'center',
  },
  text: {
    flex: 1,
    fontFamily: 'permanent-marker',
    color: '#062e11',
  },
})
