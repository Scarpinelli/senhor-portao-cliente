import { TextInputProps } from 'react-native'

export default interface ISearchBar extends TextInputProps {
    placeholder: string
    showItem?: boolean
    onChangeText: (text: string) => void
    actionButtonClear: () => void
}
