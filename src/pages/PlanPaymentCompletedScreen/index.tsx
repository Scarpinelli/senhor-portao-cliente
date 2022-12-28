import React, { useState, useEffect } from 'react';
import {
	Container,
	Top,
	Bottom,
	Logo,
	LinkButton,
	Register,
	Icon1,
	Icon2,
	Icon3,
	Icon4,
	FormLogin,
	DDD,
	Phone,
	FormCodeContainer,
	CodeNumberInput,
	ImageIcon1,
	ImageIcon2,
} from './styles';
import { Image, TextInput, StatusBar } from 'react-native';
import {
	ThemeButton,
	ThemeText,
	ThemeColors,
	ThemeInput,
} from '../../components';
import LogoImage from '../../assets/images/logo.png';
import { SafeAreaView } from 'react-native-safe-area-context';

import LogoIcon1 from '../../assets/images/logo-icon-variation-1.png';
import LogoIcon2 from '../../assets/images/logo-icon-variation-2.png';

import { SvgCssUri } from 'react-native-svg';

const PlanPaymentCompletedScreen: React.FC = ({ navigation }: any) => {
	const [ddd, setDdd] = useState('');
	const [phone, setPhone] = useState('');
	return (
		<>
			<StatusBar
				barStyle='light-content'
				translucent={true}
				backgroundColor={'transparent'}
			/>
			<Container>
				<SafeAreaView style={{ flex: 1 }}>
					<Top>
						<Icon1>
							<ImageIcon1 source={LogoIcon1} resizeMode={'contain'} />
						</Icon1>

						<Icon2>
							<ImageIcon1 source={LogoIcon2} resizeMode={'contain'} />
						</Icon2>

						<Icon3>
							<ImageIcon1 source={LogoIcon1} resizeMode={'contain'} />
						</Icon3>
						<Icon4>
							<ImageIcon1 source={LogoIcon2} resizeMode={'contain'} />
						</Icon4>
						<ThemeText h1 mb2 center>
							Pagamento Realizado
						</ThemeText>
						
					</Top>
					<Bottom>
						<ThemeButton primary onPress={() => navigation.navigate('Main')}>
							<ThemeText bold>Voltar para a tela inicial</ThemeText>
						</ThemeButton>
					</Bottom>
				</SafeAreaView>
			</Container>
		</>
	);
};

export default PlanPaymentCompletedScreen;
