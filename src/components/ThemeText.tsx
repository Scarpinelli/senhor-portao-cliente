import React from 'react'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

import ThemeColors from './ThemeColors'
import {
    setMarginBottom,
    setMarginLeft,
    setMarginRight,
    setMarginTop,
} from './ThemeDefaults'

export default function ThemeText(props: any) {
    // Declarando os valores padrão
    let size = 27
    let color = ThemeColors.white
    let textTransform = 'none'
    let fontFamily = 'SourceSansPro_Regular'
    const align = 'left'
    let lineHeight = 20

    // Calculando valores de acordo com o parâmetro
    if (props.h1) {
        size = 70
        color = ThemeColors.white
        fontFamily = 'Kapra_Bold'
        lineHeight = 40
    } else if (props.h2) {
        size = 50
        color = ThemeColors.white
        fontFamily = 'Kapra_Medium'
        lineHeight = 50
    } else if (props.tagline) {
        color = ThemeColors.muted
        textTransform = 'uppercase'
    } else if (props.button) {
        color = ThemeColors.white
        fontFamily = 'OpenSans_SemiBold'
    }

    if (props.black) {
        color = ThemeColors.black
    }

    // Funções
    const setColor = (props: any, defaultColor: any) => {
        if (props.customColor) {
            return props.customColor
        }
        if (props.muted || props.Muted) {
            return ThemeColors.muted
        }
        if (props.primary || props.Primary) {
            return ThemeColors.white
        }
        if (props.secondary || props.Secondary) {
            return ThemeColors.secondary
        }
        if (props.button || props.Button) {
            return ThemeColors.primary
        }
        if (props.error || props.Error) {
            return ThemeColors.error
        }
        if (props.errordark || props.errorDark) {
            return ThemeColors.error
        }
        if (defaultColor) {
            return defaultColor
        }
        return ThemeColors.white
    }

    const setFont = (props: any, defaultFont: any) => {
        if (props.light || props.Light) {
            return 'OpenSans_Light'
        }
        if (props.normal || props.Normal) {
            return 'OpenSans'
        }
        if (props.semibold || props.Semibold) {
            return 'OpenSans_SemiBold'
        }
        if (props.bold || props.Bold) {
            return 'OpenSans_Bold'
        }
        if (defaultFont) {
            return defaultFont
        }
        return 'OpenSans_Regular'
    }

    const setAlign = (props: any, defaultAlign: any) => {
        if (props.center || props.Center) {
            return 'center'
        }
        if (props.right || props.Right) {
            return 'right'
        }
        if (props.left || props.Left) {
            return 'left'
        }
        if (defaultAlign) {
            return defaultAlign
        }
        return 'left'
    }

    // Calcular o aumento e diminuição proporcional da fonte
    const resize = props.small ? 0.85 : props.big ? 1.15 : 1

    // Definindo o styled component de acordo com os valores calculados
    const TextStyled = styled.Text`
        /* font-size: ${RFValue(size / 1.9)}px;  */
        font-size: ${(size * resize) / 1.9}px;
        color: ${setColor(props, color)};
        text-transform: ${textTransform};
        font-family: ${setFont(props, fontFamily)};

        text-align: ${setAlign(props, align)};
        margin: ${setMarginTop(props, 0)}px ${setMarginRight(props, 0)}px
            ${setMarginBottom(props, 0)}px ${setMarginLeft(props, 0)}px;
    `
    // TODO Observar problema na exibição do tamanho

    // Criando o componente
    return (
        <TextStyled numberOfLines={props.numberOfLines} {...props}>
            {props.children}
        </TextStyled>
    )
}
