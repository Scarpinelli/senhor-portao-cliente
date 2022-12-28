import { Colors } from 'styles';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import {ThemeColors} from 'components';

type StyledPropps = {
   principal? : boolean
}

export const Container = styled.TouchableOpacity`
    margin-bottom: 10px;
    flex-direction: row;
    padding: 10px;
    align-items: center;
    background: #f1f1f1;
    border-radius: 10px;
`;
 export const CardImage = styled.Image`
    width: 30px;
    height: 30px;
 `;

 export const CardNumber = styled.View`
    flex: 1;
    margin-left: 20px;
 `;

 export const Remove = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
    align-items: center;
    justify-content: center;
    margin-left: 20px;
    background: ${ThemeColors?.bg1};
    border-radius: 40px;
 `;

export const Principal = styled.TouchableOpacity<StyledPropps>`
width: 40px;
height: 40px;
align-items:center;
justify-content: center;
border-radius: 30px;
background: ${props => props.principal ? Colors.success : '#cccccc30'}
margin-left: 20px;
`;