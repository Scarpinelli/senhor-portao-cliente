import { Colors } from 'styles'
import styled from 'styled-components/native'
import MapView from 'react-native-maps'
import {ThemeColors} from "components";

interface StyledContainer {
    selected?: boolean
}

export const Header = styled.View<any>`
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;

    padding: ${(props) => (props.paddingTitle ? props.paddingTitle : '10px')};
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
`


export const Content = styled.View`
    background-color: ${Colors.white};
    /* max-height: 80%; */
    /* min-height: 60%; */

    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
`
export const ListItems = styled.View`
    padding: 20px;
`

export const ContainerItem = styled.TouchableOpacity<StyledContainer>`
    flex-direction: row;
    align-items: center;
    padding: 4% 0;

    background: ${(props) => (props.selected ? '#cccccc' : '#ffffff')};

    border-bottom-color: ${Colors.muted}40;
    border-bottom-width: 0.5px;
`

export const BtnCancel = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    align-items: center;
    justify-content: center;
`

export const CountryInfo = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`





export const Container = styled.View`
    flex: 1;
    position: relative;
`;

export const Map = styled(MapView)<StyledProps>`
    flex: 1;
    width:100%;
    height: 100%;
    opacity: ${(props: any) => props?.disabled ? 0.2 : 1};
`;

export const ScreenOverlay = styled.View`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    justify-content: space-between;
    
`;

export const MenuButton = styled.TouchableOpacity`
    width: 50px;
    height: 50px;
    align-items: center;
    justify-content: center;
    background: ${ThemeColors.white};
    border-radius: 40px;
    /* box-shadow: 10px 10px 10px rgba(0,0,0,0.5); */
    top: 10px;
    left: 20px;
`;



export const Actions = styled.View``;

export const Request = styled.View`
    padding: 20px 0;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    background: ${ThemeColors.white};
`;

export const Banner = styled.View`
    background: #F5F5F5;
    align-items: center;
    justify-content: center;
    height: 80px;
`;

export const Title = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const Info = styled.View`
    flex: 1;
    margin-left: 10px;
`;

export const PromoLogo = styled.Image`
    width: 100px;
`;

export const PaddingContainer = styled.View`
    padding: 10px 20px;
`;

export const AddressContainer = styled.TouchableOpacity`
    background: ${ThemeColors.bg1};
    padding: 20px;
    flex-direction: row;
    /* margin-top: 20px; */
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


export const PaymentContainer = styled.View`
    padding: 20px 20px 0 20px;
`;

export const Man = styled.Image`
    width: 70px;
    /* height: 200px; */
`;

export const TitleText = styled.View`
    flex: 1;
    margin-right: 10px;
`;


export const ActionsAlert = styled.View`
    /* padding: 20px ; */
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    background: ${ThemeColors.secondary};
    height: 80%;
    position: relative;
`;

export const Logo = styled.Image`
    /* margin-bottom: 30px; */
    margin-top: 20px;
    margin-bottom: 20px;
`;

export const AvatarContainer = styled.View`
    position: absolute;
    left: 50%;
    top: -30px;
    margin-left: -30px;

`;

export const ModalInfo = styled.View`
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 20000;
    background: rgba(0,0,0,0.7);
    align-items: center;
    justify-content: center;
`;

export const ModalInfoContainer = styled.View`
    border-radius: 10px;
    /* margin: 0 20px; */
    position: relative;
    padding: 50px 20px 30px 20px;
    background: ${ThemeColors.white};
    text-align: center;
`;


export const AvatarContainerModal = styled.View`
    position: absolute;
    left: 50%;
    top: -30px;
    margin-left: -15px;

`;

export const ModalInfoCenter = styled.View`
    padding: 0 20px;
`;

export const ValueContainer = styled.View`
    padding: 20px;
    background: ${ThemeColors.bg1};
    flex-direction: row;
`;

export const InfoValue = styled.View`
    flex: 1;
`;

export const RequestValue = styled.View``;


export const BannerContainer = styled.View`
    height: 80px;
    background: #f1f1f1;
`;

export const NewButton = styled.TouchableOpacity`
    /* background: #cccccc; */
    border-radius: 50px;
    padding: 3px 10px;
    border: 1px solid;
    border-color: ${Colors.muted}30; 
`

export const NoItemsContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 0px;
`;

export const InfoContainer = styled.View`
    flex: 1;
`

export const AddressContainerCall = styled.View`
    /* flex-direction: row; */
    align-items: center;
    justify-content: space-between;
    padding: 0 0px;
`;

export const CallButtons = styled.View`
    /* flex-direction: row; */
    align-items: center;
    justify-content: space-between;
    padding: 0 0px;
    margin-top: 10px;
    width: 100%;
`;

export const CallButton = styled.TouchableOpacity<StyledProps>`
    /* background: #cccccc; */
    /* flex: 1; */
    width: 100%;
    border-radius: 4px;
    padding: 15px 10px;
    background: ${props => props.primary ? Colors.purple : Colors.secondary};
    /* border: 1px solid; */
    /* border-color: ${Colors.muted}30;  */
`

export const Divider = styled.View`
    height: 10px;
`



export const MyAddressContainer = styled.View`
    padding: 20px 20px 20px 20px;
    background: #f1f1f1;
    margin: 20px 0 0;
`;

export const ClearButton = styled.TouchableOpacity`
    /* width: 20px; */
    /* height: 20px; */
    background: #f1f1f1;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    padding: 5px 10px;
    border-radius: 30px;
`;