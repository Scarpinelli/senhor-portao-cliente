import React, { useState, useEffect, useContext, useRef } from 'react'
import Icon from '@expo/vector-icons/FontAwesome'
import IconFontisto from '@expo/vector-icons/Fontisto'
import { Switch } from 'react-native-switch'
import { DataContext } from 'contexts/AppContext'
import Endpoints from 'services/endpoints'
import { showMessage } from 'react-native-flash-message'
import moment from 'moment'
import { Entypo, EvilIcons, Feather, Fontisto } from '@expo/vector-icons'
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator'
import * as ImagePicker from 'expo-image-picker'
import ActionSheet from 'react-native-actionsheet'
import { Alert, Image } from 'react-native'
import { Colors } from 'styles'
import NoImage from 'assets/images/no-image.jpg'

import ItemAccount from 'components/ItemAccount'
import { CText, ThemeColors, CLoader, CInput } from '../../components'

import {
    Container,
    UserContainer,
    UserInfo,
    UserRating,
    MyPlaces,
    AddressContainer,
    AddressMarker,
    AddressInfo,
    Data,
    Security,
    Info,
    AvatarContainer,
    ImageUserContainer,
    ImageUser,
    AvatarActions,
    ChangeImage,
    RemoveImage,
    PaddingContainer,
    Remove,
    Principal,
    MyPlacesTitle,
    NewAddressButton,
    NotificationsContainer, NotificationInfo, NotificationAction
} from './styles'
import * as Env from '../../env'

import Avatar from '../../components/Avatar'

