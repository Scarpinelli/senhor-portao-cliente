import React, { useEffect, useState, useRef, useContext, memo } from 'react'

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
import { ThemeText, CText, CInput } from 'components'
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
    DragContainer,
    DragButton,
} from './styles'

interface ModalProps {
    visible: boolean
    handleCloseAllModals: () => void
    address: any
    navigation: any
    banners: any
    getBanner: any
    handleSaveOrderPayload: any
    route: any
}

const { width, height } = Dimensions.get('screen')

const ModalOrderCustomerStep1: React.FC<ModalProps> = ({
    visible,
    handleCloseAllModals,
    address: addressParams = null,
    navigation,
    banners,
    getBanner,
    route,
    handleSaveOrderPayload,
}) => {
    const [service, setService] = useState<null | number>(addressParams)
    const [address, setAddress] = useState(null)
    const [loader, setLoader] = useState(false)

    const handleSetService = (id: number) => {
        // setService(id)
        setOrderServiceTypeSelected(id)
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
        orderAddress,
        orderServiceTypeSelected,
        setOrderAddress,
        setOrderServiceTypeSelected,
        activeStepOrder,
        orders,
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
        validateForm,
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
            const dataOrder = {
                customerId: values.customerId,
                typeServiceId: values.typeServiceId,
                serviceDescription: values.serviceDescription,
                customerAddressId: values.customerAddressId,
                customAddress: values.customAddress,
            }

            handleSaveOrderPayload(dataOrder)
            resetForm()
        },
    })

    const resetOrderForm = () => {
        resetForm()
        setOrderAddress(null)
        setOrderServiceTypeSelected(null)
    }


    const handleCleanOrder = () => {
        resetForm()
        setOrderAddress(null)
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
                active={orderServiceTypeSelected === item.id}
            />
        )
    }

    useEffect(() => {
        validateForm()
    }, [activeStepOrder])

    useEffect(() => {
        if (route?.params?.address) {
            // setAddress(route?.params?.address)
            setOrderAddress(route?.params?.address)

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
        } else {
            resetOrderForm()
        }
    }, [route.params])

    useEffect(() => {
        ;() => resetForm()
    }, [])

    // useEffect(() => {
    //     if (orders) {
    //         handleCleanOrder()
    //     }
    // }, [orders])

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
            // onBackdropPress={handleCloseAllModals}r
            // onSwipeComplete={handleCloseAllModals}
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
                <DragContainer>
                    <DragButton />
                </DragContainer>
                <ScrollView
                    nestedScrollEnabled
                    keyboardDismissMode="on-drag"
                    contentContainerStyle={styles.sendControlContainerInner}
                >
                    <Request>
                        <PaddingContainer>
                            <Title>
                                <AvatarIcon type={1} />
                                <Info>
                                    <ThemeText black bold>
                                        Realizar Pedido
                                    </ThemeText>
                                    <ThemeText small black>
                                        Precisa de ajuda? Solicite uma visita a
                                        qualquer momento.
                                    </ThemeText>
                                </Info>
                                {(orderAddress as any)?.street && (
                                    <ClearButton
                                        onPress={() => handleCleanOrder()}
                                    >
                                        <CText small muted>
                                            Limpar
                                        </CText>
                                        <Icon
                                            name="close"
                                            color={Colors.muted}
                                            size={12}
                                        />
                                    </ClearButton>
                                )}
                            </Title>
                        </PaddingContainer>

                        <PaymentContainer>
                            <CallButton
                                onPress={() => {
                                    handleCloseAllModals()
                                    navigation.navigate('SelectAddressOrder')
                                }}
                            >
                                <CText center>
                                    {orderAddress
                                        ? 'Alterar endereço'
                                        : 'Selecionar endereço'}
                                </CText>
                            </CallButton>
                        </PaymentContainer>

                        {orderAddress && (
                            <MyAddressContainer>
                                <ThemeText black mb3>
                                    Endereço selecionado:
                                </ThemeText>
                                {orderAddress ? (
                                    <AddressContainer
                                        onPress={() => {
                                            handleCloseAllModals()
                                            navigation.navigate(
                                                'SelectAddressOrder',
                                            )
                                        }}
                                    >
                                        <AddressMarker>
                                            <IconFontisto
                                                name="map-marker-alt"
                                                size={20}
                                            />
                                        </AddressMarker>
                                        <AddressInfo>
                                            <ThemeText black bold>
                                                {(orderAddress as any)?.alias
                                                    ? (orderAddress as any)
                                                          ?.alias
                                                    : (orderAddress as any)
                                                          ?.street}
                                            </ThemeText>
                                            <ThemeText small black>
                                                {(orderAddress as any)?.street},{' '}
                                                {
                                                    (orderAddress as any)
                                                        ?.streetNumber
                                                }
                                                , CEP{' '}
                                                {(orderAddress as any)?.zipCode}
                                                , {(orderAddress as any)?.city}-
                                                {(orderAddress as any)?.state}
                                            </ThemeText>
                                        </AddressInfo>
                                    </AddressContainer>
                                ) : (
                                    <>
                                        <AddressContainerCall>
                                            <CText black muted>
                                                Você não possui nenhum endereço
                                                selecionado
                                            </CText>
                                        </AddressContainerCall>
                                    </>
                                )}
                            </MyAddressContainer>
                        )}

                        {orderAddress && (
                            <>
                                <ThemeText black mb3 ml4 mt4>
                                    Selecione o serviço:
                                </ThemeText>
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
                                        // paddingTop: 10,
                                    }}
                                />

                                {orderServiceTypeSelected && (
                                    <PaddingContainer>
                                        <CInput
                                            default
                                            mt2
                                            label="Descrição do problema (opcional)"
                                            value={values.serviceDescription}
                                            // style={{ height: 90 }}
                                            onChangeText={handleChange(
                                                'serviceDescription',
                                            )}
                                            // onChangeText={(e: any) => handleGetAddress(e)}
                                            autoCapitalize="none"
                                            mb2
                                            autoCorrect={false}
                                            returnKeyType="next"
                                            keyboardType="default"
                                            enablesReturnKeyAutomatically
                                            // autoCompleteType="email"
                                            errorMessage={
                                                errors.serviceDescription
                                            }
                                            // onSubmitEditing={() => (expMonthRef as any).current.focus()}
                                        />
                                    </PaddingContainer>
                                )}
                            </>
                        )}

                        {orderAddress && (
                            <>
                                <PaymentContainer>
                                    <ThemeText black mb3>
                                        Pagamento:
                                    </ThemeText>
                                    {defaultCreditCard ? (
                                        <PaymentMethodCard
                                            id={defaultCreditCard.id}
                                            brand={defaultCreditCard.brand}
                                            cardNumber={
                                                defaultCreditCard.lastDigits
                                            }
                                            type="credit"
                                            navigation={navigation}
                                            showDelete={false}
                                            onPress={() => {
                                                handleCloseAllModals()
                                                navigation.navigate(
                                                    'MyPaymentMethods',
                                                )
                                            }}
                                            showPrincipal={false}
                                        />
                                    ) : (
                                        <>
                                            <NoItemsContainer>
                                                <InfoContainer>
                                                    <CText black muted>
                                                        Você não possui nenhum
                                                        cartão cadastrado
                                                    </CText>
                                                </InfoContainer>
                                                <NewButton
                                                    onPress={() =>
                                                        navigation.navigate(
                                                            'NewPayementMethod',
                                                        )
                                                    }
                                                >
                                                    <CText muted small>
                                                        Adicionar novo
                                                    </CText>
                                                </NewButton>
                                            </NoItemsContainer>
                                        </>
                                    )}
                                </PaymentContainer>

                                <PaddingContainer>
                                    {/* <CText black>{isValid ? 'S1' : 'N1'}</CText> */}
                                    <ThemeButtons
                                        secondary
                                        mt4
                                        // onPress={() => setStep(1)}
                                        onPress={handleSubmit}
                                        disabled={!isValid && !orderAddress}
                                    >
                                        <ThemeText>Realizar pedido</ThemeText>
                                    </ThemeButtons>
                                </PaddingContainer>
                            </>
                        )}
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
                </ScrollView>
            </Content>
        </Modal>
    )
}

export default memo(ModalOrderCustomerStep1)

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },

    sendControlContainerOuter: {
        // flex: 1,
        // justifyContent: 'space-between',
    },

    sendControlContainerInner: {},
})
