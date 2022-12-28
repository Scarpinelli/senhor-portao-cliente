import React, { useContext, useEffect, useState } from 'react'
import { FlatList, RefreshControl } from 'react-native'
import Endpoints from 'services/endpoints'
import { showMessage } from 'react-native-flash-message'
import { DataContext } from 'contexts/AppContext'
import { Container } from './styles'
import { CLoader, NoRegister, ThemeColors, ThemeText } from '../../components'

import FaqCard from '../../components/FaqCard'

const FaqScreen: React.FC = ({ navigation }: any) => {
    const [refreshing, setRefreshing] = useState(false)
    const [page, setPage] = useState(1)
    const [faqList, setFaqList] = useState([])
    const { user, resolveError, getUser } = useContext(DataContext)
    const [loader, setLoader] = useState(false)

    const loadData = async () => {
        setLoader(true)

        try {
            const faqs = await Endpoints.getFaqs()

            if (faqs) {

                const filteredFaqs = faqs.filter(
                    (item: any) => item.type !== 'CUSTOMER',
                )

                setFaqList(filteredFaqs)
                // setFaqList(faqs)
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

    useEffect(() => {
        loadData()
    }, [])

    const renderItem = ({ item }: any) => {
        return (
            <FaqCard
                key={item?.id}
                title={item?.name}
                description={item?.description}
                date={item?.date}
                type={item?.type}
                navigation={navigation}
            />
        )
    }

    const reloadItems = async () => {
        loadData()
    }

    return (
        <>
            <CLoader visible={loader} />
            <Container>
                {faqList.length > 0 ? (
                    <FlatList
                        data={faqList}
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
        </>
    )
}

export default FaqScreen
