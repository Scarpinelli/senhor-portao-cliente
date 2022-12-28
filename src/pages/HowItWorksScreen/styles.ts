import styled from 'styled-components/native';
import ThemeColors from '../../components/ThemeColors';

export const Container = styled.ScrollView`
    flex: 1;
    background: ${ThemeColors.secondary};
    
`;

export const Title = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;
`;

export const Man = styled.Image`
    width: 90px;
    /* height: 200px; */
`;

export const TitleText = styled.View`
    flex: 1;
    margin-right: 10px;
`;


export const Logo = styled.Image`
    /* margin-bottom: 30px; */
    margin-top: 20px;
    margin-bottom: 20px;
`;