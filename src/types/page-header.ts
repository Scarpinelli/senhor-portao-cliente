import { GestureResponderEvent } from 'react-native'

export interface PageHeaderProps {
    scrollY: any
    titleHeader?: string
    actionGoBack?: (event: GestureResponderEvent) => void
    haveChildren?: boolean
    page?: string
}
