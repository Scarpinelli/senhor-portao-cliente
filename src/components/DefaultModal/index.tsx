import React from 'react'
import { KeyboardAvoidingView, Platform, Dimensions, View } from 'react-native'

import Modal from 'react-native-modal'
import { CText } from 'components'
import { Ionicons } from '@expo/vector-icons'
import Button from 'components/ButtonPersonalized'
import { Colors } from 'styles'
import ModalProps from 'types/modal'
import {
    BtnCancel,
    ChildrenContent,
    ContainerButton,
    Content,
    Header,
} from './style'

const { width, height } = Dimensions.get('screen')

const DefaultModal: React.FC<ModalProps> = ({
    title,
    subtitle,
    textButton,
    cancel,
    visible,
    handleCancel,
    handleAction,
    noswipe,
    paddingTitle,
    children,
    ...rest
}) => {
    return (
        <Modal
            statusBarTranslucent
            deviceHeight={height}
            deviceWidth={width}
            isVisible={visible}
            hasBackdrop
            backdropOpacity={0.5}
            swipeDirection={noswipe ? [] : ['down']}
            onBackdropPress={handleCancel}
            onSwipeComplete={noswipe ? undefined : handleCancel}
            style={{ justifyContent: 'flex-end', margin: 0 }}
            propagateSwipe
            hideModalContentWhileAnimating
            useNativeDriver
            {...rest}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1, justifyContent: 'center' }}
            >
                <Content>
                    <Header paddingTitle={paddingTitle}>
                        <View
                            style={{
                                justifyContent: 'center',
                                flex: 1,
                            }}
                        >
                            <CText h2 semibold black center>
                                {title}
                            </CText>
                        </View>
                        <BtnCancel onPress={handleCancel}>
                            <Ionicons
                                name="close-outline"
                                size={30}
                                color={Colors.white}
                            />
                        </BtnCancel>
                    </Header>

                    {subtitle && (
                        <CText
                            center
                            secondary
                            style={{ height: subtitle ? 'auto' : 0 }}
                        >
                            {subtitle && subtitle}
                        </CText>
                    )}

                    {children && <ChildrenContent>{children}</ChildrenContent>}
                    <ContainerButton>
                        <Button
                            buttonColor="#dcdcdc"
                            height="48px"
                            outline
                            width="137.78px"
                            onPress={() => handleCancel()}
                            fixed="9px"
                            style={{
                                borderWidth: 1,
                                borderStyle: 'solid',
                                borderColor: Colors.primary,
                            }}
                            textColor={Colors.primary}
                        >
                            {cancel || 'Cancelar'}
                        </Button>

                        <Button
                            width="137.78px"
                            height="48px"
                            onPress={() => {
                                handleAction()
                                handleCancel()
                            }}
                            fixed="9px"
                        >
                            {textButton && textButton}
                        </Button>
                    </ContainerButton>
                </Content>
            </KeyboardAvoidingView>
        </Modal>
    )
}

export default DefaultModal
