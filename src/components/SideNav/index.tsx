import React, { useState, useEffect, useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from '@expo/vector-icons/FontAwesome'
import { Switch } from 'react-native-switch'
import * as Progress from 'react-native-progress'
import { DataContext } from 'contexts/AppContext'
import { CLoader, DefaultModal, CText } from 'components'
import { showMessage } from 'react-native-flash-message'
import Endpoints from 'services/endpoints'
import NoImage from 'assets/images/no-image.jpg'
import ThemeColors from '../ThemeColors'
import {
    Container,
    Nav,
    Overlay,
    Top,
    Bottom,
    NavOptions,
    NavLink,
    UserContainer,
    UserInfo,
    UserRating,
    ReceiveCall,
    MyPlan,
    NumberCalls,
} from './styles'

import Avatar from '../Avatar'

interface ISideNav {
    toggle: any
    show: boolean
    navigation: any
}

const SideNav: React.FC<ISideNav> = ({ toggle, show, navigation }: any) => {
    const image = { uri: 'https://place-hold.it/300x500/666' }

    const [loader, setLoader] = useState(false)
    const [percentage, setPercentage] = useState<any>(0)
    const [receiveCalls, setReceiveCalls] = useState(false)
    const [showModalLogout, setShowModalLogout] = useState(false)
    const {
        setUser,
        logout,
        resolveError,
        getUser,
        user,
        activePlan,
        setActivePlan,
    } = useContext(DataContext)

    useEffect(() => {
        setReceiveCalls(user?.avaliableForCall)
    }, [user])

    const handleLogout = async () => {
        setShowModalLogout(true)
    }

    const handleLogoutSubmit = async () => {
        logout()

        navigation.reset({
            index: 0,
            routes: [{ name: 'Redirect' }],
        })
    }

    /*
    const laodActivePlan = async () => {
        try {
            const data = await Endpoints.getActiveContract()

            if (data) {
                setActivePlan(data)
            }

            await getUser()
        } catch (error) {
            let errorMessage = null
            errorMessage =
                (error as any)?.response?.data?.message ||
                'Ocorreu um erro tente novamente'

            // Chama o erro que resolve caso seja o erro de 401 (Sem Autorização / Token Inpirado)

            const res = await resolveError(error)

            if (!res) {
                showMessage({
                    message: errorMessage,
                    type: 'danger',
                    icon: 'danger',
                    position: 'bottom',
                })
            }
        } finally {
            setLoader(false)
        }
    } */

    // useEffect(() => {
    //     laodActivePlan()
    // }, [])

    // useEffect(() => {
    //     const percentageValue =
    //         activePlan?.plan?.requestAmount === 0 ||
    //         activePlan?.provider?.request === 0
    //             ? 0
    //             : (activePlan?.provider?.request /
    //                   activePlan?.plan?.requestAmount) *
    //               100
    //     setPercentage(percentageValue.toFixed(2))
    // }, [activePlan])

    /* const handleReceiveCalls = async (e: any) => {
        try {
            const data = await Endpoints.saveReceiveCalls(e ? 1 : 0)

            if (data) {
                showMessage({
                    message: 'Alterado com sucesso',
                    type: 'success',
                    icon: 'success',
                    position: 'bottom',
                    hideOnPress: false,
                    duration: 4000,
                    floating: true,
                })
                setReceiveCalls(e)
                await getUser()
            }
        } catch (error) {
            let errorMessage = null
            errorMessage =
                (error as any)?.response?.data?.message ||
                'Ocorreu um erro tente novamente'

            // Chama o erro que resolve caso seja o erro de 401 (Sem Autorização / Token Inpirado)

            const res = await resolveError(error)

            if (!res) {
                showMessage({
                    message: errorMessage,
                    type: 'danger',
                    icon: 'danger',
                    position: 'bottom',
                })
            }
        } finally {
            setLoader(false)
        }
    } */

    return (
        <>
            <CLoader visible={loader} />

            <DefaultModal
                title="Deseja realmente sair"
                textButton="Sair"
                visible={showModalLogout}
                handleCancel={() => {
                    setShowModalLogout(false)
                }}
                handleAction={handleLogoutSubmit}
            />
            <Container show={!!show}>
                <Nav>
                    <SafeAreaView style={{ flex: 1 }}>
                        <Top>
                            <UserContainer>
                                {/* <Avatar image={image} size={60} /> */}
                                {/* <CText>{user?.image ? 'ssss' : 'nnn'}</CText> */}
                                {user?.image ? (
                                    <Avatar image={user?.image} size={60} />
                                ) : (
                                    <Avatar image={null} size={60} />
                                )}

                                <UserInfo>
                                    <CText>{user?.name}</CText>
                                    <UserRating>
                                        <CText mr1>{user?.rating}</CText>
                                        <Icon
                                            name="star"
                                            size={12}
                                            color={ThemeColors.primary}
                                        />
                                    </UserRating>
                                </UserInfo>
                            </UserContainer>
                            <NavOptions>
                                <NavLink
                                    onPress={() =>
                                        navigation.navigate('MyRequests')
                                    }
                                >
                                    <CText>Minhas solicitações</CText>
                                </NavLink>
                                <NavLink
                                    onPress={() => navigation.navigate('Faq')}
                                >
                                    <CText>Ajuda</CText>
                                </NavLink>
                                <NavLink
                                    onPress={() =>
                                        navigation.navigate('MyPaymentMethods')
                                    }
                                >
                                    <CText>Pagamento</CText>
                                </NavLink>
                                <NavLink
                                    onPress={() =>
                                        navigation.navigate('MyAccount')
                                    }
                                >
                                    <CText>Meus dados</CText>
                                </NavLink>

                                <NavLink
                                    onPress={() =>
                                        navigation.navigate('MyScheduledOrders')
                                    }
                                >
                                    <CText>Solicitações Agendadas</CText>
                                </NavLink>
                                {/* <NavLink
                                    onPress={() =>
                                        navigation.navigate('FinancialExtract')
                                    }
                                >
                                    <CText>Extrato</CText>
                                </NavLink> */}
                            </NavOptions>
                        </Top>
                        <Bottom>
                            <NavLink onPress={() => handleLogout()}>
                                <CText>Sair</CText>
                            </NavLink>
                        </Bottom>
                    </SafeAreaView>
                </Nav>
                <Overlay activeOpacity={1} onPress={() => toggle(false)} />
            </Container>
        </>
    )
}

export default SideNav
