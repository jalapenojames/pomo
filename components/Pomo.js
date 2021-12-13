import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native';
import AnimateClock from './AnimateClock'
import Timer from './Timer'

export default function Pomo() {

    const [persp, setPersp] = React.useState(600)

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
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

    return (
        <>
            <View style={[styles.container,{flexDirection: 'row', justifyContent: 'space-around'}]}>
                <View style={styles.container,{borderWidth: 0}}>
                    <Text style={styles.text}>Pomo work in progress!</Text>
                    <AnimateClock />
                    <StatusBar style="auto" />
                </View>
                <View style={styles.scene}>
                    <View style={styles.cube}>
                        <View style={[styles.cubeFace, {transform: [{rotateY: '0deg'}, {translateZ: 100}]}, {backgroundColor: 'pink', opacity: 0.8}]}><Text style={styles.cubeText}>front</Text></View>
                        <View style={[styles.cubeFace, {transform: [{rotateY: '90deg'}, {translateZ: 100}]}, {backgroundColor: 'lightgreen', opacity: 0.8}]}><Text style={styles.cubeText}>back</Text></View>
                        <View style={[styles.cubeFace, {transform: [{rotateY: '180deg'}, {translateZ: 100}]}, {backgroundColor: 'gold', opacity: 0.8}]}><Text style={styles.cubeText}>right</Text></View>
                        <View style={[styles.cubeFace, {transform: [{rotateY: '-90deg'}, {translateZ: 100}]}, {backgroundColor: 'skyblue', opacity: 0.8}]}><Text style={styles.cubeText}>left</Text></View>
                        <View style={[styles.cubeFace, {transform: [{rotateX: '90deg'}, {translateZ: 100}]}, {backgroundColor: 'dodgerblue', opacity: 0.8}]}><Text style={styles.cubeText}>top</Text></View>
                        <View style={[styles.cubeFace, {transform: [{rotateX: '-90deg'}, {translateZ: 100}]}, {backgroundColor: 'hotpink', opacity: 0.8}]}><Text style={styles.cubeText}>bottom</Text></View>
                    </View>
                </View>
                
                <Pressable onPress={()=>setPersp(persp => {console.log(persp); return persp+200})} style={{height: 100, width: 100, backgroundColor: 'blue', borderRadius: 10}}></Pressable>
            </View>
        </>
    )
}
