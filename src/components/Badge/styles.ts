import styled from 'styled-components/native';
import {ThemeColors, ThemeText} from "components";

type StyledProps = {
    type?: number;
};


export const Container = styled.View<StyledProps>`
    background: ${(props: any) => props?.type === 0 ? ThemeColors?.yellow : props?.type === 1 ? ThemeColors.success : ThemeColors.error};
    border-radius: 20px;
    padding: 5px 10px;
`;

export const BadgeText = styled(ThemeText)`
    font-size: 10px;
`;