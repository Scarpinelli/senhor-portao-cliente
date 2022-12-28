import styled from 'styled-components/native';
import ThemeColors from '../../components/ThemeColors';

export const Container = styled.View`
	flex: 1;
	background-color: ${ThemeColors.secondary};
	align-items: center;
	justify-content: center;
`;

export const Logo = styled.Image`
    margin-bottom: 30px;
`;