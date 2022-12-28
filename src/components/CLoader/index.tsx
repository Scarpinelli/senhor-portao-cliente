import React from 'react'
import { ActivityIndicator, Dimensions } from 'react-native'

import Modal from 'react-native-modal'

import { Colors } from 'styles'
import { CLoaderProps } from 'types'

const widHeight = Dimensions.get('screen').height
const widWidth = Dimensions.get('screen').width

const CLoader: React.FC<CLoaderProps> = ({ visible }) => {
    return (
        <Modal
            deviceHeight={widHeight}
            deviceWidth={widWidth}
            isVisible={visible}
            hasBackdrop
            backdropOpacity={0.8}
            coverScreen
            style={{ margin: 0 }}
            animationIn="zoomIn"
            animationOut="zoomOut"
            animationInTiming={600}
            animationOutTiming={600}
            statusBarTranslucent
        >
            <ActivityIndicator size="large" color={Colors.white} />
        </Modal>
    )
}

export default CLoader
