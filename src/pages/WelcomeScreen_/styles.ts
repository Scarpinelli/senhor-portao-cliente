import styled from 'styled-components/native';
import { ThemeColors } from '../../components';

export const Slide = styled.View`
    flex: 1;
	background-color: ${ThemeColors.secondary};
	align-items: center;
	justify-content: center;
`;

export const SlideContainer = styled.View`
    flex: 1;
    align-items: center;
	justify-content: space-between;
    width: 100%;
    background-color: ${ThemeColors.secondary};
    position: relative;
`;

export const SlideAction = styled.View`
    margin-bottom: 30px;
    padding: 0 20px;
    flex: 1;
`;

export const SlideInfo = styled.View`
    flex: 2;
    align-items: center;
	justify-content: center;
    position: relative;
    min-width: 100%;
`;

export const Logo = styled.Image`
    margin-bottom: 30px;
`;

export const Icon1 = styled.View`
    background: ${ThemeColors.primary};
    width: 100px;
    height: 100px;
    border-radius: 40px;

    position: absolute;
    top: -20px;
    left: 100px;
    align-items: center;
    justify-content: center;
`;

export const Icon2 = styled.View`
    background: ${ThemeColors.yellow};
    width: 70px;
    height: 70px;
    border-radius: 30px;

    position: absolute;
    top: 90px;
    right: 20px;
    align-items: center;
    justify-content: center;
`;

export const Icon3 = styled.View`
    background: ${ThemeColors.primary};
    width: 100px;
    height: 100px;
    border-radius: 40px;

    position: absolute;
    top: 250px;
    left: -30px;
    align-items: center;
    justify-content: center;
`;

export const Icon4 = styled.View`
    background: ${ThemeColors.purple};
    width: 70px;
    height: 70px;
    border-radius: 30px;

    position: absolute;
    top: 300px;
    right: 60px;
    align-items: center;
    justify-content: center;
`;

export const ImageIcon1 = styled.Image`
    width: 60px;
    height: 60px;
`;

export const ImageIcon2 = styled.Image`
    width: 60px;
    height: 60px;
`;

export const ImageIcon3 = styled.Image`
    width: 60px;
    height: 60px;
`;

export const ImageIcon4 = styled.Image`
    width: 60px;
    height: 60px;
`;