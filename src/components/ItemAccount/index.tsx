import { SimpleLineIcons } from '@expo/vector-icons'
import { CText } from 'components'
import React, { useState } from 'react'
import { Image, View } from 'react-native'
import { Colors } from 'styles'

import {
    ContainerAlert,
    ContainerCardWhite,
    ContainerColumn,
    ContainerFlag,
    ContainerFlex,
    ContainerItem,
    ContainerRow,
    ContainerStatus,
    FlagIcon,
    IconGoogle,
    IconStores,
    IconWarning,
    Line,
    TouchableGoogle,
} from './styles'

interface ItemProps {
    title: string
    description?: string
    status?: string
    descriptionField?: string
    alert?: any
    withoutBorder?: any
    twoFactor?: any
    onPress?: () => void
    withMarginTop?: boolean
    withFlag?: boolean
}

const ItemAccount: React.FC<ItemProps> = ({
    description,
    title,
    status,
    descriptionField,
    alert,
    withoutBorder,
    twoFactor,
    onPress,
    withMarginTop,
    withFlag,
}) => {
    /*
     *   CONTEXT
     */

    /*
     *   REFS
     */

    /*
     *   STATES
     */
    const [isEnabled, setIsEnalbled] = useState(false)

    /*
     *   HOOKS
     */

    /*
     *   LAYOUT
     */

    /*
     *   FORMIK
     */

    /*
     *   FUNCTIONS
     */

    /*
     *   EFFECTS
     */

    return (
        <ContainerColumn withMarginTop={withMarginTop}>
            <ContainerItem
                onPress={onPress}
                activeOpacity={0.8}
                withoutBorder={withoutBorder}
            >
                <ContainerFlex>
                    <ContainerRow>
                        <CText black bold>
                            {title}
                        </CText>
                        {status && (
                            <ContainerStatus
                                bgStatus={
                                    status === 'Pending'
                                        ? Colors.primary
                                        : 'yellow'
                                }
                            >
                                <CText ml1 default style={{ fontSize: 8 }}>
                                    {status}
                                </CText>
                            </ContainerStatus>
                        )}
                    </ContainerRow>
                    <CText default smaller>
                        {descriptionField}
                    </CText>
                </ContainerFlex>
                <ContainerRow>
                    <CText mr2 black smaller>
                        {description}
                    </CText>
                </ContainerRow>
            </ContainerItem>
            {alert && (
                <>
                    <ContainerAlert>
                        {/* <IconWarning source={Warning} /> */}

                        <CText ml1 default style={{ fontSize: 9 }}>
                            Envie a foto do seu documento para validar sua conta
                        </CText>
                    </ContainerAlert>
                    <Line />
                </>
            )}
        </ContainerColumn>
    )
}

export default ItemAccount
