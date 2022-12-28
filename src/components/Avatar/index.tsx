import React from 'react'

import noImage from 'assets/images/no-image.jpg'
import { Container } from './styles'

interface IAvatar {
    image: any
    size?: number
}

const Avatar: React.FC<IAvatar> = ({ image, size }: any) => {
    return (
        <>
            {image ? (
                <Container
                    source={{ uri: image }}
                    resizeMode="cover"
                    size={size}
                />
            ) : (
                <Container source={noImage} resizeMode="cover" size={size} />
            )}
        </>
    )
}

export default Avatar
