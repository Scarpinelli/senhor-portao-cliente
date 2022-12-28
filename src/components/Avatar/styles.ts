import styled from 'styled-components/native';
import ThemeColors from '../../components/ThemeColors';

type StyledProps = {
    size?: number;
};

export const Container = styled.ImageBackground<StyledProps>`
    width: ${(props: any) => props.size ? `${props.size}px` : '40px'};
    height: ${(props: any) => props.size ? `${props.size}px` : '40px'};
    border-radius: ${(props: any) => props.size ? `${props.size}px` : '40px'};
    overflow: hidden;
`;