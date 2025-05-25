import { type ComponentProps, type ReactNode } from 'react'
import { type ViewProps, type TextProps as RNTextProps, type TouchableOpacityProps } from 'react-native'

// Base component props
export interface BaseComponentProps {
  children?: ReactNode
  className?: string
  testID?: string
}

// Button props
export interface ButtonProps extends TouchableOpacityProps, BaseComponentProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  title?: string
}

// Text props
export interface TextProps extends RNTextProps, BaseComponentProps {
  variant?: 'default' | 'body' | 'caption' | 'heading' | 'subheading'
}

// View props
export interface ViewProps extends ViewProps, BaseComponentProps {
  variant?: 'default' | 'card' | 'container'
}

// Input props
export interface InputProps extends BaseComponentProps {
  placeholder?: string
  value?: string
  onChangeText?: (text: string) => void
  secureTextEntry?: boolean
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad'
}

// Card props
export interface CardProps extends ViewProps, BaseComponentProps {
  title?: string
  description?: string
} 