import styled from 'styled-components/native';
import MapView from 'react-native-maps';


export const Container = styled.TouchableOpacity`
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
