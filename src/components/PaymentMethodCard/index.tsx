import React from 'react'
import Icon from '@expo/vector-icons/FontAwesome'
import { Alert } from 'react-native'
import MasterCard from 'assets/images/master-card.png'
import { CText } from 'components'
import { Colors } from 'styles'
import { Container, CardImage, CardNumber, Remove, Principal } from './styles'

type IPaymentMethodCard = {
    brand: any
    cardNumber: any
    type: any
    navigation?: any
    showDelete?: boolean
    onPress?: any
    principal?: boolean
    deleteCard?: any
    id: number
    showPrincipal?: boolean
    handlePrincipalCard?: any
}

const PaymentMethodCard: React.FC<IPaymentMethodCard> = ({
    brand,
    cardNumber,
    type,
    navigation,
    showDelete = true,
    onPress = null,
    principal = false,
    deleteCard = null,
    showPrincipal = true,
    handlePrincipalCard = null,
    id,
}) => {
    const handleRemove = () => {
        Alert.alert('Deseja remover esse cartão', undefined, [
            {
                text: 'Cancelar',
                // onPress: () => {},
                style: 'cancel',
            },
            { text: 'Remover', onPress: () => deleteCard(id) },
        ])
    }
    return (
        <Container onPress={onPress} activeOpacity={1}>
            {/* <Principal principal={principal}>
                {principal ? (
                    <Icon name="check" color={Colors.white} size={12} />
                ) : (
                    <></>
                )}
            </Principal> */}
            <CardImage source={MasterCard} resizeMode="contain" />
            <CardNumber>
                <CText black>•••• •••• •••• {cardNumber}</CText>
            </CardNumber>
            <CText small black>
                Crédito
            </CText>

            {showDelete && (
                <Remove onPress={handleRemove}>
                    <Icon name="trash" size={12} />
                </Remove>
            )}
            {showPrincipal && (
                <Principal
                    // principal={principal}
                    onPress={() => handlePrincipalCard(id)}
                >
                    {principal ? (
                        <Icon name="star" color={Colors.success} size={14} />
                    ) : (
                        <Icon name="star-o" color={Colors.muted} size={14} />
                    )}
                </Principal>
            )}
        </Container>
    )
}

export default PaymentMethodCard
