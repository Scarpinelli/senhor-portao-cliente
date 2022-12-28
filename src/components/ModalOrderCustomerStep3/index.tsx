import React, { useEffect, useState, useRef, useContext, memo } from 'react'

import { Dimensions, Image, ScrollView } from 'react-native'
import AvatarIcon from 'components/AvatarIcon'
import IconFontisto from 'react-native-vector-icons/Fontisto'
import Modal from 'react-native-modal'
import { CLoader, ThemeText, ThemeButton, DefaultModal } from 'components'
import LogoGray from 'assets/images/logo-gray.png'
import ThemeButtons from 'components/ThemeButton'
import Endpoints from 'services/endpoints'
import { DataContext } from 'contexts/AppContext'
import { showMessage } from 'react-native-flash-message'
import ManImage from 'assets/images/man.png'
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
    ActionsAlert,
    AvatarContainer,
    TitleText,
    Man,
} from './styles'

interface ModalProps {
    visible: boolean
    getBanner: any
    handleCancelOrder: () => void
    handleCancelOrderSolicitation: () => void
    handleChangeStep: any
    handleOrderCreated: any
    orderPayload: any
    banners: any
}

const { width, height } = Dimensions.get('screen')

const ModalOrderCustomerStep3: React.FC<ModalProps> = ({
    visible,
    getBanner,
    handleCancelOrder,
    handleCancelOrderSolicitation,
    handleOrderCreated,
    handleChangeStep,
    orderPayload,
    banners,
}) => {
    const [loader, setLoader] = useState(false)

    const { orderAddress, resolveError, scheduledDate } =
        useContext(DataContext)

    const handleSubmitOrder = async () => {
        setLoader(true)

        try {

            const data = await Endpoints.createOrder(orderPayload)

            if (data) {
                //  Ativa a procura por um profissional
                if (scheduledDate) {
                    const dataSetScheduled = await Endpoints.orderSetScheduled(
                        data?.id,
                        scheduledDate,
                    )

                } else {
                    const dataSearch = await Endpoints.orderSetSearch(data?.id)
                }
                handleOrderCreated(data)
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
                                <Man source={ManImage} resizeMode="contain" />
                            </Title>
                            <ThemeText mb4>
                            Ao solicitar a visita de um técnico do Senhor portão, será
cobrada a TAXA DE VISITA de R$ 79,90. Ao solicitar iremos
procurar o técnico mais próximo de você e encaminhá-lo a
para o seu endereço.
                            </ThemeText>

                            <ThemeButton
                                primary
                                onPress={() => handleSubmitOrder()}
                                mb2
                            >
                                <ThemeText bold>Solicitar</ThemeText>
                            </ThemeButton>

                            <ThemeButton
                                outlined
                                onPress={() => handleCancelOrderSolicitation()}
                            >
                                <ThemeText bold>Cancelar</ThemeText>
                            </ThemeButton>
                        </ScrollView>
                    </ActionsAlert>
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
                </Content>
            </Modal>
        </>
    )
}

export default memo(ModalOrderCustomerStep3)
