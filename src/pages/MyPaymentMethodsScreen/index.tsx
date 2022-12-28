import React, {
    useEffect,
    useState,
    useLayoutEffect,
    useCallback,
    useContext,
} from 'react'
import { FlatList, RefreshControl } from 'react-native'
import Icon from '@expo/vector-icons/Feather'
import { useFocusEffect } from '@react-navigation/native'
import Endpoints from 'services/endpoints'
import { showMessage } from 'react-native-flash-message'
import { DataContext } from 'contexts/AppContext'

import {
    ThemeText,
    ThemeColors,
    ThemeButton,
    CLoader,
    NoRegister,
} from 'components'
import PaymentMethodCard from 'components/PaymentMethodCard'
import { Container } from './styles'

const MyPaymentMethodsScreen: React.FC = ({ navigation }: any) => {
    const { resolveError, getUser, logout, user } = useContext(DataContext)
    const [refreshing, setRefreshing] = useState(false)
    const [page, setPage] = useState(1)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: (props: any) => (
                <ThemeButton
                    mr4
                    link
                    nopadding
                    onPress={() => navigation.navigate('NewPayementMethod')}
                >
                    <Icon name="plus" size={20} color={ThemeColors.primary} />
                </ThemeButton>
            ),
        })
    }, [])

    const [creditCards, setCreditCards] = useState<any>([])

    const loadCreditCard = async () => {
        const data = await Endpoints.loadAllCreditCards()

        if (data) {
            setCreditCards(data)
        }
    }

    useFocusEffect(
        useCallback(() => {
            loadCreditCard()
        }, []),
    )

    const renderItem = ({ item }: any) => {
        return (
            <PaymentMethodCard
                key={Math.random()}
                id={item?.id}
                brand={item?.brand}
                cardNumber={item?.lastDigits}
                type="credit"
                // navigation={navigation}
                showDelete
                // onPress={toggleModal1}
                principal={item?.default}
                deleteCard={deleteCard}
                showPrincipal
                handlePrincipalCard={handlePrincipalCard}
            />
        )
    }

    const handlePrincipalCard = async (id: number) => {
        setLoader(true)

        try {
            const updatePaymentCardPrincipal =
                await Endpoints.updatePaymentCardPrincipal(id)

            if (updatePaymentCardPrincipal) {
                await getUser()

                await loadData()
            }
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

    const [loader, setLoader] = useState(false)

    const deleteCard = async (id: number) => {
        setLoader(true)

        try {
            const deleteCreditCard = await Endpoints.deleteCreditCard(id)

            if (deleteCreditCard) {
                const newCreditCards = creditCards.filter(
                    (cc: any) => cc?.id !== id,
                )
                setCreditCards(newCreditCards)
                await getUser()

                showMessage({
                    message: 'Cartão removido com sucesso',
                    type: 'success',
                    icon: 'danger',
                    position: 'bottom',
                    hideOnPress: false,
                    duration: 2500,
                    floating: true,
                })
            }
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

    const reloadItems = () => {
        setPage(1)
    }

    const loadData = async () => {

    }

    return (
        <>
            <CLoader visible={loader} />
            <Container>
                {creditCards.length > 0 ? (
                    <FlatList
                        data={creditCards}
                        renderItem={renderItem}
                        refreshing={refreshing}
                        onRefresh={() => reloadItems()}
                        keyExtractor={(item) => item.id.toString()}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={() => reloadItems()}
                                titleColor="#fff"
                                progressBackgroundColor="#fff"
                                colors={[ThemeColors.primary]}
                            />
                        }
                    />
                ) : (
                    <NoRegister />
                )}
            </Container>
        </>
    )
}

export default MyPaymentMethodsScreen
