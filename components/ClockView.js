import React, { Component, createRef } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Pressable, Animated, PanResponder, Easing } from 'react-native'
import Timer from './Timer'

export default class ClockView extends Component {
    animatedValue = new Animated.Value(0)
    animatedValSecond = new Animated.Value(0)
    firstUpdate = createRef(true)
    funRef = createRef(null)


    state = {
        numberOfSides: 200,
        color: 'tomato',
        secondsLeft: 60*this.props.timer,
        sideEffect: false,
        isRunning: false,
        watchDate: null,
        startDate: null
    }
        
        
    /////////////// ▾▾ Animate Clock things go here ▾▾ //////////////////////
    LeftHalf({color, diameter}) {
        return (
            <View style={{height: diameter/2, width: diameter, overflow: 'hidden', transformOrigin: 'center bottom', transform: [{rotate: "-90deg"}], marginBottom: diameter/2}}>
                <Animated.View style={{height: diameter/2, width: diameter, overflow: 'hidden', backgroundColor: 'transparent', position: 'relative', transformOrigin: 'center bottom', transform: [
                    {
                        rotate: this.animatedValue.interpolate({
                            inputRange: [0,0.5,1],
                            outputRange: ['0deg', '90deg', '180deg']
                        })
                    }
                ]}}>
                    <View style={{height: diameter, width: diameter, backgroundColor: color, marginTop: 0, borderTopLeftRadius: diameter/2, borderTopRightRadius: diameter/2, }}/>
                </Animated.View> 
            </View>    
        )
    }

    LeftHalf2nd({color, diameter}) {
        return (
            <View style={{height: diameter/2, width: diameter, overflow: 'hidden', transformOrigin: 'center bottom', transform: [{rotate: "-90deg"}], marginBottom: diameter/2}}>
                <Animated.View style={{height: diameter/2, width: diameter, overflow: 'hidden', backgroundColor: 'transparent', position: 'relative', transformOrigin: 'center bottom', transform: [
                    {
                        rotate: this.animatedValSecond.interpolate({
                            inputRange: [0,0.5,1],
                            outputRange: ['0deg', '90deg', '180deg']
                        })
                    }
                ]}}>
                    <View style={{height: diameter, width: diameter, backgroundColor: color, marginTop: 0, borderTopLeftRadius: diameter/2, borderTopRightRadius: diameter/2, }}/>
                </Animated.View> 
            </View>            
        )
    }

    LeftHalfTrial({color, diameter}) {
        return (
            <View style={{height: diameter/2, width: diameter, overflow: 'hidden', transformOrigin: 'center bottom', transform: [{rotate: "-90deg"}], marginBottom: diameter/2}}>
                <Animated.View style={{height: diameter/2, width: diameter, overflow: 'hidden', backgroundColor: 'transparent', position: 'relative', transformOrigin: 'center bottom', transform: [
                    {
                        rotate: this.animatedValue.interpolate({
                            inputRange: [0,0.5,1],
                            outputRange: ['0deg', '90deg', '180deg']
                        })
                    }
                ]}}>
                    <View style={{height: diameter, width: diameter, backgroundColor: color, marginTop: 0, borderTopLeftRadius: diameter/2, borderTopRightRadius: diameter/2, }}/>
                </Animated.View> 
            </View>    
        )
    }

    LeftHalf2ndTrial({color, diameter}) {
        return (
            <View style={{height: diameter/2, width: diameter, overflow: 'hidden', transformOrigin: 'center bottom', transform: [{rotate: "-90deg"}], marginBottom: diameter/2}}>
                <Animated.View style={{height: diameter/2, width: diameter, overflow: 'hidden', backgroundColor: 'transparent', position: 'relative', transformOrigin: 'center bottom', transform: [
                    {
                        rotate: this.animatedValSecond.interpolate({
                            inputRange: [0,0.5,1],
                            outputRange: ['0deg', '90deg', '180deg']
                        })
                    }
                ]}}>
                    <View style={{height: diameter, width: diameter, backgroundColor: color, marginTop: 0, borderTopLeftRadius: diameter/2, borderTopRightRadius: diameter/2, }}/>
                </Animated.View> 
            </View>            
        )
    }

