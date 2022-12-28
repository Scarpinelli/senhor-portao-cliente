import React from 'react'
import {
    View,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native'
import styled from 'styled-components/native'
import { Ionicons } from '@expo/vector-icons'
import Modal from 'react-native-modal'
import ThemeColors from './ThemeColors'
import ThemeDefaults from './ThemeDefaults'
import ThemeText from './ThemeText'

export default function ThemeModal(props: any) {
    return (
        <Modal
            isVisible={props.visible}
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
                    <SafeAreaView>
                        <Header>
                            <View style={{ flex: 1 }}>
                                <ThemeText h2 semibold black center>
                                    {props.title}
                                </ThemeText>
                            </View>
                            <BtnCancel onPress={props.handleCancel}>
                                <Ionicons
                                    name="close-outline"
                                    size={30}
                                    color={ThemeColors.white}
                                />
                            </BtnCancel>
                        </Header>

                        <ThemeText
                            center
                            secondary
                            style={{ height: props.subtitle ? 'auto' : 0 }}
                        >
                            {props.subtitle}
                        </ThemeText>

                        <ChildrenContent>{props.children}</ChildrenContent>
                    </SafeAreaView>
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
