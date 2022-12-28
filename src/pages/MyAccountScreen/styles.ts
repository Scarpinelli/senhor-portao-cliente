import styled from 'styled-components/native';
import { Colors } from 'styles';
import ThemeColors from '../../components/ThemeColors';

type StyledPropps = {
    principal? : boolean
 }
 
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
    /* margin-left: 10px; */
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
    margin-top: 20px;
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



export const AvatarContainer = styled.View`
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 0px 0;
    /* padding: 50px 20px 50px 20px; */
    overflow: hidden;
`

export const ImageUserContainer = styled.TouchableOpacity`
    width: 150px;
    height: 150px;
    border-radius: 150px;
    border-width: 2px;
    border-color: #f1f1f1;
    border-style: solid;
    align-items: center;
    justify-content: center;
`

export const ImageUser = styled.ImageBackground`
    width: 140px;
    height: 140px;
    border-radius: 140px;
    overflow: hidden;
`

export const AvatarActions = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: 20px;
`

export const ChangeImage = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    width: 40px;
    height: 40px;
    background: ${Colors.success};
    border-radius: 50px;
    justify-content: center;
    margin-right: 10px;
    position: absolute;
    right: -20px;
    bottom: 0px;
`

export const RemoveImage = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    width: 50px;
    background: ${Colors.error};
    height: 50px;
    border-radius: 50px;
    justify-content: center;
    margin-right: 10px;
    position: absolute;
    right: -20px;
    bottom: 10px;
`

export const PaddingContainer = styled.View`
    padding: 20px;
`

export const Remove = styled.TouchableOpacity`
width: 40px;
height: 40px;
align-items: center;
justify-content: center;
margin-left: 20px;
background: #cccccc30;
border-radius: 40px;
`;
export const Principal = styled.TouchableOpacity<StyledPropps>`
width: 40px;
height: 40px;
align-items:center;
justify-content: center;
border-radius: 30px;
background: ${props => props.principal ? Colors.success : '#cccccc30'};
margin-left: 20px;
`;

export const MyPlacesTitle = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
`;
export const NewAddressButton = styled.TouchableOpacity`
    /* background: #cccccc; */
    border-radius: 50px;
    padding: 3px 10px;
    border: 1px solid;
    border-color: ${Colors.muted}30; 
`

export const NotificationsContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`;

export const NotificationInfo = styled.View``;

export const NotificationAction = styled.View``;
