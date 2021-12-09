import React, { useEffect} from 'react'
import { View, Text, TouchableOpacity, Animated, Image, Easing} from 'react-native'
import Svg, { Circle, Rect } from 'react-native-svg';
import * as d3Shape from "d3-shape";
import Timer from './Timer'
import { SemiCircle } from './Timer'

export default function AnimateClock() {

    const RightHalf = ({color}) => (
        <View style={{marginTop: 10, borderWidth: 0, height: 101}}>
            <View style={{transformOrigin: 'center bottom',transform: 'rotate(-90deg)',}}>
                <View style={{position: 'relative', transformOrigin: 'center bottom', transform: 'rotate(0deg)'}}>
                    <SemiCircle color={color}/>
                </View>
                <Animated.View style={{position: 'absolute', transformOrigin: "center bottom",transform: [
                        {
                            rotate: animatedValue.interpolate({
                                inputRange: [0,0.5,1],
                                outputRange: ['180deg', '270deg', '360deg']
                            })
                        }
                    ]}}>
                    <SemiCircle color={color}/>
                </Animated.View>
            </View>
        </View>   
    )

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

    // const handlePress = () => { animation().start() }
    const animation = (min) =>
        // Animated.loop(
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
        // )
        
    useEffect(()=>{
        // animation(1).start()

        return () => {
            animatedValue.removeAllListeners()
        }
    },[])

    const resetAnimation = () => {
        animatedValue.setValue(0); 
        animatedValSecond.setValue(0)
    }

    return (
        <>
            <Timer animation={animation} resetAnimation={resetAnimation} animatedValSecond={animatedValSecond} animatedValue={animatedValue} />

            <View style={{height: 100, width: 100, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                {/* <TouchableOpacity onPress={()=>animation(1).start()} activeOpacity={0.8} style={{borderRadius: 5, backgroundColor: 'orange', padding: 10}}>
                    <Text>start</Text>
                </TouchableOpacity> */}
                <TouchableOpacity onPress={()=>{animatedValue.setValue(0); animatedValSecond.setValue(0)}} activeOpacity={0.8} style={{borderRadius: 5, backgroundColor: '#8cc084', height: 20, width: 15, marginLeft: 2}}>
                    {/* <Text>reset</Text> */}
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={{position: 'relative'}} activeOpacity={0.8}>

                <View style={{position: 'relative', paddingTop: 10}}>
                    <LeftHalf2nd color="tomato" diameter={300}/>
                    <View style={{position: 'absolute', top: 10, transformOrigin: 'center center', transform: [{rotate: '180deg'}]}}>
                        <LeftHalf color="tomato" diameter={300}/>
                    </View>
                    <View style={{height: 100, width: 100, borderRadius: 50, backgroundColor: "bisque", position: 'absolute', top: 100, left: 100, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontStyle: 'italic'}}>focus</Text>
                    </View>
                </View>

            </TouchableOpacity>
       </>
    )
}
