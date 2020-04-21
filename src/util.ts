import { Dimensions } from 'react-native'
import {
  useResponsiveHeight,
  useResponsiveWidth,
  useResponsiveFontSize,
} from 'react-native-responsive-dimensions'

export type Orientation = 'portrait' | 'landscape'

export const getOrientation = () => {
  const dimensions = Dimensions.get('screen')
  return dimensions.height > dimensions.width ? 'portrait' : 'landscape'
}

export const useOrientationResponsiveHeight = (portraitValue: number, landscapeValue: number) =>
  useResponsiveHeight(getOrientation() === 'portrait' ? portraitValue : landscapeValue)

export const useOrientationResponsiveWidth = (portraitValue: number, landscapeValue: number) =>
  useResponsiveWidth(getOrientation() === 'portrait' ? portraitValue : landscapeValue)

export const useOrientationResponsiveFontSize = (portraitValue: number, landscapeValue: number) =>
  useResponsiveFontSize(getOrientation() === 'portrait' ? portraitValue : landscapeValue)

export const orientationResponsiveHeight = (
  portraitValue: string | number,
  landscapeValue: string | number
) => (getOrientation() === 'portrait' ? portraitValue : landscapeValue)

export const orientationResponsiveWidth = (
  portraitValue: string | number,
  landscapeValue: string | number
) => (getOrientation() === 'portrait' ? portraitValue : landscapeValue)
