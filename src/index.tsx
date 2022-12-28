import React, { useCallback, useEffect, useState, useRef } from 'react'
import { Alert, View } from 'react-native'
import { useFonts } from 'expo-font'
import { setGlobalStyles } from 'react-native-floating-label-input'
import AppLoading from 'expo-app-loading'

import * as Notifications from 'expo-notifications'
import * as Device from 'expo-device'

import Routes from './routes'

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
})

const App = () => {
    const [notification, setNotification] = useState(false)
    const notificationListener = useRef<any>(null)
    const responseListener = useRef<any>(null)

    useEffect(() => {
        // init()

        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current =
            Notifications.addNotificationReceivedListener((res) => {})

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current =
            Notifications.addNotificationResponseReceivedListener(
                (response) => {},
            )

        return () => {
            Notifications.removeNotificationSubscription(
                notificationListener.current,
            )
            Notifications.removeNotificationSubscription(
                responseListener.current,
            )
        }
    }, [])

    const [fontsLoaded] = useFonts({
        OpenSans: require('./assets/fonts/OpenSans-Regular.ttf'),
        OpenSans_SemiBold: require('./assets/fonts/OpenSans-SemiBold.ttf'),
        OpenSans_Bold: require('./assets/fonts/OpenSans-Bold.ttf'),
        OpenSans_Light: require('./assets/fonts/OpenSans-Light.ttf'),

        Kapra_Bold: require('./assets/fonts/KapraNeuePro-Bold.ttf'),
        Kapra_Medium: require('./assets/fonts/KapraNeuePro-Medium.ttf'),
        Kapra_Regular: require('./assets/fonts/KapraNeuePro-Regular.ttf'),

        SourceSansPro_Regular: require('./assets/fonts/SourceSansPro-Regular.ttf'),
        SourceSansPro_SemiBold: require('./assets/fonts/SourceSansPro-SemiBold.ttf'),
        SourceSansPro_Bold: require('./assets/fonts/SourceSansPro-Bold.ttf'),

        // Black
        Black: require('assets/fonts/ProductSans-Black.ttf'),
        BlackItalic: require('assets/fonts/ProductSans-BlackItalic.ttf'),

        // Light
        Light: require('assets/fonts/ProductSans-Light.ttf'),
        LightItalic: require('assets/fonts/ProductSans-LightItalic.ttf'),

        // Medium
        Medium: require('assets/fonts/ProductSans-Medium.ttf'),
        MediumItalic: require('assets/fonts/ProductSans-MediumItalic.ttf'),

        // Regular
        Regular: require('assets/fonts/ProductSans-Regular.ttf'),

        // Bold
        Bold: require('assets/fonts/ProductSans-Bold.ttf'),
        BoldItalic: require('assets/fonts/ProductSans-BoldItalic.ttf'),

        // Thin
        Thin: require('assets/fonts/ProductSans-Thin.ttf'),
        ThinItalic: require('assets/fonts/ProductSans-ThinItalic.ttf'),
    })

    if (!fontsLoaded) {
        return <AppLoading />
    }
    return <Routes />
}

export default App
