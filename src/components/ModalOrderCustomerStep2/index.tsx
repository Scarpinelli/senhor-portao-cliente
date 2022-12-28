import React, { useEffect, useState, useRef, useContext } from 'react'

import { Dimensions, Image } from 'react-native'
import AvatarIcon from 'components/AvatarIcon'
import IconFontisto from '@expo/vector-icons/Fontisto'
import Modal from 'react-native-modal'
import { CLoader, ThemeText } from 'components'
import LogoGray from 'assets/images/logo-gray.png'
import ThemeButtons from 'components/ThemeButton'
import Endpoints from 'services/endpoints'
import { DataContext } from 'contexts/AppContext'
import { showMessage } from 'react-native-flash-message'
import {
    Content,
    Title,
    Actions,
    Request,
    Banner,
    Info,
    PromoLogo,
    PaddingContainer,
    AddressContainer,
    AddressMarker,
    AddressInfo,
    BannerContainer,
} from './styles'

interface ModalProps {
    visible: boolean
    getBanner: any
    handleCloseAllModals: () => void
    handleCancelOrder: () => void
    handleOrderCreated: any
    handleResetOrder: () => void
    handleCancelOrderSolicitation: () => void
    handleChangeStep: any
    orderPayload: any
    address: any
    banners: any
}

const { width, height } = Dimensions.get('screen')

const ModalOrderCustomerStep2: React.FC<ModalProps> = ({
    visible,
    getBanner,
    handleCloseAllModals,
    handleCancelOrder,
    handleOrderCreated,
    handleResetOrder,
    handleChangeStep,
    orderPayload,
    address,
    banners,
    handleCancelOrderSolicitation,
}) => {
    const [loader, setLoader] = useState(false)

    const { orderAddress, resolveError } = useContext(DataContext)

    const handleSubmitOrder = async () => {
        setLoader(true)

        try {
            const data = await Endpoints.createOrder(orderPayload)

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
                    <Actions>
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
                                        {(orderAddress as any)?.alias
                                            ? (orderAddress as any)?.alias
                                            : (orderAddress as any)?.street}
                                    </ThemeText>
                                    <ThemeText small black>
                                        {(orderAddress as any)?.street},{' '}
                                        {(orderAddress as any)?.streetNumber},
                                        CEP {(orderAddress as any)?.zipCode},{' '}
                                        {(orderAddress as any)?.city}-
                                        {(orderAddress as any)?.state}
                                    </ThemeText>
                                </AddressInfo>
                            </AddressContainer>

                            <PaddingContainer>
                                <ThemeButtons
                                    secondary
                                    mt4
                                    onPress={() => handleChangeStep(3)}
                                >
                                    <ThemeText>
                                        Confirmar localização e solicitar
                                    </ThemeText>
                                </ThemeButtons>

                                <ThemeButtons
                                    secondary
                                    mt2
                                    mb2
                                    onPress={() => handleChangeStep(5)}
                                >
                                    <ThemeText>Agendar Visita</ThemeText>
                                </ThemeButtons>

                                <ThemeButtons
                                    primary
                                    mt2
                                    onPress={() => handleResetOrder()}
                                >
                                    <ThemeText>Alterar localização</ThemeText>
                                </ThemeButtons>

                                <ThemeButtons
                                    primary
                                    mt4
                                    onPress={() =>
                                        handleCancelOrderSolicitation()
                                    }
                                >
                                    <ThemeText>Cancelar solicitação</ThemeText>
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
                </Content>
            </Modal>
        </>
    )
}

export default ModalOrderCustomerStep2
