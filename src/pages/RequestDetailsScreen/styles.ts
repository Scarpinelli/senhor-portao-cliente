import styled from 'styled-components/native';
import {ThemeColors} from '../../components';
import MapView from 'react-native-maps';

export const Container = styled.ScrollView`
    flex: 1;
`;

export const Map = styled(MapView)`
  height: 210px;
  /* margin: 20px 0px 20px 0px; */
  border-radius: 5px;
`;


export const Details = styled.View`
    padding: 20px;
    /* flex-direction: row; */
`;

export const Info = styled.View`
    flex: 1;
`;

export const Status = styled.View`
    align-items: flex-start;
`;


export const UserContainer = styled.View`
    flex-direction: row;
    align-items: center;
    
`;

export const Professional = styled.View`
    padding: 20px;
    background: ${ThemeColors.bg1};
`;

export const UserInfo = styled.View`
    flex: 1;
    margin-left: 10px;
`;

export const UserRating = styled.View`
    flex-direction: row;
    align-items: center;
`;
