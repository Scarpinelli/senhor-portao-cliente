import React, { useContext, useEffect, useState } from 'react'
import { FlatList, RefreshControl } from 'react-native'
import { NoRegister, ThemeColors, ThemeText } from 'components'

import Endpoints from 'services/endpoints'
import { showMessage } from 'react-native-flash-message'
import { DataContext } from 'contexts/AppContext'
import OrderScheduledCard from 'components/OrderScheduledCard'
import { Container, Content } from './styles'

const MyScheduledOrdersScreen: React.FC = ({ navigation }: any) => {
    const [loader, setLoader] = useState(false)
    const { getUser, resolveError } = useContext(DataContext)
    const [refreshing, setRefreshing] = useState(false)
    const [page, setPage] = useState(1)
    const [requests, setRequests] = useState([])

    const refreshData = async () => {
        loadData()
    }

    const renderItem = ({ item }: any) => {
        let newStatus
        if (
            item?.status === 'WAITING' ||
            item?.status === 'MATCH' ||
            item?.status === 'FOUND' ||
            item?.status === 'FOUND' ||
            item?.status === 'ACCEPT' ||
            item?.status === 'REJECT' ||
            item?.status === 'ACCEPT'
        ) {
            newStatus = 0
        } else if (
            item?.status === 'CANCELED' ||
            item?.status === 'CANCELED_FOUND_PROVIDER' ||
            item?.status === 'FINANCIAL_PENDING'
        ) {
            newStatus = 1
        } else if (
            item?.status === 'SCHEDULED' ||
            item?.status === 'SCHEDULE_MATCH' ||
            item?.status === 'SCHEDULE_ACCEPT'
        ) {
            newStatus = 3
        } else {
            newStatus = 1
        }

        return (
            <OrderScheduledCard
                key={item?.id}
                map={{
                    latitude: item?.customAddress
                        ? item?.currentLatitude
                        : item?.customerAddress?.latitude,
                    longitude: item?.customAddress
                        ? item?.currentLongitude
                        : item?.customerAddress?.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                title={
                    item?.customAddress
                        ? item.customAddress
                        : item?.customerAddress?.street
                }
                description={item?.service_description}
                date={item?.dateRequest}
                dataScheduled={item?.dateScheduled}
                type={newStatus}
                navigation={navigation}
                id={item.id}
                customer={item?.customer}
                item={item}
                refreshData={refreshData}
            />
        )
    }

    const reloadItems = () => {
        setPage(1)
    }

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        setLoader(true)
        try {
            const data = await Endpoints.getAllOrdersScheduled()

            if (data) {
                setRequests(data.reverse())
            }

            await getUser()
        } catch (error) {
            let errorMessage = null
            errorMessage =
                (error as any)?.response?.data?.message ||
                'Ocorreu um erro tente novamente'

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
            {requests.length > 0 ? (
                <Container>
                    <FlatList
                        data={requests}
                        renderItem={renderItem}
                        refreshing={refreshing}
                        onRefresh={() => reloadItems()}
                        keyExtractor={(item) => (item as any).id.toString()}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={() => reloadItems()}
                                titleColor="#fff"
                                progressBackgroundColor="#fff"
                                colors={[ThemeColors.primary]}
                            />
                        }
                    />
                </Container>
            ) : (
                <Content>
                    <NoRegister />
                </Content>
            )}
        </>
    )
}

export default MyScheduledOrdersScreen