    animation = (min) => {
        // it cannot read this.animatedValue here
        console.log("i'm in animation", this.animatedValue)
        return (
            Animated.sequence([
                Animated.timing(this.animatedValue, {
                    toValue: 1,
                    duration: min*30000,
                    useNativeDriver: false,
                    easing: Easing.linear
                }),
                Animated.timing(this.animatedValSecond, { // can make it sequential if I make a new animatedValue2 to be reference
                    toValue: 1,
                    duration: min*30000,
                    useNativeDriver: false,
                    easing: Easing.linear
                }),
                Animated.timing(this.animatedValue, {
                    toValue: 0,
                    duration: 0,
                    useNativeDriver: false,
                    easing: Easing.linear
                }),
                Animated.timing(this.animatedValSecond, { // can make it sequential if I make a new animatedValue2 to be reference
                    toValue: 0,
                    duration: 0,
                    useNativeDriver: false,
                    easing: Easing.linear
                }),
            ])            
        )
    }

    resetAnimation = () => {
        this.animatedValue.setValue(0); 
        this.animatedValSecond.setValue(0)        
    }

    PomoClock() {
        return (
            <TouchableOpacity style={{position: 'relative', top: -5}} activeOpacity={0.8}>
                <View style={{position: 'relative', paddingTop: 10}}>
                    {/* {Left half of circle} */}   
                    {this.LeftHalf2nd({color: this.state.color, diameter: 200})}
                    {/* {Right half of circle} */}  
                    <View style={{position: 'absolute', top: 10, transformOrigin: 'center center', transform: [{rotate: '180deg'}]}}>
                        {this.LeftHalf({color: this.state.color, diameter: 200})}
                    </View>

                    {/* {Centerpiece} */}   
                    <View style={{height: 70, width: 70, borderRadius: 35, backgroundColor: "bisque", position: 'absolute', top: 65, left: 65, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontStyle: 'italic'}}>focus</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    /////////////// ^^ Animate Clock things go here ^^ //////////////////////

    componentWillMount() {
        this.panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: this.handlePanResponderMove.bind(this),
        });
    }

    handlePanResponderMove(e, gestureState) {
        // const {dx, dy} = gestureState;
        // const y = `${dx}deg`;
        // const x = `${-dy}deg`;
        // this.refView.setNativeProps({style: {transform: [{perspective: 1000}, {translateZ: -100}, {rotateX: x}, {rotateY: y}]}});
    


        const {dx, dy} = gestureState;
        const sideLength = 200;
        const origin = {x: 0, y: 0, z: -sideLength / 2};
        let matrix = this.rotateXY(dx, dy);
        // console.log(matrix)
        // from https://gist.github.com/jmurzy/0d62c0b5ea88ca806c16b5e8a16deb6a#file-foldview-transformutil-transformorigin-js
        // this.transformOrigin(matrix, origin);
        this.refView.setNativeProps({style: {transform: [{perspective: 600}, {translateZ: -85}, {matrix3d: matrix}]}});
    }

    rotateXY(dx, dy) {
        const radX = (Math.PI / 180) * dy;
        const cosX = Math.cos(radX);
        const sinX = Math.sin(radX);
    
        const radY = (Math.PI / 180) * -dx;
        const cosY= Math.cos(radY);
        const sinY = Math.sin(radY);
    
        return [
        cosY, sinX * sinY, cosX * sinY, 0,
        0, cosX, -sinX, 0,
        -sinY, cosY * sinX, cosX * cosY, 0,
        0, 0, 0, 1
        ];
    }

    MatrixProd(A, B) {
        return A.map((row, i) =>
            B[0].map((_, j) =>
                row.reduce((acc, _, n) =>
                    acc + A[i][n] * B[n][j], 0
                )
            )
        )
    }

    transformOrigin(matrix, origin) {
        const { x, y, z } = origin;
      
        // Multiply M1 * M * M-1
        const M1 = [
            [1,0,0,0],
            [0,1,0,0],
            [0,0,1,0],
            [x,y,z,1]]

        // M1 * M
        const M1timesM = this.MatrixProd(M1, this.toFourbyFour(matrix))

        const Mminus1 = [
            [1,0,0,0],
            [0,1,0,0],
            [0,0,1,0],
            [-x,-y,-z,1]]
        
        // (M1 * M) * M-1
        const result = this.MatrixProd(M1timesM, Mminus1)

        matrix = this.to16by16(result)
    }

    // Need function to convert 16x1 to 4x4 : [- - - - - - - - - - - - - - - -] => {4x4}
    toFourbyFour(matrix16) {
        return [0,1,2,3].map(e=> 
            [0,1,2,3].map(e2 => 
                matrix16[e2+4*e]
            )
        )
    }

    // Need function to convert nested 4x4 to 16x1
    to16by16(matrix16) {
        let holder = []
        matrix16.map(e => {
            e.map(e2 => holder.push(e2))})
        
        return holder
    }
  
    tanInDegrees (degrees) {
        return Math.tan(degrees * Math.PI / 180);
    }

