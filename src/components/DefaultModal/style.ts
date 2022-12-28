import { Colors } from 'styles'
import styled from 'styled-components/native'

export const Header = styled.View<any>`
    flex-direction: row;
    align-items: center;
    position: relative;
    padding: ${(props) => (props.paddingTitle ? props.paddingTitle : '10px')};
`

export const Content = styled.View`
    background-color: ${Colors.white};
    min-height: 130px;
    max-height: 80%;
    margin: 20px;
    padding-top: 20px;
    border-radius: 10px;
`

export const ChildrenContent = styled.View`
    padding: 10px 20px 20px 20px;
    /* margin: 20px; */
`

export const ContainerButton = styled.View`
    margin: 3% 0;
    padding: 3%;
    flex-direction: row;
    width: 100%;
    justify-content: space-around;
    align-items: center;
`

export const BtnCancel = styled.TouchableOpacity`
    /* padding: 5px; */
    position: absolute;
    top: -35px;
    right: 10px;
    background: ${Colors.primary};
    width: 40px;
    height: 40px;
    border-radius: 20px;
    align-items: center;
    justify-content: center;
`
