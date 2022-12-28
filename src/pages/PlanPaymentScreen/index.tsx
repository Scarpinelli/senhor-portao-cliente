import React, {
    useCallback,
    useContext,
    useEffect,
    useLayoutEffect,
    useState,
} from 'react'
import Endpoints from 'services/endpoints'

import PaymentMethodCard from 'components/PaymentMethodCard'

import {
    ThemeButton,
    CText,
    ThemeColors,
    ThemeInput,
    CLoader,
} from 'components'
import { useFocusEffect } from '@react-navigation/native'
import { DataContext } from 'contexts/AppContext'
import { StatusBar } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import AppStorage from 'services/data/AppStorage'
import moment from 'moment'
import { Container, PaymentContainer } from './styles'
import * as Env from '../../env'

const PlanPaymentScreen: React.FC = ({ navigation, route }: any) => {
    const [loader, setLoader] = useState(false)

    const { params } = route

    const [plan, setPLan] = useState(params?.plan)

    const { resolveError, getUser, logout, user } = useContext(DataContext)

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

    const handlePayment = async () => {
        setLoader(true)

        try {
            const paymentPlanResult = await Endpoints.paymentPlan(plan?.id)

            if (paymentPlanResult) {
                await getUser()

                showMessage({
                    message: 'Plano adquirido com sucesso',
                    type: 'success',
                    icon: 'danger',
                    position: 'bottom',
                    hideOnPress: false,
                    duration: 2500,
                    floating: true,
                })

                if (user) {
                    await AppStorage.storeData(
                        `${Env.keyPrefix}-plans-${user?.id}`,
                        moment().format('DD-MM-YYYY HH:mm:ss'),
                    )
                } else {
                    const userData = await AppStorage.getData(
                        `${Env.keyPrefix}-user`,
                    )
                    await AppStorage.storeData(
                        `${Env.keyPrefix}-plans-${userData?.id}`,
                        moment().format('DD-MM-YYYY HH:mm:ss'),
                    )
                }

                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Redirect' }],
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
    return (
        <>
            <CLoader visible={loader} />
            <StatusBar
                barStyle="dark-content"
                translucent
                backgroundColor="transparent"
            />

            <Container style={{ padding: 20 }}>
                <CText black mb2 bold h2>
                    {plan?.name}
                </CText>
                <CText black mb2 bold>
                    R$ {plan?.value}
                </CText>
                <CText black small mb5>
                    Magna ullamco non nulla velit qui in elit laborum. Nisi anim
                    non excepteur officia aliqua ut consequat. Consequat enim
                    cillum tempor deserunt anim nostrud fugiat officia sit.
                    Mollit exercitation duis qui in consequat dolor irure do
                    enim elit. Ut id anim officia veniam culpa eiusmod commodo
                    ut id consequat do quis aute.
                </CText>

                <PaymentContainer>
                    <CText black mb2>
                        Pagamento:
                    </CText>

                    {creditCards?.map((cc: any, index: number) => {
                        return (
                            <PaymentMethodCard
                                id={cc?.id}
                                key={index}
                                brand={cc?.brand}
                                cardNumber={cc?.lastDigits}
                                type="credit"
                                // navigation={navigation}
                                showDelete={false}
                                // onPress={toggleModal1}
                                principal={cc?.default}
                            />
                        )
                    })}
                    {/* <PaymentMethodCard
					brand={'mastercard'}
					cardNumber={'8734'}
					type={'credit'}
					// navigation={navigation}
					showDelete={false}
					// onPress={toggleModal1}
				/>
				<PaymentMethodCard
					brand={'mastercard'}
					cardNumber={'8734'}
					type={'credit'}
					// navigation={navigation}
					showDelete={false}
					// onPress={toggleModal1}
				/> */}
                </PaymentContainer>

                <ThemeButton
                    outlined
                    mb4
                    onPress={() => navigation.navigate('NewPayementMethod')}
                >
                    <CText bold black>
                        Adicionar nova forma de pagamento
                    </CText>
                </ThemeButton>

                <ThemeButton
                    onPress={() => handlePayment()}
                    // onPress={() => navigation.navigate('PlanPaymentCompleted')}
                >
                    <CText bold>Finalizar pagamento</CText>
                </ThemeButton>
            </Container>
        </>
    )
}

export default PlanPaymentScreen