    render() {
        return (
        <>
            <View style={[styles.scene, {transform: [{scale: 2}]}]} {...this.panResponder.panHandlers}>
                {console.log(this.animatedValSecond)}
                <View ref={component => this.refView = component} style={styles.cube}>
                <View style={[styles.cubeFace, {transform: [{rotateY: '0deg'}, {translateZ: 50}]}, {backgroundColor: '#e6e6e6', opacity: 1, borderRadius: 100}]}>
                    {this.PomoClock()}
                </View>
                <View style={[styles.cubeFace, {transform: [{rotateY: '180deg'}, {translateZ: 50}]}, {backgroundColor: 'bisque', opacity: 0.99, borderRadius: 100}]}>
                    <View style={{borderWidth: 1, margin: 10, padding: 10, borderRadius: 5, transform: [{scale: 0.45}], backgroundColor: 'aliceblue'}}>
                        <Timer timer={1} color={this.state.color} setColor={(color)=>this.setState({color: color})} animation={this.animation} resetAnimation={this.resetAnimation} animatedValSecond={this.animatedValSecond} animatedValue={this.animatedValue}/>
                    </View>     
                </View>

                <View style={[styles.cubeFace, {transform: [{rotateY: '0deg'}, {translateZ: 49}]}, {backgroundColor: 'rgba(0,0,128,.6)', borderRadius: 130, height: 260, width: 260, borderWidth: 2, borderColor: 'rgba(0,0,128,.6)'}]}/>

                {
                    Array(this.state.numberOfSides).fill().map( (e,i) => {
                        return <View key={i+'side'} style={[styles.cubeFace, {transform: [{rotateY: '90deg'}, {rotateX: `${i*360/this.state.numberOfSides}deg`}, {translateZ: 100}]}, {borderColor: 'rgba(0,0,128,.9)', borderWidth: 2, backgroundColor: '#ededed', opacity: 1, width: 100, height: 200*this.tanInDegrees(360/this.state.numberOfSides/2)}]}></View>
                    })
                }

                {
                    Array(200).fill().map( (e,i) => {
                        return <View key={i+'side'} style={[styles.cubeFace, {transform: [{rotateY: '90deg'}, {rotateX: `${i*360/this.state.numberOfSides}deg`}, {translateZ: 130}]}, {borderColor: 'rgba(0,0,128,.6)', borderWidth: 3, backgroundColor: '#ededed', opacity: 1, width: 100, height: 260*this.tanInDegrees(360/this.state.numberOfSides/2)}]}></View>
                    })
                }

                </View>
            </View>  

            {/* <View style={[styles.cubeFace, {backgroundColor: 'gold', opacity: 0.99, borderRadius: 100, transform: [{scale: 1.8}]}]}>
                <View style={{borderWidth: 1, margin: 10, padding: 10, borderRadius: 5, transform: [{scale: 0.45}]}}>
                    <Timer timer={1} color={this.state.color} setColor={(color)=>this.setState({color: color})} animation={this.animation} resetAnimation={this.resetAnimation} animatedValSecond={this.animatedValSecond} animatedValue={this.animatedValue}/>
                </View>   
            </View>   */}
        </>
        );
    }
  }

  const styles = {
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    scene: {
        height: 200, 
        width: 200, 
        perspective: 600,
        borderWidth: 0, borderColor: '#CCC', 
        margin: 80,
        justifyContent: 'center',
        alignItems: 'center'
    },  
    cube: {
        height: 200, // or try '100%'
        width: 200,
        position: 'relative',
        // backgroundColor: 'rgba(255,215,0,0.8)',
        transformStyle: 'preserve-3d',
        transform: [{translateZ: -100}],
        transition: {transform: '1s'}, justifyContent: 'center', alignItems: 'center'
    },
    cubeFace: {
        position: 'absolute',
        height: 200,
        width: 200,
        borderWidth: 0, alignItems: 'center', justifyContent: 'center'
    },
    cubeText: {
        fontSize: 40, fontWeight: 'bold',
        color: 'white', lineHeight: 201// backgroundColor: 'orange',
    },
    timerContainer: {
        flexDirection: 'row'
    },
    button: {
        padding: 3, borderWidth: 1, borderRadius: 5, marginBottom: 5
    },
    center: {
        justifyContent: 'center', alignItems: 'center'
    },
    digits: {
        height: 100, width: 100,
        borderRadius: 10,
        backgroundColor: 'skyblue',
    },
    counterText: {
        fontSize: 15
    },
    count: {
        backgroundColor: 'white', borderRadius: 5, padding: 5
    }, 
}