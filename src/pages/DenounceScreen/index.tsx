import React, { useState, useEffect } from 'react'
import RadioForm, {
    RadioButton,
    RadioButtonInput,
    RadioButtonLabel,
} from 'react-native-simple-radio-button'
import Icon from '@expo/vector-icons/FontAwesome'
import IconFontisto from '@expo/vector-icons/Fontisto'
import { Switch } from 'react-native-switch'
import {
    ThemeText,
    ThemeColors,
    ThemeButton,
    ThemeInput,
} from '../../components'
import { Container, UserContainer, UserInfo, UserRating, Data } from './styles'

import Avatar from '../../components/Avatar'

const DenounceScreen: React.FC = () => {
    const image = { uri: 'https://place-hold.it/300x500/666' }

    const [secuity, setSecurity] = useState(false)
    const [description, setDescription] = useState('')

    const radio_props = [
        { label: 'Não apareceu', value: 0 },
        { label: 'Instalador não se identificou', value: 1 },
        { label: 'Não fez o serviço corretamente', value: 2 },
        { label: 'Não utilizava peças originais', value: 2 },
        { label: 'Outro', value: 3 },
    ]

    const [type, setType] = useState(null)

    return (
        <Container>
            <UserContainer>
                <Avatar image={image} size={60} />
                <UserInfo>
                    <ThemeText black>Adolfo castilho</ThemeText>
                    <UserRating>
                        <ThemeText mr1 black>
                            4.89
                        </ThemeText>
                        <Icon
                            name="star"
                            size={12}
                            color={ThemeColors.primary}
                        />
                    </UserRating>
                </UserInfo>
            </UserContainer>

            <Data>
                <ThemeText black mb2>
                    Velit sit nisi aute eu non anim nisi. Veniam sunt proident
                    est fugiat elit nisi reprehenderit in fugiat ea veniam
                    proident. Do nulla dolore Lorem aliqua cillum enim sit.
                    Lorem exercitation sit ex mollit ullamco dolore duis
                    occaecat sunt. Ex non velit tempor est consequat veniam
                    nostrud dolore do nisi tempor laborum. Aliquip officia ut
                    tempor sit et voluptate ullamco dolor ex exercitation ea
                    elit aute nulla.
                </ThemeText>

                <ThemeText black>
                    Sunt culpa pariatur nulla enim consequat excepteur dolore
                    duis minim ea incididunt tempor do ullamco. Dolor minim et
                    incididunt labore consectetur esse eu laboris ea. Laborum
                    ullamco id magna esse. In duis incididunt qui consectetur
                    anim enim excepteur enim ex. Sunt aliquip et aute occaecat
                    elit incididunt qui sit.
                </ThemeText>

                <ThemeText mb2 bold black mt4>
                    Selecione o motivo:
                </ThemeText>

                <RadioForm
                    radio_props={radio_props}
                    initial={0}
                    buttonColor="#f1f1f1"
                    animation={false}
                    labelColor="#666666"
                    onPress={(value: any) => {
                        setType(value)
                    }}
                />
                <ThemeText mb2 bold black mt4>
                    Descreva o problema:
                </ThemeText>

                <ThemeInput
                    label="Descrição"
                    mb4
                    value={description}
                    onChangeText={(e: any) => setDescription(e)}
                    onBlur={() => {}}
                    autoCapitalize="none"
                    // autoCompleteType='password'
                    autoCorrect={false}
                    keyboardType="number"
                    returnKeyType="go"
                    // textContentType='newPassword'
                    enablesReturnKeyAutomatically
                    staticLabel
                    // hint='mensagem'
                    light
                    multiline
                />

                <ThemeButton onPress={() => {}}>
                    <ThemeText bold>Denunciar</ThemeText>
                </ThemeButton>
            </Data>
        </Container>
    )
}

export default DenounceScreen
