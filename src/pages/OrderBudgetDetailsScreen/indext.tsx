import {
    CText,
    DefaultModal,
    NoRegister,
    ThemeButton,
    ThemeText,
} from 'components'
import OrderBudgetProductCard from 'components/OrderBudgetProductCard'
import { DataContext } from 'contexts/AppContext'
import React, { useContext, useState } from 'react'
import { FlatList } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import Endpoints from 'services/endpoints'
import { Container, Description, Buttons } from './styles'

const OrderBudgetDetailsScreen: React.FC = ({ navigation }: any) => {
    const {
        orderPendingStatus,
        orderBudgetProducts,
        orderBudgetValue,
        resolveError,
    } = useContext(DataContext)

    const [acceptOrderBudget, setAcceptOrderBudget] = useState(false)
    const [rejectOrderBudget, setRejectOrderBudget] = useState(false)
    const [loader, setLoader] = useState(false)

    const renderItem = ({ item }: any) => {
        return <OrderBudgetProductCard key={item?.id} data={item} />
    }

    const handleAcceptOrderBudget = () => {
        setAcceptOrderBudget(true)
    }

    const handleAcceptOrderBudgetSubmit = async () => {
        if (!orderPendingStatus?.id) {
            return
        }

        setLoader(true)

        try {
            const data = await Endpoints.acceptOrderBudget(
                orderPendingStatus?.id,
            )
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

    const handleRejectOrderBudget = () => {
        setRejectOrderBudget(true)
    }

    const handleRejectOrderBudgetSubmit = async () => {
        if (!orderPendingStatus?.id) {
            return
        }

        setLoader(true)

        try {
            const data = await Endpoints.rejectOrderBudget(
                orderPendingStatus?.id,
            )

            navigation.goBack()
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
            <DefaultModal
                title="Deseja Aceitar esse orçamento?"
                cancel="Fechar"
                textButton="Aceitar"
                visible={acceptOrderBudget}
                handleCancel={() => {
                    setAcceptOrderBudget(false)
                }}
                handleAction={handleAcceptOrderBudgetSubmit}
            />

            <DefaultModal
                title="Deseja Rejeitar esse orçamento?"
                cancel="Fechar"
                textButton="Rejeitar"
                visible={rejectOrderBudget}
                handleCancel={() => {
                    setRejectOrderBudget(false)
                }}
                handleAction={handleRejectOrderBudgetSubmit}
            />

            <Container>
                <Description>
                    <CText center black>
                        Valor total
                    </CText>
                    <CText primary h1 center>
                        {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                        }).format(orderBudgetValue)}
                    </CText>
                </Description>
                <CText ml4 black h2 mb2>
                    Produtos do orçamento:
                </CText>

                {orderBudgetProducts[0]?.OrderBudgetProduct?.length > 0 ? (
                    <FlatList
                        style={{ flex: 1 }}
                        data={orderBudgetProducts[0]?.OrderBudgetProduct}
                        renderItem={renderItem}
                        keyExtractor={(item) => (item as any)?.id.toString()}
                    />
                ) : (
                    <NoRegister />
                )}

                <Buttons>
                    <ThemeButton
                        secondary
                        onPress={() => handleAcceptOrderBudget()}
                        mt2
                    >
                        <ThemeText bold>Aceitar Orçamento</ThemeText>
                    </ThemeButton>

                    <ThemeButton
                        error
                        onPress={() => handleRejectOrderBudget()}
                        mt2
                        mb4
                    >
                        <ThemeText bold>Rejeitar Orçamento</ThemeText>
                    </ThemeButton>
                </Buttons>
            </Container>
        </>
    )
}

export default OrderBudgetDetailsScreen
