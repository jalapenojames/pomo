import React, { Component, createRef } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Pressable, Animated, PanResponder, Easing } from 'react-native'
import Timer from './Timer'
import TimerDisplay from './TimerDisplay'
import MineeTimer from './MineeTimer'

export default class ClockView extends Component {
    animatedValue = new Animated.Value(0)
    animatedValSecond = new Animated.Value(0)
    animatedValueToFront = new Animated.Value(0)

    firstUpdate = createRef(true)
    funRef = createRef(null)


    state = {
        numberOfSides: 200,
        color: 'tomato',
        secondsLeft: 60*this.props.timer,
        sideEffect: false,
        isRunning: false,
        watchDate: null,
        startDate: null,
        pan: new Animated.ValueXY()
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

    animateToFront = () => {
        // return (
            Animated.timing(this.animatedValueToFront, {
                toValue: 1,
                duration: 3000,
                useNativeDriver: false,
                easing: Easing.linear,
            }).start()
        // )
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
        this._animatedValue = new Animated.ValueXY()
        this._offSet = {x: 0, y: 0}
        this._animatedValue.addListener(v => this._offSet = v)
        this._placeholder = {x: 0, y: 0}

        this.panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: (e, gestureState) => {
                console.log('on grant', this._placeholder)

                // const {dx, dy} = gestureState;
                // const y = `${dx}deg`;
                // const x = `${-dy}deg`;
                // this.refView.setNativeProps({style: {transform: [{perspective: 1000}, {translateZ: -100}, {rotateX: this._offSet.x}, {rotateY: this._offSet.y}]}});
                // need to figure out how to have animated value start off on previous motion coordinates
            },
            onPanResponderMove: this.handlePanResponderMove.bind(this),
            onPanResponderRelease: (e, gestureState) => {
                this._placeholder = {x: this._animatedValue.x._value, y: this._animatedValue.y._value}  // store value in a placeholder
                this._animatedValue.setValue({x: 0, y:0})                                               // reset to zero
            }
        });
    }

    handlePanResponderMove(e, gestureState) {
        const {dx, dy} = gestureState;
        const y = `${dx+this._placeholder.x}deg`;
        const x = `${-(dy+this._placeholder.y)}deg`;

        this.refView.setNativeProps({style: {transform: [{perspective: 1000}, {translateZ: -100}, {rotateX: x}, {rotateY: y}]}});
        this._animatedValue.setValue({x: dx+this._placeholder.x, y: dy+this._placeholder.y})

        // const sideLength = 200;
        // const origin = {x: 0, y: 0, z: -sideLength / 2};
        // let matrix = this.rotateXY(dx, dy);
        // // console.log(matrix)
        // // from https://gist.github.com/jmurzy/0d62c0b5ea88ca806c16b5e8a16deb6a#file-foldview-transformutil-transformorigin-js
        // this.transformOrigin(matrix, origin);
        // this.refView.setNativeProps({style: {transform: [{perspective: 600}, {translateZ: -85}, {matrix3d: matrix}]}});
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

    async moveClockToFront (placeholder, refView) {
        const interval = 50

        // find distance between current position (placeholder) and 0,0 degree rotation

        for(let i=0; i<interval; i++) {
            await new Promise(resolve => setTimeout(resolve,5))

            refView.setNativeProps({style: {transform: [{translateZ: -100},{rotateX: `${placeholder.y*-(interval-1-i)/interval}deg`}, {rotateY: `${placeholder.x*(interval-1-i)/interval}deg`}]}});
        }
    }

    async moveClockToBack (placeholder, refView) {
        const interval = 50
        console.log(placeholder)

        for(let i=0; i<interval; i++) {
            await new Promise(resolve => setTimeout(resolve,5))

            console.log(placeholder.y*-(interval-1-i)/interval,(180)*(i+1)/interval + placeholder.x*(interval-1-i/interval))
            refView.setNativeProps({style: {transform: [{translateZ: -100},{rotateX: `${placeholder.y*-(interval-1-i)/interval}deg`}, {rotateY: `${((180)*(i+1)/interval + (placeholder.x)*((interval-1-i)/interval)%360)}deg`}]}});
        }
    }

    render() {
        return (
        <View style={{flex: 1, borderWidth: 1}}>
            <View style={[styles.scene, {transform: [{scale: 2}]}]} {...this.panResponder.panHandlers}>
                <Animated.View ref={component => this.refView = component} style={[styles.cube, /*{transform: [{translateZ: -100}, {rotateX: `${this.animatedValueToFront.x._value}deg`}, {rotateY: `${this.animatedValueToFront.y._value}deg`}]}*/]}>

                    <View style={[styles.cubeFace, {transform: [{rotateY: '0deg'}, {translateZ: 50}]}, {backgroundColor: '#e6e6e6', opacity: 1, borderRadius: 100}]}>
                        {this.PomoClock()}
                    </View>

                    <View style={[styles.cubeFace, {transform: [{rotateY: '180deg'}, {translateZ: 50}]}, {backgroundColor: 'aliceblue', opacity: 0.99, borderRadius: 100}]}>
                        <View style={[styles.center, {borderWidth: 0, borderColor: 'white', margin: 10, padding: 10, transform: [{scale: 0.65}], backgroundColor: 'aliceblue'}]}>
                            <View style={{top: -100}}>
                                <Timer timer={1} color={this.state.color} setColor={(color)=>this.setState({color: color})} animation={this.animation} resetAnimation={this.resetAnimation} animatedValSecond={this.animatedValSecond} animatedValue={this.animatedValue}/>
                            </View>
                        </View>   

                        {/* L+R Buttons */}
                        <View style={{position: 'absolute', height: 36, width: 36, borderRadius: 18, backgroundColor: 'gray', left: 180,}}></View>  
                        <View style={{position: 'absolute', height: 36, width: 36, borderRadius: 18, backgroundColor: 'gray', right: 180}}></View>  
                    </View>

                    {/* {Cover for clock FRONT} */}
                    <View style={[styles.cubeFace, {transform: [{rotateY: '0deg'}, {translateZ: 49.9}]}, {backgroundColor: 'rgba(0,0,128,.9)', borderRadius: 130, height: 260, width: 260, borderWidth: 2, borderColor: 'rgba(0,0,128,.6)'}]}/>

                    {/* {Cover for clock BACK} */}
                    <View style={[styles.cubeFace, {transform: [{rotateY: '180deg'}, {translateZ: 49.9}]}, {backgroundColor: 'aliceblue', opacity: 0.99, borderRadius: 130, height: 260, width: 260}]}/>

                    {/* INNER Cylinder */
                        Array(this.state.numberOfSides).fill().map( (e,i) => {
                            return <View key={i+'side'} style={[styles.cubeFace, {transform: [{rotateY: '90deg'}, {rotateX: `${i*360/this.state.numberOfSides}deg`}, {translateZ: 100}]}, {borderColor: 'white', borderWidth: 2, backgroundColor: '#ededed', opacity: 1, width: 100, height: 200*this.tanInDegrees(360/this.state.numberOfSides/2)}]}></View>
                        })
                    }

                    {/* OUTER Cylinder */
                        Array(200).fill().map( (e,i) => {
                            return <View key={i+'side'} style={[styles.cubeFace, {transform: [{rotateY: '90deg'}, {rotateX: `${i*360/this.state.numberOfSides}deg`}, {translateZ: 130}]}, {borderColor: 'rgba(0,0,128,.6)', borderWidth: 3, backgroundColor: '#ededed', opacity: 1, width: 100, height: 260*this.tanInDegrees(360/this.state.numberOfSides/2)}]}></View>
                        })
                    }

                </Animated.View>
            </View>  

            <View style={[styles.cubeFace, {borderRadius: 10, height: 400, width: 400, left: 0, top: -150, height: 60}]}>
                <View style={{borderWidth: 1, margin: 10, padding: 10, borderRadius: 5, backgroundColor: 'gray'}}>
                    <TimerDisplay timer={1} color={this.state.color} setColor={(color)=>this.setState({color: color})} animation={this.animation} resetAnimation={this.resetAnimation} animatedValSecond={this.animatedValSecond} animatedValue={this.animatedValue}/>
                </View>   
            </View>  

            <View style={{height: 20, width: 20, borderRadius: 10, backgroundColor: 'black', position: 'absolute'}}>
                <Text style={{position: 'absolute', fontSize: 10, top: -25}}>position absolute</Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'space-around', backgroundColor: 'transparent'}}>
                <TouchableOpacity onPress={()=>{this.moveClockToFront(this._placeholder, this.refView); this._placeholder={x:0, y:0}/*this._placeholder = {x: (this._placeholder.x+40)%360===0? 0 : this._placeholder.x+40, y: (this._placeholder.y+40)%360===0? 0 :  this._placeholder.y+40}*/}} style={{height: 100, width: 100, backgroundColor: 'gray', borderRadius: 10, margin: 50, justifyContent: 'center'}} activeOpacity={0.8}><Text style={{textAlign: 'center', textAlignVertical: 'center', alignSelf: 'auto', color: 'white', fontSize: '1.5em'}}>front</Text></TouchableOpacity>
                <TouchableOpacity onPress={()=>{this.moveClockToBack(this._placeholder, this.refView); this._placeholder={x:180, y:0}}} style={{height: 100, width: 100, backgroundColor: 'lightgray', borderRadius: 10, margin: 50, justifyContent: 'center'}} activeOpacity={0.8}><Text style={{textAlign: 'center', textAlignVertical: 'center', alignSelf: 'auto', fontSize: '1.5em'}}>back</Text></TouchableOpacity>
            </View>
        </View>
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
        height: 260, 
        width: 260, 
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