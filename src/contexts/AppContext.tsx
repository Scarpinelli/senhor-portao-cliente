import React, { useEffect, useState, createContext, useRef } from 'react'
import NetInfo, {
    NetInfoState,
    useNetInfo,
} from '@react-native-community/netinfo'
import { showMessage } from 'react-native-flash-message'
import * as Network from 'expo-network'
import { getPushToken } from 'services/notification'
import { AlertErrorsMessage } from 'components'
import * as Notifications from 'expo-notifications'
import * as Updates from 'expo-updates'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AppStorage from 'services/data/AppStorage'
import Endpoints from 'services/endpoints'
import * as Location from 'expo-location'
import * as Device from 'expo-device'
import { Platform } from 'react-native'
import { io, Socket } from 'socket.io-client'
import * as Env from '../env'

type DataContextType = {
    /* --------- */
    /* States */
    /* --------- */
    user: any
    token: any
    notificationKey: string | any
    setNotificationKey: any
    connectionStatus: boolean | null
    networkInfo: string
    netInfo: NetInfoState
    orders: any
    setOrders: any
    locationPermission: boolean
    notificationPermission: boolean
    genders: any
    documentTypes: any
    activePlan: any
    addressList: any
    defaultAddress: any
    creditCardList: any
    defaultCreditCard: any
    servicesType: any
    orderPendingStatus: any
    orderScheduledToday: any

    orderAddress: any
    orderServiceTypeSelected: any
    activeStepOrder: any
    socket: Socket
    currentLatitude: any
    currentLongitude: any
    orderBudgetProducts: any
    orderBudgetValue: any

    scheduledDate: any

    /* --------- */
    /* SetStates */
    /* --------- */

    setToken: React.Dispatch<React.SetStateAction<any>>
    setUser: React.Dispatch<React.SetStateAction<any>>
    setMainNavigation: React.Dispatch<React.SetStateAction<any>>
    setConnectionStatus: React.Dispatch<React.SetStateAction<boolean | null>>
    setActivePlan: React.Dispatch<React.SetStateAction<any | null>>
    setAddressList: React.Dispatch<React.SetStateAction<any | null>>
    setDefaultAddress: React.Dispatch<React.SetStateAction<any | null>>
    setCreditCardList: React.Dispatch<React.SetStateAction<any | null>>
    setDefaultCreditCard: React.Dispatch<React.SetStateAction<any | null>>
    setServicesType: React.Dispatch<React.SetStateAction<any | null>>
    setOrderPendingStatus: React.Dispatch<React.SetStateAction<any | null>>
    setOrderBudgetProducts: React.Dispatch<React.SetStateAction<any | null>>
    setOrderBudgetValue: React.Dispatch<React.SetStateAction<any | null>>

    setOrderAddress: React.Dispatch<React.SetStateAction<any | null>>

    setScheduledDate: React.Dispatch<React.SetStateAction<any | null>>

    setOrderServiceTypeSelected: React.Dispatch<
        React.SetStateAction<any | null>
    >
    setActiveStepOrder: React.Dispatch<React.SetStateAction<any | null>>
    setOrderScheduledToday: React.Dispatch<React.SetStateAction<any | null>>

    /* --------- */
    /* Functions */
    /* --------- */

    logout: () => Promise<void>
    getUser: () => Promise<any | undefined>
    resolveError: (error: any, navigation?: any) => Promise<boolean | any>
    removeKeys: () => Promise<void>

    localKeys: () => Promise<void>
    getLocationPermission: () => Promise<any>
    getNotificationPermissions: () => Promise<any>
    getGenders: () => Promise<any>
    getDocumentTypes: () => Promise<any>
    getAddress: () => Promise<any>
    getCreditCards: () => Promise<any>
    getActiveOrder: () => Promise<any>
}

export const DataContext = createContext<DataContextType>({} as DataContextType)

