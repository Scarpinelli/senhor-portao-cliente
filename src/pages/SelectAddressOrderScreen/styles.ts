import styled from 'styled-components/native';
import { Colors } from 'styles';
import ThemeColors from '../../components/ThemeColors';

type StyledProps = {
    active?: boolean
}

export const Container = styled.ScrollView`
    flex: 1;
`;


export const InputContainer = styled.View`
	/* flex: 1; */
	/* padding: 20px; */
	/* height: 60px; */
	flex-direction: row;
	align-items: center;
`;

export const InputSearch = styled.TextInput`
	/* height: 20px; */
	flex: 1;
	margin-right: 10px;
`;

export const SearchButton = styled.TouchableOpacity`
	/* position: absolute;
  right: 18px;
  top: 18px; */
`;

export const Divider = styled.View`
	width: 1px;
	height: 20px;
	background: #b9c8cd;
	margin-right: 10px;
`;

export const RowResultButton = styled.TouchableOpacity`
	flex-direction: row;
	align-items: center;
	flex: 1;
	padding: 10px 10px;
	/* height: 70px; */
	/* background: #ff0000; */
`;

export const RowIconContainer = styled.View`
	margin-left: 20px;
`;

export const RowTextContainer = styled.View`
	flex: 1;
	flex-direction: row;
	align-items: center;
`;

export const IconDestiny = styled.View`
	width: 36px;
	height: 36px;
	border-radius: 18px;
	background: #79959e30;
	align-items: center;
	justify-content: center;
	margin-right: 10px;
`;

export const RowContainer = styled.View`
	border-top-width: 1px;
	border-top-color: #79959e10;
	height: 70;
	padding: 0;
`;


export const Tabs = styled.View`
    flex-direction: row;
`;

export const TabButton = styled.TouchableOpacity<StyledProps>`
     /* background: #cccccc; */
    flex: 1;
    width: 100%;
    padding: 15px 10px;
    /* background: ${props => props.active ? Colors.purple : Colors.muted}; */
    border-bottom-width: 2px;
    border-color: ${props => props.active ? Colors.purple : `${Colors.muted}20`}; 
`;

export const DividerHorizontal = styled.View`
    width: 20px;
`;


export const MyPlaces = styled.View`
    
    margin-top: 20px;
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

export const AddressContainer = styled.TouchableOpacity`
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
