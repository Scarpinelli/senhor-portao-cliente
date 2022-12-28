import React from 'react';
import { Container, Title, Man, TitleText, Logo } from './styles';
import { StatusBar } from 'react-native';
import { ThemeText, ThemeButton } from '../../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import LogoImage from '../../assets/images/logo.png';
import ManImage from '../../assets/images/man.png';

const HowItworksScreen: React.FC = () => {
	return (
		<>
			<StatusBar
				barStyle='light-content'
				translucent={true}
				backgroundColor={'transparent'}
			/>
			<Container contentContainerStyle={{ padding: 20 }}>
				<SafeAreaView>
					<Title>
						<TitleText>
							<Logo width={250} height={150} source={LogoImage} />
							<ThemeText h1>Como funciona o Senhor Portão</ThemeText>
						</TitleText>
						<Man source={ManImage} resizeMode={'contain'} />
					</Title>
					<ThemeText mb2>
						Voluptate minim excepteur duis officia dolor. Ea cupidatat ullamco
						incididunt nisi laborum elit. Nisi Lorem commodo non aliquip laboris
						nisi amet eu laborum magna nulla. Magna tempor dolor qui ex id ad.
						Anim do exercitation cupidatat cupidatat fugiat voluptate
						exercitation.
					</ThemeText>
					<ThemeText mb2>
						Sunt dolore aliqua cillum duis esse. Anim nisi irure nisi et id
						voluptate magna. Laborum pariatur nulla ut laborum in consectetur
						dolor id dolore excepteur commodo sint dolor commodo.
					</ThemeText>
					<ThemeText mb2>
						Et Lorem occaecat nisi elit labore. Ea est nulla dolore ex. Ea id
						cillum velit ut anim ea. Reprehenderit Lorem nostrud reprehenderit
						sint non duis magna aliqua ex nostrud qui id. Ullamco consectetur ad
						reprehenderit est laborum fugiat sit est irure nisi.
					</ThemeText>
					<ThemeText mb2>
						Voluptate minim excepteur duis officia dolor. Ea cupidatat ullamco
						incididunt nisi laborum elit. Nisi Lorem commodo non aliquip laboris
						nisi amet eu laborum magna nulla. Magna tempor dolor qui ex id ad.
						Anim do exercitation cupidatat cupidatat fugiat voluptate
						exercitation.
					</ThemeText>
					<ThemeText mb2>
						Sunt dolore aliqua cillum duis esse. Anim nisi irure nisi et id
						voluptate magna. Laborum pariatur nulla ut laborum in consectetur
						dolor id dolore excepteur commodo sint dolor commodo.
					</ThemeText>
					<ThemeText mb2>
						Et Lorem occaecat nisi elit labore. Ea est nulla dolore ex. Ea id
						cillum velit ut anim ea. Reprehenderit Lorem nostrud reprehenderit
						sint non duis magna aliqua ex nostrud qui id. Ullamco consectetur ad
						reprehenderit est laborum fugiat sit est irure nisi.
					</ThemeText>
					<ThemeText mb2>
						Voluptate minim excepteur duis officia dolor. Ea cupidatat ullamco
						incididunt nisi laborum elit. Nisi Lorem commodo non aliquip laboris
						nisi amet eu laborum magna nulla. Magna tempor dolor qui ex id ad.
						Anim do exercitation cupidatat cupidatat fugiat voluptate
						exercitation.
					</ThemeText>
					<ThemeText mb4>
						Sunt dolore aliqua cillum duis esse. Anim nisi irure nisi et id
						voluptate magna. Laborum pariatur nulla ut laborum in consectetur
						dolor id dolore excepteur commodo sint dolor commodo.
					</ThemeText>

					<ThemeButton onPress={() => {}}>
						<ThemeText bold>Continuar</ThemeText>
					</ThemeButton>
				</SafeAreaView>
			</Container>
		</>
	);
};

export default HowItworksScreen;
