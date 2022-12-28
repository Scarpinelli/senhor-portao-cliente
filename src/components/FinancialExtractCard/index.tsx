import React, { useState, useEffect } from 'react'
import Icon from '@expo/vector-icons/Entypo'
import { ThemeText, ThemeColors } from 'components'
import { Container, Signal, Info } from './styles'

type IFinancialExtractCard = {
    type: any
    title: any
    description: any
    value: '89,99'
}

const FinancialExtractCard: React.FC<IFinancialExtractCard> = ({
    type,
    title,
    description,
    value,
}) => {
    return (
        <Container>
            <Signal type={type}>
                {type === 0 ? (
                    <Icon
                        name="chevron-thin-up"
                        size={12}
                        color={ThemeColors.white}
                    />
                ) : (
                    <Icon
                        name="chevron-thin-down"
                        size={12}
                        color={ThemeColors.white}
                    />
                )}
            </Signal>
            <Info>
                <ThemeText black bold>
                    {title}
                </ThemeText>
                <ThemeText black>{description}</ThemeText>
                <ThemeText black bold>
                    Valor: R${value}
                </ThemeText>
            </Info>
        </Container>
    )
}

export default FinancialExtractCard
