import styled from 'styled-components/native'
import { Colors } from 'styles'
import Swiper from 'react-native-swiper'

interface ViewProps {
    bgButton: any
}

export const Container = styled.View`
    flex: 1;
`

export const SwipperPersonalized = styled(Swiper)``

export const ContainerContent = styled.View`
    flex: 1;
    /* justify-content: center; */
`

export const SeparatorVertical = styled.View`
    height: 80px;
`

export const ViewButton = styled.View<ViewProps>`
    background-color: ${(props) =>
        props.bgButton ? props.bgButton : Colors.bgButton};
    padding: 20px 60px;
    align-self: center;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    margin-bottom: 20px;
`

export const TouchableNext = styled.TouchableOpacity`
    background-color: ${Colors.bgButton};
    padding: 20px 60px;
    align-self: center;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    margin-bottom: 20px;
`

export const Slide1 = styled.ImageBackground<any>`
    flex: 1;
    background: #00b5ec;
`

export const ContainerContentSlide1 = styled.View`
    flex: 1;
    padding: 20px 30px;
`

export const Slide2 = styled.ImageBackground<any>`
    flex: 1;
    background: #00b5ec;
    
`

export const ContainerContentSlide2 = styled.View`
    flex: 1;
    padding: 20px 30px;
`

export const ContainerSeparator = styled.View`
    flex-direction: row;
    /* padding: 2px; */
    justify-content: flex-start;
    align-items: center;
    /* margin-left: 10px; */
    /* margin: 10px 0; */
`

export const Separator = styled.View<any>`
    width: 25px;
    height: 5px;
    border-radius: 15px;
    background-color: ${(props) =>
        props.slideTwo ? Colors.white : Colors.white};
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

export const ContainerActivity = styled.View`
    margin-top: 0px;
    height: 80px;
    justify-content: flex-end;
`

export const ContainerTexts = styled.View`
    margin-top: 30px;
`


export const Logo = styled.Image`
    /* margin-bottom: 30px; */
    /* margin-left: 10px; */
`;