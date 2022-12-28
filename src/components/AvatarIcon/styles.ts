import styled from 'styled-components/native';
import ThemeColors from '../../components/ThemeColors';

type StyledProps = {
    disabled?: any;
};

export const Container = styled.View`
    background: ${ThemeColors.primary};
    border-radius: 40px;
    width: 60px;
    height: 60px;
    align-items: center;
    justify-content: center;
`;

export const Logo = styled.Image`
    width: 40px;
    height: 40px;
`;