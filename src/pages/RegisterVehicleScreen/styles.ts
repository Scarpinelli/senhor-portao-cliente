import styled from 'styled-components/native';
import { Colors } from 'styles';
import { ThemeColors } from '../../components';

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
    padding: 20px;
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



export const AvatarContainer = styled.View`
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 0px 0;
    /* padding: 50px 0px 50px 0px; */
    overflow: hidden;
`

export const ImageUserContainer = styled.TouchableOpacity`
    width: 100%;
    /* height: 200px; */
    
    
    border-style: solid;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
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
    right: 0px;
    bottom: 10px;
`
export const ChangeImage = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    width: 100%;
    margin-top: 20px;
    height: 40px;
    background: ${Colors.success};
    border-radius: 50px;
    justify-content: center;
    /* position: absolute; */
    /* right: -10px; */
    /* bottom: -10px; */
`


export const LogoContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;