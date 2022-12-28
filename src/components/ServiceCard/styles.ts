import styled from 'styled-components/native';
import { ThemeColors } from '../';
import ThemeText from '../ThemeText';

type StyledProps = {
    active: any;
};


export const Container = styled.TouchableOpacity<StyledProps>`
    width: 150px;
    height: 50px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    background: ${(props: any) => props.active ? ThemeColors.purple : '#F5F5F5'};
    margin-right: 10px;
    padding: 10px;
`;

export const ImageCard = styled.Image`
    width: 40px;
    height: 40px;
`;

export const TextCard = styled(ThemeText)<StyledProps>`
    color: ${(props: any) => props.active ? ThemeColors.white : ThemeColors.black};
`;