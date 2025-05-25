import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import type { ButtonProps } from '../types'

const Button: React.FC<ButtonProps> = ({
  children,
  title,
  variant = 'default',
  size = 'default',
  style,
  ...props
}) => {
  const buttonStyles = [
    styles.base,
    styles[variant],
    styles[`size_${size}`],
    style,
  ]

  const textStyles = [
    styles.text,
    styles[`text_${variant}`],
    styles[`text_${size}`],
  ]

  return (
    <TouchableOpacity style={buttonStyles} {...props}>
      <Text style={textStyles}>
        {children || title}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  default: {
    backgroundColor: '#0066cc',
  },
  destructive: {
    backgroundColor: '#dc2626',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  secondary: {
    backgroundColor: '#f3f4f6',
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  link: {
    backgroundColor: 'transparent',
  },
  size_default: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  size_sm: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  size_lg: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  size_icon: {
    width: 44,
    height: 44,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  text_default: {
    color: '#ffffff',
  },
  text_destructive: {
    color: '#ffffff',
  },
  text_outline: {
    color: '#374151',
  },
  text_secondary: {
    color: '#374151',
  },
  text_ghost: {
    color: '#374151',
  },
  text_link: {
    color: '#0066cc',
    textDecorationLine: 'underline',
  },
  text_sm: {
    fontSize: 14,
  },
  text_lg: {
    fontSize: 18,
  },
  text_icon: {
    fontSize: 16,
  },
})

export { Button } 