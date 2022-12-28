import React, { useState, useEffect, useRef } from 'react'
import {
    View,
    Platform,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Alert,
} from 'react-native'
import { SimpleLineIcons } from '@expo/vector-icons'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

import { GoogleAutoComplete } from 'react-native-google-autocomplete'

import Icon from '@expo/vector-icons/MaterialIcons'
import { ThemeText, ThemeColors, ThemeInput } from '../../components'
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
} from './styles'

const SelectAddressScreen: React.FC = ({ navigation }: any) => {
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

    return (
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

                    navigation.navigate('SaveNewAddress', {
                        address: data,
                        details,
                    })

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
    )
}

export default SelectAddressScreen
