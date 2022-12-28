import React, { useState, useEffect, useRef, useContext } from 'react'
import {
    View,
    Platform,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Alert,
} from 'react-native'
import { SimpleLineIcons, Fontisto } from '@expo/vector-icons'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import IconFontisto from '@expo/vector-icons/Fontisto'
import { GoogleAutoComplete } from 'react-native-google-autocomplete'

import Icon from '@expo/vector-icons/MaterialIcons'
import { DataContext } from 'contexts/AppContext'
import { ThemeText, ThemeColors, ThemeInput, CText } from '../../components'
import {
    Container,
    InputContainer,
    SearchButton,
    Divider,
    InputSearch,
    RowIconContainer,
    RowResultButton,
    RowTextContainer,
    RowContainer,
    IconDestiny,
    Tabs,
    TabButton,
    DividerHorizontal,
    MyPlaces,
    MyPlacesTitle,
    AddressContainer,
    AddressMarker,
    AddressInfo,
    NewAddressButton,
} from './styles'

const SelectAddressOrderScreen: React.FC = ({ navigation }: any) => {
    const { addressList } = useContext(DataContext)
    const GooglePlacesRefInitial = useRef(null)
    const GooglePlacesRefDestiny = useRef(null)
    const searchRef = useRef(null)

    const [initialValue, setInitialValue] = useState('')
    const [destinyValue, setDestinyValue] = useState('')

    const [showClearButton, setShowClearButton] = useState(false)
    const [search, setSearch] = useState('')
    const [searchText, setSearchText] = useState('')

    const [loader, setLoader] = useState(false)

    const handleChangeSearch = (value: any) => {
        setSearch(value)
        value !== '' ? setShowClearButton(true) : setShowClearButton(false)
    }

    const handleClearSearch = () => {
        setSearch('')
        setShowClearButton(false)
        ;(GooglePlacesRefInitial as any)?.current.setAddressText('')
    }

    const [activeTab, setActiveTab] = useState(0)

    const handleChangeTab = (type: number) => {
        setActiveTab(type)
    }

    const [zipCodeAddress, setZipCodeAddress] = useState<any>(null)
    const [stateAddress, setStateAddress] = useState<any>(null)
    const [cityAddress, setCityAddress] = useState<any>(null)
    const [neighborhoodAddress, setNeighborhoodAddress] = useState<any>(null)
    const [streetAddress, setStreetAddress] = useState<any>(null)
    const [streetNumberAddress, setStreetNumberAddress] = useState<any>(null)
    const [complementAddress, setComplementAddress] = useState<any>(null)
    const [latitudeAddress, setLatitudeAddress] = useState<any>(null)
    const [longitudeAddress, setLongitudeAddress] = useState<any>(null)

    const getLocationAddress = async (details: any) => {
        /* Extrai o Zipcode */
        const zipCode = details?.address_components.filter(
            (component: any) => component?.types[0] === 'postal_code',
        )

        /* Extrai o Estado */
        const state = details?.address_components.filter(
            (component: any) =>
                component?.types[0] === 'administrative_area_level_1',
        )

        /* Extrai a Cidade */
        const city = details?.address_components.filter(
            (component: any) =>
                component?.types[0] === 'administrative_area_level_2',
        )

        /* Extrai o Bairro */
        const neighborhood = details?.address_components.filter(
            (component: any) => component?.types[0] === 'sublocality_level_1',
        )

        /* Extrai o Endereco */
        const address = details?.address_components.filter(
            (component: any) => component?.types[0] === 'route',
        )

        /* Extrai o Número */
        const streetNumber = details?.address_components.filter(
            (component: any) => component?.types[0] === 'street_number',
        )

        const latitude = String(details?.geometry?.location?.lat)

        const longitude = String(details?.geometry?.location?.lng)

        const selectedAddress = {
            zipCode: zipCode[0]?.long_name,
            state: state[0]?.long_name,
            city: city[0]?.long_name,
            neighborhood: neighborhood[0]?.long_name,
            street: address[0]?.long_name,
            streetNumber: streetNumber[0]?.long_name,
            complement: null,
            latitude,
            longitude,
        }

        navigation.reset({
            index: 0,
            routes: [
                {
                    name: 'Main',
                    params: {
                        address: selectedAddress,
                    },
                },
            ],
        })
    }

    return (
        <>
            <Tabs>
                <TabButton
                    onPress={() => handleChangeTab(0)}
                    active={activeTab === 0}
                >
                    <CText center black>
                        Novo Local
                    </CText>
                </TabButton>
                <TabButton
                    onPress={() => handleChangeTab(1)}
                    active={activeTab === 1}
                >
                    <CText center black>
                        Meus locais
                    </CText>
                </TabButton>
            </Tabs>

            {activeTab === 0 ? (
                <Container keyboardShouldPersistTaps="handled">
                    <GooglePlacesAutocomplete
                        ref={GooglePlacesRefInitial}
                        minLength={2}
                        placeholder="Para onde deseja solicitar?"
                        query={{
                            key: 'AIzaSyAjXJabltISEDFr7zHyAVXTDU5oEOH1xc8',
                            language: 'pt',
                            components: 'country:br',
                        }}
                        suppressDefaultStyles={false}
                        keyboardShouldPersistTaps="always"
                        onPress={(data, details) => {
                            // Alert.alert('TESTE');
                            // GooglePlacesRef.current.triggerBlur();
                            // setLoader(true);

                            // navigation.navigate('SaveNewAddress', {
                            //     address: data,
                            //     details,
                            // })

                            getLocationAddress(details)

                            // setTimeout(() => {
                            // 	navigator.navigate('SearchStack', {
                            // 		screen: 'SearchPeriod',
                            // 		params: {
                            // 			placeID: details.place_id,
                            // 			placeName: details.formatted_address,
                            // 			lat: details.geometry.location.lat.toFixed(7),
                            // 			lng: details.geometry.location.lng.toFixed(7),
                            // 			levelAddress: details.types[0],
                            // 		},
                            // 	});
                            // 	setLoader(false);
                            // }, 10);
                        }}
                        isRowScrollable={false}
                        listViewDisplayed={false}
                        disableScroll
                        // autoFocus={true}
                        // textInputHide
                        // renderRow={(props) => (
                        // 	<TouchableOpacity {...props}>
                        // 		<RowContainer>
                        // 			<RowResultButton>
                        // 				<RowTextContainer>
                        // 					<IconDestiny>
                        // 						<Icon name='room' size={20} color={'#ffffff'} />
                        // 					</IconDestiny>
                        // 					<ThemeText black numberOfLines={1}>
                        // 						{props.description}
                        // 					</ThemeText>
                        // 				</RowTextContainer>
                        // 				<RowIconContainer>
                        // 					<Icon name='room' size={20} color={'#ffffff'} />
                        // 				</RowIconContainer>
                        // 			</RowResultButton>
                        // 		</RowContainer>
                        // 	</TouchableOpacity>
                        // )}
                        listEmptyComponent={() => (
                            <View style={{ paddingVertical: 20 }}>
                                <ThemeText black bold>
                                    Nenhum resultado encontrado
                                </ThemeText>
                            </View>
                        )}
                        fetchDetails
                        enablePoweredByContainer={false}
                        textInputProps={{
                            clearButtonMode: 'while-editing',
                            autoCapitalize: 'none',
                            autoCorrect: false,
                            onChangeText: (text) => handleChangeSearch(text),
                            placeholderTextColor: '#cccccc',
                        }}
                        renderRightButton={() => (
                            <>
                                {Platform.OS === 'android' && showClearButton && (
                                    <TouchableOpacity
                                        hitSlop={{
                                            top: 10,
                                            right: 10,
                                            bottom: 10,
                                            left: 10,
                                        }}
                                        style={{
                                            padding: 10,
                                            marginRight: 5,
                                        }}
                                        onPress={() => handleClearSearch()}
                                    >
                                        <ThemeText>X</ThemeText>
                                    </TouchableOpacity>
                                )}
                            </>
                        )}
                        styles={{
                            container: {
                                position: 'relative',
                                marginTop: 10,
                                marginBottom: 0,
                                padding: 0,
                            },
                            textInputContainer: {
                                flexDirection: 'row',
                                alignItems: 'center',
                                margin: 0,
                                padding: 0,
                                marginHorizontal: 0,
                                backgroundColor: ThemeColors.bg1,
                                height: 50,
                                borderTopEndRadius: 0,
                                borderBottomEndRadius: 0,
                                borderTopLeftRadius: 0,
                                borderBottomLeftRadius: 0,
                                marginBottom: 0,
                            },
                            textInput: {
                                flex: 1,
                                height: 50,
                                // backgroundColor: '#ff0000',
                                // lineHeight: Platform.OS == 'android' ? 20 : 0,
                                margin: 0,
                                borderRadius: 0,
                                paddingTop: 0,
                                marginTop: Platform.OS === 'android' ? 0 : 0,
                                marginLeft: 0,
                                marginRight: 0,
                                borderWidth: 0,
                                color: ThemeColors.black,
                                fontSize: 12,
                                paddingHorizontal: 20,
                            },

                            loader: {
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                height: 0,
                            },

                            listView: {
                                marginTop: 0,
                                marginBottom: 0,
                                paddingBottom: 0,
                            },
                        }}
                    />
                </Container>
            ) : (
                <>
                    <MyPlaces>
                        <MyPlacesTitle>
                            <CText bold mt4 mb2 black>
                                Meus locais
                            </CText>

                            <NewAddressButton
                                onPress={() =>
                                    navigation.navigate('SelectAddress')
                                }
                            >
                                <CText muted small>
                                    Adicionar novo
                                </CText>
                            </NewAddressButton>
                        </MyPlacesTitle>

                        {addressList?.length > 0 ? (
                            <>
                                {addressList.map(
                                    (address: any, index: number) => {
                                        return (
                                            <AddressContainer
                                                key={index}
                                                onPress={() =>
                                                    navigation.reset({
                                                        index: 0,
                                                        routes: [
                                                            {
                                                                name: 'Main',
                                                                params: {
                                                                    address,
                                                                },
                                                            },
                                                        ],
                                                    })
                                                }
                                            >
                                                <AddressMarker>
                                                    <IconFontisto
                                                        name="map-marker-alt"
                                                        size={20}
                                                    />
                                                </AddressMarker>
                                                <AddressInfo>
                                                    <CText black bold>
                                                        {address?.alias
                                                            ? address?.alias
                                                            : address?.street}
                                                    </CText>
                                                    <CText small black>
                                                        {address.street},{' '}
                                                        {address.streetNumber},{' '}
                                                        {address.complement}{' '}
                                                        {address.neighborhood} -{' '}
                                                        {address.state},{' '}
                                                        {address.city} -{' '}
                                                        {address.zipCode}
                                                    </CText>
                                                </AddressInfo>
                                            </AddressContainer>
                                        )
                                    },
                                )}
                            </>
                        ) : (
                            <>
                                <CText black ml4 mb4 muted>
                                    Você não possui locais salvos
                                </CText>
                            </>
                        )}
                    </MyPlaces>
                </>
            )}
        </>
    )
}

export default SelectAddressOrderScreen
