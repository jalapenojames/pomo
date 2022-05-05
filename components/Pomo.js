import { StatusBar } from 'expo-status-bar';
import React, { useRef } from 'react'
import { StyleSheet, Text, View, Animated, PanResponder } from 'react-native';
import ClockView from './ClockView'
import CurrentClock from './CurrentClock'

export default function Pomo() {
    const pan = useRef(new Animated.ValueXY()).current
    const panResponder = useRef(
        PanResponder.create({
            // onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                pan.setOffset({
                    x: pan.x._value,
                    y: pan.y._value
                })
            },
            onPanResponderMove: Animated.event(
                [
                    null,
                    { dx: pan.x, dy: pan.y }
                ],
                {useNativeDriver: false}
            ),
            onPanResponderRelease: () => {
                pan.flattenOffset()
            }
        })
    ).current

    const [persp, setPersp] = React.useState(600)
    const [transf, setTransf] = React.useState({translateZ: -100},{rotateX: '20deg'})

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#e6e6e6',
          alignItems: 'center',
          justifyContent: 'space-around',
        },
        text: {
          borderWidth: 1,
          padding: 5, margin: 5,
          borderRadius: 5,
        },
        scene: {
            height: 200, 
            width: 200, 
            perspective: persp,
            borderWidth: 1, borderColor: '#CCC', 
            margin: 80, 
        },
        cube: {
            height: 200, // or try '100%'
            width: 200,
            position: 'relative',
            transformStyle: 'preserve-3d',
            transform: [{translateZ: -100}],
            transition: {transform: '1s'}
        },
        cubeFace: {
            position: 'absolute',
            height: 200,
            width: 200,
            borderWidth: 2, alignItems: 'center', justifyContent: 'center'
        },
        cubeText: {
            fontSize: 40, fontWeight: 'bold',
            color: 'white', lineHeight: 200// backgroundColor: 'orange',
        }
      });

      //{ transform: translateZ(-100px) rotateX(-90deg); }

    return (
        <>
            <View style={[styles.container,{flexDirection: 'row', justifyContent: 'space-around'}]}>
                <View style={styles.container,{borderWidth: 1}}>
                    {/* <Text style={styles.text}>Pomo work in progress!</Text> */}
                    <ClockView timer={1}/>
                    <StatusBar style="auto" />
                </View>

                <CurrentClock />
                
                {/* <Pressable onPress={()=>setPersp(persp => {console.log(persp); return persp+200})} style={{height: 100, width: 100, backgroundColor: 'blue', borderRadius: 10}}></Pressable> */}
                {/* <Pressable onPress={()=>setTransf([{translateZ: -100},{rotateX: '90deg'}])} style={{height: 100, width: 100, backgroundColor: 'blue', borderRadius: 10}}></Pressable> */}
            </View>
        </>
    )
}
