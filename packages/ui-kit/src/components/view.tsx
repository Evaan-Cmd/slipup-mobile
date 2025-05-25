import React from 'react'
import { View as RNView, StyleSheet } from 'react-native'
import type { ViewProps } from '../types'

const View: React.FC<ViewProps> = ({
  children,
  variant = 'default',
  style,
  ...props
}) => {
  const viewStyles = [
    styles.base,
    styles[variant],
    style,
  ]

  return (
    <RNView style={viewStyles} {...props}>
      {children}
    </RNView>
  )
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
  },
  default: {
    // Default styling
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  container: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
})

export { View } 