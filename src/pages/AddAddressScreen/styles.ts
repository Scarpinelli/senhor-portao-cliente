import styled from 'styled-components/native';
import ThemeColors from '../../components/ThemeColors';

export const Container = styled.ScrollView`
    flex: 1;
`;


export const InputContainer = styled.View`
	/* flex: 1; */
	/* padding: 20px; */
	/* height: 60px; */
	flex-direction: row;
	align-items: center;
`;

export const InputSearch = styled.TextInput`
	/* height: 20px; */
	flex: 1;
	margin-right: 10px;
`;

export const SearchButton = styled.TouchableOpacity`
	/* position: absolute;
  right: 18px;
  top: 18px; */
`;

export const Divider = styled.View`
	width: 1px;
	height: 20px;
	background: #b9c8cd;
	margin-right: 10px;
`;

export const RowResultButton = styled.TouchableOpacity`
	flex-direction: row;
	align-items: center;
	flex: 1;
	padding: 10px 10px;
	/* height: 70px; */
	/* background: #ff0000; */
`;

export const RowIconContainer = styled.View`
	margin-left: 20px;
`;

export const RowTextContainer = styled.View`
	flex: 1;
	flex-direction: row;
	align-items: center;
`;

export const IconDestiny = styled.View`
	width: 36px;
	height: 36px;
	border-radius: 18px;
	background: #79959e30;
	align-items: center;
	justify-content: center;
	margin-right: 10px;
`;

export const RowContainer = styled.View`
	border-top-width: 1px;
	border-top-color: #79959e10;
	height: 70;
	padding: 0;
`;
