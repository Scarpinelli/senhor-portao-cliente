import React, { useState, useEffect, useContext } from 'react'
import RadioForm, {
    RadioButton,
    RadioButtonInput,
    RadioButtonLabel,
} from 'react-native-simple-radio-button'
import Icon from '@expo/vector-icons/FontAwesome'
import IconFontisto from '@expo/vector-icons/Fontisto'
import { Switch } from 'react-native-switch'
import { DataContext } from 'contexts/AppContext'
import {
    ThemeText,
    ThemeColors,
    ThemeButton,
    ThemeInput,
    CLoader,
} from 'components'
import Avatar from 'components/Avatar'
import Stars from 'react-native-stars'
import IconMaterial from '@expo/vector-icons/MaterialCommunityIcons'
import { StyleSheet } from 'react-native'
import { Colors } from 'styles'
import Endpoints from 'services/endpoints'
import { showMessage } from 'react-native-flash-message'
import { Container, UserContainer, UserInfo, UserRating, Data } from './styles'

const RatingScreen: React.FC = ({ navigation }: any) => {
    const [secuity, setSecurity] = useState(false)
    const [description, setDescription] = useState('')

    const radio_props = [
        { label: 'Não apareceu', value: 0 },
        { label: 'Instalador não se identificou', value: 1 },
        { label: 'Não fez o serviço corretamente', value: 2 },
        { label: 'Não utilizava peças originais', value: 2 },
        { label: 'Outro', value: 3 },
    ]

    const {
        orderPendingStatus,
        user,
        resolveError,
        setActiveStepOrder,
        setOrderAddress,
        setOrderServiceTypeSelected,
        setOrderPendingStatus,
        setOrders,
        setOrderBudgetProducts,
        setOrderBudgetValue,
    } = useContext(DataContext)

    const [rating, setRating] = useState(0)

    const [type, setType] = useState(null)

    const [loader, setLoader] = useState(false)

    const handleSubmitRating = async () => {
        const payload = {
            orderId: Number(orderPendingStatus.id),
            type: 'CUSTOMER_TO_PROVIDER',
            senderId: Number(user?.id),
            receiverId: Number(orderPendingStatus?.provider?.id),
            rating: Number(rating),
            skip: true,
        }

        setLoader(true)

        try {
            const data = await Endpoints.rating(payload)

            navigation.navigate('Redirect')
        } catch (error) {

            let errorMessage = null
            errorMessage =
                (error as any)?.response?.data?.notificacao?.mensagemAmigavel ||
                'Ocorreu um erro, tente novamente'

            const res = await resolveError(error)

            if (!res) {
                showMessage({
                    message: errorMessage,
                    type: 'danger',
                    icon: 'danger',
                    position: 'bottom',
                    hideOnPress: false,
                    duration: 2500,
                    floating: true,
                })
            }
        } finally {
            setLoader(false)
        }
    }

    const handleClearOrder = async () => {
        navigation.navigate('Redirect')
    }

    return (
        <>
            <CLoader visible={loader} />
            <Container>
                <UserContainer>
                    <Avatar
                        image={orderPendingStatus?.provider?.image}
                        size={60}
                    />
                    <UserInfo>
                        <ThemeText black>
                            {orderPendingStatus?.provider?.name}
                        </ThemeText>
                        <UserRating>
                            <ThemeText mr1 black>
                                {orderPendingStatus?.provider?.rating}
                            </ThemeText>
                            <Icon
                                name="star"
                                size={12}
                                color={ThemeColors.primary}
                            />
                        </UserRating>
                    </UserInfo>
                </UserContainer>

                <Data>
                    <ThemeText black mb6>
                        Sua opinião é muito importante para nossos colaboradores.
Avalie seu técnico.
                    </ThemeText>

                    <Stars
                        default={rating}
                        update={(val: any) => {
                            setRating(val)
                        }}
                        count={5}
                        // half
                        starSize={200}
                        fullStar={
                            <IconMaterial
                                name="star"
                                style={[styles.myStarStyle]}
                            />
                        }
                        emptyStar={
                            <IconMaterial
                                name="star-outline"
                                style={[
                                    styles.myStarStyle,
                                    styles.myEmptyStarStyle,
                                ]}
                            />
                        }
                        halfStar={
                            <IconMaterial
                                name="star-half"
                                style={[styles.myStarStyle]}
                            />
                        }
                    />

                    <ThemeButton mt6 onPress={() => handleSubmitRating()}>
                        <ThemeText bold>Avaliar</ThemeText>
                    </ThemeButton>

                    <ThemeButton primary mt2 onPress={() => handleClearOrder()}>
                        <ThemeText bold>Fechar</ThemeText>
                    </ThemeButton>
                </Data>
            </Container>
        </>
    )
}

export default RatingScreen

const styles = StyleSheet.create({
    myStarStyle: {
        color: Colors.primary,
        fontSize: 50,
        // textShadowColor: 'black',
        // textShadowOffset: { width: 1, height: 1 },
        // textShadowRadius: 2,
    },
    myEmptyStarStyle: {
        color: '#cccccc',
    },
})
