import React, { useContext, useEffect } from 'react'
import { View, Text, StatusBar, Image, ActivityIndicator } from 'react-native'
import { SvgCssUri } from 'react-native-svg'
import LogoImage from 'assets/images/logo.png'
import ThemeColors from 'components/ThemeColors'
import { DataContext } from 'contexts/AppContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AppStorage from 'services/data/AppStorage'
import Endpoints from 'services/endpoints'
import * as Permissions from 'expo-permissions'
import * as Device from 'expo-device'
import * as Location from 'expo-location'
import { Container, Logo } from './styles'
import * as Env from '../../env'

const RedirectScreen: React.FC = ({ navigation }: any) => {
    /*
     *   CONTEXT
     */

    const {
        removeKeys,
        user,
        token,
        setMainNavigation,
        locationPermission,
        notificationPermission,
        orders,
        setOrders,
        getUser,
        logout,
        setActivePlan,
        setOrderPendingStatus,
        setOrderScheduledToday,
    } = useContext(DataContext)

    /*
     *   REFS
     */

    /*
     *   STATES
     */

    /*
     *   HOOKS
     */

    /*
     *   LAYOUT
     */

    /*
     *   FORMIK
     */

    /*
     *   FUNCTIONS
     */

    const verifyRedirect = async () => {
        try {
            //  Todas as Keys do Storage
            const keys = await AsyncStorage.getAllKeys()

            //  Chave primeiro acesso
            const firstAccess = await AppStorage.getData(
                `${Env.keyPrefix}-primeiro-acesso`,
            )

            //  Chave de usuário
            let userData = await AppStorage.getData(`${Env.keyPrefix}-user`)

            //  Chave Token de notificação
            const userTokenExpo = await AppStorage.getData(
                `${Env.keyPrefix}-expo-token`,
            )

            //  Permissão de notificação
            const { status: statusNotifications } = await Permissions.getAsync(
                Permissions.NOTIFICATIONS,
            )

            //  Permissão de Localização
            const { status: statusLocation } = await Permissions.getAsync(
                Permissions.LOCATION_FOREGROUND,
            )

            

            if (!firstAccess) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'OnBoarding' }],
                })
            } else if (userData) {

                
                const userToken = await AppStorage.getData(
                    `${Env.keyPrefix}-token`,
                )
                if (userToken) {
                    // const userDataRedirect = await Endpoints.getUser()
                }


                //  Atualiza dados do usuário
                userData = await AppStorage.getData(`${Env.keyPrefix}-user`)

                const creditCardScreen = await AppStorage.getData(
                    `${Env.keyPrefix}-credit-card-${userData?.id}`,
                )

                const completeRegisterKey = `${Env.keyPrefix}-complete-register-${userData?.id}`
                const completeRegister = await AppStorage.getData(
                    completeRegisterKey,
                )

                const authPhone = await AppStorage.getData(
                    `${Env.keyPrefix}-phone-auth-${userData?.id}`,
                )

                //  Login com telefone
                    if (authPhone) {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'AuthPhoneValidation' }],
                        })

                        //  Não tem email verificado
                    } else if (!userData?.emailVerified) {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'VerificationCodeEmail' }],
                        })

                        //  Não tem telefone verificado
                        // } else if (!userData?.phoneVerified) {
                        //     navigation.reset({
                        //         index: 0,
                        //         routes: [{ name: 'VerificationCodeSMS' }],
                        //     })

                        //  Não tem registro completo
                    } else if (!completeRegister || !userData.street) {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'CompleteRegister' }],
                        })

                        //  Nao tem permissão de localização
                    } else if (statusLocation !== 'granted' && Device.isDevice) {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'LocationPermission' }],
                        })

                        //  Não tem permissão de notificações
                    } 
                
                // else if (!userTokenExpo && Device.isDevice) {
                //     navigation.reset({
                //         index: 0,
                //         routes: [{ name: 'NotificationPermission' }],
                //     })

                //     //  Não tem chave de cadastrar cartão de crédito
                // } else if (!creditCardScreen) {
                //     navigation.reset({
                //         index: 0,
                //         routes: [{ name: 'CreditCardWelcome' }],
                //     })

                //     //  Não tem chave de cadastrar plano
                // } 
                
                else {
                    // Se o usuário estiver Logado e cumprido todas as exigencias

                    // Verifica se tem solicitação em aberto
                    const getPendingOrders = await Endpoints.getPendingOrders()

                    if (getPendingOrders) {
                        setOrders(getPendingOrders)
                        setOrderPendingStatus(getPendingOrders[0])

                        // const reducedValue =
                        //     getPendingOrders[0]?.OrderBudget?.OrderBudgetProduct.reduce(
                        //         function (total: number, numero: number) {
                        //             return total + numero
                        //         },
                        //         0,
                        //     )
                    }

                    const getScheduledOrdersToday =
                        await Endpoints.getScheduledOrdersToday()

                    if (getScheduledOrdersToday) {
                        setOrderScheduledToday(getScheduledOrdersToday)
                    }

                    // if (getPendingOrders.length > 0) {
                    //     navigation.reset({
                    //         index: 0,
                    //         routes: [{ name: 'Main' }],
                    //     })
                    // } else {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Main' }],
                    })
                    // }
                }
            } else {
                // Se o usuário não existir ou não estiver logado redireciona para a tela de Login
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Auth' }],
                })
            }
        } catch (e) {

            await logout()
            navigation.reset({
                index: 0,
                routes: [{ name: 'Redirect' }],
            })
        }
    }

    /*
     *   EFFECTS
     */

    useEffect(() => {
        setMainNavigation(navigation)
        verifyRedirect()
        // removeKeys()
    }, [])

    return (
        <>
            <StatusBar
                barStyle="dark-content"
                translucent
                backgroundColor="transparent"
            />
            <Container>
                <Logo width={250} height={150} source={LogoImage} />
                <ActivityIndicator size="small" color={ThemeColors.white} />
            </Container>
        </>
    )
}

export default RedirectScreen