export function AppProvider({ children }: any) {
    /*
     *   CONTEXT
     */

    /*
     *   REFS
     */

    /* ------------------------------------------------------------- */
    /* ----Responsavel por obter a chave para a notificacao push---- */
    /* ------------------------------------------------------------- */
    const notificationListener = useRef<any>(null)
    const responseListener = useRef<any>(null)

    /*
     *   STATES
     */
    const [user, setUser] = useState<any>(null)
    const [token, setToken] = useState<any>(null)
    const [notificationKey, setNotificationKey] = useState<any>(null)
    const [networkInfo, setNetworkInfo] = useState('')
    const [connectionStatus, setConnectionStatus] = useState<boolean | null>(
        null,
    )
    const [showModal, setShowModal] = useState(false)
    const [showModalError, setShowModalError] = useState(false)
    const [mainNavigation, setMainNavigation] = useState<any>(null)
    const [locationPermission, setLocationPermission] = useState(false)
    const [notificationPermission, setNotificationPermission] = useState(false)
    const [orders, setOrders] = useState([])
    const [genders, setGenders] = useState([])
    const [documentTypes, setDocumentTypes] = useState([])
    const [activePlan, setActivePlan] = useState<any>(null)
    const [addressList, setAddressList] = useState<any>([])
    const [defaultAddress, setDefaultAddress] = useState<any>(null)

    const [creditCardList, setCreditCardList] = useState<any>([])
    const [defaultCreditCard, setDefaultCreditCard] = useState<any>(null)
    const [orderPendingStatus, setOrderPendingStatus] = useState<any>(null)

    const [servicesType, setServicesType] = useState<any>(null)

    const [orderAddress, setOrderAddress] = useState<any>(null)
    const [orderServiceTypeSelected, setOrderServiceTypeSelected] =
        useState<any>(null)
    const [scheduledDate, setScheduledDate] = useState(null)

    const [activeStepOrder, setActiveStepOrder] = useState(0)

    const [currentLatitude, setCurrentLatitude] = useState<any>('-15.826691')
    const [currentLongitude, setCurrentLongitude] = useState<any>('-47.921822')
    const [orderBudgetProducts, setOrderBudgetProducts] = useState<any>(null)
    const [orderBudgetValue, setOrderBudgetValue] = useState<any>(null)
    const [socket, setSocket] = useState<any>(null)
    const [orderScheduledToday, setOrderScheduledToday] = useState<any>([])

    // const socket = io('ws://192.168.15.26:3000/')
    // socket.on('connect', () =>
    // )

    /*
     *   HOOKS
     */
    const netInfo = useNetInfo()

    /* ------------------------------------------------- */
    /* Verifica se o usuario esta conectado a internet */
    /* ------------------------------------------------- */

    NetInfo.fetch().then((state) => {
        setConnectionStatus(state.isConnected)
    })

    /*
     *   LAYOUT
     */

    /*
     *   FORMIK
     */

    /*
     *   FUNCTIONS
     */

    const getLocation = async () => {
        // const { status } = await Location.requestForegroundPermissionsAsync()
        // if (status !== 'granted') {
        //     return
        // }

        if (!locationPermission) {
            return
        }

        const location = await Location.getCurrentPositionAsync({})
        // setLocation(location);

        if (location && user) {
            const trackingData = {
                providerId: user?.id,
                latitude: (location as any)?.coords?.latitude,
                longitude: (location as any)?.coords?.longitude,
            }

            setCurrentLatitude((location as any)?.coords?.latitude)
            setCurrentLongitude((location as any)?.coords?.longitude)

            const saveTracking = await Endpoints.putTracking(trackingData)
        }
    }

    useEffect(() => {
        if (user) {
            const sendLatLng = setInterval(() => {
                getLocation()
            }, 10 * 1000)
            return () => {
                clearInterval(sendLatLng)
            }
        }
    }, [user, locationPermission])

    /* --------------------------------------------------------- */
    /* ----------------- Busca o ip do usuário ----------------- */
    /* --------------------------------------------------------- */

    const getNetworkInfo = async () => {
        const userIp = await Network.getIpAddressAsync()
        setNetworkInfo(userIp)
    }

    const getUser = async () => {
        const userData = await Endpoints.getUser()

        if (!userData) {
            return
        }

        await AppStorage.storeData(`${Env.keyPrefix}-user`, userData?.data)

        setUser(userData?.data)

        if(userData?.data?.currentLatitude){
            setCurrentLatitude(userData?.data?.currentLatitude)
        }

        if(userData?.data?.currentLongitude){
            setCurrentLongitude(userData?.data?.currentLongitude)
        }

        const dataToken = await AppStorage.getData(`${Env.keyPrefix}-token`)

        try {
            if (dataToken) {
                setToken(dataToken)
            }
        } catch (error) {
            const res = await resolveError(error)

            let errorMessage = null
            errorMessage = 'Ocorreu um erro, tente novamente'

            await resolveError(error)

            if (!res) {
                showMessage({
                    message: errorMessage,
                    type: 'danger',
                    icon: 'danger',
                    position: 'bottom',
                })
            }
        }
    }

    /* ------------------------------------- */
    /* ---------------LogOut---------------- */
    /* ------------------------------------- */

    const logout = async () => {
        await AppStorage.remove(`${Env.keyPrefix}-token`)
        await AppStorage.remove(`${Env.keyPrefix}-user`)
        setUser(null)
        setToken({})
    }

    /* ------------------------------------------------------------------------------------------ */
    /* ----Função chamada caso o erro do catch retorne 401 (Sem Autorização / Token Inpirado)---- */
    /* ------------------------------------------------------------------------------------------ */

    const resolveError = async (error: any, navigation?: any) => {

        if (
            (error as any)?.response?.status === 401
            // ||
            // (error as any)?.response?.status === 400
        ) {
            setShowModalError(true)

            setTimeout(async () => {
                await logout()

                setShowModalError(false)
                mainNavigation
                    ? mainNavigation?.reset({
                          index: 0,
                          routes: [{ name: 'Redirect' }],
                      })
                    : navigation.reset({
                          index: 0,
                          routes: [{ name: 'Redirect' }],
                      })
            }, 1000)
            return true
        }
        return false
    }

    /* ---------------------------------------------- */
    /* ----Exibe no console as chaves existentes ---- */
    /* ---------------------------------------------- */
    const localKeys = async () => {
        const initialAccess = await AppStorage.getData(
            `${Env.keyPrefix}-primeiro-acesso`,
        )
        const initialUser = await AppStorage.getData(`${Env.keyPrefix}-user`)
        const initialToken = await AppStorage.getData(`${Env.keyPrefix}-token`)
    }

    /* ----------------------------------------------- */
    /* ----Remove as chaves existentes no Storage ---- */
    /* ----------------------------------------------- */
    const removeKeys = async () => {
        // await AppStorage.remove(`${Env.keyPrefix}-user`)
        // await AppStorage.remove(`${Env.keyPrefix}-primeiro-acesso`)
        // await AppStorage.remove(`${Env.keyPrefix}-token`)
        // await AppStorage.remove(`${Env.keyPrefix}-expo-token`)
        // await AppStorage.remove(
        //     `${Env.keyPrefix}-complete-register-${user?.id}`,
        // )
        // await AppStorage.remove(`${Env.keyPrefix}-credit-card-${user?.id}`)
        // await AppStorage.remove(`${Env.keyPrefix}-plans-${user?.id}`)
        // await AppStorage.remove(`${Env.keyPrefix}-phone-auth-${user?.id}`)

        AsyncStorage.clear()
    }

    const getNotification = async () => {
        const getPushNotificationExpo = await getPushToken()

        if (getPushNotificationExpo) {
            setNotificationKey(getPushNotificationExpo.data)
        }

        responseListener.current =
            Notifications.addNotificationResponseReceivedListener(
                (response) => {},
            )

        return () => {
            Notifications.removeNotificationSubscription(
                notificationListener.current,
            )
            Notifications.removeNotificationSubscription(
                responseListener.current,
            )
        }
    }

    const getUpdates = async () => {
        try {
            const update = await Updates.checkForUpdateAsync()

            if (update.isAvailable) {
                await Updates.fetchUpdateAsync()
                Updates.reloadAsync()
            } else {
            }
        } catch (e) {
        }
    }

    const getLocationPermission = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync()

        if (status === 'granted') {
            setLocationPermission(true)
        } else {
            setLocationPermission(true)
        }

        return status === 'granted'
    }

    const getNotificationPermissions = async () => {
        let token
        if (Device.isDevice) {
            const { status: existingStatus } =
                await Notifications.getPermissionsAsync()
            let finalStatus = existingStatus
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync()

                finalStatus = status
            }

            if (finalStatus !== 'granted') {
                return
            }
            token = (await Notifications.getExpoPushTokenAsync()).data
        }
        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            })
        }

        return token
    }

    const getGenders = async () => {
        const genderList = await Endpoints.getGenderList()
        setGenders(genderList)
    }

    const getDocumentTypes = async () => {
        const documentTypesList = await Endpoints.getDocumentTypesList()
        setDocumentTypes(documentTypesList)
    }

    const getAddress = async () => {
        const addresses = await Endpoints.loadAllSavedAddress()

        if (addresses) {
            setAddressList(addresses)

            const defaultAddressItem = addresses.filter(
                (a: any) => a.default === true,
            )

            if (defaultAddressItem.length > 0) {
                setDefaultAddress({ ...defaultAddressItem[0] })
            }
        }
    }

    const getCreditCards = async () => {
        const ccs = await Endpoints.loadAllCreditCards()

        if (ccs) {
            setCreditCardList(ccs)

            const defaultccItem = ccs.filter((a: any) => a.default === true)

            if (defaultccItem.length > 0) {
                setDefaultCreditCard({ ...defaultccItem[0] })
            }
        }
    }

    const getServicesTypes = async () => {
        const typeServices = await Endpoints.loadAllServiceTypes()

        if (typeServices) {
            setServicesType(typeServices)
        }
    }

    /*
     *   EFFECTS
     */

    useEffect(() => {
        getGenders()
        getDocumentTypes()
    }, [])

    /* ------------------------------------------------- */
    /* --------- Verifica atualização do app ----------- */
    /* ------------------------------------------------- */
    useEffect(() => {
        getUpdates()
    }, [])

    /* -------------------------------------------------- */
    /* Verifica se o usuario tem internet ao abrir o app  */
    /* -------------------------------------------------- */
    useEffect(() => {
        getNetworkInfo()
    }, [])

    /* -------------------------------------------------------------------- */
    /* ----Caso usuario seja desconectado da internet apresenta o modal---- */
    /* -------------------------------------------------------------------- */

    useEffect(() => {
        if (connectionStatus === false || null) {
            setShowModal(true)
        } else {
            setShowModal(false)
        }
    }, [connectionStatus])

    useEffect(() => {
        getNotification()
    }, [])

    const loadData = async () => {
        await getUser()
    }

    useEffect(() => {
        loadData()
    }, [])

    useEffect(() => {
        if (!user) {
            return
        }

        getAddress()
        getCreditCards()
        getServicesTypes()
    }, [user])

    // useEffect(() => {
    //     getLocationPermission()
    // }, [])

    const getActiveOrder = async () => {
        const getPendingOrders = await Endpoints.getPendingOrders()

        if (getPendingOrders) {
            setOrders(getPendingOrders)
            setOrderPendingStatus(getPendingOrders[0])
            setOrderBudgetProducts(getPendingOrders[0]?.OrderBudget)

            const reducedValue =
                getPendingOrders[0]?.OrderBudget[0]?.OrderBudgetProduct.reduce(
                    function (total: number, item: any) {
                        return (
                            total + Number(item.quantity) * Number(item.amount)
                        )
                    },
                    0,
                )

            setOrderBudgetValue(reducedValue)
        }
    }

    useEffect(() => {
        // const newSocket = io('ws://192.168.15.26:3000/')
        const newSocket = io(Env.wsURL)
        setSocket(newSocket)
    }, [])

    useEffect(() => {
        if (!socket) {
            return
        }

        socket.on('connect', () => {
        })
    }, [socket])

    useEffect(() => {

        if (!user) {
            return
        }

        if (!socket) {
            return
        }

        if (!orderPendingStatus) {
            return
        }

        const userChannel = `customer/${user.id}`
        const orderChannel = `order/${orderPendingStatus.id}`

        socket.on(userChannel, (data: any) => {
        })

        socket.on(orderChannel, (data: any) => {
            setOrderPendingStatus(data?.order)

            if (
                data.order.status === 'ORDER' ||
                data.order.status === 'REJECT' ||
                data.order.status === 'ACCEPT'
            ) {
                getActiveOrder()
            }

            if (
                data.order.status === 'RATING' ||
                data.order.status === 'RATING_ENDED'
            ) {
                socket.off(orderChannel)
            }
        })
        ;() => {
            socket.off(userChannel)
            socket.off(orderChannel)
        }
    }, [socket, user, orderPendingStatus])

    // useEffect(() => {
    //     if (!orderPendingStatus) {
    //         return
    //     }

    //     const orderChannel = `order/${orderPendingStatus?.id}`
    //     socket.on(orderChannel, (data: any) => {
    //     })

    //     return () => {
    //         socket.off(orderChannel)
    //     }
    // }, [orderPendingStatus])

    // useEffect(() => {
    //     if (!user) {
    //         return
    //     }

    //     const userChannel = `customer/${user?.id}`
    //     socket.on(userChannel, (data) => {
    //     })

    //     return () => {
    //         socket.off(userChannel)
    //     }
    // }, [user])

    return (
        <>
            <AlertErrorsMessage
                visible={showModal}
                handleCancel={() => setShowModal(false)}
            />

            <AlertErrorsMessage
                error
                content="Estamos te redirecionando"
                visible={showModalError}
                handleCancel={() => setShowModalError(false)}
            />

            <DataContext.Provider
                value={{
                    /* ------ */
                    /* States */
                    /* ------ */
                    user,
                    token,
                    netInfo,
                    networkInfo,
                    notificationKey,
                    setNotificationKey,
                    connectionStatus,
                    orders,
                    setOrders,
                    locationPermission,
                    notificationPermission,
                    genders,
                    documentTypes,
                    activePlan,
                    addressList,
                    defaultAddress,
                    creditCardList,
                    defaultCreditCard,
                    servicesType,
                    orderPendingStatus,
                    activeStepOrder,
                    orderAddress,
                    orderServiceTypeSelected,
                    socket,
                    currentLatitude,
                    currentLongitude,
                    scheduledDate,
                    orderBudgetProducts,
                    orderBudgetValue,
                    orderScheduledToday,

                    /* --------- */
                    /* setStates */
                    /* --------- */
                    setUser,
                    setToken,
                    setMainNavigation,
                    setConnectionStatus,
                    setActivePlan,
                    setAddressList,
                    setDefaultAddress,
                    setCreditCardList,
                    setDefaultCreditCard,
                    setServicesType,
                    setOrderPendingStatus,
                    setOrderAddress,
                    setOrderServiceTypeSelected,
                    setActiveStepOrder,
                    setScheduledDate,
                    setOrderBudgetProducts,
                    setOrderBudgetValue,
                    setOrderScheduledToday,

                    /* --------- */
                    /* Functions */
                    /* --------- */

                    removeKeys,
                    logout,
                    getUser,
                    resolveError,
                    localKeys,
                    getLocationPermission,
                    getNotificationPermissions,
                    getGenders,
                    getDocumentTypes,
                    getAddress,
                    getCreditCards,
                    getActiveOrder,
                }}
            >
                {children}
            </DataContext.Provider>
        </>
    )
}