const MyAccountScreen: React.FC = ({ navigation }: any) => {
    const [loader, setLoader] = useState(false)
    const image = { uri: 'https://place-hold.it/300x500/666' }

    const {
        user,
        resolveError,
        getUser,
        addressList,
        getAddress,
        getCreditCards,
    } = useContext(DataContext)

    const [secuity, setSecurity] = useState(false)

    const [orders, setOrders] = useState([])

    const loadData = async () => {
        setLoader(true)
        try {
            const data = await Endpoints.loadAllOrders()

            if (data) {
                setOrders(data)
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

    useEffect(() => {
        loadData()
    }, [])

    const handleRemoveImage = async () => {
        Alert.alert('Deseja remover a imagem?', '', [
            {
                text: 'Cancelar',
            },
            {
                text: 'Confirmar',
                onPress: () => handleRemoveImageSubmit(),
            },
        ])
    }

    const handleRemoveImageSubmit = async () => {
        try {
            const removeAvatar = await Endpoints.saveImage({
                image: null,
            })

            if (removeAvatar) {
                showMessage({
                    message: 'Imagem removida com sucesso',
                    type: 'success',
                    icon: 'success',
                    position: 'bottom',
                })

                getUser()
            }
        } catch (e) {
            
        }
    }

    const openImagePickerAsync = async () => {
        const permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync()

        if (permissionResult.granted === false) {
            Alert.alert('É necessária permissão para acessar a câmera !')
            return
        }

        const options = {
            mediaTypes: 'Images',
            allowsEditing: true,
            aspect: [1, 1],
        }

        await ImagePicker.launchImageLibraryAsync(
            options as ImagePicker.ImagePickerOptions,
        )
            .then((imagePicker: any) => {
                if (imagePicker.cancelled === false) {
                    handleChangeImageProfile(imagePicker?.uri)
                }
            })
            .catch((e) => {})
    }

    const openCameraAsync = async () => {
        const permissionResult =
            await ImagePicker.requestCameraPermissionsAsync()

        if (permissionResult.granted === false) {
            Alert.alert('É necessária permissão para acessar a câmera !')
            return
        }

        const options = {
            mediaTypes: 'Images',
            allowsEditing: true,
            aspect: [1, 1],
        }

        await ImagePicker.launchCameraAsync(options as any)
            .then((imagePicker: any) => {
                // handleChangeImageProfile(image),

                if (imagePicker.cancelled === false) {
                    handleChangeImageProfile(imagePicker?.uri)
                }
            })
            .catch((e) => {})
    }

    const base64ToBlob = async (encoded: any) => {
        // const url = `data:image/jpeg;base64,${encoded}`
        // const res = await fetch(url)
        // const blobImage = await res?.blob()

        // fetch(url).then((response) => response.blob())

        // return blobImage

        const fetchAsBlob = (url: any) =>
            fetch(url).then((response) => response.blob())
    }

    const handleChangeImageProfile = async (imageManip: any) => {
        setLoader(true)
        const manipResult = await manipulateAsync(
            imageManip,
            [
                {
                    resize: {
                        width: 300,
                    },
                },
            ],
            { compress: 1, base64: false, format: SaveFormat.JPEG },
        )

        try {
            const data = new FormData()

            data.append('image', {
                name: 'image.jpg',
                uri: manipResult.uri, // File path
                type: 'image/jpg',
            })

            const updateAvatar = await Endpoints.saveImage(data)

            if (updateAvatar) {
                showMessage({
                    message: 'Imagem alterada com sucesso',
                    type: 'success',
                    icon: 'danger',
                    position: 'bottom',
                    hideOnPress: false,
                    duration: 2500,
                    floating: true,
                })

                await getUser()
            }
        } catch (e) {
            
        } finally {
            setLoader(false)
        }
    }

    const actionSheetPhoto = useRef()

    const handlePrincipalAddress = async (id: number) => {
        setLoader(true)

        try {
            const data = await Endpoints.updateAddressPrincipal(id)

            if (data) {
                await getUser()
                await getCreditCards()
                await loadData()
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

    const handleRemoveAddress = (id: number) => {
        Alert.alert('Deseja remover esse endereço', undefined, [
            {
                text: 'Cancelar',
                // onPress: () => {},
                style: 'cancel',
            },
            { text: 'Remover', onPress: () => handleDeleteAddress(id) },
        ])
    }

    const handleDeleteAddress = async (id: number) => {
        setLoader(true)

        try {
            const data = await Endpoints.removeAddress(id)

            if (data) {
                showMessage({
                    message: 'Removido com sucesso',
                    type: 'success',
                    icon: 'success',
                    position: 'bottom',
                    hideOnPress: false,
                    duration: 4000,
                    floating: true,
                })

                // const newAddressList = addressList.filter(
                //     (address: any) => address?.id !== id,
                // )
                // setAddressList(newAddressList)

                await getAddress()

                await getUser()
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

    const [receiveNotifications, setReceiveNotifications] = useState(false)


    const handleReceiveNotifications = async (e: any) => {
        try {

            setReceiveNotifications(e)
            const data = await Endpoints.updateUser({
                receive_notification: e ? 1 : 0
            })

            if (data) {
                showMessage({
                    message: 'Salvo com sucesso',
                    type: 'success',
                    icon: 'success',
                    position: 'bottom',
                    hideOnPress: false,
                    duration: 4000,
                    floating: true,
                })
                // setReceiveNotifications(e)
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
    }


    return (
        <>
            <CLoader visible={loader} />
            <Container>
                <AvatarContainer>
                    <ImageUserContainer
                        onPress={() =>
                            user?.image
                                ? handleRemoveImage()
                                : (actionSheetPhoto as any)?.current?.show()
                        }
                    >
                        {user?.image ? (
                            <Image
                                source={{ uri: user?.image }}
                                style={{
                                    width: 140,
                                    height: 140,
                                    borderRadius: 140,
                                    overflow: 'hidden',
                                }}
                            />
                        ) : (
                            <Image
                                source={NoImage}
                                style={{
                                    width: 140,
                                    height: 140,
                                    borderRadius: 140,
                                    overflow: 'hidden',
                                }}
                            />
                        )}
                        {user?.photoUrl ? (
                            <RemoveImage onPress={() => handleRemoveImage()}>
                                <Feather
                                    name="trash"
                                    size={20}
                                    color={Colors.white}
                                />
                            </RemoveImage>
                        ) : (
                            <ChangeImage
                                onPress={() =>
                                    (actionSheetPhoto as any).current.show()
                                }
                            >
                                <Entypo
                                    name="image"
                                    size={20}
                                    color={Colors.white}
                                />
                            </ChangeImage>
                        )}
                    </ImageUserContainer>
                </AvatarContainer>
                <MyPlaces>
                    <MyPlacesTitle>
                        <CText bold mt4 mb2 black>
                            Meus locais
                        </CText>

                        <NewAddressButton
                            onPress={() => navigation.navigate('SelectAddress')}
                        >
                            <CText muted small>
                                Adicionar novo
                            </CText>
                        </NewAddressButton>
                    </MyPlacesTitle>

                    {addressList?.length > 0 ? (
                        <>
                            {addressList.map((address: any, index: number) => {
                                return (
                                    <AddressContainer key={index}>
                                        <AddressMarker>
                                            <IconFontisto
                                                name="map-marker-alt"
                                                size={20}
                                            />
                                        </AddressMarker>
                                        <AddressInfo>
                                            <CText black bold>
                                                {address?.alias
                                                    ? address?.alias
                                                    : address?.street}
                                            </CText>
                                            <CText small black>
                                                {address.street},{' '}
                                                {address.streetNumber},{' '}
                                                {address.complement}{' '}
                                                {address.neighborhood} -{' '}
                                                {address.state}, {address.city}{' '}
                                                - {address.zipCode}
                                            </CText>
                                        </AddressInfo>
                                        <Remove
                                            onPress={() =>
                                                handleRemoveAddress(address?.id)
                                            }
                                        >
                                            <Icon name="trash" size={12} />
                                        </Remove>
                                        <Principal
                                            // principal={principal}
                                            onPress={() =>
                                                handlePrincipalAddress(
                                                    address?.id,
                                                )
                                            }
                                        >
                                            {address?.default ? (
                                                <Icon
                                                    name="star"
                                                    color={Colors.success}
                                                    size={14}
                                                />
                                            ) : (
                                                <Icon
                                                    name="star-o"
                                                    color={Colors.muted}
                                                    size={14}
                                                />
                                            )}
                                        </Principal>
                                    </AddressContainer>
                                )
                            })}
                        </>
                    ) : (
                        <>
                            <CText black ml4 mb4 muted>
                                Você não possui locais salvos
                            </CText>
                        </>
                    )}
                </MyPlaces>
                <UserContainer>
                    <UserInfo>
                        <CText black>{user?.name}</CText>
                        <UserRating>
                            <CText mr1 black>
                                {user?.rating}
                            </CText>
                            <Icon
                                name="star"
                                size={12}
                                color={ThemeColors.primary}
                            />
                        </UserRating>
                    </UserInfo>
                </UserContainer>

                <ItemAccount
                    title="E-mail"
                    descriptionField={`${user?.email}`}
                    // onPress={() =>
                    //     navigation.navigate('UserDataDetails', {
                    //         nameScreen: 'phone',
                    //     })
                    // }
                />

                <ItemAccount
                    title="Telefone"
                    descriptionField={`+${user?.phoneCountryCode} ${user?.phoneAreaCode} ${user?.phoneNumber}`}
                    // onPress={() =>
                    //     navigation.navigate('UserDataDetails', {
                    //         nameScreen: 'phone',
                    //     })
                    // }
                />

                <ItemAccount
                    title="Número de solicitações"
                    descriptionField={`${orders?.length}`}
                />

                <ItemAccount
                    title="Data de cadastro"
                    descriptionField={moment(user?.createdAt).format(
                        'DD/MM/YYYY',
                    )}
                />

                <ItemAccount
                    title="Meus Documentos"
                    alert={!user?.document_image}
                    descriptionField="Meus documentos cadastrados"
                    onPress={() => navigation.navigate('MyDocuments')}
                />

<NotificationsContainer>
                    <NotificationInfo>
                    <CText black bold>Receber notificações?</CText>
                    <CText default smaller>
                        Selecione aqui se deseja receber as notificações do Senhor portão
                    </CText>
                    </NotificationInfo>
                    <NotificationAction>
                        <Switch
                            value={receiveNotifications}
                            onValueChange={(val) => {
                                // setReceiveCalls(val)
                                handleReceiveNotifications(val)
                            }}
                            disabled={false}
                            activeText="On"
                            inActiveText="Off"
                            circleSize={20}
                            barHeight={20}
                            circleBorderWidth={0}
                            backgroundActive="green"
                            backgroundInactive="gray"
                            circleActiveColor="#30a566"
                            circleInActiveColor="#dacdcd"
                            changeValueImmediately
                            // renderInsideCircle={() => <CustomComponent />} // custom component to render inside the Switch circle (Text, Image, etc.)
                            // changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
                            innerCircleStyle={{
                                alignItems: 'center',
                                justifyContent: 'center',
                            }} // style for inner animated circle for what you (may) be rendering inside the circle
                            outerCircleStyle={{}} // style for outer animated circle
                            renderActiveText={false}
                            renderInActiveText={false}
                            switchLeftPx={2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
                            switchRightPx={2} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
                            switchWidthMultiplier={2} // multipled by the `circleSize` prop to calculate total width of the Switch
                            switchBorderRadius={30} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
                        />
                    </NotificationAction>
                </NotificationsContainer>

                {/* <Data>
                    <Security>
                        <Info>
                            <CText black bold mt5>
                                Segurança
                            </CText>
                            <CText black>
                                Sunt non mollit excepteur laborum minim laboris.
                            </CText>
                        </Info>
                        <Switch
                            value={secuity}
                            onValueChange={(val) => setSecurity(val)}
                            disabled={false}
                            activeText="On"
                            inActiveText="Off"
                            circleSize={20}
                            barHeight={20}
                            circleBorderWidth={0}
                            backgroundActive="green"
                            backgroundInactive="gray"
                            circleActiveColor="#30a566"
                            circleInActiveColor="#dacdcd"
                            changeValueImmediately
                            // renderInsideCircle={() => <CustomComponent />} // custom component to render inside the Switch circle (Text, Image, etc.)
                            // changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
                            innerCircleStyle={{
                                alignItems: 'center',
                                justifyContent: 'center',
                            }} // style for inner animated circle for what you (may) be rendering inside the circle
                            outerCircleStyle={{}} // style for outer animated circle
                            renderActiveText={false}
                            renderInActiveText={false}
                            switchLeftPx={2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
                            switchRightPx={2} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
                            switchWidthMultiplier={2} // multipled by the `circleSize` prop to calculate total width of the Switch
                            switchBorderRadius={30} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
                        />
                    </Security>
                </Data> */}
            </Container>
            <ActionSheet
                ref={actionSheetPhoto as any}
                title="Selecionar imagem"
                options={['Imagem da Galeria', 'Imagem da Câmera', 'Cancelar']}
                cancelButtonIndex={2}
                destructiveButtonIndex={2}
                onPress={(index: any) => {
                    if (index === 0) {
                        openImagePickerAsync()
                    } else if (index === 1) {
                        openCameraAsync()
                    }
                }}
            />
        </>
    )
}

export default MyAccountScreen
