import React from 'react'
import { Text as RNText, StyleSheet } from 'react-native'
import type { TextProps } from '../types'

const Text: React.FC<TextProps> = ({
  children,
  variant = 'default',
  style,
  ...props
}) => {
  const textStyles = [
    styles.base,
    styles[variant],
    style,
  ]

  return (
    <RNText style={textStyles} {...props}>
      {children}
    </RNText>
  )
}

const styles = StyleSheet.create({
  base: {
    color: '#374151',
  },
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  body: {
    fontSize: 14,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    color: '#6b7280',
  },
  heading: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '700',
    color: '#111827',
  },
  subheading: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '600',
    color: '#111827',
  },
})

export { Text } 