import styled from 'styled-components/native'
import { Colors } from 'styles'
import Swiper from 'react-native-swiper'

type ViewProps = {
    bgButton?: any
}

export const Container = styled.View<any>`
    flex: 1;
    /* background: #00b5ec; */
    align-items: center;

`


export const ViewButton = styled.TouchableOpacity<ViewProps>`
    background-color: ${(props) =>
        props.bgButton ? props.bgButton : Colors.bgButton};
    padding: 20px 60px;
    align-self: center;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    margin-bottom: 30px;
`


export const ContainerContentSlide1 = styled.View`
    flex: 1;
    padding: 20px 30px;
    align-items:center;
    /* justify-content: center; */
    /* background: #ff0000; */
`
export const ContainerWidthTextDescription = styled.View`
    width: 80%;
    margin-bottom: 30px;
    flex-direction: row;
    align-items: center;
`

export const Slide3 = styled.ImageBackground<any>`
    flex: 1;
    /* padding: 40px 20px; */
`

export const ContainerContentSlide3 = styled.View`
    flex: 1;
    justify-content: space-between;
    padding: 0px 30px 20px;
`

export const Slide4 = styled.ImageBackground<any>`
    flex: 1;
    padding: 20px 20px;
`

export const ContainerContentSlide4 = styled.View`
    flex: 1;
    align-items: center;
    justify-content:center;
`



export const Logo = styled.Image`

`;

export const ImageTop = styled.Image`
    width: 100%;
    /* background: #ff0000 */
`;

export const SkipButtonContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    padding: 20px;
    position: absolute;
`;