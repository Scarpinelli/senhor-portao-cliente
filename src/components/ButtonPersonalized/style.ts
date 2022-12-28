import styled, { css } from 'styled-components/native'
import { ButtonProps } from 'types/button'
import { ButtonTextProps } from 'types/button-text'
import { Colors } from '../../styles'

export const Container = styled.TouchableOpacity<ButtonProps>`
    width: ${(props: ButtonProps) => props.width || '100%'};
    height: ${(props: ButtonProps) => props.height || `48px`};
    border-radius: ${(props: ButtonProps) =>
        props.fixed ? props.fixed : `24px`};
    margin-top: ${(props: ButtonProps) =>
        props.marginTop ? `${props.marginTop}px` : 0};
    justify-content: center;
    align-items: center;
    align-self: center;
    background-color: transparent;
    ${(props: ButtonProps) =>
        props.outline
            ? css`
                  border-width: 1px;
                  border-color: ${Colors.primary};
              `
            : css`
                  background: ${props.buttonColor || Colors.primary};
              `}
    ${(props: ButtonProps) =>
        props.disabled &&
        css`
            background: ${Colors.muted};
        `};
`

export const ButtonText = styled.Text<ButtonTextProps>`
    ${(props: ButtonTextProps) =>
        props.outline
            ? css`
                  color: ${props.textColor || Colors.white};
              `
            : css`
                  color: ${props.textColor || Colors.white};
              `}
    font-size: ${(props) => (props.fontSize ? props.fontSize : '16')}px;
    font-weight: bold;
`
