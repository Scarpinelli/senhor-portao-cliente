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
	FormLogin,
	DDD,
	Phone,
	FormCodeContainer,
	CodeNumberInput,
	ImageIcon1,
	ImageIcon2,
	LogoContainer,
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

const VerificationCode: React.FC = ({ navigation }: any) => {
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
						{/* <Icon1>
							<ImageIcon1 source={LogoIcon1} resizeMode={'contain'} />
						</Icon1>

						<Icon2>
							<ImageIcon2 source={LogoIcon2} resizeMode={'contain'} />
						</Icon2> */}
						<LogoContainer>
						<Logo width={250} height={150} source={LogoImage} />
						</LogoContainer>
						<ThemeText h1 mb2 center>
							Quase lá
						</ThemeText>
						<ThemeText mb6 center>
							{/* Magna adipisicing cillum velit voluptate nulla ullamco nulla. Sunt
							id non sunt commodo reprehenderit dolore pariatur sint aliqua ut */}
						</ThemeText>

						<ThemeText center mb4 bold>
							Código de verificação
						</ThemeText>

						<FormCodeContainer>
							<CodeNumberInput maxLength={1} />
							<CodeNumberInput maxLength={1} />
							<CodeNumberInput maxLength={1} />
							<CodeNumberInput maxLength={1} />
							<CodeNumberInput maxLength={1} />
						</FormCodeContainer>
					</Top>
					<Bottom>
						<ThemeButton primary onPress={() => navigation.navigate('Main')}>
							<ThemeText bold>Validar</ThemeText>
						</ThemeButton>
					</Bottom>
				</SafeAreaView>
			</Container>
		</>
	);
};

export default VerificationCode;
