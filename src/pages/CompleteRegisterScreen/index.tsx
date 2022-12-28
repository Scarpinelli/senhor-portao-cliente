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
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select'
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
    LogoContainer,
} from './styles'

const CompleteRegisterScreen: React.FC = ({ navigation }: any) => {
    const [loader, setLoader] = useState(false)

    const {
        resolveError,
        getUser,
        genders,
        documentTypes,
        getGenders,
        getDocumentTypes,
        logout,
    } = useContext(DataContext)

    const [addressState, setAddressState] = useState<any>(null)

    const zipCodeRef = useRef(null)
    const addressRef = useRef(null)
    const complementRef = useRef(null)
    const numberRef = useRef(null)
    const stateRef = useRef(null)
    const cityRef = useRef(null)
    const neightboorRef = useRef(null)
    const genderRef = useRef(null)
    const documentTypeRef = useRef(null)
    const documentRef = useRef(null)

    const [genderList, setGenderList] = useState([])
    const [documentTypesList, setDocumentTypesList] = useState([])

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
            

            zipcode: '',
            address: '',
            complement: '',
            number: '',
            state: '',
            city: '',
            neighboor: '',
            gender: 0,
            document_type: 0,
            document: '',
        },
        // enableReinitialize: true,
        validationSchema: yup.object().shape({
            zipcode: yup.string().required('Informe o cep'),
            address: yup.string().required('Informe o endereço'),
            complement: yup.string().nullable(),
            number: yup.string().required('Insira o número'),
            state: yup.string().required('Selecione o Estado'),
            city: yup.string().required('Insira a Cidade'),
            neighboor: yup.string().required('Insira o Bairro'),
            gender: yup.number().required('Selecione o gênero'),
            document_type: yup
                .number()
                .required('Selecione o tipo de Documento'),
            document: yup.string().required('Informe o documento'),
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

            if (values.gender === 0) {
                showMessage({
                    message: 'Selecione o gênero',
                    type: 'danger',
                    icon: 'danger',
                    position: 'bottom',
                    hideOnPress: false,
                    duration: 2500,
                    floating: true,
                })
            }

            if (values.document_type === 0) {
                showMessage({
                    message: 'Selecione o tipo de documento',
                    type: 'danger',
                    icon: 'danger',
                    position: 'bottom',
                    hideOnPress: false,
                    duration: 2500,
                    floating: true,
                })
            }

            try {
                const data = await Endpoints.completeRegister({
                    zipCode: values.zipcode,
                    street: values.address,
                    complement: values.complement,
                    streetNumber: values.number,
                    state: values.state,
                    city: values.city,
                    neighborhood: values.neighboor,
                    genderId: values.gender,
                    documentTypeId: values.document_type,
                    document: values.document,
                    // country: 'Brasil',
                })

                if (data) {
                    showMessage({
                        message: 'Salvo com sucesso',
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

    const handleGetAddress = async (e: any) => {
        const zipCodeValue = e

        if (zipCodeValue.includes('_')) {
            return
        }

        const sanitizedCEP = zipCodeValue.replace(/\D/, '')

        if (sanitizedCEP.length !== 8) {
            return
        }

        const { data } = await axios.get(
            `https://viacep.com.br/ws/${sanitizedCEP}/json/`,
        )

        const state = StatesList.find((state) => state?.value === data?.uf)

        if (state?.value) {
            setAddressState(state?.value)
        }

        setFieldValue('city', (data as any)?.localidade)
        setFieldValue('address', (data as any)?.logradouro)
        setFieldValue('neighboor', (data as any)?.bairro)
        setFieldValue('state', (data as any)?.uf, true)
    }

    useEffect(() => {
        handleGetAddress(values.zipcode)
    }, [values.zipcode])

    const placeholder = {
        label: 'Selecione o Estado...',
        value: null,
        color: '#000000',
    }

    const placeholderGender = {
        label: 'Selecione o Gênero...',
        value: 0,
        color: '#000000',
    }

    const placeholderDocumentType = {
        label: 'Selecione o Tipo de Documento...',
        value: 0,
        color: '#000000',
    }

    const handleChangeState = async (e: any) => {
        setFieldValue('state', e)
    }

    const handleChangeGender = async (e: any) => {
        setFieldValue('gender', e)
    }

    const handleChangeDocumentType = async (e: any) => {
        setFieldValue('document_type', e)
    }

    const createGenderList = async () => {
        const genderMapped = genders.map((i: any) => {
            return {
                value: i.id,
                label: i.name,
            }
        })

        setGenderList(genderMapped)
    }

    useEffect(() => {
        createGenderList()
    }, [genders])

    const createDocumentTypesList = async () => {
        const documentTypesMapped = documentTypes.map((i: any) => {
            return {
                value: i.id,
                label: i.name,
            }
        })

        setDocumentTypesList(documentTypesMapped)
    }

    useEffect(() => {
        createDocumentTypesList()
    }, [documentTypes])

    useEffect(() => {
        getGenders()
        getDocumentTypes()
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
                                Complete seu cadastro
                            </CText>
                            <CText mb6 center>
                                Precisamos de mais alguns dados antes de
                                prosseguirmos. Preencha o formulário abaixo.
                            </CText>

                            <RNPickerSelect
                                placeholder={placeholderGender}
                                items={genderList}
                                onValueChange={(e) => handleChangeGender(e)}
                                onUpArrow={() => {
                                    // this.inputRefs.firstTextInput.focus()
                                }}
                                onDownArrow={() => {
                                    // this.inputRefs.favSport1.togglePicker()
                                }}
                                style={pickerSelectStyles}
                                value={values.gender}
                                ref={zipCodeRef}
                                textInputProps={{
                                    color: '#000000',
                                }}
                            />
                            {errors.gender && (
                                <CText mb3 ml2 error small>
                                    {errors.gender}
                                </CText>
                            )}

                            <RNPickerSelect
                                placeholder={placeholderDocumentType}
                                items={documentTypesList}
                                onValueChange={(e) =>
                                    handleChangeDocumentType(e)
                                }
                                onUpArrow={() => {
                                    // this.inputRefs.firstTextInput.focus()
                                }}
                                onDownArrow={() => {
                                    // this.inputRefs.favSport1.togglePicker()
                                }}
                                style={pickerSelectStyles}
                                value={values.document_type}
                                ref={zipCodeRef}
                                textInputProps={{
                                    color: '#000000',
                                }}
                            />
                            {errors.document_type && (
                                <CText mb3 ml2 error small>
                                    {errors.document_type}
                                </CText>
                            )}

                            <CInput
                                default
                                label="Documento"
                                value={values.document}
                                onChangeText={handleChange('document')}
                                // onChangeText={(e: any) => handleGetAddress(e)}
                                autoCapitalize="none"
                                mb2
                                autoCorrect={false}
                                returnKeyType="next"
                                keyboardType="number-pad"
                                enablesReturnKeyAutomatically
                                // autoCompleteType="email"
                                errorMessage={errors.document}
                                onSubmitEditing={() =>
                                    (zipCodeRef as any).current.focus()
                                }
                            />

                            <CInput
                                default
                                label="CEP"
                                value={values.zipcode}
                                onChangeText={handleChange('zipcode')}
                                // onChangeText={(e: any) => handleGetAddress(e)}
                                autoCapitalize="none"
                                mb2
                                autoCorrect={false}
                                returnKeyType="next"
                                keyboardType="number-pad"
                                enablesReturnKeyAutomatically
                                // autoCompleteType="email"
                                errorMessage={errors.zipcode}
                                onSubmitEditing={() =>
                                    (addressRef as any).current.focus()
                                }
                            />

                            <CInput
                                default
                                label="Endereço"
                                value={values.address}
                                onChangeText={handleChange('address')}
                                autoCapitalize="none"
                                mb2
                                autoCorrect={false}
                                returnKeyType="next"
                                enablesReturnKeyAutomatically
                                errorMessage={errors.address}
                                onSubmitEditing={() =>
                                    (complementRef as any).current.focus()
                                }
                            />

                            <CInput
                                default
                                label="Complemento"
                                value={values.complement}
                                onChangeText={handleChange('complement')}
                                autoCapitalize="none"
                                mb2
                                autoCorrect={false}
                                returnKeyType="next"
                                enablesReturnKeyAutomatically
                                errorMessage={errors.complement}
                                onSubmitEditing={() =>
                                    (numberRef as any).current.focus()
                                }
                            />

                            <CInput
                                default
                                label="Número"
                                value={values.number}
                                onChangeText={handleChange('number')}
                                autoCapitalize="none"
                                mb2
                                autoCorrect={false}
                                returnKeyType="next"
                                keyboardType="number-pad"
                                enablesReturnKeyAutomatically
                                errorMessage={errors.number}
                                onSubmitEditing={() =>
                                    (stateRef as any).current.focus()
                                }
                            />

                            {/* <CInput
                                default
                                label="Estado"
                                value={values.state}
                                onChangeText={handleChange('state')}
                                autoCapitalize="none"
                                mb2
                                autoCorrect={false}
                                returnKeyType="next"
                                enablesReturnKeyAutomatically
                                errorMessage={errors.state}
                                onSubmitEditing={() =>
                                    (cityRef as any).current.focus()
                                }
                            /> */}

                            <RNPickerSelect
                                placeholder={placeholder}
                                items={StatesList}
                                onValueChange={(e) => handleChangeState(e)}
                                onUpArrow={() => {
                                    // this.inputRefs.firstTextInput.focus()
                                }}
                                onDownArrow={() => {
                                    // this.inputRefs.favSport1.togglePicker()
                                }}
                                style={pickerSelectStyles}
                                value={values.state}
                                ref={stateRef}
                                textInputProps={{
                                    color: '#000000',
                                }}
                            />
                            {errors.state && (
                                <CText mb3 ml2 error small>
                                    {errors.state}
                                </CText>
                            )}

                            <CInput
                                default
                                label="Cidade"
                                value={values.city}
                                onChangeText={handleChange('city')}
                                autoCapitalize="none"
                                mb2
                                autoCorrect={false}
                                returnKeyType="next"
                                enablesReturnKeyAutomatically
                                errorMessage={errors.city}
                                onSubmitEditing={() =>
                                    (neightboorRef as any).current.focus()
                                }
                            />

                            <CInput
                                default
                                label="Bairro"
                                value={values.neighboor}
                                onChangeText={handleChange('neighboor')}
                                autoCapitalize="none"
                                mb2
                                autoCorrect={false}
                                returnKeyType="next"
                                enablesReturnKeyAutomatically
                                errorMessage={errors.neighboor}
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
                                <CText bold>Completar meu cadastro</CText>
                            </ThemeButton>
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
            </KeyboardAvoidingView>
        </>
    )
}

export default CompleteRegisterScreen

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
