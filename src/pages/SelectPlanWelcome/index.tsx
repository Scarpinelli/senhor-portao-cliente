import React, { useState, useEffect, useContext, useRef } from 'react'
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
    StyleSheet,
    Dimensions,
} from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SvgCssUri } from 'react-native-svg'
import {
    CInput,
    CLoader,
    ThemeButton,
    ThemeColors,
    ThemeInput,
    CText,
    CButton,
    DefaultModal,
} from 'components'
import LogoImage from 'assets/images/logo.png'
import { showMessage } from 'react-native-flash-message'
import { StatesList } from 'utils/addressUtils'
import LogoIcon1 from 'assets/images/logo-icon-variation-1.png'
import LogoIcon2 from 'assets/images/logo-icon-variation-2.png'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { DataContext } from 'contexts/AppContext'
import Endpoints from 'services/endpoints'
import api from 'services/api'
import axios from 'axios'
import RNPickerSelect from 'react-native-picker-select'
import { Colors } from 'styles'
import AppStorage from 'services/data/AppStorage'
import moment from 'moment'
import {
    Container,
    Top,
    Bottom,
    Logo,
    LinkButton,
    Register,
    Icon1,
    Icon2,
    FormLogin,
    DDD,
    Phone,
    ImageIcon1,
    ImageIcon2,
    CardAnualValue,
    CardAnualValueContent,
    CardButton,
    CardButtonContainer,
    CardGrid,
    CardHeader,
    CardInfo,
    CardItem,
    CardPlan,
    CardPrice,
    CardTitle,
    CarousselContainer,
} from './styles'
import * as Env from '../../env'

