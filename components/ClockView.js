import React, { Component } from 'react'
import { StyleSheet, Text, View, Pressable, Animated, PanResponder } from 'react-native';

const styles = {
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    rotateView: {
      width: 100,
      height: 100,
      backgroundColor: 'pink',
      shadowOffset: {height: 1, width: 1},
      shadowOpacity: 0.2
    },
    scene: {
        height: 200, 
        width: 200, 
        perspective: 600,
        borderWidth: 1, borderColor: '#CCC', 
        margin: 80,
        justifyContent: 'center',
        alignItems: 'center'
    },  
    cube: {
        height: 200, // or try '100%'
        width: 200,
        position: 'relative',
        // backgroundColor: 'gold',
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
}
  
  export default class ClockView extends Component {
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
        this.transformOrigin(matrix, origin);
        this.refView.setNativeProps({style: {transform: [{perspective: 1000}, {translateZ: -100}, {matrix3d: matrix}]}});
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
  
    render() {
      return (
        <View style={styles.scene} {...this.panResponder.panHandlers} >
          <View ref={component => this.refView = component} style={styles.cube}>
            <View style={[styles.cubeFace, {transform: [{rotateY: '0deg'}, {translateZ: 50}]}, {backgroundColor: 'pink', opacity: 0.8, borderRadius: 100}]}></View>
            <View style={[styles.cubeFace, {transform: [{rotateY: '180deg'}, {translateZ: 50}]}, {backgroundColor: 'gold', opacity: 0.8, borderRadius: 100}]}></View>
            <View style={[styles.cubeFace, {transform: [{rotateY: '90deg'}, {translateZ: 100}]}, {backgroundColor: 'lightgreen', opacity: 0.8}]}></View>
            <View style={[styles.cubeFace, {transform: [{rotateY: '-90deg'}, {translateZ: 100}]}, {backgroundColor: 'skyblue', opacity: 0.8, height: 100,}]}></View>
            <View style={[styles.cubeFace, {transform: [{rotateX: '90deg'}, {translateZ: 100}]}, {backgroundColor: 'dodgerblue', opacity: 0.8}]}></View>
            <View style={[styles.cubeFace, {transform: [{rotateX: '-90deg'}, {translateZ: 100}]}, {backgroundColor: 'hotpink', opacity: 0.8}]}></View>
          </View>
        </View>
      );
    }
  }