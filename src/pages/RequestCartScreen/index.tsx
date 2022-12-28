import React, { useEffect, useState } from 'react';
import { Container, ButtonContainer } from './styles';
import { ThemeColors, ThemeText, ThemeButton } from '../../components';
import { FlatList, RefreshControl } from 'react-native';

import CartProduct from '../../components/CartProduct';
import { SafeAreaView } from 'react-native-safe-area-context';

const RequestCardScreen: React.FC = ({ navigation }: any) => {
	const [refreshing, setRefreshing] = useState(false);
	const [page, setPage] = useState(1);
	const [products, setProducts] = useState([
		{
			id: 1,
			title: 'Adipisicing amet irure nisi minim consequat pariatur ',
			description:
				'Non sit dolor laboris aliquip ut est amet occaecat cupidatat labore nisi reprehenderit.',
			value: '89,90',
			estoque: 90,
		},
		{
			id: 2,
			title: 'Adipisicing amet irure nisi minim consequat pariatur ',
			description:
				'Non sit dolor laboris aliquip ut est amet occaecat cupidatat labore nisi reprehenderit.',
			value: '89,90',
			estoque: 90,
		},
		{
			id: 3,
			title: 'Adipisicing amet irure nisi minim consequat pariatur ',
			description:
				'Non sit dolor laboris aliquip ut est amet occaecat cupidatat labore nisi reprehenderit.',
			value: '89,90',
			estoque: 90,
		},
		{
			id: 4,
			title: 'Adipisicing amet irure nisi minim consequat pariatur ',
			description:
				'Non sit dolor laboris aliquip ut est amet occaecat cupidatat labore nisi reprehenderit.',
			value: '89,90',
			estoque: 90,
		},
		{
			id: 5,
			title: 'Adipisicing amet irure nisi minim consequat pariatur ',
			description:
				'Non sit dolor laboris aliquip ut est amet occaecat cupidatat labore nisi reprehenderit.',
			value: '89,90',
			estoque: 90,
		},
		{
			id: 6,
			title: 'Adipisicing amet irure nisi minim consequat pariatur ',
			description:
				'Non sit dolor laboris aliquip ut est amet occaecat cupidatat labore nisi reprehenderit.',
			value: '89,90',
			estoque: 90,
		},
		{
			id: 7,
			title: 'Adipisicing amet irure nisi minim consequat pariatur ',
			description:
				'Non sit dolor laboris aliquip ut est amet occaecat cupidatat labore nisi reprehenderit.',
			value: '89,90',
			estoque: 90,
		},
		{
			id: 8,
			title: 'Adipisicing amet irure nisi minim consequat pariatur ',
			description:
				'Non sit dolor laboris aliquip ut est amet occaecat cupidatat labore nisi reprehenderit.',
			value: '89,90',
			estoque: 90,
		},
		{
			id: 9,
			title: 'Adipisicing amet irure nisi minim consequat pariatur ',
			description:
				'Non sit dolor laboris aliquip ut est amet occaecat cupidatat labore nisi reprehenderit.',
			value: '89,90',
			estoque: 90,
		},
		{
			id: 10,
			title: 'Adipisicing amet irure nisi minim consequat pariatur ',
			description:
				'Non sit dolor laboris aliquip ut est amet occaecat cupidatat labore nisi reprehenderit.',
			value: '89,90',
			estoque: 90,
		},
	]);

	const renderItem = ({ item }: any) => {
		return (
			<CartProduct
				key={item.id}
				title={item.title}
				description={item.description}
				value={item.value}
				estoque={item.estoque}
			/>
		);
	};

	const reloadItems = () => {
		setPage(1);
	};

	const loadData = async () => {
		
	};

	return (
		<>
			<Container>
				<FlatList
					data={products}
					renderItem={renderItem}
					refreshing={refreshing}
					onRefresh={() => reloadItems()}
					keyExtractor={(item) => item.id.toString()}
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={() => reloadItems()}
							titleColor='#fff'
							progressBackgroundColor='#fff'
							colors={[ThemeColors.primary]}
						/>
					}
				/>
			</Container>
			<ButtonContainer>
				<ThemeButton primary onPress={() => navigation.navigate('Main')}>
					<ThemeText bold>Salvar</ThemeText>
				</ThemeButton>
				<ThemeButton
					mt2
					onPress={() => navigation.navigate('RequestCartObservation')}
				>
					<ThemeText bold>Adicionar observações</ThemeText>
				</ThemeButton>
			</ButtonContainer>
		</>
	);
};

export default RequestCardScreen;
