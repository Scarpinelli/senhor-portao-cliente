import React, { useEffect, useState, useRef, useContext } from 'react'

import { Dimensions, Image, ScrollView, ActivityIndicator } from 'react-native'
import AvatarIcon from 'components/AvatarIcon'
import IconFontisto from 'react-native-vector-icons/Fontisto'
import Modal from 'react-native-modal'
import { CLoader, ThemeText, ThemeButton, CText } from 'components'
import LogoGray from 'assets/images/logo-gray.png'
import ThemeButtons from 'components/ThemeButton'
import Endpoints from 'services/endpoints'
import { DataContext } from 'contexts/AppContext'
import { showMessage } from 'react-native-flash-message'
import ManImage from 'assets/images/man.png'
import { Colors } from 'styles'
import Icon from '@expo/vector-icons/Ionicons'
import * as Progress from 'react-native-progress'
import Avatar from 'components/Avatar'
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
    UserContainer,
    UserInfo,
    UserRating,
    DescriptionContainer,
    DescriptionImage,
    DescriptionInfo,
} from './styles'

interface ModalProps {
    visible: boolean
    handleCancelOrder: () => void
    distance: any
    duration: any
    banners: any
}

const { width, height } = Dimensions.get('screen')

const ModalOrderCustomerStep6: React.FC<ModalProps> = ({
    visible,
    handleCancelOrder,
    distance,
    duration,
    banners,
}) => {
    const [loader, setLoader] = useState(false)

    const { orderPendingStatus, user } = useContext(DataContext)

    return (
        <>
            <CLoader visible={loader} />
            <Modal
                statusBarTranslucent
                isVisible={visible}
                hasBackdrop={false}
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
                                {/* <AvatarContainerModal>
                                    <AvatarIcon type={0} />
                                </AvatarContainerModal> */}
                                <CText h2 black center mb2>
                                Profissional encontrado!
                                </CText>
                                <CText black center ml2 mr2 muted>
                                    Olá, {user?.name} encontramos um
                                    profissional que irá até você.
                                </CText>

                                <UserContainer>
                                    <Avatar
                                        image={
                                            orderPendingStatus?.provider?.image
                                        }
                                        size={60}
                                    />
                                    <UserInfo>
                                        <CText black>
                                            {orderPendingStatus?.provider?.name}
                                        </CText>
                                        <UserRating>
                                            <CText mr1 black>
                                                {
                                                    orderPendingStatus?.provider
                                                        ?.rating
                                                }
                                            </CText>
                                            <Icon
                                                name="star"
                                                size={12}
                                                color={Colors.primary}
                                            />
                                        </UserRating>
                                    </UserInfo>
                                </UserContainer>
                                <CText black center bold>
                                    {distance} KM
                                </CText>
                                <CText black center mb2>
                                    {duration} min
                                </CText>

                                <ThemeButton
                                    primary
                                    onPress={() => handleCancelOrder()}
                                    mt2
                                >
                                    <ThemeText bold>
                                        Cancelar solicitação
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
                            Em breve, você receberá uma notificação!
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
                        <ThemeText bold>Cancelar solicitação</ThemeText>
                    </ThemeButton>
                </ModalInfoCenter> */}
            </Modal>
        </>
    )
}

export default ModalOrderCustomerStep6
