import React, { useState, useEffect, useContext } from 'react'
import RadioForm, {
    RadioButton,
    RadioButtonInput,
    RadioButtonLabel,
} from 'react-native-simple-radio-button'
import Icon from '@expo/vector-icons/FontAwesome'
import IconFontisto from '@expo/vector-icons/Fontisto'
import { Switch } from 'react-native-switch'
import { DataContext } from 'contexts/AppContext'
import {
    ThemeText,
    ThemeColors,
    ThemeButton,
    ThemeInput,
    CLoader,
    CInput,
    CText,
} from 'components'
import Avatar from 'components/Avatar'

import { useFormik } from 'formik'
import * as yup from 'yup'

import IconMaterial from '@expo/vector-icons/MaterialCommunityIcons'
import { StyleSheet } from 'react-native'
import { Colors } from 'styles'
import Endpoints from 'services/endpoints'
import { showMessage } from 'react-native-flash-message'
import { Container, UserContainer, UserInfo, UserRating, Data, Values, ValuesButton, Divider } from './styles'

const OrderTipScreen: React.FC = ({ navigation }: any) => {
    const [secuity, setSecurity] = useState(false)
    const [description, setDescription] = useState('')

    const radio_props = [
        { label: 'Não apareceu', value: 0 },
        { label: 'Instalador não se identificou', value: 1 },
        { label: 'Não fez o serviço corretamente', value: 2 },
        { label: 'Não utilizava peças originais', value: 2 },
        { label: 'Outro', value: 3 },
    ]

    const {
        orderPendingStatus,
        user,
        resolveError,
        setActiveStepOrder,
        setOrderAddress,
        setOrderServiceTypeSelected,
        setOrderPendingStatus,
        setOrders,
        setOrderBudgetProducts,
        setOrderBudgetValue,
    } = useContext(DataContext)

    const [rating, setRating] = useState(0)

    const [type, setType] = useState(null)

    const [loader, setLoader] = useState(false)

    const handleSubmitTip = async () => {
        const payload = {
            orderId: Number(orderPendingStatus.id),
            value: 1,
        }

        setLoader(true)

        try {
            const data = await Endpoints.OrderSendTip(payload)

            navigation.navigate('Redirect')
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

    const handleClearOrder = async () => {
        navigation.navigate('Redirect')
    }


    const { errors, handleSubmit, handleChange, values, getFieldProps, isValid, setFieldValue } =
    useFormik({
        initialValues: {
            value: '5,00',
        },
        enableReinitialize: true,
        validationSchema: yup.object().shape({
            value: yup.string().required('Insira o valor'),
        }),
        onSubmit: async (_values, { setSubmitting }) => {
            setSubmitting(true)
            setLoader(true)

            try {

                let valueToSend = Number(String(_values.value).replace(/,/g,"").replace(/\./,""));

                valueToSend = valueToSend < 100 ? valueToSend * 100 :  valueToSend


                if(valueToSend < 500){
                    showMessage({
                        message: 'O Valor mínimo para gorjeta é de R$ 5,00',
                        type: 'danger',
                        icon: 'danger',
                        position: 'bottom',
                        hideOnPress: false,
                        duration: 4000,
                        floating: true,
                    })

                    setLoader(false)
                    setSubmitting(false)
                    return
                }

                const payload = {
                    orderId: Number(orderPendingStatus.id),
                    value: String(_values.value).replace(/,/g,"").replace(/\./,""),
                }

                
                const data = await Endpoints.OrderSendTip(payload)

                if (data) {
                    showMessage({
                        message: 'Gorjeta enviada realizado com sucesso',
                        type: 'success',
                        icon: 'success',
                        position: 'bottom',
                        hideOnPress: false,
                        duration: 4000,
                        floating: true,
                    })

                }
            
                // handleClearOrder()

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
        },
    })

    const handleActiveTip = (value: any) => {
        setFieldValue('value', value)
    }

    return (
        <>
            <CLoader visible={loader} />
            <Container>
                <UserContainer>
                    <Avatar
                        image={orderPendingStatus?.provider?.image}
                        size={60}
                    />
                    <UserInfo>
                        <ThemeText black>
                            {orderPendingStatus?.provider?.name}
                        </ThemeText>
                        <UserRating>
                            <ThemeText mr1 black>
                                {orderPendingStatus?.provider?.rating}
                            </ThemeText>
                            <Icon
                                name="star"
                                size={12}
                                color={ThemeColors.primary}
                            />
                        </UserRating>
                    </UserInfo>
                </UserContainer>

                <Data>
                    <ThemeText black mb6>
                        Insira ou selecione o valor para enviar a {orderPendingStatus?.provider?.name}.
                    </ThemeText>

                    <Values>
                        <ValuesButton onPress={() => handleActiveTip('5,00')} active={values.value == '5,00' || values?.value === '5'}>
                            {values?.value === '5,00' || values?.value === '5' ? (
                                <CText white center>R$ 5,00</CText>
                            ): (
                                <CText black center>R$ 5,00</CText>
                            )}
                        </ValuesButton>
                        <Divider />
                        <ValuesButton onPress={() => handleActiveTip('10,00')} active={values.value == '10,00' || values?.value === '10'}>
                        {values?.value === '10,00'|| values?.value === '10' ? (
                                <CText white center>R$ 10,00</CText>
                            ): (
                                <CText black center>R$ 10,00</CText>
                            )}
                        </ValuesButton>
                        <Divider />
                        <ValuesButton onPress={() => handleActiveTip('20,00')} active={values.value == '20,00' || values?.value === '20'}>
                        {values?.value === '20,00'|| values?.value === '20' ? (
                                <CText white center>R$ 20,00</CText>
                            ): (
                                <CText black center>R$ 20,00</CText>
                            )}
                        </ValuesButton>
                        <Divider />
                        <ValuesButton onPress={() => handleActiveTip('50,00')} active={values.value == '50,00' || values?.value === '50'}>
                        {values?.value === '50,00'|| values?.value === '50' ? (
                                <CText white center>R$ 50,00</CText>
                            ): (
                                <CText black center>R$ 50,00</CText>
                            )}
                        </ValuesButton>
                    </Values>

                    <CInput
                            mb4
                            default
                            label="Valor"
                            {...getFieldProps('value')}
                            value={
                                values.value
                            }
                            onChangeText={handleChange(
                                'value',
                            )}
                            
                            maskType={'currency'}
                            autoCapitalize="none"
                            autoCorrect={false}
                            returnKeyType="next"
                            enablesReturnKeyAutomatically
                            
                            errorMessage={
                                errors.value
                            }
                            onSubmitEditing={() =>
                                handleSubmit()
                            }
                            // backgroundPersonalized={
                            //     isFocused
                            //         ? 'rgba(2, 8, 51,0.6)'
                            //         : 'rgba(2, 8, 51,0.2)'
                            // }
                        />

                    <ThemeButton mt6 onPress={() => handleSubmit()}>
                        <ThemeText bold>Enviar Gorjeta</ThemeText>
                    </ThemeButton>

                    <ThemeButton primary mt2 onPress={() => handleClearOrder()}>
                        <ThemeText bold>Fechar</ThemeText>
                    </ThemeButton>
                </Data>
            </Container>
        </>
    )
}

export default OrderTipScreen

