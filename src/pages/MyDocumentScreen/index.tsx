import React, { useContext, useEffect, useRef, useState } from 'react'

import {
    ThemeButton,
    CText,
    ThemeColors,
    ThemeInput,
    CLoader,
    CInput,
} from 'components'
import { StatusBar, StyleSheet, Alert, Image } from 'react-native'
import { Entypo, EvilIcons, Feather, Fontisto } from '@expo/vector-icons'
import ActionSheet from 'react-native-actionsheet'
import * as ImagePicker from 'expo-image-picker'
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator'
import NoImage from 'assets/images/no-image.jpg'

import { useFormik } from 'formik'
import RNPickerSelect from 'react-native-picker-select'
import * as yup from 'yup'
import moment from 'moment'
import { DataContext } from 'contexts/AppContext'
import Endpoints from 'services/endpoints'
import { showMessage } from 'react-native-flash-message'
// import { StatusBar } from 'expo-status-bar'
import { Colors } from 'styles'
import * as Env from '../../env'
import {
    Container,
    AvatarContainer,
    ImageUserContainer,
    RemoveImage,
    ChangeImage,
} from './styles'

const MyDocumentsScreen: React.FC = ({ navigation }: any) => {
    const [loader, setLoader] = useState(false)

    const { resolveError, getUser, logout, user, documentTypes } =
        useContext(DataContext)

    const [addressState, setAddressState] = useState<any>(null)

    const documentTypeRef = useRef(null)
    const documentRef = useRef(null)

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
            document_type: user?.documentType?.id,
            document: user?.document,
        },
        enableReinitialize: true,
        validationSchema: yup.object().shape({
            document_type: yup
                .string()
                .required('Selecione o tipo de documento'),
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

            try {
                const data = await Endpoints.updateDocument({
                    document_type: values.document_type,
                    document: values.document,
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

    const placeholder = {
        label: 'Selecione a Cor...',
        value: null,
        color: '#000000',
    }

    const handleChangeColor = async (e: any) => {
        setFieldValue('color', e)
    }

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

    const placeholderDocumentType = {
        label: 'Selecione o Tipo de Documento...',
        value: 0,
        color: '#000000',
    }

    const handleChangeDocumentType = async (e: any) => {
        setFieldValue('document_type', e)
    }

    const actionSheetDocument = useRef()

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
            const removeAvatar = await Endpoints.saveImage({
                image: null,
            })

            if (removeAvatar) {
                showMessage({
                    message: 'Imagem removida com sucesso',
                    type: 'success',
                    icon: 'success',
                    position: 'bottom',
                })

                getUser()
            }
        } catch (e) {
            
        }
    }

    const openImagePickerAsyncDocument = async () => {
        const permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync()

        if (permissionResult.granted === false) {
            Alert.alert('É necessária permissão para acessar a câmera !')
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

    const openCameraAsyncDocument = async () => {
        const permissionResult =
            await ImagePicker.requestCameraPermissionsAsync()

        if (permissionResult.granted === false) {
            Alert.alert('É necessária permissão para acessar a câmera !')
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

        try {
            const data = new FormData()
            data.append('documentImage', myFile)

            const updateAvatar = await Endpoints.saveImageDocument(data)

            if (updateAvatar) {
                showMessage({
                    message: 'Imagem alterada com sucesso',
                    type: 'success',
                    icon: 'danger',
                    position: 'bottom',
                    hideOnPress: false,
                    duration: 2500,
                    floating: true,
                })

                await getUser()
            }
        } catch (e) {
            
        }
    }

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
                    Informações pessoais
                </CText>
                <CText black small mb5>
                    Magna ullamco non nulla velit qui in elit laborum. Nisi anim
                    non excepteur officia aliqua ut consequat. Consequat enim
                    cillum tempor deserunt anim nostrud fugiat officia sit.
                    Mollit exercitation duis qui in consequat dolor irure do
                    enim elit. Ut id anim officia veniam culpa eiusmod commodo
                    ut id consequat do quis aute.
                </CText>

                <AvatarContainer>
                    <ImageUserContainer
                        onPress={() =>
                            user?.documentImage
                                ? handleRemoveImage()
                                : (actionSheetDocument as any)?.current?.show()
                        }
                    >
                        {user?.documentImage ? (
                            <Image
                                source={{ uri: user?.documentImage }}
                                style={{
                                    width: '100%',
                                    // height: 140,
                                    // borderRadius: 140,
                                    overflow: 'hidden',
                                }}
                            />
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
                        {user?.photoUrl ? (
                            <RemoveImage onPress={() => handleRemoveImage()}>
                                <Feather
                                    name="trash"
                                    size={20}
                                    color={Colors.white}
                                />
                            </RemoveImage>
                        ) : (
                            <ChangeImage
                                onPress={() =>
                                    (actionSheetDocument as any).current.show()
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

                <RNPickerSelect
                    placeholder={placeholderDocumentType}
                    items={documentTypesList}
                    onValueChange={(e) => handleChangeDocumentType(e)}
                    onUpArrow={() => {
                        // this.inputRefs.firstTextInput.focus()
                    }}
                    onDownArrow={() => {
                        // this.inputRefs.favSport1.togglePicker()
                    }}
                    style={pickerSelectStyles}
                    value={values.document_type}
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
                />

                <ThemeButton disabled={!isValid} onPress={handleSubmit}>
                    <CText bold>Atualizar informações</CText>
                </ThemeButton>
            </Container>

            <ActionSheet
                ref={actionSheetDocument as any}
                title="Selecionar imagem"
                options={['Imagem da Galeria', 'Imagem da Câmera', 'Cancelar']}
                cancelButtonIndex={2}
                destructiveButtonIndex={2}
                onPress={(index: any) => {
                    if (index === 0) {
                        openImagePickerAsyncDocument()
                    } else if (index === 1) {
                        openCameraAsyncDocument()
                    }
                }}
            />

            <ActionSheet
                ref={actionSheetDocument as any}
                title="Selecionar imagem"
                options={['Imagem da Galeria', 'Imagem da Câmera', 'Cancelar']}
                cancelButtonIndex={2}
                destructiveButtonIndex={2}
                onPress={(index: any) => {
                    if (index === 0) {
                        openImagePickerAsyncDocument()
                    } else if (index === 1) {
                        openCameraAsyncDocument()
                    }
                }}
            />
        </>
    )
}

export default MyDocumentsScreen

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
