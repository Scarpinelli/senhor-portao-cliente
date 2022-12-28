import { TextProps } from 'react-native'

export interface ButtonTextProps extends TextProps {
    children: string
    textColor?: string
    outline?: boolean
    fontSize?: any
}
