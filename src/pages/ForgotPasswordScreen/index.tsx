import React, { useState, useEffect, useContext, useRef } from 'react'
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
    View,
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
    ResendTimer,
} from 'components'
import LogoImage from 'assets/images/logo.png'
import { showMessage } from 'react-native-flash-message'
import Feather from '@expo/vector-icons/Feather'
import LogoIcon1 from 'assets/images/logo-icon-variation-1.png'
import LogoIcon2 from 'assets/images/logo-icon-variation-2.png'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { DataContext } from 'contexts/AppContext'
import Endpoints from 'services/endpoints'
import { Colors } from 'styles'
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
    ValidationInputsContainer,
    InputCode,
    ButtonsGroup,
    TabButton,
    ButtonsGroupDivider,
    LogoContainer
} from './styles'

const ForgotPasswordScreen: React.FC = ({ navigation }: any) => {
    const [loader, setLoader] = useState(false)
    const [message, setMessage] = useState(false)

    const { resolveError, getUser } = useContext(DataContext)

    const inputRef1 = useRef(null)
    const inputRef2 = useRef(null)
    const inputRef3 = useRef(null)
    const inputRef4 = useRef(null)
    const inputRef5 = useRef(null)
    const passwordRef = useRef(null)
    const passwordConfirmationRef = useRef(null)

    const formik = {
        cellphoneRequesCode: useFormik({
            initialValues: {
                ddd: '',
                phone: '',
            },
            enableReinitialize: true,
            validationSchema: yup.object().shape({
                ddd: yup.string().required('Insira o DDD'),
                phone: yup.string().required('Insira o Telefone'),
            }),
            validateOnChange: true,
            onSubmit: async (values, { setSubmitting, resetForm }) => {
                setSubmitting(true)
                setLoader(true)

                const postData = `${values.ddd}${values.phone}`

                try {
                    const data = await Endpoints.sendSMSCodeForgotPassword(
                        postData,
                    )

                    if (data) {
                        showMessage({
                            message: 'Código enviado por SMS',
                            type: 'success',
                            icon: 'success',
                            position: 'bottom',
                            hideOnPress: false,
                            duration: 4000,
                            floating: true,
                        })
                    }
                } catch (error) {

                    let errorMessage = null
                    errorMessage =
                        (error as any)?.response?.data?.message ||
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
                    setSubmitting(false)
                    setLoader(false)
                }
            },
        }),
        mailRequestCode: useFormik({
            initialValues: {
                email: '',
            },
            enableReinitialize: true,
            validationSchema: yup.object().shape({
                email: yup
                    .string()
                    .required('Insira o e-mail')
                    .email('Insira um e-mail válido'),
            }),
            onSubmit: async (values, { setSubmitting, resetForm }) => {
                setSubmitting(true)
                setLoader(true)

                const postData = values?.email

                try {
                    const data = await Endpoints.sendEmailCodeForgotPassword(
                        postData,
                    )

                    if (data) {
                        showMessage({
                            message: 'Enviamos um código por e-mail',
                            type: 'success',
                            icon: 'success',
                            position: 'bottom',
                            hideOnPress: false,
                            duration: 4000,
                            floating: true,
                        })
                    }
                } catch (error) {

                    let errorMessage = null
                    errorMessage =
                        (error as any)?.response?.data?.message ||
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
                    setSubmitting(false)
                    setLoader(false)
                }
            },
        }),

        newPassword: useFormik({
            initialValues: {
                input1: '',
                input2: '',
                input3: '',
                input4: '',
                input5: '',
                password: '',
                password_confirmation: '',
            },
            enableReinitialize: true,
            validationSchema: yup.object().shape({
                input1: yup.string().required(),
                input2: yup.string().required(),
                input3: yup.string().required(),
                input4: yup.string().required(),
                input5: yup.string().required(),
                password: yup
                    .string()
                    .required('Informa e senha')
                    .min(6, 'A senha deve conter no mínimo 6 caracteres'),
                password_confirmation: yup.string().when('password', {
                    is: (val: string) => val?.length > 0,
                    then: yup
                        .string()
                        .required('Informe a confirmação da senha')
                        .oneOf(
                            [yup.ref('password')],
                            'A senhas devem ser iguais',
                        ),
                }),
            }),
            onSubmit: async (_values, { setSubmitting }) => {
                setSubmitting(true)
                setLoader(true)

                try {

                    const data = await Endpoints.changePasswordConfirm({
                        token: `${_values.input1}${_values.input2}${_values.input3}${_values.input4}${_values.input5}`,
                        password: _values.password,
                    })

                    if (data) {
                        showMessage({
                            message: 'Senha Alterada com sucesso',
                            type: 'success',
                            icon: 'success',
                            position: 'bottom',
                            hideOnPress: false,
                            duration: 4000,
                            floating: true,
                        })

                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Redirect' }],
                        })
                    }
                } catch (error) {

                    let errorMessage = null
                    errorMessage =
                        (error as any)?.response?.data?.message ||
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
                    setSubmitting(false)
                    setLoader(false)
                }
            },
        }),
    }

    const [count, setCount] = useState<any>(0)

    const resetCode = (currentCounter: number) => {
        setMessage(false)
        setCount(currentCounter)
    }

    const resendCodeSMS = async () => {
        setLoader(true)

        if (!formik.cellphoneRequesCode.isValid) {
            showMessage({
                message: 'DDD e Telefone são obrigatórios',
                type: 'warning',
                icon: 'warning',
                position: 'bottom',
                hideOnPress: false,
                duration: 4000,
                floating: true,
            })
            setLoader(false)
            return
        }

        try {
            const postData = `${formik.cellphoneRequesCode.values.ddd}${formik.cellphoneRequesCode.values.ddd}`
            const data = await Endpoints.sendSMSCodeForgotPassword(postData)

            resetCode(30)

            showMessage({
                message: 'Enviamos um código via SMS',
                type: 'success',
                icon: 'success',
                position: 'bottom',
                hideOnPress: false,
                duration: 4000,
                floating: true,
            })
        } catch (error) {
            let errorMessage = null
            errorMessage =
                (error as any)?.response?.data?.notificacao?.mensagemAmigavel ||
                'Ocorreu um erro, tente novamente'
            showMessage({
                message: errorMessage,
                type: 'warning',
                icon: 'warning',
                position: 'bottom',
                hideOnPress: false,
                duration: 4000,
                floating: true,
            })
        } finally {
            setLoader(false)
        }
    }

    const resendCodeEmail = async () => {
        setLoader(true)

        if (!formik.cellphoneRequesCode.isValid) {
            showMessage({
                message: 'E-mail é obrigatório',
                type: 'warning',
                icon: 'warning',
                position: 'bottom',
                hideOnPress: false,
                duration: 4000,
                floating: true,
            })
            setLoader(false)
            return
        }

        try {
            const postData = `${formik.mailRequestCode.values.email}`

            const data = await Endpoints.sendEmailCodeForgotPassword(postData)

            resetCode(30)

            showMessage({
                message: 'Enviamos um código via E-mail',
                type: 'success',
                icon: 'success',
                position: 'bottom',
                hideOnPress: false,
                duration: 4000,
                floating: true,
            })
        } catch (error) {
            let errorMessage = null
            errorMessage =
                (error as any)?.response?.data?.notificacao?.mensagemAmigavel ||
                'Ocorreu um erro, tente novamente'
            showMessage({
                message: errorMessage,
                type: 'warning',
                icon: 'warning',
                position: 'bottom',
                hideOnPress: false,
                duration: 4000,
                floating: true,
            })
        } finally {
            setLoader(false)
        }
    }

    const handleChangeCode = (value: number, ref: any) => {
        formik.newPassword.setFieldValue(`input${ref}`, value, true)
        if (String(value).trim() !== '') {
            switch (ref) {
                case 1:
                    return (inputRef2 as any).current.focus()
                    break
                case 2:
                    return (inputRef3 as any).current.focus()
                    break
                case 3:
                    return (inputRef4 as any).current.focus()
                    break
                case 4:
                    return (inputRef5 as any).current.focus()
                    break
                default:
                    null
            }
        }
    }

    const timer = () => setCount(count - 1)

    useEffect(() => {
        if (count <= 0) {
            setMessage(true)
            return
        }
        const id = setInterval(timer, 1000)
        return () => clearInterval(id)
    }, [count])

    // useEffect(() => {
    //     setMessage(true)
    // }, [])

    // useEffect(() => {
    //     resendCode()
    // }, [])

    const [activeTab, setActiveTab] = useState(0)

    const dddRef = useRef(null)
    const phoneRef = useRef(null)

    const emailRef = useRef(null)

    return (
        <>
            <CLoader visible={loader} />
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
                            <CText center h1 mb2>
                                Esqueci minha senha
                            </CText>
                            <CText center mb2>
                                Preencha os passos abaixo para cadastrar uma
                                nova senha.
                            </CText>

                            <CText h2 mb2 mt4>
                                Como deseja receber o código
                            </CText>

                            <ButtonsGroup>
                                <TabButton
                                    onPress={() => setActiveTab(0)}
                                    activeTab={activeTab === 0}
                                >
                                    <Feather
                                        name="smartphone"
                                        size={20}
                                        color={Colors.white}
                                    />
                                    <CText ml1 center>
                                        Celular
                                    </CText>
                                </TabButton>
                                <ButtonsGroupDivider />
                                <TabButton
                                    onPress={() => setActiveTab(1)}
                                    activeTab={activeTab === 1}
                                >
                                    <Feather
                                        name="mail"
                                        size={20}
                                        color={Colors.white}
                                    />
                                    <CText ml2 center>
                                        E-mail
                                    </CText>
                                </TabButton>
                            </ButtonsGroup>

                            {activeTab === 0 ? (
                                <FormLogin>
                                    <DDD>
                                        <CInput
                                            passRef={dddRef}
                                            default
                                            label="DDD"
                                            value={
                                                formik.cellphoneRequesCode
                                                    .values.ddd
                                            }
                                            onChangeText={formik.cellphoneRequesCode.handleChange(
                                                'ddd',
                                            )}
                                            autoCapitalize="none"
                                            mb4
                                            autoCorrect={false}
                                            returnKeyType="next"
                                            // keyboardType="email-address"
                                            enablesReturnKeyAutomatically
                                            // autoCompleteType="email"
                                            errorMessage={
                                                formik.cellphoneRequesCode
                                                    .errors.ddd
                                            }
                                            onSubmitEditing={() =>
                                                (
                                                    phoneRef as any
                                                ).current.focus()
                                            }
                                        />
                                    </DDD>

                                    <Phone>
                                        <CInput
                                            passRef={phoneRef}
                                            default
                                            label="Telefone"
                                            value={
                                                formik.cellphoneRequesCode
                                                    .values.phone
                                            }
                                            onChangeText={formik.cellphoneRequesCode.handleChange(
                                                'phone',
                                            )}
                                            autoCapitalize="none"
                                            mb2
                                            autoCorrect={false}
                                            returnKeyType="next"
                                            // keyboardType="email-address"
                                            enablesReturnKeyAutomatically
                                            // autoCompleteType="email"
                                            errorMessage={
                                                formik.cellphoneRequesCode
                                                    .errors.phone
                                            }
                                            onSubmitEditing={() =>
                                                formik.cellphoneRequesCode.handleSubmit()
                                            }
                                        />
                                    </Phone>
                                </FormLogin>
                            ) : (
                                <View>
                                    <CInput
                                        passRef={emailRef}
                                        mb4
                                        default
                                        label="E-mail"
                                        value={
                                            formik.mailRequestCode.values.email
                                        }
                                        onChangeText={formik.mailRequestCode.handleChange(
                                            'email',
                                        )}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        returnKeyType="done"
                                        keyboardType="email-address"
                                        enablesReturnKeyAutomatically
                                        autoCompleteType="email"
                                        errorMessage={
                                            formik.mailRequestCode.errors.email
                                        }

                                        // backgroundPersonalized={
                                        //     formik.mailAuth
                                        //         ? 'rgba(2, 8, 51,0.6)'
                                        //         : 'rgba(2, 8, 51,0.2)'
                                        // }
                                    />
                                </View>
                            )}

                            {activeTab === 0 ? (
                                <ResendTimer
                                    message={message}
                                    onPress={resendCodeSMS}
                                    cont={count}
                                    type={activeTab === 0 ? 'sms' : ''}
                                    forgotPassword
                                />
                            ) : (
                                <ResendTimer
                                    message={message}
                                    onPress={resendCodeEmail}
                                    cont={count}
                                    type={activeTab === 0 ? 'sms' : ''}
                                    forgotPassword
                                />
                            )}

                            <CText h2 mb2>
                                Insira o código
                            </CText>

                            <ValidationInputsContainer>
                                <InputCode
                                    keyboardType="numeric"
                                    maxLength={1}
                                    ref={inputRef1}
                                    {...formik.newPassword.getFieldProps(
                                        'input1',
                                    )}
                                    onChangeText={(e: any) =>
                                        handleChangeCode(e, 1)
                                    }
                                />
                                <InputCode
                                    keyboardType="numeric"
                                    maxLength={1}
                                    ref={inputRef2}
                                    {...formik.newPassword.getFieldProps(
                                        'input2',
                                    )}
                                    onChangeText={(e: any) =>
                                        handleChangeCode(e, 2)
                                    }
                                />
                                <InputCode
                                    keyboardType="numeric"
                                    maxLength={1}
                                    ref={inputRef3}
                                    {...formik.newPassword.getFieldProps(
                                        'input3',
                                    )}
                                    onChangeText={(e: any) =>
                                        handleChangeCode(e, 3)
                                    }
                                />
                                <InputCode
                                    keyboardType="numeric"
                                    maxLength={1}
                                    ref={inputRef4}
                                    {...formik.newPassword.getFieldProps(
                                        'input4',
                                    )}
                                    onChangeText={(e: any) =>
                                        handleChangeCode(e, 4)
                                    }
                                />
                                <InputCode
                                    keyboardType="numeric"
                                    maxLength={1}
                                    ref={inputRef5}
                                    {...formik.newPassword.getFieldProps(
                                        'input5',
                                    )}
                                    onChangeText={(e: any) =>
                                        handleChangeCode(e, 5)
                                    }
                                />
                            </ValidationInputsContainer>

                            <CText h2 mb2 mt4>
                                Cadastre sua nova senha
                            </CText>

                            <CInput
                                passRef={passwordRef}
                                default
                                label="Nova senha"
                                value={formik.newPassword.values.password}
                                onChangeText={formik.newPassword.handleChange(
                                    'password',
                                )}
                                autoCapitalize="none"
                                mb2
                                autoCorrect={false}
                                returnKeyType="next"
                                // keyboardType="email-address"
                                enablesReturnKeyAutomatically
                                // autoCompleteType="email"
                                errorMessage={
                                    formik.newPassword.errors.password
                                }
                                onSubmitEditing={() =>
                                    (
                                        passwordConfirmationRef as any
                                    ).current.focus()
                                }
                            />

                            <CInput
                                passRef={passwordConfirmationRef}
                                default
                                label="Confirmação da nova senha"
                                value={
                                    formik.newPassword.values
                                        .password_confirmation
                                }
                                onChangeText={formik.newPassword.handleChange(
                                    'password_confirmation',
                                )}
                                autoCapitalize="none"
                                mb2
                                autoCorrect={false}
                                returnKeyType="go"
                                // keyboardType="email-address"
                                enablesReturnKeyAutomatically
                                // autoCompleteType="email"
                                errorMessage={
                                    formik.newPassword.errors
                                        .password_confirmation
                                }
                                onSubmitEditing={() =>
                                    formik.newPassword.handleSubmit()
                                }
                            />
                        </Top>
                        <Bottom>
                            <ThemeButton
                                disabled={!formik.newPassword.isValid}
                                mt2
                                mb2
                                primary
                                onPress={formik.newPassword.handleSubmit}
                            >
                                <CText bold>Alterar Senha</CText>
                            </ThemeButton>
                            <Register>
                                <CText small mb2 center>
                                    Voltar para o
                                </CText>
                                <LinkButton
                                    onPress={() => navigation.navigate('Auth')}
                                >
                                    <CText small bold>
                                        login
                                    </CText>
                                </LinkButton>
                            </Register>
                        </Bottom>
                    </SafeAreaView>
                </Container>
            </KeyboardAvoidingView>
        </>
    )
}

export default ForgotPasswordScreen
