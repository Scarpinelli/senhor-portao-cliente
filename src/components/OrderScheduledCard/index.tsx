import React, { useState, useEffect, useContext } from 'react'
import { Image } from 'react-native'
import { Marker } from 'react-native-maps'
import Badge from 'components/Badge'
import { CLoader, CText, DefaultModal } from 'components'
import PinMarker from 'assets/images/pin.png'
import moment from 'moment'
import { showMessage } from 'react-native-flash-message'
import { DataContext } from 'contexts/AppContext'
import Endpoints from 'services/endpoints'
import {
    Container,
    Map,
    Details,
    Info,
    Status,
    Actions,
    ActionButton,
    Divider,
} from './styles'

type IOrderScheduledCard = {
    map: any
    title: any
    description: any
    date: any
    type: any
    navigation?: any
    id: number
    customer: any
    dataScheduled: any
    item: any
    refreshData: any
}

const OrderScheduledCard: React.FC<IOrderScheduledCard> = ({
    map,
    title,
    description,
    date,
    type,
    navigation,
    id,
    customer,
    dataScheduled,
    item,
    refreshData,
}) => {
    const { resolveError, setOrderPendingStatus } = useContext(DataContext)

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

    const [loader, setLoader] = useState(false)

    const [showModalSignOrder, setShowModalSignOrder] = useState(false)

    const [showModalRejectOrder, setShowModalRejectOrder] = useState(false)

    const handleRejectScheduledOrder = async () => {
        setShowModalRejectOrder(true)
    }

    const handleRejectOrderScheduledSubmit = async () => {
        setLoader(true)

        try {
            const rejectOrder = await Endpoints.cancelOrder(item?.id)

            if (rejectOrder) {
                setOrderPendingStatus(null)
                refreshData()
            }
        } catch (error) {
            let errorMessage = null
            errorMessage =
                (error as any)?.response?.data?.message ||
                'Ocorreu um erro tente novamente'

            // Chama o erro que resolve caso seja o erro de 401 (Sem Autorização / Token Inpirado)

            const res = await resolveError(error)

            if (!res) {
                showMessage({
                    message: errorMessage,
                    type: 'danger',
                    icon: 'danger',
                    position: 'bottom',
                })
            }
        } finally {
            setLoader(false)
        }
    }

    return (
        <>
            <CLoader visible={loader} />

            <DefaultModal
                title="Deseja cancelar essa solicitação?"
                cancel="Fechar"
                textButton="Cancelar"
                visible={showModalRejectOrder}
                handleCancel={() => {
                    setShowModalRejectOrder(false)
                }}
                handleAction={handleRejectOrderScheduledSubmit}
            />

            <Container>
                <Map
                    provider="google"
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
                            {item?.customAddress ? (
                                item?.customAddress
                            ) : (
                                <>
                                    {item?.customerAddress.street},{' '}
                                    {item?.customerAddress.streetNumber},
                                    {item?.customerAddress.zipCode},{' '}
                                    {item?.customerAddress.neighborhood}{' '}
                                    {item?.customerAddress.city},{' '}
                                    {item?.customerAddress.state}
                                </>
                            )}
                        </CText>
                        <CText small black gray>
                            {description}
                        </CText>
                    </Info>
                    <Status>
                        <CText black small mb1>
                            {moment(dataScheduled || date).format(
                                'DD/MM/YYYY hh:mm:ss',
                            )}
                        </CText>
                        <Badge type={type} />
                    </Status>
                </Details>

                <Actions>
                    <ActionButton
                        error
                        onPress={() => handleRejectScheduledOrder()}
                    >
                        <CText center>Cancelar</CText>
                    </ActionButton>
                </Actions>
            </Container>
        </>
    )
}

export default OrderScheduledCard
