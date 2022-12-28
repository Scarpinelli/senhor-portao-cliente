import React, {
    useState,
    useEffect,
    useContext,
    useCallback,
    useRef,
    memo,
} from 'react'
import {
    FlatList,
    TouchableOpacity,
    View,
    Alert,
    StatusBar,
    ScrollView,
    ActivityIndicator,
    Image,
    Dimensions,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import MapViewDirections from 'react-native-maps-directions'

import {
    ThemeText,
    ThemeButton,
    CText,
    ModalOrderCustomerStep1,
    ModalOrderCustomerStep2,
    DefaultModal,
    ModalOrderCustomerStep3,
    ModalOrderCustomerStep4,
} from 'components'
import AntDesign from '@expo/vector-icons/AntDesign'

import IconFontisto from '@expo/vector-icons/Fontisto'

import MapView, { Camera, Marker } from 'react-native-maps'
import PinMarker from 'assets/images/pin.png'

import AvatarIcon from 'components/AvatarIcon'
import SideNav from 'components/SideNav'

import Icon from '@expo/vector-icons/Ionicons'
import LogoGray from 'assets/images/logo-gray.png'
import ThemeButtons from 'components/ThemeButton'
import ManImage from 'assets/images/man.png'
import LogoImage from 'assets/images/logo.png'
import ServiceCard from 'components/ServiceCard'
import PaymentMethodCard from 'components/PaymentMethodCard'
import Endpoints from 'services/endpoints'
import { DataContext } from 'contexts/AppContext'
import { showMessage } from 'react-native-flash-message'

import { useFormik } from 'formik'
import * as yup from 'yup'
import { Colors } from 'styles'
import { useFocusEffect } from '@react-navigation/native'
import ModalOrderCustomerStep5 from 'components/ModalOrderCustomerStep5'
import ModalOrderCustomerStep6 from 'components/ModalOrderCustomerStep6'
import ModalOrderCustomerStep7 from 'components/ModalOrderCustomerStep7'
import ModalOrderCustomerStep8 from 'components/ModalOrderCustomerStep8'
import ModalOrderCustomerStep9 from 'components/ModalOrderCustomerStep9'
import ModalOrderCustomerStep10 from 'components/ModalOrderCustomerStep10'
import ModalOrderCustomerStep11 from 'components/ModalOrderCustomerStep11'
import {
    Container,
    Map,
    ScreenOverlay,
    MenuButton,
    Actions,
    Request,
    Banner,
    Title,
    Info,
    PromoLogo,
    PaddingContainer,
    AddressContainer,
    AddressMarker,
    AddressInfo,
    PaymentContainer,
    ActionsAlert,
    TitleText,
    Man,
    Logo,
    AvatarContainer,
    ModalInfo,
    ModalInfoContainer,
    AvatarContainerModal,
    ModalInfoCenter,
    ValueContainer,
    InfoValue,
    RequestValue,
    BannerContainer,
    NewButton,
    NoItemsContainer,
    InfoContainer,
    AddressContainerCall,
    CallButtons,
    CallButton,
    Divider,
    MyAddressContainer,
    ClearButton,
    LabelStep,
    OnlineBadge,
    TopContainer,
    AlertsContainer,
    AlertContent,
    AlertInfo,
    TopAlertsContainer,
} from './styles'
import ModalOrderCustomerStep12 from 'components/ModalOrderCustomerStep12'

const MainScreen: React.FC = ({ navigation, route }: any) => {
    const mapRef = useRef(null)
    const [service, setService] = useState<null | number>(null)
    const [address, setAddress] = useState(null)
    const [showSideNav, setShowSideNav] = useState(false)
    const [showLoadingModal, setShowLoadingModal] = useState(false)

    const [step, setStep] = useState(0)

    const [orderPayload, setOrderPayload] = useState<any>(null)

    const {
        resolveError,
        defaultAddress,
        defaultCreditCard,
        servicesType,
        user,
        getUser,
        orderPendingStatus,
        orderAddress,
        setOrderAddress,
        orderServiceTypeSelected,
        activeStepOrder,
        setActiveStepOrder,
        setOrderServiceTypeSelected,
        setOrderPendingStatus,
        setOrders,
        currentLatitude,
        currentLongitude,
        setScheduledDate,
        scheduledDate,
        socket,
        getActiveOrder,
        setOrderBudgetProducts,
        setOrderBudgetValue,
        orderScheduledToday,
    } = useContext(DataContext)

    const handleUpdateTracking = async () => {
        const getPendingOrders = await Endpoints.getPendingOrders()

        if (getPendingOrders) {
            setOrders(getPendingOrders)
            setOrderPendingStatus(getPendingOrders[0])
        }
    }

    const checkPendingStatus = async (status: any = null) => {
        if (!status) {
            return
        }

        switch (status) {
            //  Ordem criada
            case 'WAITING':
                handleChangeStep(4)
                break

            //  Seta Ordem como agendada
            case 'SCHEDULED':
                setActiveStepOrder(1)
                break

            //  Quando um provider aceitou o agendamento
            case 'SCHEDULED_ACCEPT':
                setActiveStepOrder(1)
                break

            //  Procurando tecnico
            case 'SEARCH':
                setActiveStepOrder(4)
                break

            //  Encontrou tecnico , mas ainda não aceitou
            case 'MATCH':
                setActiveStepOrder(4)
                // mostrar procurando
                break

            //  tecnico aceitou o pedido
            //  Mostrar a rota do provider até o customer
            case 'FOUND':
                setActiveStepOrder(6)

                break

            // Tecnico chegou ao local de execução
            case 'ARRIVED_LOCATION':
                setActiveStepOrder(7)
                break

            // Cliente confirma a chegada do técnico
            case 'START_ORDER':
                setActiveStepOrder(8)
                break

            // Provider criando orçamento
            case 'ORDER':
                setActiveStepOrder(9)
                break

            //  Aceita o orçaemnto
            case 'ACCEPT':
                setActiveStepOrder(10)
                break

            //  ou rejeitar o orçamento
            //   quando tiver rejected habilitar o orçamento para o provider criar
            case 'REJECT':
                setActiveStepOrder(8)
                break

            //  Cancelar ordem
            case 'CANCELED':
                setActiveStepOrder(1)
                break

            //  Provider, marca o serviço como finalizado  /end
            case 'RATING':
                setActiveStepOrder(11)
                break
            case 'RATING_ENDED':
                setActiveStepOrder(12)
                break
            default:
                setActiveStepOrder(1)
                break
        }
    }

    const [getTracking, setGetTracking] = useState(null)

    useEffect(() => {
        if (!orderPendingStatus) {
            setActiveStepOrder(1)
            return
        }

        checkPendingStatus(orderPendingStatus?.status)

        if (orderPendingStatus?.status === 'FOUND') {
            const sendLatLng = setInterval(() => {
                handleUpdateTracking()
            }, 20 * 1000)
            return () => {
                clearInterval(sendLatLng)
            }
        }
    }, [orderPendingStatus])

    const [modalPayment, setModalPayment] = useState(false)

    const handleToggleSideNav = (action: boolean) => {
        setShowSideNav(action)
    }

    const toggleModal1 = () => {
        setModalPayment(!modalPayment)
    }

    const handleOpenChangePayement = () => {}

    const handleCancelRequest = () => {
        Alert.alert('Deseja cancelar a solicitação?', undefined, [
            {
                text: 'Fechar',
                // onPress: () => {},
                style: 'cancel',
            },
            {
                text: 'Cancelar Solicitação',
                onPress: () => {
                    setShowLoadingModal(false)
                    setStep(0)
                },
            },
        ])
    }

    useEffect(() => {

        if(!currentLatitude){
            return
        }
        const newCamera: Camera = {
            center: { latitude: currentLatitude, longitude: currentLongitude },
            zoom: 15,
            heading: 0,
            pitch: 0,
            altitude: 5,
        }
        ;(mapRef as any).current.animateCamera(newCamera, { duration: 2000 })
    }, [currentLatitude, currentLongitude])

    const [loader, setLoader] = useState(false)
    const [banners, setBanners] = useState([])
    const loadBanners = async () => {
        try {
            const data = await Endpoints.getBanners()

            if (data) {
                setBanners(data)
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
    }

    useEffect(() => {
        loadBanners()
    }, [])

    const getBanner = () => {
        if (!(banners as any)?.results) {
            return 0
        }

        const lengthBanners = (banners as any)?.results?.length

        const randomPosition = Math.floor(Math.random() * lengthBanners)

        return randomPosition
    }

    // useEffect(() => {
    //     handleCheckStep()
    // }, [activeStepOrder])

    const handleCheckStep = () => {
        // if (!orderPendingStatus) {
        //     setActiveStepOrder(1)
        // }
        // setActiveStepOrder(1)
        // if (activeStepOrder === 0) {
        //     setVisibleStep1(true)
        // }
    }

    useFocusEffect(
        useCallback(() => {
            if (orderPendingStatus) {
                checkPendingStatus(orderPendingStatus?.status)
            } else {
                setActiveStepOrder(1)
            }
        }, []),
    )

    useEffect(() => {
        if (route?.params?.address) {
            setOrderAddress(route?.params?.address)
        }
    }, [route.params])

    const handleCloseAllModals = () => {
        setActiveStepOrder(0)
    }

    const handleSaveOrderPayload = (data: any) => {
        setOrderPayload(data)
        setActiveStepOrder(2)
    }

    const handleOrderCreated = async (data: any) => {
        setLoader(true)

        try {
            const getPendingOrders = await Endpoints.getPendingOrders()

            if (getPendingOrders) {
                setOrders(getPendingOrders)
                setOrderPendingStatus(getPendingOrders[0])
            }

            if (scheduledDate) {
                showMessage({
                    message:
                        'Visita agendada com sucesso, em breve você será notificado quando um técnico aceitar sua solicitação',
                    type: 'success',
                    icon: 'success',
                    position: 'bottom',
                    hideOnPress: false,
                    duration: 2500,
                    floating: true,
                })
                handleChangeStep(1)
            } else {
                handleChangeStep(4)
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
    }

    const handleChangeStep = async (stepIndex: number) => {
        setActiveStepOrder(stepIndex)
    }

    const [showModalCancelOrder, setShowModalCancelOrder] = useState(false)
    const [
        showModalCancelOrderSolicitation,
        setShowModalCancelOrderSolicitation,
    ] = useState(false)

    const handleCancelOrder = () => {
        setShowModalCancelOrder(true)
    }

    const handleCancelOrderSubmit = async () => {
        if (!orderPendingStatus?.id) {
            return
        }

        setLoader(true)

        try {
            const data = await Endpoints.cancelOrder(orderPendingStatus?.id)

            handleChangeStep(1)
            setShowModalCancelOrder(false)
            setOrderAddress(null)
            setOrderServiceTypeSelected(null)
            setOrderPendingStatus(null)
            setScheduledDate(null)
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
    }

    const handleCancelOrderSolicitation = () => {
        setShowModalCancelOrderSolicitation(true)
    }

    const handleCancelOrderSolicitationSubmit = async () => {
        setActiveStepOrder(1)
        setOrderAddress(null)
        setOrderServiceTypeSelected(null)
        setOrderPendingStatus(null)
        setScheduledDate(null)
        setAddress(null)
    }

    const handleResetOrder = () => {
        handleChangeStep(1)
        setOrderAddress(null)
        setOrderServiceTypeSelected(null)
        setOrderPendingStatus(null)
        setScheduledDate(null)
        setAddress(null)
    }

    const { width, height } = Dimensions.get('window')

    const ASPECT_RATIO = width / height

    const [latitudeDelta, setLatitudeDelta] = useState(0.0922)
    const [longitudeDelta, setLongitudeDelta] = useState(0.0421)

    useEffect(() => {
        setLongitudeDelta(latitudeDelta * ASPECT_RATIO)
    }, [currentLatitude])

    const [distance, setDistance] = useState(0)
    const [duration, setDuration] = useState(0)

    const handleCancelInitOrderBudget = async () => {
        setLoader(true)

        try {
            const data = await Endpoints.customerStartOrder(
                orderPendingStatus?.id,
            )
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
    }

    const [acceptOrderBudget, setAcceptOrderBudget] = useState(false)
    const [rejectOrderBudget, setRejectOrderBudget] = useState(false)

    const handleAcceptOrderBudget = () => {
        setAcceptOrderBudget(true)
    }

    const handleAcceptOrderBudgetSubmit = async () => {
        if (!orderPendingStatus?.id) {
            return
        }

        setLoader(true)

        try {
            const data = await Endpoints.acceptOrderBudget(
                orderPendingStatus?.id,
            )
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
    }

    const handleRejectOrderBudget = () => {
        setRejectOrderBudget(true)
    }

    const handleRejectOrderBudgetSubmit = async () => {
        if (!orderPendingStatus?.id) {
            return
        }

        setLoader(true)

        try {
            const data = await Endpoints.rejectOrderBudget(
                orderPendingStatus?.id,
            )
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
    }

    const handleClearOrder = async () => {
        setActiveStepOrder(1)
        setOrderAddress(null)
        setOrderServiceTypeSelected(null)
        setOrderPendingStatus(null)
        setOrders(null)
        setOrderBudgetProducts(null)
        setOrderBudgetValue(null)
        navigation.navigate('Redirect')
    }

    return (
        <>
            <StatusBar
                barStyle="dark-content"
                translucent
                backgroundColor="transparent"
            />
            <Container>
                <DefaultModal
                    title="Deseja cancelar a solicitação?"
                    cancel="Fechar"
                    textButton="Cancelar"
                    visible={showModalCancelOrder}
                    handleCancel={() => {
                        setShowModalCancelOrder(false)
                    }}
                    handleAction={handleCancelOrderSubmit}
                />

                <DefaultModal
                    title="Deseja cancelar a solicitação?"
                    cancel="Fechar"
                    textButton="Cancelar"
                    visible={showModalCancelOrderSolicitation}
                    handleCancel={() => {
                        setShowModalCancelOrderSolicitation(false)
                    }}
                    handleAction={handleCancelOrderSolicitationSubmit}
                />

                <DefaultModal
                    title="Deseja Aceitar esse orçamento?"
                    cancel="Fechar"
                    textButton="Aceitar"
                    visible={acceptOrderBudget}
                    handleCancel={() => {
                        setAcceptOrderBudget(false)
                    }}
                    handleAction={handleAcceptOrderBudgetSubmit}
                />

                <DefaultModal
                    title="Deseja Rejeitar esse orçamento?"
                    cancel="Fechar"
                    textButton="Rejeitar"
                    visible={rejectOrderBudget}
                    handleCancel={() => {
                        setRejectOrderBudget(false)
                    }}
                    handleAction={handleRejectOrderBudgetSubmit}
                />

                <SideNav
                    toggle={handleToggleSideNav}
                    show={showSideNav}
                    navigation={navigation}
                />
                {currentLatitude && (
                <Map
                    ref={mapRef}
                    // provider="google"
                    initialRegion={{
                        latitude: currentLatitude,
                        longitude: currentLongitude,

                        // latitude: 37.3318456,
                        // longitude: -122.0296002,

                        latitudeDelta,
                        longitudeDelta,
                    }}
                    onLayout={() => {
                        ;(mapRef as any).current.animateCamera({
                            pitch: 10,
                        })
                    }}
                >
                    
                    <>
                        {currentLatitude && (
                            <Marker
                                coordinate={{
                                    latitude: Number(currentLatitude),
                                    longitude: Number(currentLongitude),
                                }}
                            >
                                <Image
                                    source={PinMarker}
                                    style={{ height: 80, width: 80 }}
                                    resizeMode="contain"
                                />
                            </Marker>
                        )}
                    </>
                    {/* )} */}

                    {orderPendingStatus?.status === 'FOUND' && (
                        <Marker
                            coordinate={{
                                latitude:
                                    orderPendingStatus?.provider
                                        ?.current_latitude,
                                longitude:
                                    orderPendingStatus?.current
                                        ?.current_longitude,
                            }}
                        >
                            <Image
                                source={PinMarker}
                                style={{ height: 80, width: 80 }}
                                resizeMode="contain"
                            />
                        </Marker>
                    )}

                    {orderPendingStatus?.status === 'FOUND' &&
                        orderPendingStatus?.provider?.current_latitude && (
                            <MapViewDirections
                                origin={{
                                    latitude:
                                        orderPendingStatus?.provider
                                            ?.current_latitude,
                                    longitude:
                                        orderPendingStatus?.current
                                            ?.current_longitude,
                                }}
                                destination={{
                                    latitude: currentLatitude,
                                    longitude: currentLongitude,
                                }}
                                apikey="AIzaSyCO-XElKftBMySvSNq5LZzqWaPIodzemPo"
                                strokeWidth={5}
                                strokeColor="#1EB5EC"
                                optimizeWaypoints
                                onReady={(result) => {
                                    setDistance(result.distance)
                                    setDuration(result.duration)
                                    ;(mapRef as any).current.fitToCoordinates(
                                        result.coordinates,
                                        {
                                            edgePadding: {
                                                right: width / 20,
                                                bottom: 200,
                                                left: width / 20,
                                                top: 100,
                                            },
                                        },
                                    )
                                }}
                            />
                        )}
                </Map>
                )}
                <ScreenOverlay pointerEvents="box-none">
                    <SafeAreaView>
                        <TopContainer>
                            <MenuButton
                                style={{
                                    shadowOffset: { width: 5, height: 5 },
                                    shadowColor: 'black',
                                    shadowOpacity: 0.1,
                                }}
                                onPress={() => handleToggleSideNav(true)}
                            >
                                <Icon
                                    name="menu-outline"
                                    color="#000000"
                                    size={20}
                                />
                            </MenuButton>

                            {/* {orderPendingStatus && (
                                <OnlineBadge>
                                    <CText>
                                        Step: {orderPendingStatus?.status}
                                    </CText>
                                </OnlineBadge>
                            )} */}
                        </TopContainer>

                        {activeStepOrder === 0 && (
                            <TopAlertsContainer>
                                {orderScheduledToday.length > 0 && (
                                    <AlertsContainer>
                                        <TouchableOpacity
                                            onPress={() =>
                                                navigation.navigate(
                                                    'MyScheduledOrders',
                                                )
                                            }
                                        >
                                            <AlertContent bg="#9750DD">
                                                <AntDesign
                                                    name="clockcircleo"
                                                    size={24}
                                                    color={Colors.white}
                                                />
                                                <AlertInfo>
                                                    <CText small>
                                                        Você possui uma
                                                        solicitação agendada
                                                        para hoje
                                                    </CText>
                                                    <CText small>
                                                        Toque aqui para ver os
                                                        detalhes
                                                    </CText>
                                                </AlertInfo>
                                            </AlertContent>
                                        </TouchableOpacity>
                                    </AlertsContainer>
                                )}
                            </TopAlertsContainer>
                        )}
                    </SafeAreaView>

                    {/* <Step1OpenOrder
                        handleCancel={() => {
                            setVisibleStep1(false)
                        }}
                        visible={visibleStep1}
                        address={address}
                        navigation={navigation}
                        banners={banners}
                        getBanner={getBanner}
                        route={route}
                    /> */}

                    {/* INICIAR UMA ORDER */}
                    <ModalOrderCustomerStep1
                        handleCloseAllModals={handleCloseAllModals}
                        visible={activeStepOrder === 1}
                        address={address}
                        navigation={navigation}
                        banners={banners}
                        getBanner={getBanner}
                        route={route}
                        handleSaveOrderPayload={handleSaveOrderPayload}
                    />

                    {/* CONFIRMA A CRIACAO DA ORDER */}
                    <ModalOrderCustomerStep2
                        visible={activeStepOrder === 2}
                        getBanner={getBanner}
                        handleCloseAllModals={handleCloseAllModals}
                        handleCancelOrder={handleCancelOrder}
                        handleOrderCreated={handleOrderCreated}
                        orderPayload={orderPayload}
                        address={address}
                        handleChangeStep={handleChangeStep}
                        banners={banners}
                        handleResetOrder={handleResetOrder}
                        handleCancelOrderSolicitation={
                            handleCancelOrderSolicitation
                        }
                    />

                    {/* AGENDAMENTO DE VISITA */}
                    <ModalOrderCustomerStep5
                        visible={activeStepOrder === 5}
                        getBanner={getBanner}
                        handleCloseAllModals={handleCloseAllModals}
                        handleCancelOrder={handleCancelOrder}
                        handleOrderCreated={handleOrderCreated}
                        orderPayload={orderPayload}
                        address={address}
                        handleChangeStep={handleChangeStep}
                        banners={banners}
                        handleResetOrder={handleResetOrder}
                        handleCancelOrderSolicitation={
                            handleCancelOrderSolicitation
                        }
                    />

                    {/* AVISOS */}
                    <ModalOrderCustomerStep3
                        visible={activeStepOrder === 3}
                        getBanner={getBanner}
                        handleCancelOrder={handleCancelOrder}
                        handleOrderCreated={handleOrderCreated}
                        orderPayload={orderPayload}
                        banners={banners}
                        handleChangeStep={handleChangeStep}
                        handleCancelOrderSolicitation={
                            handleCancelOrderSolicitation
                        }
                    />

                    {/* PROCURANDO PROFISSIONAIS */}
                    <ModalOrderCustomerStep4
                        visible={activeStepOrder === 4}
                        handleCancelOrder={handleCancelOrder}
                        // banners={banners}
                    />

                    {/* PROFISSIONAL ENCONTRADO */}
                    <ModalOrderCustomerStep6
                        visible={activeStepOrder === 6}
                        handleCancelOrder={handleCancelOrder}
                        distance={distance}
                        duration={duration}
                        banners={banners}
                    />

                    {/* PROFISSIONAL CHEGOU AO LOCAL */}
                    <ModalOrderCustomerStep7
                        visible={activeStepOrder === 7}
                        handleCancelOrder={handleCancelOrder}
                        distance={distance}
                        duration={duration}
                        banners={banners}
                        handleCancelInitOrderBudget={
                            handleCancelInitOrderBudget
                        }
                    />

                    {/* AGUARDANDO ORCAMENTO */}
                    <ModalOrderCustomerStep8
                        visible={activeStepOrder === 8}
                        handleCancelOrder={handleCancelOrder}
                        // banners={banners}
                    />

                    {/* RECEBENDO ORCAMENTO DO TÉCNICO */}
                    <ModalOrderCustomerStep9
                        visible={activeStepOrder === 9}
                        handleCancelOrder={handleCancelOrder}
                        distance={distance}
                        duration={duration}
                        banners={banners}
                        handleCancelInitOrderBudget={
                            handleCancelInitOrderBudget
                        }
                        handleRejectOrderBudget={handleRejectOrderBudget}
                        handleAcceptOrderBudget={handleAcceptOrderBudget}
                        navigation={navigation}
                    />

                    <ModalOrderCustomerStep10
                        visible={activeStepOrder === 10}
                        handleCancelOrder={handleCancelOrder}
                        // banners={banners}
                    />

                    <ModalOrderCustomerStep11
                        visible={activeStepOrder === 11}
                        handleCancelOrder={handleCancelOrder}
                        handleClearOrder={handleClearOrder}
                        navigation={navigation}
                        // banners={banners}
                    />

                    <ModalOrderCustomerStep12
                        visible={activeStepOrder === 12}
                        handleCancelOrder={handleCancelOrder}
                        handleClearOrder={handleClearOrder}
                        navigation={navigation}
                        // banners={banners}
                    />

                    {/* {step == 0 && (
                        <Actions>
                            <Request>
                                <PaddingContainer>
                                    <Title>
                                        <AvatarIcon type={1} />
                                        <Info>
                                            <ThemeText black bold>
                                                Realizar Pedido
                                            </ThemeText>
                                            <ThemeText small black>
                                                Excepteur labore et ut esse esse
                                                qui nulla velit eu adipisicing
                                                pariatur anim.
                                            </ThemeText>
                                        </Info>
                                    </Title>
                                </PaddingContainer>
                                <FlatList
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    data={servicesType?.results}
                                    renderItem={renderItem}
                                    keyExtractor={(item, index) =>
                                        item.id.toString()
                                    }
                                    contentContainerStyle={{
                                        overflow: 'visible',
                                        paddingLeft: 20,
                                        position: 'relative',
                                        paddingTop: 10,
                                    }}
                                />
                                <AddressContainer
                                    onPress={() =>
                                        navigation.navigate('SelectAddress')
                                    }
                                >
                                    <AddressMarker>
                                        <IconFontisto
                                            name="map-marker-alt"
                                            size={20}
                                        />
                                    </AddressMarker>
                                    <AddressInfo>
                                        <ThemeText black bold>
                                            Rua teste 123
                                        </ThemeText>
                                        <ThemeText small black>
                                            Rua affonso celso dias, 100, bloco 2
                                            ap 83, CEP 18046-376, Sorocaba-SP
                                        </ThemeText>
                                    </AddressInfo>
                                </AddressContainer>

                                <PaymentContainer>
                                    <ThemeText black>Pagamento:</ThemeText>
                                    <PaymentMethodCard
                                        brand="mastercard"
                                        cardNumber="8734"
                                        type="credit"
                                        navigation={navigation}
                                        showDelete={false}
                                        onPress={toggleModal1}
                                    />
                                </PaymentContainer>

                                <PaddingContainer>
                                    <ThemeButtons
                                        secondary
                                        mt4
                                        onPress={() => setStep(1)}
                                    >
                                        <ThemeText>Realizar pedido</ThemeText>
                                    </ThemeButtons>
                                </PaddingContainer>
                            </Request>
                            <Banner>
                                <PromoLogo
                                    source={LogoGray}
                                    resizeMode="contain"
                                />
                            </Banner>
                        </Actions>
                    )} 

                    {activeStepOrder === 2 && (
                        <Actions>
                            <Request>
                                <PaddingContainer>
                                    <Title>
                                        <AvatarIcon type={1} />
                                        <Info>
                                            <ThemeText black bold>
                                                Confirme o endereço da
                                                solicitação
                                            </ThemeText>
                                            <ThemeText small black>
                                                Confira se está tudo certo com a
                                                sua solicitação
                                            </ThemeText>
                                        </Info>
                                    </Title>
                                </PaddingContainer>

                                <AddressContainer>
                                    <AddressMarker>
                                        <IconFontisto
                                            name="map-marker-alt"
                                            size={20}
                                        />
                                    </AddressMarker>
                                    <AddressInfo>
                                        <ThemeText black bold>
                                            {(address as any)?.alias
                                                ? (address as any)?.alias
                                                : (address as any)?.street}
                                        </ThemeText>
                                        <ThemeText small black>
                                            {(address as any)?.street},{' '}
                                            {(address as any)?.streetNumber},
                                            CEP {(address as any)?.zipCode},{' '}
                                            {(address as any)?.city}-
                                            {(address as any)?.state}
                                        </ThemeText>
                                    </AddressInfo>
                                </AddressContainer>

                                <PaddingContainer>
                                    <ThemeButtons
                                        secondary
                                        mt4
                                        onPress={() => setStep(2)}
                                    >
                                        <ThemeText>
                                            Confirmar localização
                                        </ThemeText>
                                    </ThemeButtons>

                                    <ThemeButtons
                                        primary
                                        mt2
                                        onPress={() => setStep(2)}
                                    >
                                        <ThemeText>
                                            Alterar localização
                                        </ThemeText>
                                    </ThemeButtons>

                                    <ThemeButtons
                                        primary
                                        mt4
                                        onPress={() => setStep(2)}
                                    >
                                        <ThemeText>
                                            Cancelar solicitação
                                        </ThemeText>
                                    </ThemeButtons>
                                </PaddingContainer>
                            </Request>
                            <BannerContainer>
                                {(banners as any)?.results?.length > 0 ? (
                                    <Image
                                        source={{
                                            uri:
                                                (banners as any)?.results[
                                                    Number(getBanner())
                                                ]?.image || null,
                                        }}
                                    />
                                ) : (
                                    <Banner>
                                        <PromoLogo
                                            source={LogoGray}
                                            resizeMode="contain"
                                        />
                                    </Banner>
                                )}
                            </BannerContainer>
                        </Actions>
                    )} */}

                    {step === 20 && (
                        <ActionsAlert>
                            <AvatarContainer>
                                <AvatarIcon type={0} />
                            </AvatarContainer>
                            <ScrollView contentContainerStyle={{ padding: 20 }}>
                                <Title>
                                    <TitleText>
                                        <ThemeText h1>Só um minuto!</ThemeText>
                                        <ThemeText h1>
                                            Alguns avisos importantes
                                        </ThemeText>
                                    </TitleText>
                                    <Man
                                        source={ManImage}
                                        resizeMode="contain"
                                    />
                                </Title>
                                <ThemeText mb2>
                                Ao solicitar a visita de um técnico do Senhor portão, será
                                    cobrada a TAXA DE VISITA de R$ 79,90. Ao solicitar iremos
                                    procurar o técnico mais próximo de você e encaminhá-lo a
                                    para o seu endereço.
                                </ThemeText>
                                <ThemeText mb2>
                                    Sunt dolore aliqua cillum duis esse. Anim
                                    nisi irure nisi et id voluptate magna.
                                    Laborum pariatur nulla ut laborum in
                                    consectetur dolor id dolore excepteur
                                    commodo sint dolor commodo.
                                </ThemeText>
                                <ThemeText mb2>
                                    Voluptate minim excepteur duis officia
                                    dolor. Ea cupidatat ullamco incididunt nisi
                                    laborum elit. Nisi Lorem commodo non aliquip
                                    laboris nisi amet eu laborum magna nulla.
                                    Magna tempor dolor qui ex id ad. Anim do
                                    exercitation cupidatat cupidatat fugiat
                                    voluptate exercitation.
                                </ThemeText>

                                <ThemeButton
                                    primary
                                    onPress={() => setStep(4)}
                                    mb2
                                >
                                    <ThemeText bold>Continuar</ThemeText>
                                </ThemeButton>

                                <ThemeButton
                                    outlined
                                    onPress={() => handleCancelRequest()}
                                >
                                    <ThemeText bold>Cancelar</ThemeText>
                                </ThemeButton>
                            </ScrollView>
                        </ActionsAlert>
                    )}

                    {step === 4 && (
                        <ModalInfo>
                            <ModalInfoCenter>
                                <ModalInfoContainer>
                                    <AvatarContainerModal>
                                        <AvatarIcon type={0} />
                                    </AvatarContainerModal>
                                    <ThemeText h2 black center mb2>
                                        Procurando profissionais
                                    </ThemeText>
                                    <ThemeText black center>
                                        Proident velit voluptate aliquip nulla
                                        reprehenderit sunt quis quis occaecat
                                        anim.
                                    </ThemeText>
                                </ModalInfoContainer>

                                <ThemeButton
                                    primary
                                    onPress={() => setStep(5)}
                                    mt2
                                >
                                    <ThemeText bold>Continuar</ThemeText>
                                </ThemeButton>
                            </ModalInfoCenter>
                        </ModalInfo>
                    )}

                    {step === 5 && (
                        <Actions>
                            <Request>
                                <PaddingContainer>
                                    <Title>
                                        <AvatarIcon type={1} />
                                        <Info>
                                            <ThemeText black bold>
                                                Técnico Está chegando
                                            </ThemeText>
                                            <ThemeText small black>
                                                Excepteur labore et ut esse esse
                                                qui nulla velit eu adipisicing
                                                pariatur anim.
                                            </ThemeText>
                                        </Info>
                                    </Title>
                                </PaddingContainer>

                                <PaddingContainer>
                                    <ThemeButtons
                                        secondary
                                        mt4
                                        onPress={() => setStep(6)}
                                    >
                                        <ThemeText>Enviar mensagem</ThemeText>
                                    </ThemeButtons>
                                </PaddingContainer>
                            </Request>
                            <BannerContainer>
                                {(banners as any)?.results?.length > 0 ? (
                                    <Image
                                        source={{
                                            uri:
                                                (banners as any)?.results[
                                                    Number(getBanner())
                                                ]?.image || null,
                                        }}
                                    />
                                ) : (
                                    <Banner>
                                        <PromoLogo
                                            source={LogoGray}
                                            resizeMode="contain"
                                        />
                                    </Banner>
                                )}
                            </BannerContainer>
                        </Actions>
                    )}

                    {step === 6 && (
                        <ModalInfo>
                            <ModalInfoCenter>
                                <ModalInfoContainer>
                                    <AvatarContainerModal>
                                        <AvatarIcon type={0} />
                                    </AvatarContainerModal>
                                    <ThemeText h2 black center mb2>
                                        Solicitação em analise
                                    </ThemeText>
                                    <ThemeText black center>
                                        Proident velit voluptate aliquip nulla
                                        reprehenderit sunt quis quis occaecat
                                        anim.
                                    </ThemeText>
                                </ModalInfoContainer>

                                <ThemeButton
                                    primary
                                    onPress={() => setStep(7)}
                                    mt2
                                >
                                    <ThemeText bold>Continuar</ThemeText>
                                </ThemeButton>
                            </ModalInfoCenter>
                        </ModalInfo>
                    )}

                    {step === 7 && (
                        <Actions>
                            <Request>
                                <PaddingContainer>
                                    <Title>
                                        <AvatarIcon type={1} />
                                        <Info>
                                            <ThemeText black bold>
                                                Orçamento recebido
                                            </ThemeText>
                                            <ThemeText small black>
                                                Excepteur labore et ut esse esse
                                                qui nulla velit eu adipisicing
                                                pariatur anim.
                                            </ThemeText>
                                        </Info>
                                    </Title>
                                </PaddingContainer>
                                <ValueContainer>
                                    <InfoValue>
                                        <ThemeText black bold>
                                            Valor total:
                                        </ThemeText>
                                        <ThemeText black>
                                            Ullamco cupidatat elit minim tempor
                                            nisi labore consectetur laborum.
                                        </ThemeText>
                                    </InfoValue>
                                    <RequestValue>
                                        <ThemeText black bold>
                                            R$ 89,00
                                        </ThemeText>
                                    </RequestValue>
                                </ValueContainer>
                                <PaddingContainer>
                                    <ThemeText black mt2>
                                        Aliqua excepteur do culpa id dolor
                                        tempor eiusmod laboris reprehenderit
                                        occaecat qui do velit cupidatat. Ex non
                                        ea nisi sunt enim L
                                    </ThemeText>
                                </PaddingContainer>

                                <AddressContainer
                                    onPress={() =>
                                        navigation.navigate('SelectAddress')
                                    }
                                >
                                    <AddressMarker>
                                        <IconFontisto
                                            name="map-marker-alt"
                                            size={20}
                                        />
                                    </AddressMarker>
                                    <AddressInfo>
                                        <ThemeText black bold>
                                            Rua teste 123
                                        </ThemeText>
                                        <ThemeText small black>
                                            Rua affonso celso dias, 100, bloco 2
                                            ap 83, CEP 18046-376, Sorocaba-SP
                                        </ThemeText>
                                    </AddressInfo>
                                </AddressContainer>

                                <PaddingContainer>
                                    <ThemeButtons
                                        outlined
                                        mt4
                                        onPress={() =>
                                            navigation.navigate(
                                                'RequestDetails',
                                            )
                                        }
                                    >
                                        <ThemeText black>
                                            Ver detalhes do orçamento
                                        </ThemeText>
                                    </ThemeButtons>
                                    <ThemeButtons
                                        primary
                                        mt4
                                        onPress={() => setStep(8)}
                                    >
                                        <ThemeText>
                                            Aceitar e realizar serviço
                                        </ThemeText>
                                    </ThemeButtons>
                                    <ThemeButtons
                                        secondary
                                        mt2
                                        onPress={() => setStep(0)}
                                    >
                                        <ThemeText>
                                            Rejeitar orçamento
                                        </ThemeText>
                                    </ThemeButtons>
                                </PaddingContainer>
                            </Request>
                            <BannerContainer>
                                {(banners as any)?.results?.length > 0 ? (
                                    <Image
                                        source={{
                                            uri:
                                                (banners as any)?.results[
                                                    Number(getBanner())
                                                ]?.image || null,
                                        }}
                                    />
                                ) : (
                                    <Banner>
                                        <PromoLogo
                                            source={LogoGray}
                                            resizeMode="contain"
                                        />
                                    </Banner>
                                )}
                            </BannerContainer>
                        </Actions>
                    )}

                    {step === 8 && (
                        <ModalInfo>
                            <ModalInfoCenter>
                                <ModalInfoContainer>
                                    <AvatarContainerModal>
                                        <AvatarIcon type={1} />
                                    </AvatarContainerModal>
                                    <ThemeText h2 black center mb2>
                                        Serviço em andamento
                                    </ThemeText>
                                    <ThemeText black center>
                                        Proident velit voluptate aliquip nulla
                                        reprehenderit sunt quis quis occaecat
                                        anim.
                                    </ThemeText>
                                </ModalInfoContainer>

                                <ThemeButtons
                                    primary
                                    mt2
                                    onPress={() => setStep(9)}
                                >
                                    <ThemeText>Próximo</ThemeText>
                                </ThemeButtons>
                            </ModalInfoCenter>
                        </ModalInfo>
                    )}

                    {step === 9 && (
                        <ModalInfo>
                            <ModalInfoCenter>
                                <ModalInfoContainer>
                                    <AvatarContainerModal>
                                        <AvatarIcon type={1} />
                                    </AvatarContainerModal>
                                    <ThemeText h2 black center mb2>
                                        Serviço finalizado
                                    </ThemeText>
                                    <ThemeText black center>
                                        Proident velit voluptate aliquip nulla
                                        reprehenderit sunt quis quis occaecat
                                        anim.
                                    </ThemeText>
                                </ModalInfoContainer>

                                <ThemeButtons
                                    secondary
                                    mt2
                                    onPress={() =>
                                        navigation.navigate('Rating')
                                    }
                                >
                                    <ThemeText>Avaliar</ThemeText>
                                </ThemeButtons>

                                <ThemeButtons
                                    primary
                                    mt2
                                    onPress={() => setStep(0)}
                                >
                                    <ThemeText>Fechar</ThemeText>
                                </ThemeButtons>
                            </ModalInfoCenter>
                        </ModalInfo>
                    )}
                </ScreenOverlay>
            </Container>
        </>
    )
}

export default memo(MainScreen)
