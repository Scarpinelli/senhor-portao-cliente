import React from 'react'
import {
    ActivityIndicator,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
} from 'react-native'

import Modal from 'react-native-modal'
import { Colors } from 'styles'
import { Ionicons, AntDesign } from '@expo/vector-icons'
import { ContainerInformation, Content } from './style'
import ThemeText from 'components/ThemeText'
import ThemeButtons from 'components/ThemeButton'

const { width, height } = Dimensions.get('screen')

interface ModalProps {
    visible: boolean
    content?: string
    error?: boolean
    textButton?: string
    withButton?: boolean
    handleCancel: () => void
}

const AlertErrorsMessage: React.FC<ModalProps> = ({
    visible,
    content,
    error,
    textButton,
    withButton,
    handleCancel,
    ...rest
}) => {
    return (
        <Modal
            testID="AlertErrorsMessage"
            isVisible={visible}
            statusBarTranslucent
            backdropOpacity={0.8}
            animationIn="zoomInDown"
            animationOut="zoomOutUp"
            animationInTiming={600}
            animationOutTiming={600}
            backdropTransitionInTiming={600}
            backdropTransitionOutTiming={600}
            deviceHeight={height}
            deviceWidth={width}
            {...rest}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1, justifyContent: 'center' }}
            >
                <Content>
                    <ContainerInformation>
                        {error ? (
                            <AntDesign
                                name="closecircleo"
                                size={22}
                                color={Colors.error}
                            />
                        ) : (
                            <Ionicons
                                name="information-circle-outline"
                                size={22}
                                color={Colors.muted}
                            />
                        )}
                        <ThemeText ml2 muted center small>
                            Ocorreu um erro, tente novamente
                        </ThemeText>
                    </ContainerInformation>

                    {withButton ? (
                        <ThemeButtons
                            buttonColor={Colors.error}
                            height="40px"
                            width="90%"
                            onPress={() => handleCancel()}
                            fixed="9px"
                            style={{
                                borderWidth: 1,
                                borderStyle: 'solid',
                                borderColor: Colors.primary,
                            }}
                            textColor={Colors.white}
                        >
                            {textButton}
                        </ThemeButtons>
                    ) : (
                        <ActivityIndicator
                            size={30}
                            color={error ? Colors.muted : Colors.primary}
                        />
                    )}
                </Content>
            </KeyboardAvoidingView>
        </Modal>
    )
}

export default AlertErrorsMessage
