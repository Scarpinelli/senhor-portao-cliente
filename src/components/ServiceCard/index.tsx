import React from 'react'

import { ThemeText } from '..'
import { Container, ImageCard, TextCard } from './styles'

interface IServiceCard {
    id: number
    name?: string
    image?: number
    active?: boolean
    handleSetService: any
}

const ServiceCard: React.FC<IServiceCard> = ({
    id,
    name,
    image,
    active,
    handleSetService,
}: any) => {
    return (
        <Container active={active} onPress={() => handleSetService(id)}>
            {/* <ImageCard source={image} resizeMode="contain" /> */}
            <TextCard active={active} small bold numberOfLines={1}>
                {name}
            </TextCard>
        </Container>
    )
}

export default ServiceCard
