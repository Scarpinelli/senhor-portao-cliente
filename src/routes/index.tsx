import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { SimpleLineIcons } from '@expo/vector-icons'
import FlashMessage from 'react-native-flash-message'

import { StatusBar } from 'expo-status-bar'
import { AppProvider } from 'contexts/AppContext'
import * as Pages from '../pages'
import { ThemeColors } from '../components'

const { Navigator, Screen } = createStackNavigator()
const BottomTabStack = createBottomTabNavigator()
const TopTabStack = createMaterialTopTabNavigator()

const MyTheme = {
    dark: false,
    colors: {
        primary: ThemeColors.primary,
        background: ThemeColors.white,
        card: ThemeColors.white,
        text: ThemeColors.black,
        border: ThemeColors.white,
        notification: ThemeColors.white,
    },
}

const DefaultScreenOptions = {
    headerBackTitleVisible: false,
    headerTitleAlign: 'left',
    headerTitleStyle: {
        fontFamily: 'Regular',
        // marginLeft: -15,
    },
    headerBackImage: ({ tintColor }: any) => (
        <SimpleLineIcons
            name="arrow-left"
            size={20}
            color={ThemeColors.primary}
            style={{ paddingLeft: 10 }}
        />
    ),
}

export default function Routes() {
    return (
        <AppProvider>
            <StatusBar />
            <NavigationContainer theme={MyTheme}>
                <Navigator
                    initialRouteName="Redirect"
                    screenOptions={DefaultScreenOptions as any}
                >
                    <Screen
                        name="Main"
                        component={Pages.MainScreen}
                        options={{ headerShown: false }}
                    />
                    <Screen
                        name="RequestCart"
                        component={Pages.RequestCartScreen}
                        options={{
                            headerShown: true,
                            title: 'Realizar orçamento',
                        }}
                    />
                    <Screen
                        name="RequestCartObservation"
                        component={Pages.RequestCartObservationsScreen}
                        options={{
                            headerShown: true,
                            title: 'Realizar orçamento',
                        }}
                    />
                    <Screen
                        name="Faq"
                        component={Pages.FaqScreen}
                        options={{ headerShown: true, title: 'FAQ' }}
                    />
                    <Screen
                        name="FaqDetails"
                        component={Pages.FaqDetailsScreen}
                        options={{ headerShown: true, title: 'FAQ' }}
                    />
                    <Screen
                        name="SelectAddress"
                        component={Pages.SelectAddressScreen}
                        options={{
                            headerShown: true,
                            title: 'Selecione o endereço',
                        }}
                    />

                    <Screen
                        name="Denounce"
                        component={Pages.DenounceScreen}
                        options={{ headerShown: true, title: 'Denúncia' }}
                    />

                    <Screen
                        name="Rating"
                        component={Pages.RatingScreen}
                        options={{ headerShown: true, title: 'Avaliação' }}
                    />

                    <Screen
                        name="OrderTip"
                        component={Pages.OrderTipScreen}
                        options={{ headerShown: true, title: 'Enviar gorjeta' }}
                    />

                    <Screen
                        name="HowItWorks"
                        component={Pages.HowItWorksScreen}
                        options={{ headerShown: false }}
                    />

                    <Screen
                        name="FinancialExtract"
                        component={Pages.FinancialExtractScreen}
                        options={{
                            headerShown: true,
                            title: 'Extrato financeiro',
                        }}
                    />

                    <Screen
                        name="MyAccount"
                        component={Pages.MyAccountScreen}
                        options={{ headerShown: true, title: 'Minha conta' }}
                    />

                    <Screen
                        name="MyPaymentMethods"
                        component={Pages.MyPaymentMethodsScreen}
                        options={{
                            headerShown: true,
                            title: 'Meus métodos de pagamento',
                        }}
                    />

                    <Screen
                        name="MyRequests"
                        component={Pages.MyRequestsScreen}
                        options={{
                            headerShown: true,
                            title: 'Minhas Solicitações',
                        }}
                    />
                    <Screen
                        name="RequestDetails"
                        component={Pages.RequestDetailsScreen}
                        options={{
                            headerShown: true,
                            title: 'Detalhes da solicitação',
                        }}
                    />

                    <Screen
                        name="Redirect"
                        component={Pages.RedirectScreen}
                        options={{ headerShown: false }}
                    />
                    <Screen
                        name="OnBoarding"
                        component={Pages.OnBoardingScreen}
                        options={{ headerShown: false }}
                    />
                    <Screen
                        name="Auth"
                        component={Pages.AuthScreen}
                        options={{ headerShown: false }}
                    />
                    <Screen
                        name="Register"
                        component={Pages.RegisterScreen}
                        options={{ headerShown: false }}
                    />
                    <Screen
                        name="VerificationCodeEmail"
                        component={Pages.VerificationCodeEmailScreen}
                        options={{ headerShown: false }}
                    />

                    <Screen
                        name="VerificationCodeSMS"
                        component={Pages.VerificationCodeSMSScreen}
                        options={{ headerShown: false }}
                    />

                    {/* ATE AQUI */}

                    {/* HOJE */}

                    {/* INSTALADOR */}

                    <Screen
                        name="RequestBudget"
                        component={Pages.RequestBudgetScreen}
                        options={{ headerShown: false }}
                    />

                    <Screen
                        name="NewPayementMethod"
                        component={Pages.NewPaymentMethodScreen}
                        options={{
                            headerShown: true,
                            title: 'Adicionar novo método',
                        }}
                    />

                    <Screen
                        name="ReviewBudget"
                        component={Pages.RequestBudgetScreen}
                        options={{ headerShown: false }}
                    />

                    <Screen
                        name="Plans"
                        component={Pages.PlansScreen}
                        options={{ headerShown: true, title: 'Planos' }}
                    />
                    <Screen
                        name="PlanPayment"
                        component={Pages.PlanPaymentScreen}
                        options={{ headerShown: true, title: 'Pagamento' }}
                    />

                    <Screen
                        name="PlanPaymentCompleted"
                        component={Pages.PlanPaymentCompletedScreen}
                        options={{ headerShown: false }}
                    />

                    <Screen
                        name="LocationPermission"
                        component={Pages.LocationPermissionScreen}
                        options={{ headerShown: false }}
                    />

                    <Screen
                        name="NotificationPermission"
                        component={Pages.NotificationPermisionScreen}
                        options={{ headerShown: false }}
                    />
                    <Screen
                        name="CompleteRegister"
                        component={Pages.CompleteRegisterScreen}
                        options={{ headerShown: false }}
                    />
                    <Screen
                        name="CreditCardWelcome"
                        component={Pages.CreditCardWelcomeScreen}
                        options={{ headerShown: false }}
                    />
                    <Screen
                        name="AuthPhoneValidation"
                        component={Pages.AuthPhoneValidatonScreen}
                        options={{ headerShown: false }}
                    />
                    <Screen
                        name="ForgotPassword"
                        component={Pages.ForgotPasswordScreen}
                        options={{ headerShown: false }}
                    />
                    <Screen
                        name="SelectPlanWelcome"
                        component={Pages.SelectPlanWelcome}
                        options={{ headerShown: false }}
                    />

                    <Screen
                        name="RegisterVehicle"
                        component={Pages.RegisterVehicleScreen}
                        options={{ headerShown: false }}
                    />
                    <Screen
                        name="MyVehicles"
                        component={Pages.MyVehiclesScreen}
                        options={{ headerShown: true, title: 'Meus veículos' }}
                    />

                    <Screen
                        name="NewVehicle"
                        component={Pages.NewVehicleScreen}
                        options={{
                            headerShown: true,
                            title: 'Adicionar novo veículo',
                        }}
                    />

                    <Screen
                        name="MyDocuments"
                        component={Pages.MyDocumentsScreen}
                        options={{
                            headerShown: true,
                            title: 'Meus documentos',
                        }}
                    />

                    <Screen
                        name="AddAddress"
                        component={Pages.AddAddressScreen}
                        options={{
                            headerShown: true,
                            title: 'Adicionar novo endereço',
                        }}
                    />

                    <Screen
                        name="SelectAddressOrder"
                        component={Pages.SelectAddressOrderScreen}
                        options={{
                            headerShown: true,
                            title: 'Para onde deseja solicitar?',
                        }}
                    />

                    <Screen
                        name="SaveNewAddress"
                        component={Pages.SaveNewAddressScreen}
                        options={{
                            headerShown: true,
                            title: 'Adicionar novo endereço',
                        }}
                    />

                    <Screen
                        name="OrderBudgetDetails"
                        component={Pages.OrderBudgetDetailsScreen}
                        options={{
                            headerShown: true,
                            title: 'Detalhes do Orçamento',
                        }}
                    />
                    <Screen
                        name="MyScheduledOrders"
                        component={Pages.MyScheduledOrdersScreen}
                        options={{
                            headerShown: true,
                            title: 'Solicitações agendadas',
                        }}
                    />
                </Navigator>
            </NavigationContainer>
            <FlashMessage position="top" />
        </AppProvider>
    )
}