const SelectPlanWelcome: React.FC = ({ navigation }: any) => {
    const { width } = Dimensions.get('screen')
    const [loader, setLoader] = useState(false)
    const [activeSlide, setActiveSlide] = useState(0)

    const { resolveError, getUser, logout, user } = useContext(DataContext)

    const [addressState, setAddressState] = useState<any>(null)

    const [plansList, setPlansList] = useState<any>([])

    const loadPlans = async () => {
        setLoader(true)
        // planService

        try {
            const data = await Endpoints.loadAllPlans()

            if (data) {

                if (data.length > 0) {
                    const mappedPlans = await Promise.all(
                        data.map(async (planItem: any) => {
                            // const dataPlanService =
                            //     await Endpoints.loadAllPlansServices(
                            //         planItem?.id,
                            //     )


                            // if (dataPlanService) {
                            //     return {
                            //         ...planItem,
                            //         services: [...dataPlanService],
                            //     }
                            // }
                            return planItem
                        }),
                    )

                    setPlansList(mappedPlans)
                }
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
        loadPlans()
    }, [])

    const [showModalLogout, setShowModalLogout] = useState(false)

    const handleLogout = async () => {
        setShowModalLogout(true)
    }

    const handleLogoutSubmit = async () => {
        logout()

        navigation.reset({
            index: 0,
            routes: [{ name: 'Redirect' }],
        })
    }

    const handleSkipPlan = async () => {
        if (user) {
            await AppStorage.storeData(
                `${Env.keyPrefix}-plans-${user?.id}`,
                moment().format('DD-MM-YYYY HH:mm:ss'),
            )
        } else {
            const userData = await AppStorage.getData(`${Env.keyPrefix}-user`)
            await AppStorage.storeData(
                `${Env.keyPrefix}-plans-${userData?.id}`,
                moment().format('DD-MM-YYYY HH:mm:ss'),
            )
        }
        navigation.reset({
            index: 0,
            routes: [{ name: 'Redirect' }],
        })
    }

    const renderItem = ({ item, index }: any) => {
        return (
            <>
                <CardPlan>
                    <CardHeader>
                        <CardTitle>
                            <CText bold white>
                                {item.name}
                            </CText>
                        </CardTitle>
                        <CardPrice>
                            <CText small white>
                                R${' '}
                            </CText>
                            <CText large white bold>
                                {item.value}
                            </CText>
                            <CText small white style={{ marginLeft: 10 }}>
                                Por mês
                            </CText>
                        </CardPrice>
                    </CardHeader>
                    <CardInfo>
                        <CardGrid>
                            {item?.planService.map(
                                (service: any, idx: number) => {
                                    return (
                                        <CardItem odd={idx % 2 === 0 ? 1 : 0}>
                                            <CText black center small>
                                                {service.description}
                                            </CText>
                                        </CardItem>
                                    )
                                },
                            )}
                            {/* <CardItem odd={1}>
                                <CText black center small>
                                    20 Solicitações
                                </CText>
                            </CardItem>
                            <CardItem odd={0}>
                                <CText black center small>
                                    10% de desconto na primeira compra
                                </CText>
                            </CardItem>
                            <CardItem odd={1}>
                                <CText black center small>
                                    20 Solicitações
                                </CText>
                            </CardItem> */}
                        </CardGrid>
                    </CardInfo>
                    {/* <CardAnualValue>
                        <CText small black>
                            Pagamento anual
                        </CText>
                        <CardAnualValueContent>
                            <CText small black>
                                R${' '}
                            </CText>
                            <CText h2 black bold>
                                {item.value}
                            </CText>
                        </CardAnualValueContent>
                    </CardAnualValue> */}
                    <CardButtonContainer>
                        <ThemeButton
                            primary
                            onPress={() =>
                                navigation.navigate('PlanPayment', {
                                    plan: item,
                                })
                            }
                        >
                            <CText>Selecionar</CText>
                        </ThemeButton>
                    </CardButtonContainer>
                </CardPlan>
            </>
        )
    }

    return (
        <>
            <CLoader visible={loader} />

            <DefaultModal
                title="Deseja realmente sair"
                textButton="Sair"
                visible={showModalLogout}
                handleCancel={() => {
                    setShowModalLogout(false)
                }}
                handleAction={handleLogoutSubmit}
            />

            <StatusBar
                barStyle="light-content"
                translucent
                backgroundColor="transparent"
            />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <Container>
                    <SafeAreaView style={{ flex: 1 }}>
                        <Top>
                            {/* <Icon1>
                                <ImageIcon1
                                    source={LogoIcon1}
                                    resizeMode="contain"
                                />
                            </Icon1>

                            <Icon2>
                                <ImageIcon2
                                    source={LogoIcon2}
                                    resizeMode="contain"
                                />
                            </Icon2> */}
                            <Logo width={250} height={150} source={LogoImage} />
                            <CText h1 mb2 center>
                                Selecione um plano
                            </CText>
                            <CText mb6 center>
                                Se desejar, selecione um plano agora mesmo e
                                comece a receber solicitações de atendimento.
                            </CText>

                            <Carousel
                                layout="default"
                                data={plansList}
                                renderItem={renderItem}
                                sliderWidth={width}
                                itemWidth={width * 0.9}
                                inactiveSlideScale={0.7}
                                inactiveSlideOpacity={1}
                                containerCustomStyle={{ overflow: 'visible' }}
                                contentContainerCustomStyle={{
                                    paddingTop: 0,
                                    paddingBottom: 20,
                                    marginLeft: -20,
                                }}
                                onSnapToItem={(index: number) => {
                                    setActiveSlide(index)
                                }}
                            />
                            <Pagination
                                dotsLength={plansList.length}
                                activeDotIndex={activeSlide}
                                dotStyle={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: 5,
                                    marginHorizontal: 0,
                                    backgroundColor: '#A8A8A8',
                                }}
                                inactiveDotStyle={
                                    {
                                        // Define styles for inactive dots here
                                    }
                                }
                                inactiveDotOpacity={0.4}
                                inactiveDotScale={0.6}
                            />

                            <ThemeButton
                                mt2
                                mb2
                                onPress={() => handleSkipPlan()}
                            >
                                <CText bold>
                                    Não quero selecionar um plano agora
                                </CText>
                            </ThemeButton>
                        </Top>
                    </SafeAreaView>
                </Container>
            </KeyboardAvoidingView>
        </>
    )
}

export default SelectPlanWelcome

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 12,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 5,
        borderColor: Colors.bgInput,
        fontFamily: 'Regular',
        height: 70,
        color: 'black',
        marginBottom: 10,
        paddingRight: 30, // to ensure the text is never behind the icon
        borderRadius: 15,
        // padding: 5,
        backgroundColor: Colors.white,
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        marginBottom: 20,
        paddingRight: 30, // to ensure the text is never behind the icon
    },
})
