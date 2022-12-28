import React, { useState, useEffect, useContext, useRef } from 'react'
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
    Text,
    TouchableOpacity,
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
} from 'components'
import LogoImage from 'assets/images/logo.png'
import { showMessage } from 'react-native-flash-message'

import * as Linking from 'expo-linking'

import LogoIcon1 from 'assets/images/logo-icon-variation-1.png'
import LogoIcon2 from 'assets/images/logo-icon-variation-2.png'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { DataContext } from 'contexts/AppContext'
import Endpoints from 'services/endpoints'
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
    ImageIcon1,
    ImageIcon2,
    LogoContainer
} from './styles'
import * as Env from '../../env'


const RegisterScreen: React.FC = ({ navigation }: any) => {
    const [loader, setLoader] = useState(false)

    const { resolveError, getUser } = useContext(DataContext)

    const handleOpenPrivacy = () => {
        Linking.openURL('https://senhorportao.com.br/politica-de-privacidade')
    }

    const handleOpenTerms = () => {
        Linking.openURL('https://senhorportao.com.br/termos-de-uso')
    }

    const emailRef = useRef(null)
    const dddRef = useRef(null)
    const phoneRef = useRef(null)
    const passwordRef = useRef(null)
    const passwordConfirmationRef = useRef(null)

    const { errors, handleSubmit, isValid, values, handleChange, handleBlur } =
        useFormik({
            initialValues: {
                name: '',
                email: '',
                ddd: '',
                phone: '',
                password: '',
                password_confirmation: '',
            },
            enableReinitialize: true,
            validationSchema: yup.object().shape({
                name: yup.string().required('Informe seu nome completo'),
                email: yup
                    .string()
                    .required('Informe o e-mail')
                    .email('Informa um e-mail válido'),
                ddd: yup.string().required('Insira o DDD'),
                phone: yup.string().required('Insira o Telefone'),
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
                    const data = await Endpoints.signUp({
                        name: _values.name,
                        email: _values.email,
                        phoneCountryCode: 55,
                        phoneAreaCode: _values.ddd,
                        phoneNumber: _values.phone,
                        password: _values.password,
                    })

                    if (data) {
                        showMessage({
                            message: 'Cadastro realizado com sucesso',
                            type: 'success',
                            icon: 'success',
                            position: 'bottom',
                            hideOnPress: false,
                            duration: 4000,
                            floating: true,
                        })

                        const userData = await AppStorage.getData(
                            `${Env.keyPrefix}-user`,
                        )

                        const userToken = await AppStorage.getData(
                            `${Env.keyPrefix}-token`,
                        )

                        setTimeout(() => {
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'Redirect' }],
                            })
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
        })

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
                                Cadastre-se
                            </CText>
                            <CText center mb6>
                                Preencha os campos abaixo e faça parte do Senhor
                                portão.
                            </CText>

                            <CInput
                                default
                                label="Nome"
                                value={values.name}
                                onChangeText={handleChange('name')}
                                autoCapitalize="none"
                                mb2
                                autoCorrect={false}
                                returnKeyType="next"
                                // keyboardType="email-address"
                                enablesReturnKeyAutomatically
                                // autoCompleteType="email"
                                errorMessage={errors.name}
                                onSubmitEditing={() =>
                                    (emailRef as any).current.focus()
                                }
                            />

                            <CInput
                                default
                                label="E-mail"
                                value={values.email}
                                onChangeText={handleChange('email')}
                                autoCapitalize="none"
                                mb2
                                autoCorrect={false}
                                returnKeyType="next"
                                keyboardType="email-address"
                                enablesReturnKeyAutomatically
                                autoCompleteType="email"
                                errorMessage={errors.email}
                                onSubmitEditing={() =>
                                    (emailRef as any).current.focus()
                                }
                            />

                            <FormLogin>
                                <DDD>
                                    <CInput
                                        passRef={dddRef}
                                        default
                                        label="DDD"
                                        value={values.ddd}
                                        onChangeText={handleChange('ddd')}
                                        autoCapitalize="none"
                                        mb2
                                        autoCorrect={false}
                                        returnKeyType="next"
                                        // keyboardType="email-address"
                                        enablesReturnKeyAutomatically
                                        // autoCompleteType="email"
                                        errorMessage={errors.ddd}
                                        onSubmitEditing={() =>
                                            (phoneRef as any).current.focus()
                                        }
                                    />
                                </DDD>
                                <Phone>
                                    <CInput
                                        passRef={phoneRef}
                                        default
                                        label="Telefone"
                                        value={values.phone}
                                        onChangeText={handleChange('phone')}
                                        autoCapitalize="none"
                                        mb2
                                        autoCorrect={false}
                                        returnKeyType="next"
                                        // keyboardType="email-address"
                                        enablesReturnKeyAutomatically
                                        // autoCompleteType="email"
                                        errorMessage={errors.phone}
                                        onSubmitEditing={() =>
                                            (passwordRef as any).current.focus()
                                        }
                                    />
                                </Phone>
                            </FormLogin>
                            <CInput
                                passRef={passwordRef}
                                default
                                label="Senha"
                                value={values.password}
                                onChangeText={handleChange('password')}
                                autoCapitalize="none"
                                mb2
                                autoCorrect={false}
                                returnKeyType="next"
                                // keyboardType="email-address"
                                enablesReturnKeyAutomatically
                                // autoCompleteType="email"
                                errorMessage={errors.password}
                                onSubmitEditing={() =>
                                    (
                                        passwordConfirmationRef as any
                                    ).current.focus()
                                }
                            />

                            <CInput
                                passRef={passwordConfirmationRef}
                                default
                                label="Confirmação de senha"
                                value={values.password_confirmation}
                                onChangeText={handleChange(
                                    'password_confirmation',
                                )}
                                autoCapitalize="none"
                                mb2
                                autoCorrect={false}
                                returnKeyType="go"
                                // keyboardType="email-address"
                                enablesReturnKeyAutomatically
                                // autoCompleteType="email"
                                errorMessage={errors.password_confirmation}
                                onSubmitEditing={() => handleSubmit()}
                            />
                        </Top>
                        <Bottom>
                            <ThemeButton
                                disabled={!isValid}
                                // mt2
                                mb2
                                primary
                                onPress={handleSubmit}
                            >
                                <CText bold>Cadastrar</CText>
                            </ThemeButton>
                            <View
                                style={{
                                    flexWrap: 'wrap',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    marginBottom: 20,
                                }}
                            >
                                <CText small>
                                    Ao se cadastrar você declara estar ciente da{' '}
                                </CText>
                                <TouchableOpacity
                                    onPress={() => handleOpenPrivacy()}
                                >
                                    <CText small primary>
                                        Política de privacidade
                                    </CText>
                                </TouchableOpacity>
                                <CText small> e dos </CText>
                                <TouchableOpacity
                                    onPress={() => handleOpenTerms()}
                                >
                                    <CText small primary>
                                        Termos de uso
                                    </CText>
                                </TouchableOpacity>
                                <CText small> da plataforma. </CText>
                            </View>
                            <Register>
                                <CText small mb2 center>
                                    Já possui uma conta?
                                </CText>
                                <LinkButton
                                    onPress={() => navigation.navigate('Auth')}
                                >
                                    <CText small bold>
                                        Ir Para o login
                                    </CText>
                                </LinkButton>
                            </Register>
                            {/* <CText small mb2 center>
								ou
							</CText>
							<ThemeButton mb2 outlined onPress={() => {}}>
								<CText bold>Cadastrar com facebook</CText>
							</ThemeButton>
							<ThemeButton outlined onPress={() => {}}>
								<CText bold>Cadastrar com google</CText>
							</ThemeButton> */}
                        </Bottom>
                    </SafeAreaView>
                </Container>
            </KeyboardAvoidingView>
        </>
    )
}

export default RegisterScreen
