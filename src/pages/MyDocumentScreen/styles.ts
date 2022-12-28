import styled from 'styled-components/native';
import { Colors } from 'styles';
import ThemeColors from '../../components/ThemeColors';

export const Container = styled.ScrollView`
    flex: 1;
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
    right: -20px;
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
