import React, { useState } from 'react'
import { Container } from './styles'

import {
    ThemeButton,
    ThemeText,
    ThemeColors,
    ThemeInput,
} from '../../components'

const RequestCartObservationsScreen: React.FC = ({ navigation }: any) => {
    const [observation, setObservation] = useState('')
    return (
        <Container style={{ padding: 20 }}>
            <ThemeText black mb2 bold>
                Aicione observações ao seu orçamento
            </ThemeText>
            <ThemeText black small mb5>
               
            </ThemeText>

            <ThemeInput
                // inline
                // autoFocus
                label="Observacoes"
                mb4
                value={observation}
                onChangeText={(e: any) => {
                    setObservation(e)
                }}
                onBlur={() => {}}
                autoCapitalize="none"
                // autoCompleteType='password'
                autoCorrect={false}
                keyboardType="number"
                returnKeyType="go"
                // textContentType='newPassword'
                enablesReturnKeyAutomatically
                // maxLength={2}
                textarea
                staticLabel
                // mask='15'
                // hint='Adilson ferreira'
                light
                multiline
            />

            <ThemeButton onPress={() => navigation.navigate('Main')}>
                <ThemeText bold>Salvar</ThemeText>
            </ThemeButton>
        </Container>
    )
}

export default RequestCartObservationsScreen
