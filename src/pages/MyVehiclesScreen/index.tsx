import React, {
    useEffect,
    useState,
    useLayoutEffect,
    useCallback,
    useContext,
} from 'react'
import { FlatList, RefreshControl } from 'react-native'
import Icon from '@expo/vector-icons/Feather'
import { useFocusEffect } from '@react-navigation/native'
import Endpoints from 'services/endpoints'
import { showMessage } from 'react-native-flash-message'
import { DataContext } from 'contexts/AppContext'
import PaymentMethodCard from 'components/PaymentMethodCard'
import VehicleCard from 'components/VehicleCard'
import { Container } from './styles'

import { ThemeText, ThemeColors, ThemeButton, CLoader } from '../../components'

const MyVehiclesScreen: React.FC = ({ navigation }: any) => {
    const { resolveError, getUser, logout, user } = useContext(DataContext)
    const [refreshing, setRefreshing] = useState(false)
    const [page, setPage] = useState(1)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: (props: any) => (
                <ThemeButton
                    mr4
                    link
                    nopadding
                    onPress={() => navigation.navigate('NewVehicle')}
                >
                    <Icon name="plus" size={20} color={ThemeColors.primary} />
                </ThemeButton>
            ),
        })
    }, [])

    const [vehicles, setVehicles] = useState<any>([])

    const loadVehicles = async () => {
        const data = await Endpoints.getVehicles()

        if (data) {
            setVehicles(data)
        }
    }

    useFocusEffect(
        useCallback(() => {
            loadVehicles()
        }, []),
    )

    const renderItem = ({ item }: any) => {
        return (
            <VehicleCard
                key={Math.random()}
                id={item?.id}
                brand={item?.brand}
                model={item?.model}
                color={item?.color}
                // navigation={navigation}
                showDelete
                showPrincipal
                onPress={() => {}}
                principal={item?.active}
                handleRemoveVehicle={handleRemoveVehicle}
                handlePrincipalVehicle={handlePrincipalVehicle}
            />
        )
    }

    const [loader, setLoader] = useState(false)

    const handleRemoveVehicle = async (id: number) => {
        setLoader(true)

        try {
            const deleteVehicle = await Endpoints.deleteVehicle(id)

            if (deleteVehicle) {
                const newVehicles = vehicles.filter((cc: any) => cc?.id !== id)
                setVehicles(newVehicles)
                await getUser()

                showMessage({
                    message: 'Cartão removido com sucesso',
                    type: 'success',
                    icon: 'danger',
                    position: 'bottom',
                    hideOnPress: false,
                    duration: 2500,
                    floating: true,
                })
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

    const handlePrincipalVehicle = async (id: number) => {
        setLoader(true)

        try {
            const updateVehicle = await Endpoints.updateVehiclePrincipal(id)

            if (updateVehicle) {
                await getUser()

                await loadData()
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

    const reloadItems = () => {
        setPage(1)
    }

    const loadData = async () => {

    }

    return (
        <>
            <CLoader visible={loader} />
            <Container>
                <FlatList
                    data={vehicles}
                    renderItem={renderItem}
                    refreshing={refreshing}
                    onRefresh={() => reloadItems()}
                    keyExtractor={(item) => item.id.toString()}
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
        </>
    )
}

export default MyVehiclesScreen
