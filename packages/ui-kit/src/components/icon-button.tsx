import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import type { IconButtonProps } from '../types'
import { colors, borderRadius, spacing, shadows } from '../lib/design-tokens'

const IconButton: React.FC<IconButtonProps> = ({
  icon: Icon,
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

  const iconSize = size === 'sm' ? 16 : size === 'lg' ? 24 : 20
  const iconColor = variant === 'default' 
    ? colors.white 
    : variant === 'outline' || variant === 'ghost' 
      ? colors.gray[700] 
      : colors.white

  return (
    <TouchableOpacity 
      style={buttonStyles} 
      disabled={disabled}
      activeOpacity={0.8}
      {...props}
    >
      <Icon 
        size={iconSize} 
        color={disabled ? colors.gray[400] : iconColor} 
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.lg,
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
    width: 44,
    height: 44,
  },
  'size_sm': {
    width: 36,
    height: 36,
  },
  'size_lg': {
    width: 52,
    height: 52,
  },
})

export { IconButton } 