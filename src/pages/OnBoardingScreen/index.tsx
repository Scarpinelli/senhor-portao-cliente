import React, { useState, useRef, useEffect } from 'react'
import { View, TouchableOpacity, ActivityIndicator } from 'react-native'
import { CLoader, CText, CButton } from 'components'
import { useNavigation } from '@react-navigation/native'
import { Colors } from 'styles'
import moment from 'moment'
import AppStorage from 'services/data/AppStorage'
import LogoImage from 'assets/images/logo.png'
import LogoImageBlack from 'assets/images/logo-black.png'
import { FontAwesome } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import {
    Container,
    ContainerContentSlide1,
    ContainerSeparator,
    ContainerWidthTextDescription,
    Separator,
    Slide1,
    SwipperPersonalized,
    ContainerContent,
    Slide2,
    ContainerContentSlide2,
    Slide3,
    ContainerContentSlide3,
    ContainerTexts,
    ViewButton,
    SeparatorVertical,
    Slide4,
    ContainerContentSlide4,
    ContainerActivity,
    TouchableNext,
    Logo,
} from './style'
import * as Env from '../../env'

const OnBoardingScreen: React.FC = () => {
    const navigation = useNavigation()

    /*
     *   CONTEXT
     */

    /*
     *   REFS
     */
    const refSwiper = useRef(null)

    /*
     *   STATES
     */
    const [loading, setLoading] = useState(false)
    const [showButtonForward, setShowButtonForward] = useState(true)
    const [index, setIndex] = useState(0)

    /*
     *   HOOKS
     */

    /*
     *   LAYOUT
     */

    /*
     *   FORMIK
     */

    /*
     *   FUNCTIONS
     */

    /* Se o usuario passar da primeira  tela o skip desaparece */
    const handleSkipSteps = async () => {
        const firstAccess = moment()
        await AppStorage.storeData(
            `${Env.keyPrefix}-primeiro-acesso`,
            firstAccess.format('DD/MM/YYYY HH:MM'),
        )
        navigation.reset({
            index: 0,
            routes: [{ name: 'Redirect' }],
        })
    }

    const handleNextScreen = async () => {
        /* ----------------------------- */
        /* Save the first access of user */
        /* ----------------------------- */

        const firstAccess = moment()

        await AppStorage.storeData(
            `${Env.keyPrefix}-primeiro-acesso`,
            firstAccess.format('DD/MM/YYYY HH:MM'),
        )

        setTimeout(() => {
            navigation.reset({
                routes: [{ name: 'Auth' }],
            })
        }, 3000)
    }

    /*
     *   EFFECTS
     */

    useEffect(() => {
        index + 1 === 3 && handleNextScreen()
    }, [index])

    return (
        <>
            <StatusBar
                translucent
                backgroundColor="transparent"
                style={index + 1 === 3 ? 'light' : 'dark'}
            />

            <CLoader visible={loading} />

            <Container>
                <SwipperPersonalized
                    ref={refSwiper}
                    showsButtons
                    loop={false}
                    paginationStyle={{
                        display: 'none',
                    }}
                    pagingEnabled
                    showsPagination={false}
                    prevButton={<View style={{ display: 'none' }} />}
                    buttonWrapperStyle={{
                        flexDirection: 'column',
                        paddingBottom: 20,
                    }}
                    index={index}
                    onIndexChanged={(idx: number) => setIndex(idx)}
                    nextButton={
                        <ViewButton bgButton={index + 1 === 3 && Colors.white}>
                            <CText
                                style={{
                                    color:
                                        index + 1 === 3
                                            ? Colors.black
                                            : Colors.white,
                                }}
                                upppercase
                            >
                                Próximo
                            </CText>
                        </ViewButton>
                    }
                >
                    <Slide1
                        source={require('assets/images/onboarding/slide-01.png')}
                    >
                        {showButtonForward && (
                            <TouchableOpacity
                                style={{
                                    alignItems: 'flex-end',
                                    margin: 20,
                                }}
                                onPress={handleSkipSteps}
                            >
                                <CText ml2 uppercase small mt8>
                                    Pular
                                </CText>
                            </TouchableOpacity>
                        )}
                        <ContainerContentSlide1>
                            <ContainerContent>
                                <View>
                                    <Logo
                                        width={250}
                                        height={150}
                                        source={LogoImage}
                                    />
                                    <CText
                                        // mt10

                                        mt4
                                        style={{ fontSize: 20 }}
                                    >
                                        Precisa de ajuda?
                                    </CText>
                                </View>
                                <ContainerWidthTextDescription>
                                    <CText mt2 small>
                                    Manutenção e suporte para o seu portão é no app do Senhor Portão.
                                    </CText>
                                </ContainerWidthTextDescription>
                                <ContainerSeparator>
                                    <Separator />
                                    <FontAwesome
                                        name="circle"
                                        size={8}
                                        color={Colors.checkOnBoarding}
                                        style={{ marginHorizontal: 7 }}
                                    />
                                    <FontAwesome
                                        name="circle"
                                        size={8}
                                        color={Colors.checkOnBoarding}
                                    />
                                </ContainerSeparator>
                            </ContainerContent>
                        </ContainerContentSlide1>
                    </Slide1>

                    <Slide2
                        source={require('assets/images/onboarding/slide-02.png')}
                    >
                        {showButtonForward && (
                            <TouchableOpacity
                                style={{
                                    alignItems: 'flex-end',
                                    margin: 20,
                                }}
                                onPress={handleSkipSteps}
                            >
                                <CText ml2 uppercase small mt8>
                                    Pular
                                </CText>
                            </TouchableOpacity>
                        )}
                        <ContainerContentSlide2>
                            <View style={{ flex: 1 }} />

                            <CText white h2 mb3>
                            Com uma equipe de profissionais experientes, o Senhor Portão funciona 24h para te atender. 
                            </CText>

                            {/* <CText white small mb3>
                                Nossa equipe de profissionais qualificados vai
                                até o local e realiza o reparo sem dificuldades.
                            </CText> */}
                            <ContainerWidthTextDescription>
                                <FontAwesome
                                    name="circle"
                                    size={8}
                                    color={Colors.checkOnBoarding}
                                    style={{ marginHorizontal: 7 }}
                                />

                                <Separator slideTwo />
                                <FontAwesome
                                    name="circle"
                                    size={8}
                                    color={Colors.checkOnBoarding}
                                    style={{ marginHorizontal: 7 }}
                                />
                            </ContainerWidthTextDescription>
                            <SeparatorVertical />
                        </ContainerContentSlide2>
                    </Slide2>

                    {/* <Slide3
                        source={require('assets/images/onboarding/slide-03.png')}
                    >
                        {showButtonForward && (
                            <TouchableOpacity
                                style={{
                                    alignItems: 'flex-end',
                                    margin: 20,
                                }}
                                onPress={handleSkipSteps}
                            >
                                <CText ml2 uppercase small white mt8>
                                    Pular
                                </CText>
                            </TouchableOpacity>
                        )}
                        <ContainerContentSlide3>
                            <View>
                                <ContainerTexts>
                                
                                    <CText white h2 mb3>
                                        Utilize nosso APP, e não tenha mais
                                        preocupações com seu portão.
                                    </CText>
                               
                                </ContainerTexts>
                                <ContainerSeparator>
                                    <FontAwesome
                                        name="circle"
                                        size={8}
                                        color={Colors.checkOnBoarding}
                                        style={{ marginHorizontal: 7 }}
                                    />
                                    <FontAwesome
                                        name="circle"
                                        size={8}
                                        color={Colors.checkOnBoarding}
                                        style={{ marginHorizontal: 7 }}
                                    />
                                    <Separator />
                                </ContainerSeparator>
                            </View>
                        </ContainerContentSlide3>
                    </Slide3> */}

                    <Slide4
                        source={require('assets/images/onboarding/slide-04.png')}
                    >
                        <ContainerContentSlide4>
                            <Logo
                                width={250}
                                height={150}
                                source={LogoImageBlack}
                            />

                            <CText mt4 black center big>
                                {' '}
                                Tudo pronto
                            </CText>
                            <CText primary h2 bold center>
                                {' '}
                                Vamos começar !
                            </CText>

                            <ContainerActivity>
                                <ActivityIndicator
                                    size="small"
                                    color={Colors.loadingColor}
                                />
                            </ContainerActivity>
                        </ContainerContentSlide4>
                    </Slide4>
                </SwipperPersonalized>
            </Container>
        </>
    )
}

export default OnBoardingScreen
