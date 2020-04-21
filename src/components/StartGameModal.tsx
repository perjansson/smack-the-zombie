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
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions'
import {
  useOrientationResponsiveHeight,
  useOrientationResponsiveWidth,
  orientationResponsiveHeight,
  orientationResponsiveWidth,
  useOrientationResponsiveFontSize,
} from '../util'

interface StartGameModalProps {
  text: string
  subText?: string
  onStart: () => void
}

export const StartGameModal = ({ text, subText, onStart }: StartGameModalProps) => {
  const animatedHeightStart = orientationResponsiveHeight(170, 230) as number
  const animatedHeightEnd = orientationResponsiveHeight(240, 350) as number

  const animatedWidthStart = orientationResponsiveWidth(150, 230) as number
  const animatedWidthEnd = orientationResponsiveWidth(240, 350) as number

  const animatedHeight = new Animated.Value(animatedHeightStart)
  const animatedWidth = new Animated.Value(animatedWidthStart)

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(animatedHeight, {
        toValue: animatedHeightEnd,
        duration: 1000,
        easing: Easing.elastic(2),
      }).start()

      Animated.timing(animatedWidth, {
        toValue: animatedWidthEnd,
        duration: 1000,
        easing: Easing.elastic(2),
      }).start()
    }, 500)
  }, [])

  const textStyle = {
    fontSize: useOrientationResponsiveFontSize(7, 6),
    lineHeight: useOrientationResponsiveFontSize(7, 6),
  }

  const subTextStyle = {
    fontSize: useOrientationResponsiveFontSize(3, 2),
    lineHeight: useOrientationResponsiveFontSize(3, 2),
  }

  const startButtonStyle = {
    height: animatedHeight,
    width: animatedWidth,
  }

  return (
    <Modal animated animationType="fade" transparent visible={true}>
      <View style={styles.overlay}>
        <Text style={[styles.text, textStyle]}>{text}</Text>
        {subText && <Text style={[styles.text, subTextStyle]}>{subText}</Text>}
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
    color: '#062e11',
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
