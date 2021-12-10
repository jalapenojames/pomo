import React from 'react'
import { View, Text, TouchableOpacity, Animated, Image, Easing} from 'react-native'
import Timer from './Timer'

export default function AnimateClock() {
    const LeftHalf = ({color, diameter}) => (
        <View style={{height: diameter/2, width: diameter, overflow: 'hidden', transformOrigin: 'center bottom', transform: [{rotate: "-90deg"}], marginBottom: diameter/2}}>
            <Animated.View style={{height: diameter/2, width: diameter, overflow: 'hidden', backgroundColor: 'transparent', position: 'relative', transformOrigin: 'center bottom', transform: [
                {
                    rotate: animatedValue.interpolate({
                        inputRange: [0,0.5,1],
                        outputRange: ['0deg', '90deg', '180deg']
                    })
                }
            ]}}>
                <View style={{height: diameter, width: diameter, backgroundColor: color, marginTop: 0, borderTopLeftRadius: diameter/2, borderTopRightRadius: diameter/2, }}/>
            </Animated.View> 
        </View>
    )

    const LeftHalf2nd = ({color, diameter}) => (
        <View style={{height: diameter/2, width: diameter, overflow: 'hidden', transformOrigin: 'center bottom', transform: [{rotate: "-90deg"}], marginBottom: diameter/2}}>
            <Animated.View style={{height: diameter/2, width: diameter, overflow: 'hidden', backgroundColor: 'transparent', position: 'relative', transformOrigin: 'center bottom', transform: [
                {
                    rotate: animatedValSecond.interpolate({
                        inputRange: [0,0.5,1],
                        outputRange: ['0deg', '90deg', '180deg']
                    })
                }
            ]}}>
                <View style={{height: diameter, width: diameter, backgroundColor: color, marginTop: 0, borderTopLeftRadius: diameter/2, borderTopRightRadius: diameter/2, }}/>
            </Animated.View> 
        </View>
    )

    const animatedValue = React.useRef(new Animated.Value(0)).current
    const animatedValSecond = React.useRef(new Animated.Value(0)).current

    const animation = (min) =>
        Animated.sequence([
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: min*30000,
                useNativeDriver: false,
                easing: Easing.linear
            }),
            Animated.timing(animatedValSecond, { // can make it sequential if I make a new animatedValue2 to be reference
                toValue: 1,
                duration: min*30000,
                useNativeDriver: false,
                easing: Easing.linear
            }),
            Animated.timing(animatedValue, {
                toValue: 0,
                duration: 0,
                useNativeDriver: false,
                easing: Easing.linear
            }),
            Animated.timing(animatedValSecond, { // can make it sequential if I make a new animatedValue2 to be reference
                toValue: 0,
                duration: 0,
                useNativeDriver: false,
                easing: Easing.linear
            }),
        ])

    const resetAnimation = () => {
        animatedValue.setValue(0); 
        animatedValSecond.setValue(0)
    }

    return (
        <>
            <Timer animation={animation} resetAnimation={resetAnimation} animatedValSecond={animatedValSecond} animatedValue={animatedValue} />

            <View style={{height: 100, width: 100, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                <TouchableOpacity onPress={resetAnimation} activeOpacity={0.8} style={{borderRadius: 5, backgroundColor: '#8cc084', height: 20, width: 25, marginLeft: 2}}/>
            </View>
            <TouchableOpacity style={{position: 'relative'}} activeOpacity={0.8}>

                <View style={{position: 'relative', paddingTop: 10}}>
                    {/* {Left half of circle} */}   <LeftHalf2nd color="tomato" diameter={300}/>
                    {/* {Right half of circle} */}  <View style={{position: 'absolute', top: 10, transformOrigin: 'center center', transform: [{rotate: '180deg'}]}}>
                        <LeftHalf color="tomato" diameter={300}/>
                    </View>

                    {/* {Centerpiece} */}   <View style={{height: 100, width: 100, borderRadius: 50, backgroundColor: "bisque", position: 'absolute', top: 100, left: 100, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontStyle: 'italic'}}>focus</Text>
                    </View>
                </View>
            </TouchableOpacity>
       </>
    )
}
