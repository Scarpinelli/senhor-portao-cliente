import { Dimensions, View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import ThemeColors from "../ThemeColors";

type StyledProps = {
    show?: boolean
}

export const Container = styled.View<StyledProps>`
    position: absolute;
    top: 0;
    right: 0;
    left:  0;
    bottom: 0;
    position: relative;
    z-index: 10000;
    /* background: #ff0000; */
    height: 100%;
    display: ${(props: any) => props.show ? 'flex' : 'none'};
`;

export const Nav = styled.View`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: ${Dimensions.get('screen').width - 100};
    background: ${ThemeColors.secondary};
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
    padding: 20px;
    z-index: 1000000;
`;

export const Overlay = styled.TouchableOpacity`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0,0,0,0.2);
`;


export const Top = styled.View`
    flex: 1;
`;

export const Bottom = styled.View``;

export const NavOptions = styled.View``;

export const NavLink = styled.TouchableOpacity`
    margin-bottom: 15px;
    font-family: 'SourceSansPro_Regular';
`;

export const UserContainer = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: 30px;
`;

export const UserInfo = styled.View`
    flex: 1;
    margin-left: 10px;
`;

export const UserRating = styled.View`
    flex-direction: row;
    align-items: center;
`;


export const ReceiveCall = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
`;

export const MyPlan = styled.View`
    margin-bottom: 20px;
    width: 200px;
`;

export const NumberCalls = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-top: 5px;
`;