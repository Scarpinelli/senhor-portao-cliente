import React, { useEffect, useState, useRef } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Image,
} from 'react-native'
import { useNavigation, StackActions } from '@react-navigation/native'
import Swiper from 'react-native-swiper'
import Icon from '@expo/vector-icons/Entypo'
import moment from 'moment'

import { ThemeColors, CText, ThemeButton } from 'components'
import { SafeAreaView } from 'react-native-safe-area-context'
import LogoImage from 'assets/images/logo.png'

import LogoIcon1 from 'assets/images/logo-icon-variation-1.png'
import LogoIcon2 from 'assets/images/logo-icon-variation-2.png'

import { SvgCssUri } from 'react-native-svg'
import AppStorage from 'services/data/AppStorage'
import {
    Slide,
    SlideContainer,
    SlideAction,
    SlideInfo,
    Logo,
    Icon1,
    Icon2,
    Icon3,
    Icon4,
    ImageIcon1,
} from './styles'
import * as Env from '../../env'

const WelcomeScreen: React.FC = ({ navigation }: any) => {
    const [swiperIndex, setSwiperIndex] = useState(0)

    const [showButtonForward, setShowButtonForward] = useState(true)

    const refSwiper = useRef(null)

    const handleNavigate = () => {
        navigation.dispatch(StackActions.replace('Auth'))
    }

    const handleUpdateIndex = (index: number) => {
        if (index === 2) {
            setShowButtonForward(false)
        } else {
            setShowButtonForward(true)
        }
    }

    const handleSkipSteps = async () => {
        await AppStorage.storeData(
            `${Env.keyPrefix}-primeiro-acesso`,
            moment().format('DD/MM/YYYY HH:MM'),
        )
        navigation.reset({
            index: 0,
            routes: [{ name: 'Redirect' }],
        })
    }

    return (
        <>
            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle="light-content"
            />
            {showButtonForward && (
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        bottom: 20,
                        right: 20,
                        zIndex: 10,
                        paddingTop: 50,
                        paddingLeft: 50,
                    }}
                    onPress={() => (refSwiper as any)?.current?.scrollBy(1)}
                >
                    <Icon
                        name="chevron-thin-right"
                        size={20}
                        color={ThemeColors.white}
                    />
                </TouchableOpacity>
            )}

            {showButtonForward && (
                <TouchableOpacity
                    onPress={() => handleSkipSteps()}
                    style={{
                        position: 'absolute',
                        top: 20,
                        right: 20,
                        zIndex: 10,
                        paddingTop: 50,
                        paddingLeft: 50,
                    }}
                >
                    <CText small bold>
                        Pular
                    </CText>
                </TouchableOpacity>
            )}

            <Swiper
                onIndexChanged={(index) => handleUpdateIndex(index)}
                index={0}
                ref={refSwiper}
                autoplay
                autoplayTimeout={50}
                loop={false}
                dot={
                    <View
                        style={{
                            backgroundColor: `${ThemeColors.primary}40`,
                            width: 8,
                            height: 8,
                            borderRadius: 4,
                            marginLeft: 10,
                            marginRight: 10,
                            marginTop: 3,
                            marginBottom: 3,
                        }}
                    />
                }
                activeDot={
                    <View
                        style={{
                            backgroundColor: `${ThemeColors.primary}`,
                            width: 8,
                            height: 8,
                            borderRadius: 8,
                            marginLeft: 10,
                            marginRight: 10,
                            marginTop: 3,
                            marginBottom: 3,
                        }}
                    />
                }
            >
                <Slide>
                    <SafeAreaView>
                        <SlideContainer>
                            <SlideInfo>
                                <Icon1>
                                    <ImageIcon1
                                        source={LogoIcon1}
                                        resizeMode="contain"
                                    />
                                </Icon1>

                                <Icon2>
                                    <ImageIcon1
                                        source={LogoIcon2}
                                        resizeMode="contain"
                                    />
                                </Icon2>

                                <Icon3>
                                    <ImageIcon1
                                        source={LogoIcon1}
                                        resizeMode="contain"
                                    />
                                </Icon3>
                                <Icon4>
                                    <ImageIcon1
                                        source={LogoIcon2}
                                        resizeMode="contain"
                                    />
                                </Icon4>
                                <Logo
                                    width={250}
                                    height={150}
                                    source={LogoImage}
                                />
                            </SlideInfo>
                            <SlideAction>
                                <CText h1 mb2>
                                    Estamos sempre prontos!
                                </CText>
                                <CText mb6>
                                    Dolore anim eiusmod magna ad cupidatat qui
                                    culpa. Elit est ex et enim qui pariatur
                                    adipisicing culpa. Nisi reprehenderit velit
                                    magna esse Lorem pariatur. Anim excepteur
                                    est ut fugiat excepteur nisi non elit quis
                                    commodo excepteur proident.
                                </CText>
                            </SlideAction>
                        </SlideContainer>
                    </SafeAreaView>
                </Slide>

                <Slide>
                    <SafeAreaView>
                        <SlideContainer>
                            <SlideInfo>
                                <Icon1>
                                    <ImageIcon1
                                        source={LogoIcon1}
                                        resizeMode="contain"
                                    />
                                </Icon1>

                                <Icon2>
                                    <ImageIcon1
                                        source={LogoIcon2}
                                        resizeMode="contain"
                                    />
                                </Icon2>

                                <Icon3>
                                    <ImageIcon1
                                        source={LogoIcon1}
                                        resizeMode="contain"
                                    />
                                </Icon3>
                                <Icon4>
                                    <ImageIcon1
                                        source={LogoIcon2}
                                        resizeMode="contain"
                                    />
                                </Icon4>
                                <Logo
                                    width={250}
                                    height={150}
                                    source={LogoImage}
                                />
                            </SlideInfo>
                            <SlideAction>
                                <CText h1 mb2>
                                    Estamos sempre prontos!
                                </CText>
                                <CText mb6>
                                    Dolore anim eiusmod magna ad cupidatat qui
                                    culpa. Elit est ex et enim qui pariatur
                                    adipisicing culpa. Nisi reprehenderit velit
                                    magna esse Lorem pariatur. Anim excepteur
                                    est ut fugiat excepteur nisi non elit quis
                                    commodo excepteur proident.
                                </CText>
                            </SlideAction>
                        </SlideContainer>
                    </SafeAreaView>
                </Slide>

                <Slide>
                    <SafeAreaView>
                        <SlideContainer>
                            <SlideInfo>
                                <Icon1>
                                    <ImageIcon1
                                        source={LogoIcon1}
                                        resizeMode="contain"
                                    />
                                </Icon1>

                                <Icon2>
                                    <ImageIcon1
                                        source={LogoIcon2}
                                        resizeMode="contain"
                                    />
                                </Icon2>

                                <Icon3>
                                    <ImageIcon1
                                        source={LogoIcon1}
                                        resizeMode="contain"
                                    />
                                </Icon3>
                                <Icon4>
                                    <ImageIcon1
                                        source={LogoIcon2}
                                        resizeMode="contain"
                                    />
                                </Icon4>
                                <Logo
                                    width={250}
                                    height={150}
                                    source={LogoImage}
                                />
                            </SlideInfo>
                            <SlideAction>
                                <CText h1 mb2>
                                    Estamos sempre prontos!
                                </CText>
                                <CText mb6>
                                    Dolore anim eiusmod magna ad cupidatat qui
                                    culpa. Elit est ex et enim qui pariatur
                                    adipisicing culpa. Nisi reprehenderit velit
                                    magna esse Lorem pariatur. Anim excepteur
                                    est ut fugiat excepteur nisi non elit quis
                                    commodo excepteur proident.
                                </CText>
                                <ThemeButton outlined onPress={handleNavigate}>
                                    <CText bold>Próximo</CText>
                                </ThemeButton>
                            </SlideAction>
                        </SlideContainer>
                    </SafeAreaView>
                </Slide>
            </Swiper>
        </>
    )
}

export default WelcomeScreen
