import React, { useState, useEffect } from 'react'
import { Image } from 'react-native'
import { Marker } from 'react-native-maps'
import Badge from 'components/Badge'
import { CText } from 'components'
import PinMarker from 'assets/images/pin.png'
import moment from 'moment'
import { Container, Map, Details, Info, Status } from './styles'

type IRequestCard = {
    map: any
    title: any
    description: any
    date: any
    type: any
    navigation?: any
    id: number
    provider: any
}

const RequestCard: React.FC<IRequestCard> = ({
    map,
    title,
    description,
    date,
    type,
    navigation,
    id,
    provider,
}) => {
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
        <Container
            activeOpacity={1}
            onPress={() =>
                navigation.navigate('RequestDetails', {
                    id,
                    latitude: map.latitude,
                    longitude: map.longitude,
                    title,
                    description,
                    map,
                    navigation,
                    provider,
                    date,
                    providerName: provider?.name,
                    providerRating: provider?.rating,
                    type,
                })
            }
        >
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
                region={map}
                // customMapStyle={MapStyle}
            >
                <Marker
                    coordinate={{
                        latitude: map.latitude,
                        longitude: map.longitude,
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
                    <CText black bold>
                        {title}
                    </CText>
                    <CText small black gray>
                        {description}
                    </CText>
                </Info>
                <Status>
                    <CText black small mb1>
                        {moment(date).format('DD/MM/YYYY hh:mm:ss')}
                    </CText>
                    <Badge type={type} />
                </Status>
            </Details>
        </Container>
    )
}

export default RequestCard
