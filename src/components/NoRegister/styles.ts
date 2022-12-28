import { Colors } from 'styles';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import {ThemeColors} from 'components';

type StyledPropps = {
   principal? : boolean
}

export const Container = styled.View`
    flex: 1;
    align-items:center;
    justify-content: center;
`;