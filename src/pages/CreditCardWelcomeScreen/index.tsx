import React, { useState, useEffect, useContext, useRef } from 'react'
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
    StyleSheet,
} from 'react-native'
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
    LogoContainer,
} from './styles'
import * as Env from '../../env'

const CreditCardWelcomeScreen: React.FC = ({ navigation }: any) => {
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

                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Redirect' }],
                    })
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

    const handleSkipCreditCard = async () => {
        if (user) {
            await AppStorage.storeData(
                `${Env.keyPrefix}-credit-card-${user?.id}`,
                moment().format('DD-MM-YYYY HH:mm:ss'),
            )
        } else {
            const userData = await AppStorage.getData(`${Env.keyPrefix}-user`)
            await AppStorage.storeData(
                `${Env.keyPrefix}-credit-card-${userData?.id}`,
                moment().format('DD-MM-YYYY HH:mm:ss'),
            )
        }
        navigation.reset({
            index: 0,
            routes: [{ name: 'Redirect' }],
        })
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
                            <LogoContainer>
                            <Logo width={250} height={150} source={LogoImage} />
                            </LogoContainer>
                            <CText h1 mb2 center>
                                Cadastrar cartão de crédito
                            </CText>
                            <CText mb6 center>
                                Se desejar insira uma forma de pagamento agora e
                                esteja pronto para adquirir um de nossos planos.
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
                                onSubmitEditing={() =>
                                    (numberRef as any).current.focus()
                                }
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
                                onSubmitEditing={() =>
                                    (expMonthRef as any).current.focus()
                                }
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
                                onSubmitEditing={() =>
                                    (expYearRef as any).current.focus()
                                }
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
                                onSubmitEditing={() =>
                                    (cvvRef as any).current.focus()
                                }
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
                        </Top>
                        <Bottom>
                            <ThemeButton
                                disabled={!isValid}
                                mt2
                                mb2
                                primary
                                onPress={handleSubmit}
                            >
                                <CText bold>Cadastrar cartão de crédito</CText>
                            </ThemeButton>
                            <ThemeButton
                                disabled={!isValid}
                                mt2
                                mb2
                                onPress={handleSkipCreditCard}
                            >
                                <CText bold>Não quero cadastrar agora</CText>
                            </ThemeButton>

                            <CButton
                                mt4
                                outlined
                                white
                                padding={12}
                                onPress={handleLogout}
                                secondary
                            >
                                <CText boldItalic uppercase>
                                    Sair
                                </CText>
                            </CButton>
                        </Bottom>
                    </SafeAreaView>
                </Container>
            </KeyboardAvoidingView>
        </>
    )
}

export default CreditCardWelcomeScreen

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
