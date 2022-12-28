import styled from 'styled-components/native'
import { Colors } from 'styles'

export const ContainerColumn = styled.View<any>`
    margin-top: ${(props) => (props.withMarginTop ? 10 : 0)};
border-bottom-width: ${(props) => (props.withoutBorder ? 0 : '0.5px')};
border-bottom-color: ${`#cccccc60`};
`

export const ContainerFlex = styled.View`
    flex: 1;
    `

export const ContainerItem = styled.TouchableOpacity<any>`
    flex-direction: row;
    justify-content: space-between;
    padding: 20px;
`

export const ContainerRow = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: 5px;
`

export const ContainerStatus = styled.View<any>`
    padding: 5px;
    background-color: ${(props) =>
        props.bgStatus ? props.bgStatus : 'transparent'};
    margin-left: 5px;
    border-radius: 10px;
`

export const ContainerAlert = styled.View`
    background-color: ${Colors.bgAlert};
    padding: 10px 20px;
    border-radius: 15px;
    margin: 0 20px;
    flex-direction: row;
    align-items: center;
`

export const IconWarning = styled.Image`
    width: 15px;
    height: 15px;
`

export const Line = styled.View`
    width: 100%;
    border-bottom-width: 0.5px;
    border-bottom-color: ${Colors.line};
    margin-top: 20px;
`

export const TouchableGoogle = styled.TouchableOpacity`
    background-color: ${Colors.black};
    padding: 5px;
    flex-direction: row;
    align-items: center;
    border-radius: 20px;
    margin-left: 10px;
`

export const IconGoogle = styled.Image`
    width: 10px;
    height: 10px;
`

export const ContainerCardWhite = styled.View`
    background-color: white;
    flex-direction: row;
`

export const IconStores = styled.Image`
    width: 90px;
    height: 35px;
    margin-right: 20px;
`
export const ContainerFlag = styled.View`
    margin-right: 10px;
`

export const FlagIcon = styled.Image`
    width: 25px;
    height: 25px;
    border-radius: 10px;
`
