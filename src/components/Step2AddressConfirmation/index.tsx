import React, { useEffect, useState, useRef, useContext } from 'react'

import {
    FlatList,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native'
import AvatarIcon from 'components/AvatarIcon'
import IconFontisto from 'react-native-vector-icons/Fontisto'
import Modal from 'react-native-modal'
import {
    ThemeColors,
    ThemeModal,
    ThemeText,
    ThemeButton,
    CText,
    CLoader,
    CButton,
    CInput,
    LoadingModal,
} from 'components'
import { Ionicons, AntDesign } from '@expo/vector-icons'
import LogoGray from 'assets/images/logo-gray.png'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { Colors } from 'styles'
import { DataContext } from 'contexts/AppContext'
import ServiceCard from 'components/ServiceCard'
import PaymentMethodCard from 'components/PaymentMethodCard'
import ThemeButtons from 'components/ThemeButton'
import { Icon } from 'react-native-elements'
import { showMessage } from 'react-native-flash-message'
import Endpoints from 'services/endpoints'
import {
    BtnCancel,
    ContainerItem,
    Content,
    Header,
    ListItems,
    CountryInfo,
    Title,
    Map,
    ScreenOverlay,
    MenuButton,
    Actions,
    Request,
    Banner,
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
} from './styles'

interface ModalProps {
    visible: boolean
    handleCancel: () => void
    address: any
    navigation: any
    banners: any
    getBanner: any

    route: any
}

const { width, height } = Dimensions.get('screen')

const Step2OpenOrder: React.FC<ModalProps> = ({
    visible,
    handleCancel,
    address: addressParams = null,
    navigation,
    banners,
    getBanner,

    route,
}) => {
    const [service, setService] = useState<null | number>(addressParams)
    const [address, setAddress] = useState(null)
    const [loader, setLoader] = useState(false)

    const handleSetService = (id: number) => {
        setService(id)
        setFieldValue('typeServiceId', id)
    }

    const {
        resolveError,
        defaultAddress,
        defaultCreditCard,
        servicesType,
        user,
        getUser,
        orderPendingStatus,
    } = useContext(DataContext)

    const {
        errors,
        handleSubmit,
        isValid,
        values,
        handleChange,
        handleBlur,
        setFieldValue,
        resetForm,
    } = useFormik({
        initialValues: {
            customerId: user?.id,
            typeServiceId: '',
            serviceDescription: '',
            customerAddressId: '',
            customAddress: '',
        },
        enableReinitialize: true,
        validationSchema: yup.object().shape({
            customerId: yup.number().required('Informe o Customer'),
            typeServiceId: yup
                .number()
                .required('Selecione um tipo de serviço'),
            serviceDescription: yup.string().nullable(),
            customerAddressId: yup.number().nullable(),
            customAddress: yup.string().nullable(),
        }),
        onSubmit: async (_values, { setSubmitting }) => {
            setSubmitting(true)
            setLoader(true)
            setShowLoadingModal(true)

            try {
                const data = await Endpoints.createOrder({
                    customerId: values.customerId,
                    typeServiceId: values.typeServiceId,
                    serviceDescription: values.serviceDescription,
                    customerAddressId: values.customerAddressId,
                    customAddress: values.customAddress,
                })

                // if (data) {
                //     //  Ativa a procura por um profissional
                //     const dataSearch = await Endpoints.orderSetSearch(data?.id)
                // }
            } catch (error) {
                setShowLoadingModal(false)

                let errorMessage = null
                errorMessage =
                    (error as any)?.response?.data?.notificacao
                        ?.mensagemAmigavel || 'Ocorreu um erro, tente novamente'

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
                setSubmitting(false)
                setLoader(false)
            }
        },
    })

    const handleCleanOrder = () => {
        resetForm()
        setAddress(null)
        setService(null)
    }

    const renderItem = ({ item }: any) => {
        return (
            <ServiceCard
                id={item.id}
                name={item.name}
                image={item.image}
                handleSetService={handleSetService}
                active={service === item.id}
            />
        )
    }

    useEffect(() => {
        if (route?.params?.address) {
            setAddress(route?.params?.address)

            if (route?.params?.address?.id) {
                setFieldValue('customerAddressId', route?.params?.address?.id)
                setFieldValue('customAddress', '')
            } else {
                setFieldValue('customerAddressId', '')
                setFieldValue(
                    'customAddress',
                    `${route?.params?.address?.street}, ${route?.params?.address?.streetNumber},  ${route?.params?.address?.city}-${route?.params?.address?.state}, ${route?.params?.address?.neighborhood}, ${route?.params?.address?.zipCode}`,
                )
            }
        }
    }, [route.params])

    return (
        <Modal
            statusBarTranslucent
            isVisible={visible}
            hasBackdrop={false}
            useNativeDriverForBackdrop
            avoidKeyboard
            backdropOpacity={0}
            swipeDirection={['down']}
            coverScreen={false}
            // onBackdropPress={handleCancel}r
            // onSwipeComplete={handleCancel}
            style={{
                justifyContent: 'flex-end',
                margin: 0,
            }}
            deviceHeight={height}
            deviceWidth={width}
            propagateSwipe
            hideModalContentWhileAnimating
            animationIn="slideInUp"
            animationOut="slideOutDown"
        >
            {/* <CLoader visible={loader} /> */}

            <Content>
                <ScrollView
                    nestedScrollEnabled
                    keyboardDismissMode="on-drag"
                    contentContainerStyle={styles.sendControlContainerInner}
                >
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={styles.sendControlContainerOuter}
                        keyboardVerticalOffset={
                            Platform.OS === 'ios' ? -20 : -10
                        }
                    >
                        <Request>
                            <PaddingContainer>
                                <Title>
                                    <AvatarIcon type={1} />
                                    <Info>
                                        <ThemeText black bold>
                                            Confirme o endereço da solicitação
                                        </ThemeText>
                                        <ThemeText small black>
                                            Confira se está tudo certo com a sua
                                            solicitação
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
                                        {(address as any)?.streetNumber}, CEP{' '}
                                        {(address as any)?.zipCode},{' '}
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
                                    <ThemeText>Confirmar localização</ThemeText>
                                </ThemeButtons>

                                <ThemeButtons
                                    primary
                                    mt4
                                    onPress={() => setStep(2)}
                                >
                                    <ThemeText>Alterar localização</ThemeText>
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
                    </KeyboardAvoidingView>
                </ScrollView>
            </Content>
        </Modal>
    )
}

export default Step2OpenOrder

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },

    sendControlContainerOuter: {
        flex: 1,
        justifyContent: 'space-between',
    },

    sendControlContainerInner: {},
})
