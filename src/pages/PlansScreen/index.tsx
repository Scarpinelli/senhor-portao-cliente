import React, { useState, useEffect, useContext } from 'react'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { Dimensions, Image } from 'react-native'
import { ThemeButton, CText, DefaultModal } from 'components'
import { DataContext } from 'contexts/AppContext'
import Endpoints from 'services/endpoints'
import { showMessage } from 'react-native-flash-message'
import moment from 'moment'
import Logo from 'assets/images/logo-black.png'
import {
    BagdePromotion,
    BagdePromotionContent,
    ButtonPlanTypeLeft,
    ButtonPlanTypeRight,
    ButtonReturn,
    ButtonsContent,
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
    Container,
    Description,
    Percent,
    TextDescription,
    TextDescriptionAnual,
    TextPlan,
    TextTitle,
    Value,
    ValueContent,
    TitleContainer,
    PlanContainer,
} from './styles'

const PlansScreen: React.FC = ({ navigation }: any) => {
    const { width } = Dimensions.get('screen')
    const [activeSlide, setActiveSlide] = useState(0)
    const [plansList, setPlansList] = useState<any>([])

    const [loader, setLoader] = useState(false)
    const { resolveError, getUser, logout, user, activePlan } =
        useContext(DataContext)

    const [activeContract, setActiveContract] = useState<any>([])

    const loadActiveContract = async () => {
        setLoader(true)
        // planService

        try {
            const data = await Endpoints.getActiveContract()

            if (data) {
                setActiveContract(data)
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
        loadActiveContract()
        loadPlans()
    }, [])
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
                                {item?.value}
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
                            <CText>Quero esse plano</CText>
                        </ThemeButton>
                    </CardButtonContainer>
                </CardPlan>
            </>
        )
    }

    const [showModalLogout, setShowModalLogout] = useState(false)

    const handlCancelPlanModal = async () => {
        setShowModalLogout(true)
    }

    const handleCancelPlanSubmit = async () => {
        //  Endpoint para cancelar plano

        setLoader(true)
        try {
            const data = await Endpoints.cancelPlan(activeContract.id)

            if (data) {
                setActiveContract([])

                const dataCall = await Endpoints.saveReceiveCalls(0)
            }

            logout()

            navigation.reset({
                index: 0,
                routes: [{ name: 'Redirect' }],
            })
        } catch (error) {
            let errorMessage = null
            errorMessage =
                (error as any)?.response?.data?.message ||
                'Ocorreu um erro tente novamente'

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
            <DefaultModal
                title="Deseja cancelar seu plano?"
                textButton="Cancelar plano"
                cancel="Fechar"
                visible={showModalLogout}
                handleCancel={() => {
                    setShowModalLogout(false)
                }}
                handleAction={handleCancelPlanSubmit}
            />
            <Container>
                {activePlan ? (
                    <>
                        <PlanContainer>
                            <Image source={Logo} />
                            <CText black mt4 bold>
                                Meu plano ativo
                            </CText>

                            <CText muted>{activePlan?.plan?.name}</CText>

                            <CText black mt4 bold>
                                Valor:
                            </CText>

                            <CText muted>
                                R$ {activePlan?.plan?.value} (Cobrado
                                mensalmente)
                            </CText>

                            <CText black mt4 bold>
                                Data de ativação
                            </CText>

                            <CText muted>
                                {moment(activePlan?.createdAt).format(
                                    'DD/MM/YYYY',
                                )}
                            </CText>

                            <CText black mt4 bold>
                                Número de Chamadas máximo por mês
                            </CText>
                            <CText muted>
                                {activePlan?.plan?.requestAmount}
                            </CText>

                            <CText black mt4 bold>
                                Chamadas recebidas
                            </CText>
                            <CText muted>{activePlan?.provider?.request}</CText>

                            <ThemeButton
                                onPress={() => handlCancelPlanModal()}
                                mt4
                            >
                                <CText bold>Cancelar meu plano</CText>
                            </ThemeButton>
                        </PlanContainer>
                    </>
                ) : (
                    <>
                        <TitleContainer>
                            <CText black center mt4 bold>
                                Selecione um dos planos
                            </CText>
                            <CText small black center mb4>
                                Abaixo você encontra nossos plano de serviços,
                                selecione o que melhor te atender!
                            </CText>
                        </TitleContainer>

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
                                // marginLeft: -20,
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
                    </>
                )}
            </Container>
        </>
    )
}

export default PlansScreen
