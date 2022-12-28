import React, { useEffect, useContext, useRef, useState } from 'react'

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

const SaveNewAddressScreen: React.FC = ({ navigation, route }: any) => {
    
    const [loader, setLoader] = useState(false)

    const { resolveError, getUser, logout, user, getAddress } =
        useContext(DataContext)

    const holderNameRef = useRef(null)
    const numberRef = useRef(null)
    const expMonthRef = useRef(null)
    const expYearRef = useRef(null)
    const cvvRef = useRef(null)

    const [zipCodeAddress, setZipCodeAddress] = useState<any>(null)
    const [stateAddress, setStateAddress] = useState<any>(null)
    const [cityAddress, setCityAddress] = useState<any>(null)
    const [neighborhoodAddress, setNeighborhoodAddress] = useState<any>(null)
    const [streetAddress, setStreetAddress] = useState<any>(null)
    const [streetNumberAddress, setStreetNumberAddress] = useState<any>(null)
    const [complementAddress, setComplementAddress] = useState<any>(null)
    const [latitudeAddress, setLatitudeAddress] = useState<any>(null)
    const [longitudeAddress, setLongitudeAddress] = useState<any>(null)

    const getLocationAddress = async () => {
        /* Extrai o Zipcode */
        const zipCode = route.params?.details?.address_components.filter(
            (component: any) => component?.types[0] === 'postal_code',
        )

        setZipCodeAddress(zipCode[0].long_name)

        /* Extrai o Estado */
        const state = route.params?.details?.address_components.filter(
            (component: any) =>
                component?.types[0] === 'administrative_area_level_1',
        )
        setStateAddress(state[0].long_name)

        /* Extrai a Cidade */
        const city = route.params?.details?.address_components.filter(
            (component: any) =>
                component?.types[0] === 'administrative_area_level_2',
        )
        setCityAddress(city[0].long_name)

        /* Extrai o Bairro */
        const neighborhood = route.params?.details?.address_components.filter(
            (component: any) => component?.types[0] === 'sublocality_level_1',
        )
        setNeighborhoodAddress(neighborhood[0].long_name)

        /* Extrai o Endereco */
        const address = route.params?.details?.address_components.filter(
            (component: any) => component?.types[0] === 'route',
        )
        setStreetAddress(address[0].long_name)

        /* Extrai o Número */
        const streetNumber = route.params?.details?.address_components.filter(
            (component: any) => component?.types[0] === 'street_number',
        )
        setStreetNumberAddress(streetNumber[0].long_name)

        const latitude = String(route?.params?.details?.geometry?.location?.lat)
        setLatitudeAddress(latitude)

        const longitude = String(
            route?.params?.details?.geometry?.location?.lng,
        )
        setLongitudeAddress(longitude)
    }

    useEffect(() => {
        getLocationAddress()
        ;() => {
            setZipCodeAddress(null)
            setStateAddress(null)
            setCityAddress(null)
            setNeighborhoodAddress(null)
            setStreetAddress(null)
            setStreetNumberAddress(null)
            setComplementAddress(null)
            setLatitudeAddress(null)
            setLongitudeAddress(null)
        }
    }, [route.params])

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
            alias: '',
        },
        enableReinitialize: true,
        validationSchema: yup.object().shape({
            alias: yup.string().nullable(),
        }),
        onSubmit: async (_values, { setSubmitting, resetForm }) => {

            setSubmitting(true)
            setLoader(true)

            try {
                const data = await Endpoints.newAddress({
                    alias: values.alias,
                    default: true,
                    zipCode: zipCodeAddress,
                    state: stateAddress,
                    city: cityAddress,
                    neighborhood: neighborhoodAddress,
                    street: streetAddress,
                    streetNumber: streetNumberAddress,
                    complement: complementAddress,
                    latitude: latitudeAddress,
                    longitude: longitudeAddress,
                })

                if (data) {
                    await getUser()

                    showMessage({
                        message: 'Endereço salvo com sucesso',
                        type: 'success',
                        icon: 'success',
                        position: 'bottom',
                        hideOnPress: false,
                        duration: 2500,
                        floating: true,
                    })

                    resetForm()

                    await getAddress()

                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Main' }],
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
                    Salvar endereço:
                </CText>
                <CText black small mb5>
                    {route.params?.address.description}
                </CText>

                <CInput
                    default
                    label="Apelido para o endereço"
                    value={values.alias}
                    onChangeText={handleChange('alias')}
                    // onChangeText={(e: any) => handleGetAddress(e)}
                    autoCapitalize="none"
                    mb2
                    autoCorrect={false}
                    returnKeyType="next"
                    keyboardType="default"
                    enablesReturnKeyAutomatically
                    // autoCompleteType="email"
                    errorMessage={errors.alias}
                    onSubmitEditing={() => (numberRef as any).current.focus()}
                />

                <ThemeButton disabled={!isValid} onPress={handleSubmit}>
                    <CText bold>Salvar endereço</CText>
                </ThemeButton>
            </Container>
        </>
    )
}

export default SaveNewAddressScreen
