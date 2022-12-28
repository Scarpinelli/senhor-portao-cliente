import React, { useContext, useEffect, useState } from 'react'
import { FlatList, RefreshControl } from 'react-native'
import { NoRegister, ThemeColors, ThemeText } from 'components'

import RequestCard from 'components/RequestCard'
import Endpoints from 'services/endpoints'
import { showMessage } from 'react-native-flash-message'
import { DataContext } from 'contexts/AppContext'
import { Container } from './styles'

const MyRequestsScreen: React.FC = ({ navigation }: any) => {
    const [loader, setLoader] = useState(false)
    const { getUser, resolveError } = useContext(DataContext)
    const [refreshing, setRefreshing] = useState(false)
    const [page, setPage] = useState(1)
    const [requests, setRequests] = useState([])

    const renderItem = ({ item }: any) => {
        let newStatus
        if (
            item?.status === 'WAITING' ||
            item?.status === 'MATCH' ||
            item?.status === 'FOUND' ||
            item?.status === 'FOUND' ||
            item?.status === 'SCHEDULED' ||
            item?.status === 'SCHEDULED_ACCEPT' ||
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
            newStatus = 2
        } else {
            newStatus = 1
        }

        return (
            <RequestCard
                key={item?.id}
                map={{
                    latitude: item?.customer?.currentLatitude || 0,
                    longitude: item?.customer?.currentLongitude || 0,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                title={item?.customer?.street}
                description={item?.service_description}
                date={item?.dateRequest}
                type={newStatus}
                navigation={navigation}
                id={item.id}
                provider={item?.provider}
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
            const data = await Endpoints.getAllOrders()

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
        <Container>
            {requests.length > 0 ? (
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
            ) : (
                <NoRegister />
            )}
        </Container>
    )
}

export default MyRequestsScreen
