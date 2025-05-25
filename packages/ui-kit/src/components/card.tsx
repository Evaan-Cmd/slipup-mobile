import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import type { CardProps } from '../types'

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
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginVertical: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },
})

export { Card } 