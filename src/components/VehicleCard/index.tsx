import React from 'react'
import Icon from '@expo/vector-icons/FontAwesome'
import { Alert } from 'react-native'
import MasterCard from 'assets/images/master-card.png'
import { CText } from 'components'
import { Colors } from 'styles'
import { Container, CardImage, Model, Remove, Principal } from './styles'

type IVehicleCard = {
    brand: any
    model: any
    color: any
    id: number
    handleRemoveVehicle: any
    navigation?: any
    showDelete?: boolean
    onPress: any
    principal: boolean
    showPrincipal?: boolean
    handlePrincipalVehicle: any
}

const VehicleCard: React.FC<IVehicleCard> = ({
    brand,
    model,
    color,
    handleRemoveVehicle = null,
    navigation,
    onPress,
    showDelete = true,
    principal,
    showPrincipal = true,
    handlePrincipalVehicle = null,
    id,
}) => {
    const handleRemove = () => {
        Alert.alert('Deseja remover esse veículo', undefined, [
            {
                text: 'Cancelar',
                // onPress: () => {},
                style: 'cancel',
            },
            { text: 'Remover', onPress: () => handleRemoveVehicle(id) },
        ])
    }
    return (
        <Container onPress={onPress} activeOpacity={1}>
            <Model>
                <CText small black>
                    {brand} | {model}
                </CText>
                <CText small muted>
                    {color}
                </CText>
            </Model>

            {showDelete && (
                <Remove onPress={handleRemove}>
                    <Icon name="trash" size={12} />
                </Remove>
            )}
            {showPrincipal && (
                <Principal
                    // principal={principal}
                    onPress={() => handlePrincipalVehicle(id)}
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

export default VehicleCard
