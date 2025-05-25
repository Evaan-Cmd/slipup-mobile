import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import type { CardProps } from '../types'
import { colors, borderRadius, spacing, fontSize, fontWeight, shadows } from '../lib/design-tokens'

const Card: React.FC<CardProps> = ({
  children,
  title,
  description,
  style,
  ...props
}) => {
  const cardStyles = [
    styles.base,
    style,
  ]

  return (
    <View style={cardStyles} {...props}>
      {title && <Text style={styles.title}>{title}</Text>}
      {description && <Text style={styles.description}>{description}</Text>}
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing[4],
    ...shadows.md,
    marginVertical: spacing[2],
  },
  title: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.gray[900],
    marginBottom: spacing[1],
  },
  description: {
    fontSize: fontSize.sm,
    color: colors.gray[500],
    marginBottom: spacing[3],
    lineHeight: 20,
  },
})

export { Card } 