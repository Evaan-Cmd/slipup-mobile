import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import type { ButtonProps } from '../types'
import { colors, borderRadius, spacing, fontSize, fontWeight, shadows } from '../lib/design-tokens'

const Button: React.FC<ButtonProps> = ({
  children,
  title,
  variant = 'default',
  size = 'default',
  style,
  disabled,
  ...props
}) => {
  const buttonStyles = [
    styles.base,
    styles[variant],
    styles[`size_${size}`],
    disabled && styles.disabled,
    style,
  ]

  const textStyles = [
    styles.text,
    styles[`text_${variant}`],
    styles[`text_${size}`],
    disabled && styles.textDisabled,
  ]

  return (
    <TouchableOpacity 
      style={buttonStyles} 
      disabled={disabled}
      activeOpacity={0.8}
      {...props}
    >
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
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    ...shadows.sm,
  },
  default: {
    backgroundColor: colors.primary[500],
  },
  destructive: {
    backgroundColor: colors.error,
  },
  outline: {
    backgroundColor: colors.transparent,
    borderWidth: 1,
    borderColor: colors.gray[300],
  },
  secondary: {
    backgroundColor: colors.gray[100],
  },
  ghost: {
    backgroundColor: colors.transparent,
  },
  link: {
    backgroundColor: colors.transparent,
  },
  disabled: {
    opacity: 0.5,
  },
  'size_default': {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
  },
  'size_sm': {
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
  },
  'size_lg': {
    paddingHorizontal: spacing[6],
    paddingVertical: spacing[4],
  },
  'size_icon': {
    width: 44,
    height: 44,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  text: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
    textAlign: 'center',
  },
  'text_default': {
    color: colors.white,
  },
  'text_destructive': {
    color: colors.white,
  },
  'text_outline': {
    color: colors.gray[700],
  },
  'text_secondary': {
    color: colors.gray[700],
  },
  'text_ghost': {
    color: colors.gray[700],
  },
  'text_link': {
    color: colors.primary[500],
  },
  'text_sm': {
    fontSize: fontSize.sm,
  },
  'text_lg': {
    fontSize: fontSize.lg,
  },
  'text_icon': {
    fontSize: fontSize.base,
  },
  textDisabled: {
    opacity: 0.7,
  },
})

export { Button } 