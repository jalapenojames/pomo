import { StatusBar } from 'expo-status-bar';
import React, { useRef } from 'react'
import { StyleSheet, Text, View, Animated, PanResponder, TouchableOpacity } from 'react-native';
import ClockView from './ClockView'

export default function Pomo() {

    return (
        <>
            <View style={[styles.container,{flexDirection: 'row', justifyContent: 'space-around'}]}>
                <View style={styles.container}>
                    {/* <Text style={styles.text}>Pomo work in progress!</Text> */}
                    <ClockView timer={1}/>
                    <StatusBar style="auto" />
                </View>

                {/* <CurrentClock /> */}
                
                {/* <Pressable onPress={()=>setTransf([{translateZ: -100},{rotateX: '90deg'}])} style={{height: 100, width: 100, backgroundColor: 'blue', borderRadius: 10}}></Pressable> */}
            </View>
        </>
    )
}

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
        perspective: 600,
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