import React, { useState, useCallback } from 'react'
import { Platform, UIManager, LayoutAnimation } from 'react-native'
import { useDimensionsChange } from 'react-native-responsive-dimensions'
import { AppLoading, SplashScreen as ExpoSplashScreen } from 'expo'
import * as Font from 'expo-font'
import { Asset } from 'expo-asset'

import { Game } from './components/Game'

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false)

  async function cacheResourcesAsync() {
    await Promise.all([
      Font.loadAsync({
        'permanent-marker': require('../assets/fonts/PermanentMarker-Regular.ttf'),
      }),
      Asset.fromModule(require('../assets/inactive.png')).downloadAsync(),
      Asset.fromModule(require('../assets/active.png')).downloadAsync(),
    ])

    ExpoSplashScreen.hide()
  }

  useDimensionsChange(
    useCallback(({ window, screen }) => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    }, [])
  )

  if (!isAppReady) {
    return (
      <AppLoading
        startAsync={cacheResourcesAsync}
        onFinish={() => setIsAppReady(true)}
        onError={console.warn}
        autoHideSplash={false}
      />
    )
  }

  return isAppReady && <Game />
}
