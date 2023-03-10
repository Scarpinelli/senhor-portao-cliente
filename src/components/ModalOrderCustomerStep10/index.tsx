import React, { useEffect, useState, useRef, useContext } from 'react'

import { Dimensions, Image, ScrollView, ActivityIndicator } from 'react-native'
import AvatarIcon from 'components/AvatarIcon'
import IconFontisto from 'react-native-vector-icons/Fontisto'
import Modal from 'react-native-modal'
import { CLoader, ThemeText, ThemeButton } from 'components'
import LogoGray from 'assets/images/logo-gray.png'
import ThemeButtons from 'components/ThemeButton'
import Endpoints from 'services/endpoints'
import { DataContext } from 'contexts/AppContext'
import { showMessage } from 'react-native-flash-message'
import ManImage from 'assets/images/man.png'
import { Colors } from 'styles'
import * as Progress from 'react-native-progress'
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
    ModalInfoCenter,
    ModalInfo,
    ModalInfoContainer,
    AvatarContainerModal,
    ProgressContainer,
} from './styles'

interface ModalProps {
    visible: boolean
    handleCancelOrder: () => void
}

const { width, height } = Dimensions.get('screen')

const ModalOrderCustomerStep10: React.FC<ModalProps> = ({
    visible,
    handleCancelOrder,
}) => {
    const [loader, setLoader] = useState(false)

    const { orderPendingStatus } = useContext(DataContext)

    return (
        <>
            <CLoader visible={loader} />
            <Modal
                statusBarTranslucent
                isVisible={visible}
                hasBackdrop
                useNativeDriverForBackdrop
                avoidKeyboard
                backdropOpacity={0.2}
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

                {/* <Content> */}

                <Content>
                    <Actions>
                        <Request>
                            <PaddingContainer>
                                <Title>
                                    <AvatarIcon type={1} />
                                    <Info>
                                        <ThemeText black bold>
                                            {orderPendingStatus?.provider?.name}{' '}
                                            est?? realizando o servi??o.
                                        </ThemeText>
                                        <ThemeText small black>
                                            Aguarde a finaliza????o.
                                        </ThemeText>
                                    </Info>
                                </Title>

                                {/* <ActivityIndicator
                                    size="small"
                                    color={Colors.primary}
                                /> */}

                                <ProgressContainer>
                                    <Progress.Bar
                                        // progress={0.3}
                                        width={width - 40}
                                        color={Colors.primary}
                                        indeterminateAnimationDuration={2000}
                                        indeterminate
                                        borderWidth={0}
                                        unfilledColor="#f1f1f1"
                                    />
                                </ProgressContainer>

                                <ThemeButton
                                    primary
                                    onPress={() => handleCancelOrder()}
                                    mt2
                                >
                                    <ThemeText bold>
                                        Cancelar solicita????o
                                    </ThemeText>
                                </ThemeButton>
                            </PaddingContainer>
                        </Request>
                    </Actions>
                </Content>

                {/* <ModalInfoCenter>
                    <ModalInfoContainer>
                        <AvatarContainerModal>
                            <AvatarIcon type={0} />
                        </AvatarContainerModal>
                        <ThemeText h2 black center mb2>
                            Procurando profissionais
                        </ThemeText>
                        <ThemeText black center mb4>
                            Em breve, voc?? receber?? uma notifica????o!
                        </ThemeText>

                        <ActivityIndicator
                            size="small"
                            color={Colors.primary}
                        />
                    </ModalInfoContainer>

                    <ThemeButton
                        primary
                        onPress={() => handleCancelOrder()}
                        mt2
                    >
                        <ThemeText bold>Cancelar solicita????o</ThemeText>
                    </ThemeButton>
                </ModalInfoCenter> */}
            </Modal>
        </>
    )
}

export default ModalOrderCustomerStep10
