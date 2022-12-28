import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Colors } from 'styles';
import { ThemeColors } from '../../components';

type StyledProps = {
    activeTab?: boolean
}


export const Container = styled.ScrollView`
    /* justify-content: space-between; */
    background: ${ThemeColors.secondary};
    flex: 1;
    /* min-height: 100%; */
`;

export const Top = styled.View`
    padding: 20px;
    flex: 2;
    position: relative;
    /* flex-grow: 1; */
`;

export const Bottom = styled.View`
    justify-content: space-between;
    padding: 0 20px 20px 20px;
    flex: 1;
`;

export const Logo = styled.Image`
    margin-bottom: 30px;
`;

export const LinkButton = styled.TouchableOpacity`
    padding: 0;
    line-height: 1;
    margin: 0;
    margin-left: 5px;
`;

export const Register = styled.View`
    flex-direction: row;
    justify-content: center;
`;

export const Icon1 = styled.View`
    background: ${ThemeColors.primary};
    width: 100px;
    height: 100px;
    border-radius: 40px;

    position: absolute;
    top: -60px;
    right: 30px;
    align-items: center;
    justify-content: center;
`;

export const Icon2 = styled.View`
    background: ${ThemeColors.yellow};
    width: 50px;
    height: 50px;
    border-radius:20px;

    position: absolute;
    top: 60px;
    right: 20px;
    align-items: center;
    justify-content: center;
`;
export const FormLogin = styled.View`
    flex-direction: row;
    flex: 1;
`;

export const DDD = styled.View`
    width: 80px;
`;

export const Phone = styled.View`
    flex: 1;
    margin-left: 10px;
`;

export const ImageIcon1 = styled.Image`
    width: 60px;
    height: 60px;
`;

export const ImageIcon2 = styled.Image`
    width: 40px;
    height: 40px;
`;

export const ValidationInputsContainer = styled.View`
    flex-direction: row;
    justify-content: space-around;
`

export const InputCode = styled.TextInput`
    border-radius: 4px;
    border: 1px solid ${ThemeColors.muted}50;
    width: 55px;
    height: 60px;
    text-align: center;
    color: ${ThemeColors.white};
    font-size: 40px;
    padding: 10px;
    font-family: 'Bold';
`


export const ButtonsGroup = styled.View`
    flex-direction: row;
    margin-bottom: 20px;
`
;

export const TabButton = styled.TouchableOpacity<StyledProps>`
    flex: 1;
    background: ${(props: any)=> props.activeTab ? Colors.success : '#ffffff20'};
    justify-content: center;
    align-items: center;
    flex-direction: row;
    border-radius: 10px;
    height: 40px;
`;

export const ButtonsGroupDivider = styled.View`
    width: 20px;
`;

export const LogoContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;