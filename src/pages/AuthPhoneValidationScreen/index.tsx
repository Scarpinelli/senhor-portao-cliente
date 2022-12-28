import React, { useState, useRef, useContext, useEffect } from 'react'
import { Image, TextInput, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SvgCssUri } from 'react-native-svg'
import {
    ThemeButton,
    ThemeColors,
    ThemeInput,
    CLoader,
    DefaultModal,
    CButton,
    CText,
    ResendTimer,
} from 'components'
import LogoImage from 'assets/images/logo.png'

import LogoIcon1 from 'assets/images/logo-icon-variation-1.png'
import LogoIcon2 from 'assets/images/logo-icon-variation-2.png'

import { useFormik } from 'formik'
import * as yup from 'yup'

import { DataContext } from 'contexts/AppContext'
import Endpoints from 'services/endpoints'
import { useNavigation } from '@react-navigation/native'
import { showMessage } from 'react-native-flash-message'
import AppStorage from 'services/data/AppStorage'
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
    FormCodeContainer,
    CodeNumberInput,
    ImageIcon1,
    ImageIcon2,
    InputCode,
    ValidationInputsContainer,
    LogoContainer,
} from './styles'

import * as Env from '../../env'

const AuthPhoneValidatonScreen: React.FC = ({ navigation }: any) => {
    const { setUser, logout, resolveError, getUser, user } =
        useContext(DataContext)

    /*
     *   STATES
     */
    const [loader, setLoader] = useState(false)
    const [showModalLogout, setShowModalLogout] = useState(false)
    const [count, setCount] = useState<any>(0)
    const [message, setMessage] = useState(false)

    /*
     *   REFS
     */
    const inputRef1 = useRef(null)
    const inputRef2 = useRef(null)
    const inputRef3 = useRef(null)
    const inputRef4 = useRef(null)
    const inputRef5 = useRef(null)

    const { errors, handleSubmit, getFieldProps, isValid, setFieldValue } =
        useFormik({
            initialValues: {
                input1: '',
                input2: '',
                input3: '',
                input4: '',
                input5: '',
            },
            enableReinitialize: true,
            validationSchema: yup.object().shape({
                input1: yup.string().required(),
                input2: yup.string().required(),
                input3: yup.string().required(),
                input4: yup.string().required(),
                input5: yup.string().required(),
            }),
            onSubmit: async (_values, { setSubmitting }) => {
                setSubmitting(true)
                setLoader(true)

                try {
                    const sendToken = Object.values(_values).join('')

                    const data = await Endpoints.verifyMailCode(sendToken)

                    if (data) {
                        showMessage({
                            message: 'Login realizado com sucesso',
                            type: 'success',
                            icon: 'success',
                            position: 'bottom',
                            hideOnPress: false,
                            duration: 4000,
                            floating: true,
                        })

                        if (user) {
                            await AppStorage.remove(
                                `${Env.keyPrefix}-phone-auth-${user?.id}`,
                            )
                        } else {
                            const userData = await AppStorage.getData(
                                `${Env.keyPrefix}-user`,
                            )
                            await AppStorage.remove(
                                `${Env.keyPrefix}-phone-auth-${userData?.id}`,
                            )
                        }
                    }

                    await getUser()

                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Redirect' }],
                    })
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

    const resetCode = (currentCounter: number) => {
        setMessage(false)
        setCount(currentCounter)
    }

    const resendCode = async () => {
        setLoader(true)
        try {
            const data = await Endpoints.sendSMSCodeAuth()

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
                (error as any)?.response?.data?.message ||
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
        setFieldValue(`input${ref}`, value, true)
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

    const handleSendEmail = async () => {
        resendCode()
    }

    /*
     *   EFFECTS
     */

    const timer = () => setCount(count - 1)

    useEffect(() => {
        if (count <= 0) {
            setMessage(true)
            return
        }
        const id = setInterval(timer, 1000)
        return () => clearInterval(id)
    }, [count])

    useEffect(() => {
        setMessage(true)
    }, [])

    useEffect(() => {
        handleSendEmail()
    }, [])

    return (
        <>
            <StatusBar
                barStyle="light-content"
                translucent
                backgroundColor="transparent"
            />

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
                            Valide seu celular
                        </CText>
                        <CText center mb6>
                           Insira o código que será enviado para seu aparelho celular.
                        </CText>

                        <CText center mb4 bold>
                            Código de verificação
                        </CText>

                        <ValidationInputsContainer>
                            <InputCode
                                keyboardType="number-pad"
                                maxLength={1}
                                ref={inputRef1}
                                {...getFieldProps('input1')}
                                onChangeText={(e: any) =>
                                    handleChangeCode(e, 1)
                                }
                                returnKeyType="done"
                            />
                            <InputCode
                                keyboardType="number-pad"
                                maxLength={1}
                                ref={inputRef2}
                                {...getFieldProps('input2')}
                                onChangeText={(e: any) =>
                                    handleChangeCode(e, 2)
                                }
                                returnKeyType="done"
                            />
                            <InputCode
                                keyboardType="number-pad"
                                maxLength={1}
                                ref={inputRef3}
                                {...getFieldProps('input3')}
                                onChangeText={(e: any) =>
                                    handleChangeCode(e, 3)
                                }
                                returnKeyType="done"
                            />
                            <InputCode
                                keyboardType="number-pad"
                                maxLength={1}
                                ref={inputRef4}
                                {...getFieldProps('input4')}
                                onChangeText={(e: any) =>
                                    handleChangeCode(e, 4)
                                }
                                returnKeyType="done"
                            />
                            <InputCode
                                keyboardType="number-pad"
                                maxLength={1}
                                ref={inputRef5}
                                {...getFieldProps('input5')}
                                onChangeText={(e: any) =>
                                    handleChangeCode(e, 5)
                                }
                                returnKeyType="done"
                            />
                        </ValidationInputsContainer>

                        <ResendTimer
                            message={message}
                            onPress={resendCode}
                            cont={count}
                            type="sms"
                        />

                        {/* <CButton
                            disabled={!isValid}
                            success
                            padding={12}
                            onPress={handleSubmit}
                        >
                            <CText boldItalic uppercase>
                                Validar e-mail
                            </CText>
                        </CButton>

                        <CButton
                            mt4
                            dark
                            white
                            padding={12}
                            onPress={handleLogout}
                        >
                            <CText boldItalic uppercase>
                                Sair
                            </CText>
                        </CButton> */}
                    </Top>
                    <Bottom>
                        {/* <ThemeButton
                        disabled={!isValid}
                            primary
                            onPress={handleSubmit}
                        >
                            <CText bold>Validar</CText>
                        </ThemeButton> */}

                        <CButton
                            disabled={!isValid}
                            success
                            padding={12}
                            onPress={handleSubmit}
                        >
                            <CText boldItalic uppercase>
                                Validar Telefone
                            </CText>
                        </CButton>

                        <CButton
                            mt4
                            outlined
                            white
                            padding={12}
                            onPress={handleLogout}
                        >
                            <CText boldItalic uppercase>
                                Sair
                            </CText>
                        </CButton>
                    </Bottom>
                </SafeAreaView>
            </Container>
        </>
    )
}

export default AuthPhoneValidatonScreen
