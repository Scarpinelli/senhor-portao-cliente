import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import { FloatingLabelInput } from 'react-native-floating-label-input'
import { FontAwesome } from '@expo/vector-icons'
import CText from 'components/CText'
import {
    Colors,
    setMarginTop,
    setMarginRight,
    setMarginBottom,
    setMarginLeft,
} from '../styles'

export default function ThemeInput(props: any) {
    // Criando o componente

    if (props.default) {
        return (
            <>
                <View
                    style={{
                        marginTop: setMarginTop(props, 0),
                        marginRight: setMarginRight(props, 0),
                        marginBottom: setMarginBottom(props, 0),
                        marginLeft: setMarginLeft(props, 0),
                    }}
                >
                    <View
                        style={{
                            borderRadius: 15,
                            padding: 5,
                            backgroundColor: Colors.bgInput,
                        }}
                    >
                        <FloatingLabelInput
                            ref={props.passRef}
                            customShowPasswordComponent={
                                props.isPassword && (
                                    <></>
                                    // <Eyes name="eyes" color={Colors.black} />
                                )
                            }
                            customHidePasswordComponent={
                                props.isPassword && (
                                    <CText muted tagline small>
                                        Esconder
                                    </CText>
                                )
                            }
                            {...props}
                            containerStyles={{
                                backgroundColor: props.bgInput
                                    ? props.bgInputL
                                    : Colors.white,

                                paddingHorizontal: 10,

                                height: 60,
                                borderRadius: props.noradius ? 0 : 8,
                                color: Colors.white,
                                borderColor: props.errorMessage
                                    ? Colors.error
                                    : 'transparent',
                                borderWidth: props.errorMessage ? 1 : 0,
                            }}
                            inputStyles={{
                                color: Colors.black,
                                fontFamily: 'Regular',
                                paddingHorizontal: 10,
                                paddingBottom: 0,
                                fontSize: 15,
                                marginTop: 8,
                            }}
                            customLabelStyles={{
                                colorFocused: `${Colors.black}70`,
                                colorBlurred: `${Colors.black}70`,
                                fontSizeFocused: 12,
                                fontSizeBlurred: 13,
                            }}
                            labelStyles={{
                                backgroundColor: Colors.white,
                                fontSize: 13,
                                // fontWeight: 'bold',
                            }}
                        />
                    </View>
                    {props.errorMessage && (
                        <CText mt1 ml2 error small>
                            {props.errorMessage}
                        </CText>
                    )}
                </View>
            </>
        )
    }

    if (props.outlined) {
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
                            <></>
                            // <Eyes name="eyes" color={Colors.black} />
                        )
                    }
                    {...props}
                    containerStyles={{
                        height: 50,
                        color: Colors.white,
                    }}
                    inputStyles={{
                        color: Colors.black,
                        fontFamily: 'Regular',
                        paddingHorizontal: 10,
                        fontSize: 15,
                    }}
                    customLabelStyles={{
                        colorFocused: `${Colors.black}70`,
                        colorBlurred: `${Colors.black}70`,
                        fontSizeFocused: 10,
                        fontSizeBlurred: 12,
                    }}
                    labelStyles={{
                        backgroundColor: Colors.white,
                        fontSize: 13,
                    }}
                />
            </View>
        )
    }

    if (props.twoComponents) {
        return (
            <>
                <View
                    style={{
                        borderRadius: 15,
                        padding: 5,
                        backgroundColor: Colors.bgInput,
                        width: '80%',
                        //
                        //
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
                                // <Eyes name="eyes" color={Colors.black} />
                                <></>
                            )
                        }
                        customHidePasswordComponent={
                            props.isPassword && (
                                <CText muted tagline small>
                                    Esconder
                                </CText>
                            )
                        }
                        {...props}
                        containerStyles={{
                            backgroundColor: props.bgInput
                                ? props.bgInputL
                                : Colors.white,

                            paddingHorizontal: 10,

                            height: 50,
                            borderRadius: props.noradius ? 0 : 8,
                            color: Colors.white,
                            borderColor: props.errorMessage
                                ? Colors.error
                                : 'transparent',
                            borderWidth: props.errorMessage ? 1 : 0,
                        }}
                        inputStyles={{
                            color: Colors.black,
                            fontFamily: 'Regular',
                            paddingHorizontal: 10,
                            paddingBottom: 0,
                            fontSize: 15,
                        }}
                        customLabelStyles={{
                            colorFocused: `${Colors.black}70`,
                            colorBlurred: `${Colors.black}70`,
                            fontSizeFocused: 10,
                            fontSizeBlurred: 13,
                        }}
                        labelStyles={{
                            backgroundColor: Colors.white,
                            fontSize: 20,
                        }}
                    />
                </View>
                {props.errorMessage && (
                    <CText mb3 ml2 error small>
                        {props.errorMessage}
                    </CText>
                )}
            </>
        )
    }

    if (props.twoComponenSecondOption) {
        return (
            <>
                <View
                    style={{
                        width: '80%',
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
                                <></>
                                // <Eyes name="eyes" color={Colors.black} />
                            )
                        }
                        rightComponent={
                            props.errorMessage && (
                                <View
                                    style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <CText mr2 error smaller>
                                        {props.errorMessage}
                                    </CText>
                                </View>
                            )
                        }
                        customHidePasswordComponent={
                            props.isPassword && (
                                // <EyesClose
                                //     name="eyes-close"
                                //     color={Colors.black}
                                // />
                                <></>
                            )
                        }
                        {...props}
                        containerStyles={{
                            paddingHorizontal: 10,
                            height: 60,
                            borderRadius: props.noradius ? 0 : 10,
                            borderColor: props.errorMessage
                                ? Colors.error
                                : Colors.bgInput,
                            borderWidth: 1,
                            color: Colors.white,
                        }}
                        // hintTextColor={`${Colors.black}30`}
                        inputStyles={{
                            color: Colors.black,
                            fontFamily: 'Regular',
                            paddingHorizontal: 10,
                            paddingBottom: 0,
                            fontSize: 15,
                        }}
                        customLabelStyles={{
                            colorFocused: `${Colors.black}70`,
                            colorBlurred: `${Colors.black}70`,
                            fontSizeFocused: 11,
                            fontSizeBlurred: 13,
                        }}
                        labelStyles={{
                            backgroundColor: Colors.white,
                            fontSize: 13,
                        }}
                    />
                </View>
            </>
        )
    }

    if (props.withoutShadow) {
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
                            // <Eyes name="eyes" size={18} color={Colors.black} />
                            <></>
                        )
                    }
                    rightComponent={
                        props.errorMessage && (
                            <View
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <CText mr2 error smaller>
                                    {props.errorMessage}
                                </CText>
                            </View>
                        )
                    }
                    customHidePasswordComponent={
                        props.isPassword && (
                            <></>
                            // <CText muted tagline small>
                            //     Esconder
                            // </CText>
                            // <EyesClose
                            //     name="eyes-close"
                            //     size={18}
                            //     color={Colors.black}
                            // />
                        )
                    }
                    {...props}
                    containerStyles={{
                        paddingHorizontal: 10,
                        height: 60,
                        borderRadius: props.noradius ? 0 : 10,
                        borderColor: props.errorMessage
                            ? Colors.error
                            : Colors.bgInput,
                        borderWidth: 1,
                        color: Colors.white,
                    }}
                    // hintTextColor={`${Colors.black}30`}
                    inputStyles={{
                        color: Colors.black,
                        fontFamily: 'Regular',
                        paddingHorizontal: 10,
                        paddingBottom: 0,
                        fontSize: 15,
                    }}
                    customLabelStyles={{
                        colorFocused: `${Colors.black}70`,
                        colorBlurred: `${Colors.black}70`,
                        fontSizeFocused: 11,
                        fontSizeBlurred: 13,
                    }}
                    labelStyles={{
                        backgroundColor: Colors.white,
                        fontSize: 13,
                    }}
                />
            </View>
        )
    }

    if (props.inputLogin) {
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
                            // <Eyes name="eyes" size={18} color={Colors.black} />
                            <></>
                        )
                    }
                    customHidePasswordComponent={
                        props.isPassword && (
                            <></>
                            // <CText muted tagline small>
                            //     Esconder
                            // </CText>

                            // <EyesClose
                            //     name="eyes-close"
                            //     size={18}
                            //     color={Colors.black}
                            // />
                        )
                    }
                    {...props}
                    containerStyles={{
                        paddingHorizontal: 10,
                        height: 60,
                        borderRadius: props.noradius ? 0 : 10,
                        borderColor: props.errorMessage
                            ? Colors.error
                            : Colors.bgInput,
                        borderWidth: 1,
                        color: Colors.white,

                        marginBottom: 10,
                    }}
                    // hintTextColor={`${Colors.black}30`}
                    inputStyles={{
                        color: Colors.black,
                        fontFamily: 'Regular',
                        paddingHorizontal: 10,
                        paddingBottom: 0,
                        fontSize: 15,
                    }}
                    customLabelStyles={{
                        colorFocused: `${Colors.black}70`,
                        colorBlurred: `${Colors.black}70`,
                        fontSizeFocused: 11,
                        fontSizeBlurred: 13,
                    }}
                    labelStyles={{
                        backgroundColor: Colors.white,
                        paddingBottom: 10,
                        fontSize: 13,
                    }}
                />
                {props.errorMessage && (
                    <CText mb4 ml2 error small>
                        {props.errorMessage}
                    </CText>
                )}
            </View>
        )
    }

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
                selectionColor={Colors.primary}
                customShowPasswordComponent={
                    props.isPassword && (
                        <FontAwesome
                            name="eye"
                            color={Colors.muted}
                            size={16}
                            style={{ marginRight: 8 }}
                        />
                    )
                }
                customHidePasswordComponent={
                    props.isPassword && (
                        <FontAwesome
                            name="eye-slash"
                            color={Colors.muted}
                            size={16}
                            style={{ marginRight: 8 }}
                        />
                    )
                }
                {...props}
                containerStyles={{
                    backgroundColor: props.disabled
                        ? Colors.white
                        : props.backgroundPersonalized
                        ? props.backgroundPersonalized
                        : 'transparent',

                    padding: 10,
                    height: 60,
                    borderRadius: props.noradius ? 0 : 8,
                    borderWidth: props.noBorder ? 0 : 1,
                    borderColor: `${Colors.muted}40`,
                    color: Colors.white,
                }}
                hintTextColor={`${props.fontColor || Colors.white}`}
                inputStyles={{
                    color: props.fontColor || Colors.white,
                    fontFamily: 'Regular',
                    paddingHorizontal: 10,
                    paddingBottom: 0,
                    fontSize: 15,
                }}
                customLabelStyles={{
                    colorFocused: Colors.white,
                    fontSizeFocused: 12,
                    colorBlurred: Colors.muted,
                }}
                labelStyles={{
                    // backgroundColor: '#02083388',
                    borderRadius: 10,
                    fontWeight: 'bold',

                    paddingHorizontal: 7,
                    marginLeft: -10,
                }}
            />
            {props.errorMessage && (
                <CText error small>
                    {props.errorMessage}
                </CText>
            )}
        </View>
    )
}
