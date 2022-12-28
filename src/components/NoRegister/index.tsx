import React from 'react'
import Logo from 'assets/images/logo-black.png'
import { CText } from 'components'

import { Image } from 'react-native'
import { Container } from './styles'

const NoRegister: React.FC = () => {
    return (
        <Container>
            <Image source={Logo} />
            <CText muted mt2>
                Nenhum registro encontrado.
            </CText>
        </Container>
    )
}

export default NoRegister
