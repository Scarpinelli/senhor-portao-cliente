import React, { useContext, useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import { CText } from 'components'
import LogoImageBlack from 'assets/images/logo-black.png'
import ImageLocation from 'assets/images/location.png'
import { DataContext } from 'contexts/AppContext'
import {
    Container,
    ContainerContentSlide1,
    ContainerWidthTextDescription,
    ViewButton,
    Logo,
    ImageTop,
    SkipButtonContainer,
} from './styles'

const LocationPermissionScreen: React.FC = ({ navigation }: any) => {
    const { getLocationPermission } = useContext(DataContext)

    const handleSkipSteps = async () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Redirect' }],
        })
    }

    const handlePermission = async () => {
        

        navigation.reset({
            index: 0,
            routes: [{ name: 'Redirect' }],
        })
    }

    const getPermission = async () => {
        const permission = await getLocationPermission()
    }

    useEffect(() => {
        getPermission()
    }, [])

    return (
        <>
            <Container>
                <SkipButtonContainer>
                    <TouchableOpacity style={{}} onPress={handleSkipSteps}>
                        <CText black uppercase small mt8>
                            Pular
                        </CText>
                    </TouchableOpacity>
                </SkipButtonContainer>

                <ImageTop
                    style={{
                        resizeMode: 'contain',
                        height: 350,
                        width: '100%',
                    }}
                    source={ImageLocation}
                />
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
                        Localização
                    </CText>

                    <ContainerWidthTextDescription>
                        <CText mt2 small muted center>
                           Precisamos saber sua localização.
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

export default LocationPermissionScreen
