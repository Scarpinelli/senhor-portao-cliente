import styled from 'styled-components/native';
import { ThemeColors } from '../../components';

export const Container = styled.View`
    justify-content: space-between;
    background: ${ThemeColors.secondary};
    flex: 1;
`;

export const Top = styled.View`
    padding: 20px;
    flex: 2;
    justify-content: center;
    position: relative;
`;

export const Bottom = styled.View`
    justify-content: space-between;
    padding: 20px;
    /* padding-bottom: 0; */
    /* flex: 1; */
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
    top: -20px;
    left: 100px;
    align-items: center;
    justify-content: center;
`;

export const Icon2 = styled.View`
    background: ${ThemeColors.yellow};
    width: 70px;
    height: 70px;
    border-radius: 30px;

    position: absolute;
    top: 90px;
    right: 20px;
    align-items: center;
    justify-content: center;
`;

export const Icon3 = styled.View`
    background: ${ThemeColors.success};
    width: 100px;
    height: 100px;
    border-radius: 40px;

    position: absolute;
    top: 150px;
    left: -30px;
    align-items: center;
    justify-content: center;
`;

export const Icon4 = styled.View`
    background: ${ThemeColors.purple};
    width: 70px;
    height: 70px;
    border-radius: 30px;

    position: absolute;
    top: 150px;
    right: 90px;
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
    margin-left: 20px;
`;

export const FormCodeContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    
`;  

export const CodeNumberInput = styled.TextInput`
    width: 55px;
    height: 50px;
    border: 1px solid ${ThemeColors.primary};
    border-radius: 10px;
    text-align: center;
    font-family: 'SourceSansPro_Bold';
    color: ${ThemeColors.white};
    font-size: 30px;
`;

export const ImageIcon1 = styled.Image`
    width: 60px;
    height: 60px;
`;

export const ImageIcon2 = styled.Image`
    width: 40px;
    height: 40px;
`;