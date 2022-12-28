import React, { useContext, useRef, useState } from 'react'

import {
    ThemeButton,
    CText,
    ThemeColors,
    ThemeInput,
    CLoader,
    CInput,
} from 'components'
import { StatusBar } from 'react-native'

import { useFormik } from 'formik'
import * as yup from 'yup'
import moment from 'moment'
import { DataContext } from 'contexts/AppContext'
import Endpoints from 'services/endpoints'
import { showMessage } from 'react-native-flash-message'
// import { StatusBar } from 'expo-status-bar'
import * as Env from '../../env'
import { Container } from './styles'

const NewPayementMethodScreen: React.FC = ({ navigation }: any) => {
    const [loader, setLoader] = useState(false)

    const { resolveError, getUser, logout, user } = useContext(DataContext)

    const [addressState, setAddressState] = useState<any>(null)

    const holderNameRef = useRef(null)
    const numberRef = useRef(null)
    const expMonthRef = useRef(null)
    const expYearRef = useRef(null)
    const cvvRef = useRef(null)

    const {
        errors,
        handleSubmit,
        isValid,
        values,
        handleChange,
        handleBlur,
        setFieldValue,
    } = useFormik({
        initialValues: {
            // holderName: 'Rodrigo Mariano',
            // number: '4000000000000010',
            // expMonth: '12',
            // expYear: '2025',
            // cvv: '123',

            holderName: '',
            number: '',
            expMonth: '',
            expYear: '',
            cvv: '',
        },
        enableReinitialize: true,
        validationSchema: yup.object().shape({
            holderName: yup
                .string()
                .required('Informe o nome que está no cartão'),
            number: yup.string().required('Informe o número do cartão'),
            expMonth: yup
                .string()
                .required('Informe o mês de expiração do cartão')
                .min(2, 'deve conter 2 digitos')
                .max(2, 'deve conter 2 digitos'),
            expYear: yup
                .string()
                .required('Informe o ano de expiração do cartão')
                .min(4, 'deve conter 2 digitos')
                .max(4, 'deve conter 2 digitos'),
            cvv: yup
                .string()
                .required('Insira o cvv do cartão')
                .min(3, 'CVV deve ter no mínimo 3 digitos')
                .max(4, 'CVV deve ter no máximo 4 digitos'),
        }),
        onSubmit: async (_values, { setSubmitting }) => {
            // setSubmitting(true)
            // setLoader(true)
            // navigation.reset({
            //     index: 0,
            //     routes: [{ name: 'MainTabs' }],
            // })

            setSubmitting(true)
            setLoader(true)

            try {
                const data = await Endpoints.creditCardCreate({
                    holder_name: values.holderName,
                    number: values.number,
                    exp_month: values.expMonth,
                    exp_year: values.expYear,
                    cvv: values.cvv,
                })

                if (data) {
                    await getUser()

                    navigation.goBack()
                }
            } catch (error) {

                let errorMessage = null
                errorMessage =
                    (error as any)?.response?.data?.notificacao
                        ?.mensagemAmigavel || 'Ocorreu um erro, tente novamente'

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
                setSubmitting(false)
                setLoader(false)
            }
        },
    })

    return (
        <>
            <CLoader visible={loader} />
            <StatusBar
                barStyle="dark-content"
                translucent
                backgroundColor="transparent"
            />

            <Container style={{ padding: 20 }}>
                <CText black mb2 bold>
                    Novo método de pagamento
                </CText>
                <CText black small mb5>
                    Preencha os dados abaixo:
                </CText>

                <CInput
                    default
                    label="Nome"
                    value={values.holderName}
                    onChangeText={handleChange('holderName')}
                    // onChangeText={(e: any) => handleGetAddress(e)}
                    autoCapitalize="none"
                    mb2
                    autoCorrect={false}
                    returnKeyType="next"
                    keyboardType="default"
                    enablesReturnKeyAutomatically
                    // autoCompleteType="email"
                    errorMessage={errors.holderName}
                    onSubmitEditing={() => (numberRef as any).current.focus()}
                />

                <CInput
                    default
                    label="Número do cartão"
                    value={values.number}
                    onChangeText={handleChange('number')}
                    // onChangeText={(e: any) => handleGetAddress(e)}
                    autoCapitalize="none"
                    mb2
                    autoCorrect={false}
                    returnKeyType="next"
                    keyboardType="default"
                    enablesReturnKeyAutomatically
                    // autoCompleteType="email"
                    errorMessage={errors.number}
                    onSubmitEditing={() => (expMonthRef as any).current.focus()}
                />

                <CInput
                    default
                    label="validade (MM)"
                    value={values.expMonth}
                    onChangeText={handleChange('expMonth')}
                    autoCapitalize="none"
                    mb2
                    autoCorrect={false}
                    returnKeyType="next"
                    keyboardType="number"
                    enablesReturnKeyAutomatically
                    errorMessage={errors.expMonth}
                    onSubmitEditing={() => (expYearRef as any).current.focus()}
                />

                <CInput
                    default
                    label="validade (AAAA)"
                    value={values.expYear}
                    onChangeText={handleChange('expYear')}
                    autoCapitalize="none"
                    mb2
                    autoCorrect={false}
                    returnKeyType="next"
                    keyboardType="number"
                    enablesReturnKeyAutomatically
                    errorMessage={errors.expYear}
                    onSubmitEditing={() => (cvvRef as any).current.focus()}
                />

                <CInput
                    default
                    label="CVV"
                    value={values.cvv}
                    onChangeText={handleChange('cvv')}
                    autoCapitalize="none"
                    mb2
                    autoCorrect={false}
                    returnKeyType="next"
                    keyboardType="number"
                    enablesReturnKeyAutomatically
                    errorMessage={errors.cvv}
                    onSubmitEditing={() => handleSubmit()}
                />

                <ThemeButton disabled={!isValid} onPress={handleSubmit}>
                    <CText bold>Cadastrar novo cartão</CText>
                </ThemeButton>
            </Container>
        </>
    )
}

export default NewPayementMethodScreen
