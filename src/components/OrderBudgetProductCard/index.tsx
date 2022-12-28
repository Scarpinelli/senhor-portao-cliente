import { CText } from 'components'
import React from 'react'
import noImage from 'assets/images/no-image.jpg'
import { Container, ImageCard, Info } from './styles'

interface IOrderBudgetProductCard {
    data: any
}

const OrderBudgetProductCard: React.FC<IOrderBudgetProductCard> = ({
    data,
}) => {
    return (
        <Container>
            {data?.product?.image ? (
                <ImageCard source={data?.product?.image} resizeMode="contain" />
            ) : (
                <ImageCard source={noImage} resizeMode="contain" />
            )}
            <Info>
                <CText black>{data?.product?.name}</CText>
                <CText muted small>
                    {data?.product?.productCategory?.name}
                </CText>
                <CText muted small>
                    Quantitdade: {data?.quantity}
                </CText>
            </Info>
        </Container>
    )
}

export default OrderBudgetProductCard
