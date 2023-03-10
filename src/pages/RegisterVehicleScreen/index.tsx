import React, { useState, useEffect, useContext, useRef } from 'react'
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
    StyleSheet,
    Alert,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Entypo, EvilIcons, Feather, Fontisto } from '@expo/vector-icons'
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator'
import * as ImagePicker from 'expo-image-picker'
import ActionSheet from 'react-native-actionsheet'
import { SvgCssUri } from 'react-native-svg'
import NoImage from 'assets/images/no-image.jpg'
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
    AvatarContainer,
    ImageUserContainer,
    RemoveImage,
    ChangeImage,
    LogoContainer,
} from './styles'

const RegisterVehicleScreen: React.FC = ({ navigation }: any) => {
    const [loader, setLoader] = useState(false)

    let fileVehicle: any = null
    const [imageVehicle, setImageVehicle] = useState<any>()

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

    const brandRef = useRef(null)
    const modelRef = useRef(null)
    const colorRef = useRef(null)
    const boardRef = useRef(null)

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
            brand: '',
            model: '',
            color: '',
            board: '',
            file: '',
        },
        // enableReinitialize: true,
        validationSchema: yup.object().shape({
            brand: yup.string().required('Informe a marca'),
            model: yup.string().required('Informe o modelo'),
            color: yup.string().required('Selecione a Cor'),
            board: yup.string().required('Informe a placa do ve??culo'),
            file: yup.mixed().required('File is required'),
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
                const postData = new FormData()
                postData.append('image', values.file)
                postData.append('brand', values.brand)
                postData.append('model', values.model)
                postData.append('color', values.color)
                postData.append('board', values.board)
                postData.append('active', true)

                const data = await Endpoints.addVehicle(postData)

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

    const placeholder = {
        label: 'Selecione a Cor...',
        value: null,
        color: '#000000',
    }

    const handleChangeColor = async (e: any) => {
        setFieldValue('color', e)
    }

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

    const colorsList = [
        {
            label: 'Branco',
            value: 'Branco',
        },
        {
            label: 'Preto',
            value: 'Preto',
        },
        {
            label: 'Prata',
            value: 'Prata',
        },
        {
            label: 'Laranja',
            value: 'Laranja',
        },
        {
            label: 'Marrom',
            value: 'Marrom',
        },
        {
            label: 'Verde',
            value: 'Verde',
        },
        {
            label: 'Azul',
            value: 'Azul',
        },
        {
            label: 'Amarelo',
            value: 'Amarelo',
        },
        {
            label: 'Vermelho',
            value: 'Vermelho',
        },
        {
            label: 'Roxo',
            value: 'Roxo',
        },
    ]

    const handleRemoveImage = async () => {
        Alert.alert('Deseja remover a imagem?', '', [
            {
                text: 'Cancelar',
            },
            {
                text: 'Confirmar',
                onPress: () => handleRemoveImageSubmit(),
            },
        ])
    }

    const handleRemoveImageSubmit = async () => {
        try {
            // const removeAvatar = await Endpoints.saveImage({
            //     image: null,
            // })
            fileVehicle = null
            setImageVehicle(null)
        } catch (e) {
            
        }
    }

    const openImagePickerAsync = async () => {
        const permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync()

        if (permissionResult.granted === false) {
            Alert.alert('?? necess??ria permiss??o para acessar a c??mera !')
            return
        }

        const options = {
            mediaTypes: 'Images',
            allowsEditing: true,
            aspect: [1, 1],
        }

        await ImagePicker.launchImageLibraryAsync(
            options as ImagePicker.ImagePickerOptions,
        )
            .then((imagePicker: any) => {
                if (imagePicker.cancelled === false) {
                    handleChangeImageProfile(imagePicker?.uri)
                }
            })
            .catch((e) => {})
    }

    const openCameraAsync = async () => {
        const permissionResult =
            await ImagePicker.requestCameraPermissionsAsync()

        if (permissionResult.granted === false) {
            Alert.alert('?? necess??ria permiss??o para acessar a c??mera !')
            return
        }

        const options = {
            mediaTypes: 'Images',
            allowsEditing: true,
            aspect: [1, 1],
        }

        await ImagePicker.launchCameraAsync(options as any)
            .then((imagePicker: any) => {
                // handleChangeImageProfile(image),

                if (imagePicker.cancelled === false) {
                    handleChangeImageProfile(imagePicker?.uri)
                }
            })
            .catch((e) => {})
    }

    const base64ToBlob = async (encoded: any) => {
        const url = `data:image/jpg;base64,${encoded}`
        const res = await fetch(url)
        const blob = await res?.blob()
        return blob
    }

    const handleChangeImageProfile = async (imageManip: any) => {
        const manipResult = await manipulateAsync(
            imageManip,
            [
                {
                    resize: {
                        width: 300,
                    },
                },
            ],
            { compress: 1, base64: true, format: SaveFormat.JPEG },
        )

        const blob = await base64ToBlob(manipResult?.base64)

        const myFile = new File([blob], 'image.jpeg', {
            type: blob.type,
        })

        setFieldValue('file', myFile)
        setImageVehicle(manipResult?.base64)
    }

    const actionSheetPhoto = useRef()

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
                                Cadastre seu ve??culo
                            </CText>
                            <CText mb6 center>
                                Precisamos te identificar. Cadastre seu ve??culo
                                abaixo.
                            </CText>

                            <AvatarContainer>
                                {/* <CText>{imageVehicle}</CText> */}
                                <ImageUserContainer
                                    onPress={() =>
                                        imageVehicle
                                            ? handleRemoveImage()
                                            : (
                                                  actionSheetPhoto as any
                                              )?.current?.show()
                                    }
                                >
                                    {imageVehicle ? (
                                        <>
                                            <Image
                                                source={{
                                                    uri: `data:image/jpeg;base64,${imageVehicle}`,
                                                }}
                                                style={{
                                                    width: '100%',
                                                    height: 200,
                                                    resizeMode: 'cover',
                                                    // borderRadius: 140,
                                                    overflow: 'hidden',
                                                }}
                                            />
                                        </>
                                    ) : (
                                        <Image
                                            source={NoImage}
                                            style={{
                                                width: '100%',
                                                // height: 140,
                                                // borderRadius: 140,
                                                overflow: 'hidden',
                                            }}
                                        />
                                    )}
                                    {imageVehicle ? (
                                        <RemoveImage
                                            onPress={() => handleRemoveImage()}
                                        >
                                            <Feather
                                                name="trash"
                                                size={20}
                                                color={Colors.white}
                                            />
                                        </RemoveImage>
                                    ) : (
                                        <ChangeImage
                                            onPress={() =>
                                                (
                                                    actionSheetPhoto as any
                                                ).current.show()
                                            }
                                        >
                                            <Entypo
                                                name="image"
                                                size={20}
                                                color={Colors.white}
                                            />
                                            <CText ml2>Alterar IMagem</CText>
                                        </ChangeImage>
                                    )}
                                </ImageUserContainer>
                            </AvatarContainer>

                            <CInput
                                passRef={brandRef}
                                default
                                label="Marca"
                                value={values.brand}
                                onChangeText={handleChange('brand')}
                                // onChangeText={(e: any) => handleGetAddress(e)}
                                autoCapitalize="none"
                                mb2
                                autoCorrect={false}
                                returnKeyType="next"
                                keyboardType="number-pad"
                                enablesReturnKeyAutomatically
                                // autoCompleteType="email"
                                errorMessage={errors.brand}
                                onSubmitEditing={() =>
                                    (modelRef as any).current.focus()
                                }
                            />

                            <CInput
                                passRef={modelRef}
                                default
                                label="Modelo"
                                value={values.model}
                                onChangeText={handleChange('model')}
                                // onChangeText={(e: any) => handleGetAddress(e)}
                                autoCapitalize="none"
                                mb2
                                autoCorrect={false}
                                returnKeyType="next"
                                keyboardType="number-pad"
                                enablesReturnKeyAutomatically
                                // autoCompleteType="email"
                                errorMessage={errors.model}
                                onSubmitEditing={() =>
                                    (boardRef as any).current.focus()
                                }
                            />

                            <CInput
                                passRef={boardRef}
                                default
                                label="Placa"
                                value={values.board}
                                onChangeText={handleChange('board')}
                                // onChangeText={(e: any) => handleGetAddress(e)}
                                autoCapitalize="none"
                                mb2
                                autoCorrect={false}
                                returnKeyType="next"
                                keyboardType="number-pad"
                                enablesReturnKeyAutomatically
                                // autoCompleteType="email"
                                errorMessage={errors.board}
                                onSubmitEditing={() =>
                                    (colorRef as any).current.focus()
                                }
                            />

                            <RNPickerSelect
                                passRef={colorRef}
                                placeholder={placeholder}
                                items={colorsList}
                                onValueChange={(e) => handleChangeColor(e)}
                                onUpArrow={() => {
                                    // this.inputRefs.firstTextInput.focus()
                                }}
                                onDownArrow={() => {
                                    // this.inputRefs.favSport1.togglePicker()
                                }}
                                style={pickerSelectStyles}
                                value={values.color}
                                ref={colorRef}
                                textInputProps={{
                                    color: '#000000',
                                }}
                            />
                            {errors.color && (
                                <CText mb3 ml2 error small>
                                    {errors.color}
                                </CText>
                            )}
                        </Top>
                        <Bottom>
                            <ThemeButton
                                disabled={!isValid}
                                mt2
                                mb2
                                primary
                                onPress={handleSubmit}
                            >
                                <CText bold>Cadastrar ve??culo</CText>
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
            <ActionSheet
                ref={actionSheetPhoto as any}
                title="Selecionar imagem"
                options={['Imagem da Galeria', 'Imagem da C??mera', 'Cancelar']}
                cancelButtonIndex={2}
                destructiveButtonIndex={2}
                onPress={(index: any) => {
                    if (index === 0) {
                        openImagePickerAsync()
                    } else if (index === 1) {
                        openCameraAsync()
                    }
                }}
            />
        </>
    )
}

export default RegisterVehicleScreen

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
