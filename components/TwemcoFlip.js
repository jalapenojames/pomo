import React, { useRef } from 'react'
import { StyleSheet, Text, View, Animated, TouchableOpacity, Easing} from 'react-native'

const TwemcoFlip = () => {
    const side = 50

    const animatedValue = useRef(new Animated.Value(0)).current

    const startAnimation = () => {
        Animated.sequence([
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 200,
                easing: Easing.linear,
                useNativeDriver: false,
            }),
            // Animated.timing(animatedValue, {
            //     toValue: 0,
            //     duration: 0,
            //     easing: Easing.linear,
            //     useNativeDriver: false,
            // }),
        ]).start()
    }

    const Digit = ({n, size}) =>
        <Text style={{color: 'white', fontSize: size*3/5, fontWeight: 'bold'}}>{n}</Text>

    const topFold = (n, size) => 
    <>
        <View style={{height: size/2, overflow: 'hidden'}}>
            <View style={[{height: size, width: size*3/5, borderWidth: 2, backgroundColor: 'black'}, styles.center]}>
                <Digit n={n} size={size}/>
            </View>
        </View>   
    </>

    const cardFold = (n, size) =>
    <View style={styles.scene}>
        <View style={styles.card}>

        </View>
    </View>

    const bottomFold = (n,size) => 
    <>
        <View style={{height: size/2, overflow: 'hidden'}}>
            <View style={[{top: -size/2, height: size, width: size*3/5, borderWidth: 2, backgroundColor: 'black'}, styles.center]}>
                <Digit n={n} size={size}/>
            </View>
        </View>    
    </>

    const addOneMod10 = (n) => (n+1)%10

    const Fold = ({n, size}) => {
        const rY = 0
        const rX = 0
    return (
        <View style={{flexDirection: 'column', perspective: 600, backgroundColor: 'pink', height: 150, width: 150, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{height: size/5}}/>
            {topFold(n,size)}
            <Animated.View style={{transformStyle: 'preserve-3d', height: size/2, width: size*3/5, backgroundColor: 'black', position: 'absolute', transformOrigin: 'center bottom', opacity: 1, top: size/5+150/10, left: size/2-5 /*5*size/3*/, zIndex: 1, transform: [{rotateX: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '180deg']
            })}, {rotateY: `${rY}deg`}]}}>
                {topFold(addOneMod10(n),size)}
            </Animated.View>

            {bottomFold(n,size)}
        </View>
    )}

    return (
        <>
        <View style={{flexDirection: 'row'}}>
            <TouchableOpacity activeOpacity={0.8} onPress={startAnimation} style={{height: 20, width: 20, backgroundColor: 'skyblue', borderRadius: 3, marginLeft: 10}} />
            <TouchableOpacity activeOpacity={0.8} onPress={()=>animatedValue.setValue(0)} style={{height: 20, width: 20, backgroundColor: 'salmon', borderRadius: 3, marginLeft: 10}} />
        </View>

        <View style={{flexDirection: 'column'}}>
            <Fold n={0} size={100} />
            <Fold n={1} size={100} />
        </View>
        </>
    )
}

export default TwemcoFlip

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center', 
        alignItems: 'center'
    },
    textCenter: {
        textAlign: 'center',
    },
    scene: {
        width: 200, height: 260,
        perspective: 600
    },
    card: {

    },
    front: {

    },
    back: {

    }
})
