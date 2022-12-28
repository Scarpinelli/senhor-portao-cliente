import styled from 'styled-components/native';
import ThemeColors from '../../components/ThemeColors';

export const Container = styled.View`
    padding: 10px 20px;
    flex-direction: row;;
`;

export const ProductInfo = styled.View`
    flex: 1;
    margin-right: 10px ;
`;

export const ProductQuantity = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const ProductValue = styled.View`
    width: 40px;
    justify-content: center;
`;

export const ProductButton = styled.TouchableOpacity`
    width: 30px;
    height: 30px;
    background: ${ThemeColors.primary};
    align-items: center;
    justify-content: center;
    border-radius: 4px;
`;

export const ActionButton = styled.TouchableOpacity`
    width: 30px;
    height: 30px;
    background: ${ThemeColors.success};
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    margin-left: 5px;
`;

