import { ReactChild, ReactChildren } from 'react'
import { TouchableOpacityProps } from 'react-native'

export interface ButtonProps extends TouchableOpacityProps {
    width?: string | number
    height?: string | number

    children?: ReactChildren | ReactChild | any
    buttonColor?: string
    textColor?: string
    outline?: boolean
    fixed?: any
    marginTop?: number
    fontSize?: any
}
