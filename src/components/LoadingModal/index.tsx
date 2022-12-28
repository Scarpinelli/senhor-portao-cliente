import React from 'react'
import {
    View,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
} from 'react-native'
import styled from 'styled-components/native'
import { Ionicons } from '@expo/vector-icons'
import Modal from 'react-native-modal'
import ThemeColors from 'components/ThemeColors'
import ThemeDefaults from 'components/ThemeDefaults'
import ThemeText from 'components/ThemeText'
import { CText } from 'components'
import { Colors } from 'styles'

export default function LoadingModal(props: any) {
    return (
        <Modal
            isVisible={props.show}
            hasBackdrop
            backdropOpacity={0.5}
            swipeDirection={props.noswipe ? [] : ['down']}
            onBackdropPress={props.handleCancel}
            onSwipeComplete={props.noswipe ? undefined : props.handleCancel}
            style={{ justifyContent: 'flex-end', margin: 0 }}
            propagateSwipe
            hideModalContentWhileAnimating
            useNativeDriver
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1, justifyContent: 'center' }}
                // keyboardVerticalOffset={60}
            >
                <Content>
                    <Header>
                        <View style={{ flex: 1 }}>
                            <CText h2 semibold black center>
                                Procurando Profissionais
                            </CText>
                        </View>
                    </Header>

                    <CText
                        center
                        muted
                        style={{ height: props.subtitle ? 'auto' : 0 }}
                        mb4
                    >
                        {props.subtitle}
                    </CText>

                    <ActivityIndicator size="small" color={Colors.primary} />

                    {/* <ChildrenContent>{props.children}</ChildrenContent> */}
                </Content>
            </KeyboardAvoidingView>
        </Modal>
    )
}

export const BtnCancel = styled.TouchableOpacity`
    /* padding: 5px; */
    position: absolute;
    top: -35px;
    right: 10px;
    background: ${ThemeColors.primary};
    width: 40px;
    height: 40px;
    border-radius: 20px;
    align-items: center;
    justify-content: center;
`

export const Content = styled.View`
    background-color: ${ThemeColors.white};
    min-height: 130px;
    max-height: 80%;
    margin: 20px;
    padding-top: 20px;
    border-radius: 10px;
`

export const ChildrenContent = styled.View`
    padding: 10px 20px 20px 20px;
    /* margin: 20px; */
`

export const Header = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    position: relative;
`
