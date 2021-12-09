import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Svg, {G, Path, Rect, Circle} from 'react-native-svg';
import Animated, {
    useSharedValue,
    useAnimatedProps,
  } from 'react-native-reanimated';
let AnimatedCircle = Animated.createAnimatedComponent(Circle);


export default function Pie() {
    const [animatedValue, setAnimatedValue] = useState(new Animated.Value(1))
    const circleRef = React.useRef()

    const resetPie = () => { animatedValue.setValue(1) }

    const animate = () => {
        Animated.timing(animatedValue,{
            toValue: 0.5,
            duration: 500,
            useNativeDriver: false,
            // easing: Easing.inOut(Easing.quad)
        }).start();
    }

    // let endAngle = Animated.multiply(animatedValue, Math.PI);

    const strokeW = 2*Math.PI*50*animatedValue // 2*PI*R * (percentage of 360)

    // const animatedProps = useAnimatedProps(()=>({
    //     strokeDasharray: useSharedValue(animatedValue._value)
    // }))

    return (
        <View style={{height: 500, width: 500, borderWidth: 1, backgroundColor: 'aliceblue', justifyContent: 'center', alignItems: 'center'}}>

            <Svg height="200" width="200">
                {/* <Circle r="100" cx="100" cy="100" fill="white"/> */}
÷                    <Circle r="50" cx="100" cy="100" fill="transparent" collapsable="false"
                        ref={circleRef}
                        stroke="tomato"
                        strokeWidth="100"
                        // animatedProps={animatedProps}
                        strokeDasharray={`${2*Math.PI*50*animatedValue} ${2*Math.PI*50*animatedValue}`} 
                        />                    
                {/* </Animated.View> */}
                {console.log(animatedValue)}
                
            </Svg>

            <TouchableOpacity onPress={animate} style={{marginTop: 20, padding: 10, backgroundColor: 'pink', borderRadius: 5}}>
                <Text>Start</Text>
            </TouchableOpacity>            
        </View>
    )
}
