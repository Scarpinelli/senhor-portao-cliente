import React, { useContext, useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import { CText } from 'components'
import LogoImageBlack from 'assets/images/logo-black.png'
import ImageLocation from 'assets/images/notifications.png'
import { DataContext } from 'contexts/AppContext'
import AppStorage from 'services/data/AppStorage'
import Endpoints from 'services/endpoints'
import {
    Container,
    ContainerContentSlide1,
    ContainerWidthTextDescription,
    ViewButton,
    Logo,
    ImageTop,
    SkipButtonContainer,
} from './styles'
import * as Env from '../../env'

const NotificationPermisionScreen: React.FC = ({ navigation }: any) => {
    const { getNotificationPermissions } = useContext(DataContext)

    const handleSkipSteps = async () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Redirect' }],
        })
    }

    const getMyToken = async () => {
        return AppStorage.getData(`${Env.keyPrefix}-expo-token`)
    }

    const getPermission = async () => {
        const verifyToken = await getMyToken()

        if (!verifyToken) {
            getNotificationPermissions().then(async (token) => {
                // salva o token
                await AppStorage.storeData(`${Env.keyPrefix}-expo-token`, token)

                // salva o token expo
                await Endpoints.saveDeviceToken(token)

                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Redirect' }],
                })
            })
        }
    }

    useEffect(() => {
        getPermission()
    },[])

    const handlePermission = async () => {
        // const permission = await getNotificationPermissions()


        // const verifyToken = await getMyToken()

        // if (!verifyToken) {
        //     getNotificationPermissions().then(async (token) => {
        //         // salva o token
        //         await AppStorage.storeData(`${Env.keyPrefix}-expo-token`, token)

        //         // salva o token expo
        //         await Endpoints.saveDeviceToken(token)

        //         navigation.reset({
        //             index: 0,
        //             routes: [{ name: 'Redirect' }],
        //         })
        //     })
        // }

        navigation.reset({
            index: 0,
            routes: [{ name: 'Redirect' }],
        })
    }

    // const init = async () => {
    //     const verifyToken = await getMyToken()

    //     if (!verifyToken) {
    //         getNotificationPermissions().then(async (token) => {
    //             // salva o token
    //             await AppStorage.storeData(`${Env.keyPrefix}-expo-token`, token)
    //         })
    //     }
    // }

    // useEffect(() => {
    //     init()
    // }, [])

    return (
        <>
            <ImageTop
                style={{
                    resizeMode: 'contain',
                    height: 400,
                    width: '100%',
                }}
                source={ImageLocation}
            />
            {/* <SkipButtonContainer>
                <TouchableOpacity style={{}} onPress={handleSkipSteps}>
                    <CText black uppercase small mt8>
                        Pular
                    </CText>
                </TouchableOpacity>
            </SkipButtonContainer> */}
            <Container>
                <ContainerContentSlide1>
                    <Logo width={250} height={150} source={LogoImageBlack} />
                    <CText center mt6 black style={{ fontSize: 26 }}>
                        Permitir
                    </CText>
                    <CText
                        // mt10
                        center
                        primary
                        bold
                        style={{ fontSize: 26 }}
                    >
                        Notificações
                    </CText>

                    <ContainerWidthTextDescription>
                        <CText mt2 small muted center>
                            Precisamos lhe enviar notificações.
                        </CText>
                    </ContainerWidthTextDescription>
                </ContainerContentSlide1>
            </Container>
            <ViewButton onPress={() => handlePermission()}>
                <CText style={{}} upppercase>
                    Próximo
                </CText>
            </ViewButton>
        </>
    )
}

export default NotificationPermisionScreen
