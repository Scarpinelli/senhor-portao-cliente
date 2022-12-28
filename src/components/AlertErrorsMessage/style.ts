import { Colors } from 'styles'
import styled from 'styled-components/native'

export const Content = styled.View`
    background-color: ${Colors.white};
    min-height: 120px;
    max-height: 80%;
    margin: 20px;
    padding: 20px;
    border-radius: 10px;
    justify-content: space-between;
    align-items: center;
`
export const ContainerInformation = styled.View`
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
`
