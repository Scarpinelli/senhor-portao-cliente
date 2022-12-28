/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */
/* eslint-disable react/destructuring-assignment */
import React from 'react'
import styled from 'styled-components/native'

import {
    Colors,
    setMarginBottom,
    setMarginLeft,
    setMarginRight,
    setMarginTop,
} from 'styles'

export default function ThemeText(props: any) {
    // Declarando os valores padrão
    let size = 27
    let color = Colors.white
    let textTransform = 'none'
    let fontFamily = 'Regular'
    const align = 'left'
    // let

    // Calculando valores de acordo com o parâmetro
    if (props.h1) {
        size = 60
        color = Colors.white
        // fontFamily = 'Bold';
    } else if (props.h2) {
        size = 36
        color = Colors.white
    } else if (props.h3) {
        size = 32
        color = Colors.white
        // fontFamily = 'Bold';
    } else if (props.tagline) {
        color = Colors.muted
        textTransform = 'uppercase'
    } else if (props.button) {
        color = Colors.white
        // fontFamily = 'Bold';
    } else if (props.helloText) {
        size = 36
        color = Colors.helloText
    }

    if (props.small) {
    }

    if (props.smaller) {
        size = 18
    }

    if (props.title) {
        size = 24
    }

    if (props.uppercase) {
        textTransform = 'uppercase'
    }

    if (props.italic) {
        fontFamily = 'Italic'
    }

    if (props.italic) {
        fontFamily = 'Italic'
    }

    if (props.blackItalic) {
        fontFamily = 'BlackItalic'
    }

    if (props.boldItalic) {
        fontFamily = 'BoldItalic'
    }

    if (props.blackFont) {
        fontFamily = 'Black'
    }

    if (props.black) {
        color = Colors.black
    }

    if (props.valueInFiat) {
        color = Colors.textInFiat
        size = 18
    }

    if (props.headerTitle) {
        size = 32
    }

    // Funções
    const setColor = (props: any, defaultColor: any) => {
        if (props.customColor) {
            return props.customColor
        }
        if (props.muted || props.Muted) {
            return Colors.muted
        }
        if (props.success || props.success) {
            return Colors.success
        }
        if (props.primary || props.Primary) {
            return Colors.primary
        }
        if (props.default || props.Default) {
            return Colors.text
        }
        if (props.secondary || props.Secondary) {
            return Colors.secondary
        }
        if (props.button || props.Button) {
            return Colors.primary
        }
        if (props.error || props.Error) {
            return Colors.error
        }
        if (props.errordark || props.errorDark) {
            return Colors.error
        }
        if (defaultColor) {
            return defaultColor
        }
        return Colors.white
    }

    const setFont = (props: any, defaultFont: any) => {
        if (props.light || props.Light) {
            return 'Light'
        }
        if (props.normal || props.Normal) {
            return 'Regular'
        }
        if (props.semibold || props.Semibold) {
            return 'Medium'
        }
        if (props.bold || props.Bold) {
            return 'Bold'
        }
        if (defaultFont) {
            return defaultFont
        }
        return 'Regular'
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

    // Definir manualmente line-height

    // Calcular o aumento e diminuição proporcional da fonte
    const resize = props.small ? 0.85 : props.big ? 1.15 : 1

    // Definindo o styled component de acordo com os valores calculados
    const TextStyled = styled.Text`
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
        <TextStyled
            style={props.style}
            numberOfLines={props.numberOfLines}
            {...props}
        >
            {props.children}
        </TextStyled>
    )
}
