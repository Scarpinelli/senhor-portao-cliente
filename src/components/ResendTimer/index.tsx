import { View, Text } from 'react-native'
import React from 'react'
import { CButton, CText } from 'components'
import ResendTimerProps from 'types/timer'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Colors } from 'styles'

const ResendTimer: React.FC<ResendTimerProps> = ({
    cont,
    message,
    onPress,
    type = '',
    forgotPassword = false,
}) => {
    return (
        <View>
            {message ? (
                <>
                    <CText mt4 muted small>
                        Não recebeu o {type === 'sms' ? 'sms' : 'e-mail'}?
                    </CText>
                    <TouchableOpacity onPress={onPress}>
                        <CText white mb10>
                            {forgotPassword
                                ? 'Clique aqui para enviar'
                                : 'Reenviar'}{' '}
                            {type === 'sms' ? 'sms' : 'e-mail'}
                        </CText>
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    <CText mt4 muted small>
                        Ainda não recebeu o {type === 'sms' ? 'sms' : 'e-mail'}
                    </CText>
                    <CText muted mb10>
                        Reenvie o código em
                        <CText error>{`${cont} seg`}</CText>
                    </CText>
                </>
            )}
        </View>
    )
}

export default ResendTimer
