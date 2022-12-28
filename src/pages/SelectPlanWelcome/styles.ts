import styled from 'styled-components/native';
import { ThemeColors, ThemeText } from '../../components';

export const Container = styled.ScrollView`
    /* justify-content: space-between; */
    background: ${ThemeColors.secondary};
    flex: 1;
    /* min-height: 100%; */
`;

export const Top = styled.View`
    padding: 20px;
    flex: 2;
    position: relative;
    /* flex-grow: 1; */
`;

export const Bottom = styled.View`
    justify-content: space-between;
    padding: 20px;
    flex: 1;
`;

export const Logo = styled.Image`
    margin-bottom: 30px;
`;

export const LinkButton = styled.TouchableOpacity`
    padding: 0;
    line-height: 1;
    margin: 0;
    margin-left: 5px;
`;

export const Register = styled.View`
    flex-direction: row;
    justify-content: center;
`;

export const Icon1 = styled.View`
    background: ${ThemeColors.primary};
    width: 100px;
    height: 100px;
    border-radius: 40px;

    position: absolute;
    top: -60px;
    right: 30px;
    align-items: center;
    justify-content: center;
`;

export const Icon2 = styled.View`
    background: ${ThemeColors.yellow};
    width: 50px;
    height: 50px;
    border-radius:20px;

    position: absolute;
    top: 60px;
    right: 20px;
    align-items: center;
    justify-content: center;
`;
export const FormLogin = styled.View`
    flex-direction: row;
    flex: 1;
`;

export const DDD = styled.View`
    width: 80px;
`;

export const Phone = styled.View`
    flex: 1;
    margin-left: 10px;
`;

export const ImageIcon1 = styled.Image`
    width: 60px;
    height: 60px;
`;

export const ImageIcon2 = styled.Image`
    width: 40px;
    height: 40px;
`;



export const CardPlan = styled.View`
	border-radius: 20px;
	box-shadow: 5px 5px 5px #00000010;
	elevation: 8;
	background: #ffffff;
	/* margin-bottom: 10px; */
	/* margin-top: 20px; */
	position: relative;
`;

export const CardHeader = styled.View`
	padding: 0 20px;
	border-top-left-radius: 20px;
	border-top-right-radius: 20px;
	flex-direction: column;
    background: ${ThemeColors.primary};
`;

export const CardTitle = styled.View`
	border-bottom-width: 1px;
	border-bottom-color: #ffffff70;
	text-align: center;
	justify-content: center;
	align-items: center;
	padding: 10px 0px 10px;
`;

export const CardPrice = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: center;
	padding: 10px 0px 10px;
`;

export const CardInfo = styled.View`
	margin-bottom: 20px;
`;

export const CardGrid = styled.View``;

export const CardItem = styled(ThemeText)`
	text-align: center;
	padding: 10px 0;
	justify-content: center;
	background: ${(props: any) => (props.odd ? '#f1f1f1' : '#ffffff')};
`;

export const CardAnualValue = styled.View`
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 20px 10px;
	background: #ffffff;
`;

export const CardAnualValueContent = styled.View`
	flex-direction: row;
	align-items: center;
	margin-top: 10px;
`;

export const CardButton = styled.TouchableOpacity`
	/* margin: 0 30px 30px; */
	border: 1px solid;
	border-color: ${ThemeColors.muted};
	text-align: center;
	padding: 10px 30px;
	border-radius: 5px;
`;

export const CardButtonContainer = styled.View`
	padding: 0 30px 30px;
	align-items: center;
	justify-content: center;
`;

export const CarousselContainer = styled.View`
	margin-top: 0px;
	min-height: 400px;
	height: 100%;
	/* background: #ff0000; */
	/* margin-bottom: 30px; */
`;

export const BagdePromotion = styled.ImageBackground`
	position: absolute;
	width: 120px;
	height: 120px;
	z-index: 20;
	top: -20px;
	right: -50px;
	transform: rotate(25deg);
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 5px 5px 10px #00000030;
	elevation: 5;
`;

export const BagdePromotionContent = styled.View``;

export const TextTitle = styled.Text`
	font-size: 8px;
	text-align: center;
	color: #2a5212;
	text-transform: uppercase;
`;
export const TextDescription = styled(ThemeText)`
	font-size: 9px;
	font-weight: ${(props: any) => (props.bold ? 'bold' : 'normal')};
	text-align: center;
	color: #2a5212;
`;

export const TextDescriptionAnual = styled(ThemeText)`
	font-size: 14px;
	font-weight: ${(props: any) => (props.bold ? 'bold' : 'normal')};
	text-align: center;
	color: #2a5212;
`;

export const ValueContent = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: center;
`;

export const Value = styled(ThemeText)`
	font-size: 30px;
	color: #2a5212;
`;

export const Percent = styled(ThemeText)`
	font-size: 16px;
	color: #2a5212;
`;

export const TitleContainer = styled.View`
    padding: 20px 20px 0 20px;
`;

export const LogoContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;