/* eslint-disable no-nested-ternary */
/* eslint-disable react/destructuring-assignment */
import React from 'react'
import { SafeAreaView } from 'react-native'
import styled from 'styled-components/native'
import CText from 'components/CText'
import {
    Colors,
    setMarginBottom,
    setMarginLeft,
    setMarginRight,
    setMarginTop,
} from '../styles'

export default function CButton(props: any) {
    // Declarando os valores padrão
    let paddingVertical = 12
    let backgroundColor = props.primary
        ? Colors.primary
        : props.success
        ? Colors.success
        : props.dark
        ? Colors.bgButton
        : Colors.secondary
    let borderStyle = 'solid'
    let borderWidth = 0
    let borderColor = props.disabled ? Colors.primary : Colors.primary
    let textColor = props.disabled ? Colors.white : Colors.white
    let boxed = false
    const safearea = props.safearea || props.SafeArea || props.Safearea

    // Calculando valores de acordo com o parâmetro
    if (props.outlined) {
        backgroundColor = props.backgroundColor
            ? props.backgroundColor
            : 'transparent'
        textColor = Colors.black
    } else if (props.primary) {
        backgroundColor = Colors.black
        textColor = Colors.white
    } else if (props.link) {
        backgroundColor = 'transparent'
        textColor = props.disabled
            ? Colors.white
            : props.light
            ? Colors.white
            : Colors.primary
    }

    if (props.disabled) {
        backgroundColor = Colors.muted
    }

    if (props.big) {
        paddingVertical = 20
    } else if (props.small) {
        paddingVertical = 10
    }

    if (props.padding) {
        paddingVertical = props.padding
    }

    if (props.boxed || props.Boxed) {
        boxed = true
    }

    if (props.nopadding || props.noPadding || props.NoPadding) {
        paddingVertical = 0
    }

    // Definindo o styled component de acordo com os valores calculados
    const ButtonStyled = styled.TouchableOpacity`
        padding: ${paddingVertical}px ${paddingVertical === 0 ? 0 : 20}px;
        background-color: ${backgroundColor};
        border-style: ${borderStyle};
        border-width: ${borderWidth}px;
        border-color: ${borderColor};
        border-radius: ${props.radius ? 100 : props.noradius ? 0 : 6}px;
        align-items: center;
        width: ${boxed ? '100%' : 'auto'};
        min-height: ${safearea ? 80 : 0}px;
        margin: ${setMarginTop(props, 0)}px ${setMarginRight(props, 0)}px
            ${setMarginBottom(props, 0)}px ${setMarginLeft(props, 0)}px;
    `

    // Criando o componente
    if (safearea) {
        return (
            <ButtonStyled
                activeOpacity={0.8}
                disabled={props.disabled}
                onPress={props.onPress}
            >
                <SafeAreaView>
                    <CText button numberOfLines={1} customColor={textColor}>
                        {props.children}
                    </CText>
                </SafeAreaView>
            </ButtonStyled>
        )
    }
    return (
        <ButtonStyled
            activeOpacity={0.8}
            style={props.style}
            disabled={props.disabled}
            onPress={props.onPress}
        >
            <CText
                button
                blackItalic={props.bolder}
                numberOfLines={1}
                customColor={textColor}
            >
                {props.children}
            </CText>
        </ButtonStyled>
    )
}
