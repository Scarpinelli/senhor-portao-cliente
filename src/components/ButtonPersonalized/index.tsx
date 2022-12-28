import React from 'react'
import { ButtonProps } from 'types/button'

import * as Styles from './style'

const Button: React.FC<ButtonProps> = ({
    children,
    buttonColor,
    textColor,
    outline,
    fixed,
    disabled,
    width,
    height,
    marginTop = 0,
    fontSize,
    onPress,
}) => (
    <Styles.Container
        activeOpacity={0.8}
        buttonColor={buttonColor}
        outline={outline}
        fixed={fixed}
        width={width}
        height={height}
        marginTop={marginTop}
        onPress={onPress}
    >
        <Styles.ButtonText
            textColor={textColor}
            outline={outline}
            fontSize={fontSize}
        >
            {children}
        </Styles.ButtonText>
    </Styles.Container>
)

export default Button
