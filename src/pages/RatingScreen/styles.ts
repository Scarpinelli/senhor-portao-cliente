import styled from 'styled-components/native';
import ThemeColors from '../../components/ThemeColors';

export const Container = styled.ScrollView`
    flex: 1;
`;

export const UserContainer = styled.View`
    flex-direction: row;
    align-items: center;
    /* margin-bottom: 30px; */
    padding: 20px 20px;
`;

export const UserInfo = styled.View`
    flex: 1;
    margin-left: 10px;
`;

export const UserRating = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const AddressContainer = styled.View`
    background: ${ThemeColors.bg1};
    padding: 20px;
    flex-direction: row;
`;

export const AddressMarker = styled.View`
    width: 50px;
    height: 50px;
    align-items: center;
    justify-content: center;
    border-radius: 50px;
    background: rgba(0,0,0,0.02);
    
`;

export const AddressInfo = styled.View`
    margin-left: 10px;
    flex: 1;
`;

export const MyPlaces = styled.View`
    background: ${ThemeColors.bg1};
`;


export const Data = styled.View`
    padding: 20px;
`;

export const Security = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const Info = styled.View`
    flex: 1;
`;