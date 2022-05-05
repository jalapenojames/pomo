import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import TwemcoFlip from './TwemcoFlip'

const CurrentClock = () => {
    const [isRunning, setIsRunning] = useState(false);
    const funRef = useRef(null);
    const [current, setCurrent] = useState(null)

    useEffect(() => {
        if (isRunning) {
        funRef.current = setInterval(() => { // Save reference to interval.
            // ...
            const rn = new Date
            setCurrent(rn)
        }, 1000);
        } else {
        clearInterval(funRef.current); // Stop the interval.
        }
    }, [isRunning]);

    useEffect(()=>{setIsRunning(true)},[])

    const side=30

    return (
        <View style={{height: 400, width: 420, backgroundColor: 'orange', justifyContent: 'center', alignItems: 'center'}}>
            <Text>{current? current.getHours() +':'+ current.getMinutes() + ':'+ current.getSeconds() : 'loading...'}</Text>
            <View style={{flexDirection: 'row'}}>
                <View style={[{height: side, width: side, borderWidth: 2}, styles.center]}>
                    <Text>{current? current.getHours()%12 : ''}</Text>
                </View>
                <View style={{width: 10}}/>
                <View style={[{height: side, width: side, borderWidth: 2},styles.center]}>
                    <Text>{current? current.getMinutes() : ''}</Text>
                </View>
            </View>

            {/* <Text>{current? current.getHours()>12? 'pm' : 'am' : ''}</Text> */}

            <TwemcoFlip />
        </View>
    )
}

export default CurrentClock

const styles = {
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }
}