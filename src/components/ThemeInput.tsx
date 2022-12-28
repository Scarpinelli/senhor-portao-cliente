import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import ThemeColors from './ThemeColors';
import ThemeText from './ThemeText';
import {
	setMarginTop,
	setMarginRight,
	setMarginBottom,
	setMarginLeft,
} from './ThemeDefaults';
import { FloatingLabelInput } from 'react-native-floating-label-input';

export default function ThemeInput(props: any) {
	//Criando o componente
	if (props.inline) {
		return (
			<View
				style={{
					marginTop: setMarginTop(props, 0),
					marginRight: setMarginRight(props, 0),
					marginBottom: setMarginBottom(props, 0),
					marginLeft: setMarginLeft(props, 0),
				}}
			>
				<FloatingLabelInput
					ref={props.passRef}
					fontSize='25'
					multiline={props.textarea ? true : false}
					hintTextColor={ThemeColors.secondary}
					{...props}
					containerStyles={{
						backgroundColor: 'transparent',
						padding: 0,
						paddingTop: 10,
						paddingBottom: 10,
						borderRadius: 0,
						borderStyle: 'solid',
						borderBottomWidth: 1,
						borderColor: ThemeColors.white,
					}}
					inputStyles={{
						color: ThemeColors.error,
						paddingHorizontal: 0,
						paddingBottom: 0,
						paddingTop: 15,
					}}
					customShowPasswordComponent={
						props.isPassword && (
							<View style={{ flex: 1, justifyContent: 'center' }}>
								<ThemeText muted tagline small>
									Mostrar
								</ThemeText>
							</View>
						)
					}
					customHidePasswordComponent={
						props.isPassword && (
							<View style={{ flex: 1, justifyContent: 'center' }}>
								<ThemeText muted tagline small>
									Esconder
								</ThemeText>
							</View>
						)
					}
					// customLabelStyles={{
					//     colorFocused: ThemeColors.inputLabel,
					//     fontSizeFocused: 12,
					//     marginLeft: -50,
					// }}
					// labelStyles={{
					//     paddingLeft: 0,
					//     marginLeft: -5,
					//     color: ThemeColors.inputLabel,
					//     paddingTop:10
					// }}
				/>
				{props.errorMessage && (
					<ThemeText mt1 error small>
						{props.errorMessage}
					</ThemeText>
				)}
			</View>
		);
	} else if (props.light) {
		return (
			<View
				style={{
					marginTop: setMarginTop(props, 0),
					marginRight: setMarginRight(props, 0),
					marginBottom: setMarginBottom(props, 0),
					marginLeft: setMarginLeft(props, 0),
				}}
			>
				<FloatingLabelInput
					ref={props.passRef}
					multiline={props.textarea ? true : false}
					customShowPasswordComponent={
						props.isPassword && (
							<ThemeText muted tagline small>
								Mostrar
							</ThemeText>
						)
					}
					customHidePasswordComponent={
						props.isPassword && (
							<ThemeText muted tagline small>
								Esconder
							</ThemeText>
						)
					}
					{...props}
					containerStyles={{
						backgroundColor: props.disabled ? ThemeColors.white : 'transparent',
						padding: 10,
						// paddingBottom: 0,
						// height: props.textarea ? 200 : 60,
						borderRadius: props.noradius ? 0 : 8,
						borderWidth: 1,
						borderColor: `${ThemeColors.black}30`,
						color: ThemeColors.white,
					}}
					hintTextColor={`${ThemeColors.black}30`}
					inputStyles={{
						color: ThemeColors.black,
						fontFamily: 'SourceSansPro_Bold',
						paddingHorizontal: 0,
						paddingBottom: 0,
						// paddingTop: 15,
						fontSize: 25,
					}}
					customLabelStyles={{
						colorFocused: ThemeColors.black,
						fontSizeFocused: 12,
					}}
					labelStyles={{
						backgroundColor: ThemeColors.white,
						paddingHorizontal: 5,
						marginLeft: -10,
					}}
				/>
				{props.errorMessage && (
					<ThemeText mt1 error small>
						{props.errorMessage}
					</ThemeText>
				)}
			</View>
		);
	} else {
		return (
			<View
				style={{
					marginTop: setMarginTop(props, 0),
					marginRight: setMarginRight(props, 0),
					marginBottom: setMarginBottom(props, 0),
					marginLeft: setMarginLeft(props, 0),
				}}
			>
				<FloatingLabelInput
					ref={props.passRef}
					customShowPasswordComponent={
						props.isPassword && (
							<ThemeText muted tagline small>
								Mostrar
							</ThemeText>
						)
					}
					customHidePasswordComponent={
						props.isPassword && (
							<ThemeText muted tagline small>
								Esconder
							</ThemeText>
						)
					}
					{...props}
					containerStyles={{
						backgroundColor: props.disabled ? ThemeColors.white : 'transparent',
						padding: 10,
						// paddingBottom: 0,
						height: 60,
						borderRadius: props.noradius ? 0 : 8,
						borderWidth: 1,
						borderColor: ThemeColors.primary,
						color: ThemeColors.white,
					}}
					hintTextColor={`${ThemeColors.primary}30`}
					inputStyles={{
						color: ThemeColors.white,
						fontFamily: 'SourceSansPro_Bold',
						paddingHorizontal: 0,
						paddingBottom: 0,
						// paddingTop: 15,
						fontSize: 25,
					}}
					customLabelStyles={{
						colorFocused: ThemeColors.white,
						fontSizeFocused: 12,
					}}
					labelStyles={{
						backgroundColor: ThemeColors.secondary,
						paddingHorizontal: 5,
						marginLeft: -10,
					}}
				/>
				{props.errorMessage && (
					<ThemeText mt1 error small>
						{props.errorMessage}
					</ThemeText>
				)}
			</View>
		);
	}
}
