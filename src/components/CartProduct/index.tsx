import React, { useState, useEffect } from 'react'
import Icon from '@expo/vector-icons/FontAwesome'
import { ThemeText } from '..'

import {
    Container,
    ProductInfo,
    ProductQuantity,
    ProductValue,
    ProductButton,
    ActionButton,
} from './styles'

type ICartProduct = {
    title: any
    description: any
    value: any
    estoque: any
}

const CartProduct: React.FC<ICartProduct> = ({
    title,
    description,
    value,
    estoque,
}) => {
    const [quantity, setQuantity] = useState(0)

    const addQuantity = () => {
        if (quantity < estoque) {
            const newQuantity = quantity + 1
            setQuantity(newQuantity)
        }
    }

    const removeQuantity = () => {
        if (quantity > 0) {
            const newQuantity = quantity - 1
            setQuantity(newQuantity)
        }
    }

    return (
        <Container>
            <ProductInfo>
                <ThemeText black bold>
                    {title}
                </ThemeText>
                <ThemeText black small>
                    {description}
                </ThemeText>
                <ThemeText black bold mt1>
                    R$ {value}
                </ThemeText>
            </ProductInfo>
            <ProductQuantity>
                <ProductButton onPress={() => addQuantity()}>
                    <Icon name="plus" size={16} color="#ffffff" />
                </ProductButton>
                <ProductValue>
                    <ThemeText center black>
                        {quantity}
                    </ThemeText>
                </ProductValue>
                <ProductButton onPress={() => removeQuantity()}>
                    <Icon name="minus" size={16} color="#ffffff" />
                </ProductButton>
                <ActionButton onPress={() => {}}>
                    <Icon name="check" size={16} color="#ffffff" />
                </ActionButton>
            </ProductQuantity>
        </Container>
    )
}

export default CartProduct
