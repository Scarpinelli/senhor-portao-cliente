import React from 'react'
import { SafeAreaView } from 'react-native'
import styled from 'styled-components/native'
import PeColors from './ThemeColors'
import ThemeText from './ThemeText'
import {
    setMarginTop,
    setMarginRight,
    setMarginBottom,
    setMarginLeft,
} from './ThemeDefaults'
// import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export default function ThemeButtons(props: any) {
    // Declarando os valores padrão
    let paddingVertical = 12
    let backgroundColor = props.primary ? PeColors.primary : PeColors.secondary
    let borderStyle = 'solid'
    let borderWidth = 0
    let borderColor = props.disabled ? PeColors.primary : PeColors.primary
    let textColor = props.disabled ? PeColors.white : PeColors.white
    let boxed = false
    const safearea = props.safearea || props.SafeArea || props.Safearea

    // Calculando valores de acordo com o parâmetro
    if (props.outlined) {
        backgroundColor = 'transparent'
        borderStyle = 'solid'
        borderWidth = 1
        borderColor = props.disabled ? PeColors.primary : PeColors.primary
        textColor = props.disabled ? PeColors.white : PeColors.white
    } else if (props.link) {
        backgroundColor = 'transparent'
        textColor = props.disabled
            ? PeColors.white
            : props.light
            ? PeColors.white
            : PeColors.white
    }

    if (props.big) {
        paddingVertical = 20
    } else if (props.small) {
        paddingVertical = 10
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
        background-color: ${props.disabled ? '#cccccc' : backgroundColor};
        border-style: ${borderStyle};
        border-width: ${borderWidth}px;
        border-color: ${borderColor};
        border-radius: ${props.radius ? 100 : props.noradius ? 0 : 5}px;
        align-items: center;
        width: ${boxed ? '100%' : 'auto'};
        min-height: ${safearea ? 80 : 0}px;
        margin: ${setMarginTop(props, 0)}px ${setMarginRight(props, 0)}px
            ${setMarginBottom(props, 0)}px ${setMarginLeft(props, 0)}px;
    `

    // Criando o componente
    if (safearea) {
        return (
            <ButtonStyled disabled={props.disabled} onPress={props.onPress}>
                <SafeAreaView>
                    <ThemeText button numberOfLines={1} customColor={textColor}>
                        {props.children}
                    </ThemeText>
                </SafeAreaView>
            </ButtonStyled>
        )
    }
    return (
        <ButtonStyled disabled={props.disabled} onPress={props.onPress}>
            <ThemeText button numberOfLines={1} customColor={textColor}>
                {props.children}
            </ThemeText>
        </ButtonStyled>
    )
}
