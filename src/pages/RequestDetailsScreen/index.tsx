import React, { useState, useEffect } from 'react'

import { Marker } from 'react-native-maps'
import Icon from '@expo/vector-icons/FontAwesome'
import moment from 'moment'
import { Image } from 'react-native'
import PinMarker from 'assets/images/pin.png'
import {
    Container,
    Map,
    Details,
    Info,
    Status,
    Professional,
    UserContainer,
    UserInfo,
    UserRating,
} from './styles'
import Badge from '../../components/Badge'
import { ThemeText, ThemeColors } from '../../components'
import Avatar from '../../components/Avatar'

interface IRequestDetails {
    id: any
    navigation?: any
    latitude: any
    longitude: any
    map: any
    title: any
    description: any
    provider: any
    date: any
    providerName: any
    providerRating: any
}

const RequestDetailsScreen: React.FC = (props) => {
    
    const image = null

    const MapStyle = [
        {
            elementType: 'geometry',
            stylers: [
                {
                    color: '#f5f5f5',
                },
            ],
        },
        {
            elementType: 'labels.icon',
            stylers: [
                {
                    visibility: 'off',
                },
            ],
        },
        {
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#616161',
                },
            ],
        },
        {
            elementType: 'labels.text.stroke',
            stylers: [
                {
                    color: '#f5f5f5',
                },
            ],
        },
        {
            featureType: 'administrative.land_parcel',
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#bdbdbd',
                },
            ],
        },
        {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#eeeeee',
                },
            ],
        },
        {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#757575',
                },
            ],
        },
        {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#e5e5e5',
                },
            ],
        },
        {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#9e9e9e',
                },
            ],
        },
        {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#ffffff',
                },
            ],
        },
        {
            featureType: 'road.arterial',
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#757575',
                },
            ],
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#dadada',
                },
            ],
        },
        {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#616161',
                },
            ],
        },
        {
            featureType: 'road.local',
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#9e9e9e',
                },
            ],
        },
        {
            featureType: 'transit.line',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#e5e5e5',
                },
            ],
        },
        {
            featureType: 'transit.station',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#eeeeee',
                },
            ],
        },
        {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#c9c9c9',
                },
            ],
        },
        {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#9e9e9e',
                },
            ],
        },
    ]

    return (
        <Container>
            <Map
                // provider="google"
                showsCompass={false}
                showsTraffic={false}
                showsIndoors={false}
                rotateEnabled={false}
                pitchEnabled={false}
                zoomEnabled={false}
                zoomTapEnabled={false}
                zoomControlEnabled={false}
                scrollEnabled={false}
                loadingEnabled
                region={{
                    latitude: (props as any).route.params.latitude || 0,
                    longitude: (props as any).route.params.longitude || 0,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                // customMapStyle={MapStyle}
            >
                <Marker
                    coordinate={{
                        latitude: (props as any).route.params.latitude,
                        longitude: (props as any).route.params.longitude,
                    }}
                >
                    <Image
                        source={PinMarker}
                        style={{ height: 80, width: 80 }}
                        resizeMode="contain"
                    />
                </Marker>
            </Map>
            <Details>
                <Info>
                    <ThemeText black bold>
                        {(props as any).route.params.title}
                    </ThemeText>
                    <ThemeText small black gray mb2>
                        {(props as any).route.params.description}
                    </ThemeText>
                </Info>
                <Status>
                    <Badge type={(props as any).route.params.type} />
                </Status>
            </Details>

            <Professional>
                <ThemeText black bold mb2>
                    Profissional:
                </ThemeText>
                <UserContainer>
                    <Avatar image={image} size={60} />
                    <UserInfo>
                        <ThemeText black bold>
                            {(props as any).route.params.providerName}
                        </ThemeText>
                        <UserRating>
                            <ThemeText mr1 black>
                                {(props as any).route.params.provider?.rating}
                            </ThemeText>
                            <Icon
                                name="star"
                                size={12}
                                color={ThemeColors.primary}
                            />
                        </UserRating>
                    </UserInfo>
                </UserContainer>
            </Professional>
            <Details>
                <ThemeText black mt4>
                    Data da Solicitação:
                </ThemeText>
                <ThemeText black bold>
                    {moment((props as any).route.params.date).format(
                        'DD/MM/YYYY hh:mm:ss',
                    )}
                </ThemeText>

                <ThemeText black mt4>
                    Valor total:
                </ThemeText>
                <ThemeText black bold>
                    R$ {(props as any).route.params.value} 89.00
                </ThemeText>
            </Details>
        </Container>
    )
}

export default RequestDetailsScreen
