import React, { useEffect, useState, useRef, useContext, memo } from 'react'

import { Dimensions, Image, Platform } from 'react-native'
import AvatarIcon from 'components/AvatarIcon'
import IconFontisto from '@expo/vector-icons/Fontisto'
import Modal from 'react-native-modal'
import { CLoader, CText, DefaultModal, ThemeText } from 'components'
import LogoGray from 'assets/images/logo-gray.png'
import ThemeButtons from 'components/ThemeButton'
import Endpoints from 'services/endpoints'
import { DataContext } from 'contexts/AppContext'
import { showMessage } from 'react-native-flash-message'
import DatePicker from 'react-native-date-picker'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'
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
    handleChangeStep: any
    orderPayload: any
    address: any
    banners: any
    handleCancelOrderSolicitation: any
}

const { width, height } = Dimensions.get('screen')

const ModalOrderCustomerStep5: React.FC<ModalProps> = ({
    visible,
    getBanner,
    handleCloseAllModals,
    handleCancelOrder,
    handleCancelOrderSolicitation,
    handleOrderCreated,
    handleResetOrder,
    handleChangeStep,
    orderPayload,
    address,
    banners,
}) => {
    const [loader, setLoader] = useState(false)
    const [date, setDate] = useState(new Date())

    const { orderAddress, resolveError, setScheduledDate, scheduledDate } =
        useContext(DataContext)

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

    const handleChangeSchedule = async (event: any, selectedDate: any) => {
        const currentDate = selectedDate

        const dateSelected = moment(currentDate)
        const today = moment()

        if (moment(dateSelected).isSameOrBefore(today)) {
            showMessage({
                message: 'Data inválida, selecione outra data para agendamento',
                type: 'danger',
                icon: 'danger',
                position: 'bottom',
                hideOnPress: false,
                duration: 2500,
                floating: true,
            })
            return
        }

        setScheduledDate(moment(currentDate).format('YYYY-MM-DD hh:mm:ss'))
    }

    const [modalConfirmSchedule, setModalConfirmSchedule] = useState(false)

    const handleConfirmScheduleOrder = () => {
        if (!scheduledDate) {
            showMessage({
                message: 'Selecione uma data',
                type: 'danger',
                icon: 'danger',
                position: 'bottom',
                hideOnPress: false,
                duration: 2500,
                floating: true,
            })
        }

        setModalConfirmSchedule(true)

    }

    const handleConfirmScheduleOrderSubmit = async () => {
        setModalConfirmSchedule(false)
        handleChangeStep(3)
    }

    return (
        <>
            <CLoader visible={loader} />

            <DefaultModal
                title={`Deseja confirmar o agendamento para ${moment(
                    scheduledDate,
                ).format('DD/MM/YYYY')} às ${moment(scheduledDate).format(
                    'hh:mm',
                )}?`}
                cancel="Fechar"
                textButton="Confirmar"
                visible={modalConfirmSchedule}
                handleCancel={() => {
                    setModalConfirmSchedule(false)
                }}
                handleAction={handleConfirmScheduleOrderSubmit}
            />
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
                                            Agendamento de Visita
                                        </ThemeText>
                                        <ThemeText small black>
                                            Selecione o Dia e a Hora para sua
                                            visita
                                        </ThemeText>
                                    </Info>
                                </Title>
                            </PaddingContainer>

                            <PaddingContainer>
                                {Platform.OS === 'ios' ? (
                                    <>
                                        <DateTimePicker
                                            testID="dateTimePicker"
                                            value={new Date()}
                                            minimumDate={new Date()}
                                            mode="datetime"
                                            display="inline"
                                            themeVariant="light"
                                            onChange={handleChangeSchedule}
                                        />
                                    </>
                                ) : (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={new Date()}
                                        minimumDate={new Date()}
                                        mode="date"
                                        display="default"
                                        onChange={handleChangeSchedule}
                                    />
                                )}

                                <ThemeButtons
                                    secondary
                                    mt4
                                    onPress={() => handleConfirmScheduleOrder()}
                                >
                                    <ThemeText>
                                        Confirmar Data e Hora e Agendar
                                    </ThemeText>
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

export default memo(ModalOrderCustomerStep5)
