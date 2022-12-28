import React from 'react'
import { ThemeText } from '..'

import { Container, BadgeText } from './styles'

type IBadge = {
    type: any
}

const Badge: React.FC<IBadge> = ({ type }) => {
    return (
        <Container type={type}>
            <BadgeText bold>
                {type === 0
                    ? 'Em Andamento'
                    : type === 1
                    ? 'Finalizado'
                    : 'Cancelado'}
            </BadgeText>
        </Container>
    )
}

export default Badge
