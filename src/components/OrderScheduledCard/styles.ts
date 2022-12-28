import styled from 'styled-components/native';
import MapView from 'react-native-maps';
import { Colors } from 'styles';

type StyledProps = {
    error? : any
}

export const Container = styled.View`
    margin-bottom: 20px;
`;

export const Map = styled(MapView)`
  height: 210px;
  /* margin: 20px 0px 20px 0px; */
  border-radius: 5px;
`;


export const Details = styled.View`
    padding: 20px;
    flex-direction: row;
`;

export const Info = styled.View`
    flex: 1;
`;

export const Status = styled.View`
    align-items: flex-end;
    margin-left: 10px;
`;

export const Actions = styled.View`
    margin-top: 20px;
    flex-direction: row;
    align-items: center;

    margin: 0 20px;
`;

export const ActionButton = styled.TouchableOpacity<StyledProps>`
    flex: 1;
    border-radius: 4px;
    padding: 10px 20px;
    background: ${props => props.error ? Colors.error  : Colors.primary};
`;

export const Divider = styled.View`
    width: 20px;
`;
