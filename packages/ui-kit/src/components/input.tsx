import React from 'react'
import { TextInput, StyleSheet } from 'react-native'
import type { InputProps } from '../types'

const Input: React.FC<InputProps> = ({
  style,
  ...props
}) => {
  const inputStyles = [
    styles.base,
    style,
  ]

  return (
    <TextInput 
      style={inputStyles} 
      placeholderTextColor="#9ca3af"
      {...props} 
    />
  )
}

const styles = StyleSheet.create({
  base: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#ffffff',
    color: '#374151',
  },
})

export { Input } 