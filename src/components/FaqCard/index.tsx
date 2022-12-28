import React, { useState, useEffect } from 'react'
import { Marker } from 'react-native-maps'
import { CText } from 'components'
import { Container, Details, Info, Status } from './styles'

import Badge from '../Badge'

type IFaqCard = {
    title?: any
    description?: any
    navigation?: any
    date?: any
    type?: any
}

const FaqCard: React.FC<IFaqCard> = ({
    title = '',
    description = '',
    navigation = '',
    date = null,
    type = null,
}) => {
    return (
        <Container
            activeOpacity={1}
            onPress={() =>
                navigation.navigate('FaqDetails', {
                    title,
                    description,
                })
            }
        >
            <Details>
                <Info>
                    <CText black bold>
                        {title}
                    </CText>
                    <CText small black>
                        {description}
                    </CText>
                </Info>
            </Details>
        </Container>
    )
}

export default FaqCard
