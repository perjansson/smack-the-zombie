import React, { useEffect } from 'react'
import {
  Modal,
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  Easing,
} from 'react-native'
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions'

import {
  orientationResponsiveHeight,
  orientationResponsiveWidth,
  useOrientationResponsiveFontSize,
} from '../util'
import { TopList } from './TopList'

interface StartGameModalProps {
  text: string
  subText?: string
  onStart: () => void
}

export const StartGameModal = ({ text, subText, onStart }: StartGameModalProps) => {
  const scale = new Animated.Value(0.7)

  useEffect(() => {
    Animated.timing(scale, {
      delay: 1000,
      toValue: 1,
      duration: 1500,
      easing: Easing.elastic(2),
    }).start()
  }, [])

  const textStyle = {
    fontSize: useOrientationResponsiveFontSize(7, 5),
    lineHeight: useOrientationResponsiveFontSize(7, 5),
  }

  const subTextStyle = {
    fontSize: useOrientationResponsiveFontSize(4.5, 4.5),
    lineHeight: useOrientationResponsiveFontSize(4.5, 4.5),
  }

  const startButtonStyle = {
    height: orientationResponsiveHeight(240, 350),
    width: orientationResponsiveWidth(240, 350),
    transform: [{ scale }],
  }

  return (
    <Modal animated animationType="fade" transparent visible={true}>
      <View style={styles.overlay}>
        <Text style={[styles.text, textStyle]}>{text}</Text>
        {subText && <Text style={[styles.text, subTextStyle]}>{subText}</Text>}
        <TopList />
        <TouchableWithoutFeedback onPress={onStart}>
          <Animated.Image
            style={[styles.startButton, startButtonStyle]}
            source={require('../../assets/start-button.png')}
          />
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#33914e10',
  },
  text: {
    marginTop: responsiveHeight(1),
    textAlign: 'center',
    fontFamily: 'permanent-marker',
    color: '#0f5221',
    shadowOffset: {
      width: responsiveWidth(0.5),
      height: responsiveWidth(0.5),
    },
    shadowOpacity: 0.2,
    shadowRadius: 0,
  },
  startButton: {
    marginTop: responsiveHeight(2),
  },
})
