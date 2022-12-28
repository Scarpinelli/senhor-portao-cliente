import React, { useState, useEffect, useRef, useContext } from 'react'
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
    View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Feather from '@expo/vector-icons/Feather'
import { SvgCssUri } from 'react-native-svg'
import * as Location from 'expo-location'
import {
    CInput,
    CLoader,
    ThemeButton,
    ThemeColors,
    ThemeInput,
    CText,
    CButton,
} from 'components'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { DataContext } from 'contexts/AppContext'
import { showMessage } from 'react-native-flash-message'
import Endpoints from 'services/endpoints'
import AppStorage from 'services/data/AppStorage'
import LogoImage from 'assets/images/logo.png'

import LogoIcon1 from 'assets/images/logo-icon-variation-1.png'
import LogoIcon2 from 'assets/images/logo-icon-variation-2.png'
import { FontAwesome } from '@expo/vector-icons'
import { Colors } from 'styles'

import SvgUri from 'react-native-svg-uri';

import * as Env from '../../env'

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
    ButtonsGroup,
    TabButton,
    ButtonsGroupDivider,
    ForgotPassword,
    LogoContainer
} from './styles'

const AuthScreen: React.FC = ({ navigation }: any) => {
    const [loader, setLoader] = useState(false)

    const { resolveError, getUser } = useContext(DataContext)

    const formik = {
        cellphoneAuth: useFormik({
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

                const postData = {
                    auth_type: 0,
                    ddd: values?.ddd,
                    phone: values?.phone,
                }

                try {
                    const data = await Endpoints.signIn(postData)

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

                        await AppStorage.storeData(
                            `${Env.keyPrefix}-phone-auth-${data?.user?.id}`,
                            data?.access_token,
                        )
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'AuthPhoneValidation' }],
                        })
                    }

                    // const location = await Location.getCurrentPositionAsync({})
                        
                    //     if(location){
                    //         const updateUser = await Endpoints.updateUser({
                    //             latitude: (location as any)?.coords?.latitude,
                    //             longitude: (location as any)?.coords?.longitude,
                    //         })

                    //     }

                    await getUser()

                    // // if (data) {
                    // //     await getUser()

                    // //     navigation.reset({
                    // //         index: 0,
                    // //         routes: [{ name: 'Redirect' }],
                    // //     })
                    // // }
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
        mailAuth: useFormik({
            initialValues: {
                email: 'pedro.domingues.dev@gmail.com',
                password: '123123123',
            },
            enableReinitialize: true,
            validationSchema: yup.object().shape({
                email: yup
                    .string()
                    .required('Insira o e-mail')
                    .email('Insira um e-mail válido'),
                password: yup.string().required('Insira a senha'),
            }),
            onSubmit: async (values, { setSubmitting, resetForm }) => {
                setSubmitting(true)
                setLoader(true)

                const postData = {
                    auth_type: 1,
                    email: values?.email,
                    password: values?.password,
                }

                try {
                    const data = await Endpoints.signIn(postData)

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

                        await getUser()

                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Redirect' }],
                        })
                    }

                    // if (data) {
                    //     await getUser()

                    //     navigation.reset({
                    //         index: 0,
                    //         routes: [{ name: 'Redirect' }],
                    //     })
                    // }
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

    const dddRef = useRef(null)
    const phoneRef = useRef(null)

    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const [activeTab, setActiveTab] = useState(0)

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
                            <Logo width={200} height={100} source={LogoImage} />
                            </LogoContainer>
                            <CText center h1 mb2>
                                Bem-vindo de volta!
                            </CText>
                            <CText center mb6>
                                Entre ou cadastre-se em nossa plataforma.
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
                                <View>
                                    {/* <DDD> */}
                                    <CInput
                                        passRef={dddRef}
                                        default
                                        label="DDD"
                                        value={formik.cellphoneAuth.values.ddd}
                                        onChangeText={formik.cellphoneAuth.handleChange(
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
                                            formik.cellphoneAuth.errors.ddd
                                        }
                                        onSubmitEditing={() =>
                                            (phoneRef as any).current.focus()
                                        }
                                    />
                                    {/* </DDD> */}

                                    {/* <Phone> */}
                                    <CInput
                                        passRef={phoneRef}
                                        default
                                        label="Telefone"
                                        value={
                                            formik.cellphoneAuth.values.phone
                                        }
                                        onChangeText={formik.cellphoneAuth.handleChange(
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
                                            formik.cellphoneAuth.errors.phone
                                        }
                                        onSubmitEditing={() =>
                                            formik.cellphoneAuth.handleSubmit()
                                        }
                                    />
                                    {/* </Phone> */}
                                </View>
                            ) : (
                                <View>
                                    <CInput
                                        passRef={emailRef}
                                        mb4
                                        default
                                        label="E-mail"
                                        value={formik.mailAuth.values.email}
                                        onChangeText={formik.mailAuth.handleChange(
                                            'email',
                                        )}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        returnKeyType="next"
                                        keyboardType="email-address"
                                        enablesReturnKeyAutomatically
                                        autoCompleteType="email"
                                        errorMessage={
                                            formik.mailAuth.errors.email
                                        }
                                        onSubmitEditing={() =>
                                            (passwordRef as any).current.focus()
                                        }
                                        // backgroundPersonalized={
                                        //     formik.mailAuth
                                        //         ? 'rgba(2, 8, 51,0.6)'
                                        //         : 'rgba(2, 8, 51,0.2)'
                                        // }
                                    />
                                    <CInput
                                        passRef={passwordRef}
                                        mb4
                                        default
                                        label="Senha"
                                        value={formik.mailAuth.values.password}
                                        onChangeText={formik.mailAuth.handleChange(
                                            'password',
                                        )}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        returnKeyType="next"
                                        enablesReturnKeyAutomatically
                                        isPassword
                                        errorMessage={
                                            formik.mailAuth.errors.password
                                        }
                                        onSubmitEditing={() =>
                                            formik.mailAuth.handleSubmit()
                                        }
                                        // backgroundPersonalized={
                                        //     isFocused
                                        //         ? 'rgba(2, 8, 51,0.6)'
                                        //         : 'rgba(2, 8, 51,0.2)'
                                        // }
                                    />
                                    <ForgotPassword>
                                        <FontAwesome
                                            name="lock"
                                            color={Colors.muted}
                                        />
                                        <CButton
                                            nopadding
                                            link
                                            ml2
                                            boxed={false}
                                            onPress={() =>
                                                navigation.navigate(
                                                    'ForgotPassword',
                                                )
                                            }
                                        >
                                            Esqueci minha senha
                                        </CButton>
                                    </ForgotPassword>
                                </View>
                            )}
                        </Top>
                        <Bottom>
                            {activeTab === 0 ? (
                                <ThemeButton
                                    primary
                                    disabled={!formik.cellphoneAuth.isValid}
                                    mt2
                                    mb2
                                    onPress={formik.cellphoneAuth.handleSubmit}
                                >
                                    <CText bold>Entrar com celular</CText>
                                </ThemeButton>
                            ) : (
                                <ThemeButton
                                    primary
                                    disabled={!formik.mailAuth.isValid}
                                    mt2
                                    mb2
                                    onPress={formik.mailAuth.handleSubmit}
                                >
                                    <CText bold>Entrar com e-mail</CText>
                                </ThemeButton>
                            )}
                            <Register>
                                <CText small mb2 center>
                                    Ainda não tem uma conta?
                                </CText>
                                <LinkButton
                                    onPress={() =>
                                        navigation.navigate('Register')
                                    }
                                >
                                    <CText small bold>
                                        Cadastre-se
                                    </CText>
                                </LinkButton>
                            </Register>
                            {/* <CText small mb2 center>
                                ou
                            </CText>
                            <ThemeButton mb2 outlined onPress={() => {}}>
                                <CText bold>Entrar com facebook</CText>
                            </ThemeButton>
                            <ThemeButton outlined onPress={() => {}}>
                                <CText bold>Entrar com google</CText>
                            </ThemeButton> */}
                        </Bottom>
                    </SafeAreaView>
                </Container>
            </KeyboardAvoidingView>
        </>
    )
}

export default AuthScreen
