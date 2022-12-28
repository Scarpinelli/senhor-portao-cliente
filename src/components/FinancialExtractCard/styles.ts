import styled from 'styled-components/native';
import {ThemeColors} from '../../components';

type StyledProps = {
    type?: number;
};

export const Container = styled.View`
    flex: 1;
    flex-direction: row;
    padding: 10px 20px;
    /* align-items: center; */
`;

export const Signal = styled.View<StyledProps>`
    border-radius: 20px;
    width: 40px;
    height: 40px;
    align-items: center;
    justify-content: center;
    background: ${(props: any) => props.type == 0 ? ThemeColors.success : ThemeColors.error};
`;

export const Info = styled.View`
    flex: 1;
    margin-left: 15px;
`;