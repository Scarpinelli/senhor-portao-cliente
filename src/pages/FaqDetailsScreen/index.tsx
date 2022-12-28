import React, { useEffect, useState } from 'react'
import { ThemeColors, ThemeText } from 'components'
import { FlatList, RefreshControl } from 'react-native'

import RequestCard from 'omponents/RequestCard'
import { Container } from './styles'

const FaqDetailsScreen: React.FC = ({ navigation, route }: any) => {
    return (
        <Container contentContainerStyle={{ padding: 20 }}>
            <ThemeText black bold h2 mb2>
                {route?.params?.title}
            </ThemeText>
            <ThemeText black>{route?.params?.description}</ThemeText>
        </Container>
    )
}

export default FaqDetailsScreen
