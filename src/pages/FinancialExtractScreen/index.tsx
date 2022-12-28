import React, { useState, useEffect, useContext } from 'react'
import { FlatList, RefreshControl } from 'react-native'
import Icon from '@expo/vector-icons/Feather'

import { ThemeText, ThemeColors, ThemeButton, NoRegister } from 'components'
import FinancialExtractCard from 'components/FinancialExtractCard'
import Endpoints from 'services/endpoints'
import { showMessage } from 'react-native-flash-message'
import { DataContext } from 'contexts/AppContext'
import { Container } from './styles'

const FinancialExtractScreen: React.FC = () => {
    const [refreshing, setRefreshing] = useState(false)
    const [page, setPage] = useState(1)

    const { resolveError } = useContext(DataContext)

    const [extract, setExtract] = useState<any>([
        // {
        //     id: 1,
        //     type: 0,
        //     title: 'Irure non velit sit cillum ad enim ea amet.',
        //     description:
        //         'Deserunt qui dolore non do et irure nisi occaecat aute.',
        //     value: '89,00',
        // },
        // {
        //     id: 2,
        //     type: 1,
        //     title: 'Irure non velit sit cillum ad enim ea amet.',
        //     description:
        //         'Deserunt qui dolore non do et irure nisi occaecat aute.',
        //     value: '89,00',
        // },
        // {
        //     id: 3,
        //     type: 0,
        //     title: 'Irure non velit sit cillum ad enim ea amet.',
        //     description:
        //         'Deserunt qui dolore non do et irure nisi occaecat aute.',
        //     value: '89,00',
        // },
        // {
        //     id: 4,
        //     type: 1,
        //     title: 'Irure non velit sit cillum ad enim ea amet.',
        //     description:
        //         'Deserunt qui dolore non do et irure nisi occaecat aute.',
        //     value: '89,00',
        // },
        // {
        //     id: 5,
        //     type: 0,
        //     title: 'Irure non velit sit cillum ad enim ea amet.',
        //     description:
        //         'Deserunt qui dolore non do et irure nisi occaecat aute.',
        //     value: '89,00',
        // },
        // {
        //     id: 6,
        //     type: 0,
        //     title: 'Irure non velit sit cillum ad enim ea amet.',
        //     description:
        //         'Deserunt qui dolore non do et irure nisi occaecat aute.',
        //     value: '89,00',
        // },
        // {
        //     id: 7,
        //     type: 1,
        //     title: 'Irure non velit sit cillum ad enim ea amet.',
        //     description:
        //         'Deserunt qui dolore non do et irure nisi occaecat aute.',
        //     value: '89,00',
        // },
        // {
        //     id: 8,
        //     type: 0,
        //     title: 'Irure non velit sit cillum ad enim ea amet.',
        //     description:
        //         'Deserunt qui dolore non do et irure nisi occaecat aute.',
        //     value: '89,00',
        // },
        // {
        //     id: 9,
        //     type: 0,
        //     title: 'Irure non velit sit cillum ad enim ea amet.',
        //     description:
        //         'Deserunt qui dolore non do et irure nisi occaecat aute.',
        //     value: '89,00',
        // },
        // {
        //     id: 10,
        //     type: 0,
        //     title: 'Irure non velit sit cillum ad enim ea amet.',
        //     description:
        //         'Deserunt qui dolore non do et irure nisi occaecat aute.',
        //     value: '89,00',
        // },
        // {
        //     id: 11,
        //     type: 1,
        //     title: 'Irure non velit sit cillum ad enim ea amet.',
        //     description:
        //         'Deserunt qui dolore non do et irure nisi occaecat aute.',
        //     value: '89,00',
        // },
        // {
        //     id: 12,
        //     type: 0,
        //     title: 'Irure non velit sit cillum ad enim ea amet.',
        //     description:
        //         'Deserunt qui dolore non do et irure nisi occaecat aute.',
        //     value: '89,00',
        // },
    ])

    const renderItem = ({ item }: any) => {
        return (
            <FinancialExtractCard
                key={item.id}
                type={item.type}
                title={item.title}
                description={item.description}
                value={item.value}
            />
        )
    }

    const reloadItems = () => {
        setPage(1)
    }

    const [loader, setLoader] = useState(false)

    const loadData = async () => {
        setLoader(true)
        // planService

        try {
            const dataContracts = await Endpoints.getExtractContract()

            if (dataContracts) {
                // setExtract([...extract, dataContracts])
            }

            const dataOrders = await Endpoints.getExtractOrders()

            if (dataOrders) {
                // setExtract([...extract, dataOrders])
            }
        } catch (error) {

            let errorMessage = null
            errorMessage =
                (error as any)?.response?.data?.notificacao?.mensagemAmigavel ||
                'Ocorreu um erro, tente novamente'

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
            setLoader(false)
        }
    }

    return (
        <Container>
            {extract.length > 0 ? (
                <FlatList
                    data={extract}
                    renderItem={renderItem}
                    refreshing={refreshing}
                    onRefresh={() => reloadItems()}
                    keyExtractor={(item) => (item as any)?.id.toString()}
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

export default FinancialExtractScreen
