import React, { useState, useRef, useEffect, } from 'react'
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import { IconButton } from 'react-native-paper';

const TimerDisplay = ({ timer, color, setColor, animation, resetAnimation, animatedValSecond, animatedValue }) => {
    const [count, setCount] = useState([0,1,0])

    const [secondsLeft, setSecondsLeft] = useState(60*timer)
    const [sideEffect, setSideEffect] = useState(false)
    const firstUpdate = useRef(true)

    const [isUpdate, setIsUpdate] = useState(false)
    const [isRunning, setIsRunning] = useState(false);
    const [watch, setWatch] = useState([0,0,0])
    const [start, setStart] = useState([0,0,0])
    const [watchDate, setWatchDate] = useState(null)
    const [startDate, setStartDate] = useState(null)
    const funRef = useRef(null);
 
    const startTimer = () => {
        const rn = new Date
        setStartDate(rn)
        setWatchDate(rn)

        animation(Math.trunc(secondsLeft/60)).start()
        // console.log(animation(1))
        
       if (!isRunning) {
          setIsRunning(true);
       }
    };
 
    const stopTimer = () => {
       if (isRunning && funRef.current !== null) {
          setIsRunning(false);
       }

       resetAnimation()
    };

    const resetTimer = () => {
        if (isRunning && funRef.current !== null) {
            setIsRunning(false);
            const rn = new Date
            setStart([rn.getHours(), rn.getMinutes(), rn.getSeconds()])
            setWatch([rn.getHours(), rn.getMinutes(), rn.getSeconds()])
            setStartDate(rn)
            setWatchDate(rn)
         }
        else {
            const rn = new Date
            setStart([rn.getHours(), rn.getMinutes(), rn.getSeconds()])
            setWatch([rn.getHours(), rn.getMinutes(), rn.getSeconds()])  
            setStartDate(rn)
            setWatchDate(rn)
        }

        resetAnimation()
    }

    const minusFullDate = (a,b) => { // where a is a later time than b
        const diff = Math.trunc((a.getTime()-b.getTime())/1000)

        return secondsToClock(diff)
    }

    const minusFullDateSeconds = (a,b) => Math.trunc((a.getTime()-b.getTime())/1000)

    const clockToSeconds = (arr) => 3600*arr[0]+60*arr[1]+arr[2]

    const secondsToClock = (s) => {
        const seconds = s%60
        const minutes = (s-s%60)/60%60
        const hours = Math.floor((s-60*minutes-seconds)/3600)

        return [hours,minutes,seconds]
    }
 
    useEffect(() => {
       if (isRunning) {
          funRef.current = setInterval(() => { // Save reference to interval.
             // ...
             const rn = new Date
             setWatch([rn.getHours(), rn.getMinutes(), rn.getSeconds()])
             setWatchDate(rn)
            //  if(minusFullDateSeconds(watchDate,startDate)-60>=0)
            //     clearInterval(funRef.current)
            //  setCount()
          }, 1000);
       } else {
          clearInterval(funRef.current); // Stop the interval.
       }
    }, [isRunning]);

    const convertClockToDigit = (clock) => {
        clock = clock.slice(1)
        const strArr = clock.map(elem => {
            if(elem.toString().length===2)
                return elem.toString()
            if(elem.toString().length===1)
                return '0'+elem.toString()
        })

        return strArr
    }

    const convertDigitToTextComponent = (digit) => {

        return <Text style={styles.counterText} >{digit[0]}:{digit[1]}</Text>
    }  

    useEffect(()=>{
        if(!firstUpdate.current) {
            console.log('Side effect activated, seconds left is: ', secondsLeft)
            startTimer()
        }
    }, [sideEffect])

    useEffect(()=>{
        firstUpdate.current = false
    },[])

    const ResetButton = () => 
        <View style={{height: 100, width: 100, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
            <TouchableOpacity onPress={resetTimer} activeOpacity={0.8} style={{borderRadius: 5, backgroundColor: '#8cc084', height: 20, width: 25, marginLeft: 2}}/>
        </View>

    const TaskButtons = () =>
        <View style={{height: 100, width: 200, justifyContent: 'space-around', alignItems: 'center', borderWidth: 1, borderRadius: 5, margin: 10}}>
            <TouchableOpacity activeOpacity={0.8} onPress={()=>{setSecondsLeft(60*25); setColor('tomato'); setSideEffect(!sideEffect)}} style={{height: 30, width: 120, borderRadius: 5, backgroundColor: 'teal', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                <Text style={{backgroundColor: 'white', height: 15, width: 50, textAlign: 'center', textAlignVertical: 'center', fontStyle: 'italic', borderRadius: 3}}>focus</Text>
                <Text style={{backgroundColor: 'white', height: 15, width: 20, textAlign: 'center', textAlignVertical: 'center', borderRadius: 3}}>25</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={()=>{setSecondsLeft(60*10); setColor('#a4ac86'); setSideEffect(!sideEffect)}} style={{height: 30, width: 120, borderRadius: 5, backgroundColor: 'green', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                <Text style={{backgroundColor: 'white', height: 15, width: 50, textAlign: 'center', textAlignVertical: 'center', fontStyle: 'italic', borderRadius: 3}}>rest</Text>
                <Text style={{backgroundColor: 'white', height: 15, width: 20, textAlign: 'center', textAlignVertical: 'center', borderRadius: 3}}>10</Text>
            </TouchableOpacity>
        </View>

    return (
        <>
        <View style={styles.timerContainer}>
            <TouchableOpacity onPress={()=>console.log('pause')} activeOpacity={0.8} style={[styles.button, styles.center,{backgroundColor: 'orange',marginRight: 5, flexDirection: 'row', width: 30},]}>
                <View style={{height: 15, width: 5, backgroundColor: '#663399', borderRadius: 3}}/>
                <View style={{height: 5, width: 2, backgroundColor: 'transparent'}}/>
                <View style={{height: 15, width: 5, backgroundColor: '#663399', borderRadius: 3}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={startTimer} activeOpacity={0.8} style={[styles.button,{backgroundColor: 'green', justifyContent: 'center', marginRight: 5}]}>
                <Text style={{textAlign: 'center', color: 'white' }}>start</Text>
            </TouchableOpacity>

            <View style={[styles.digits, styles.center, {marginRight: 5}]}>
                {/* <Text style={styles.counterText}> */}
                    {
                        watchDate? 
                            convertDigitToTextComponent(convertClockToDigit(minusFullDate(watchDate,startDate)))
                        : 
                            convertDigitToTextComponent(['00','00'])
                    }
                {/* </Text> */}
            </View>

            <TouchableOpacity onPress={stopTimer} activeOpacity={0.8} style={[styles.button, {backgroundColor: 'salmon', justifyContent: 'center'}]}>
                <Text style={{textAlign: 'center', color: 'black' }}>stop</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={resetTimer} activeOpacity={0.8} style={[styles.button, {backgroundColor: '#023e8a', justifyContent: 'center', alignSelf: 'center', height: 30, transform: [{rotate: '90deg'}]}]}>
                <IconButton icon="autorenew" size={20} color="skyblue"/> 
            </TouchableOpacity>
        </View>


        { // this section stops the clock when timer reaches 0
                watchDate? 
                    minusFullDateSeconds(watchDate,startDate)-secondsLeft>=0?
                        (()=>{clearInterval(funRef.current);resetTimer()})()
                        :
                        (()=>{})()
                    : 
                    console.log()
            }
        </>
    )
}

export default TimerDisplay

const styles = StyleSheet.create({
    countContainer: {
        height: 100, 
        width: 60,
        marginLeft: 5, borderRadius: 5, 
        backgroundColor: 'orange'
    }, 
    count: {
        backgroundColor: 'white', borderRadius: 5, padding: 5
    },   
    timerContainer: {
        flexDirection: 'row', alignItems: 'center',
    },
    counterText: {
        fontSize: 45, fontStyle: 'italic',
    },
    button: {
        height: 50, width: 50,
        padding: 3, borderWidth: 1, borderRadius: 5, marginBottom: 5
    },
    buttonContainer: {
        flexDirection: 'column', padding: 5
    },
    digits: {
        height: 70, width: 150,
        borderRadius: 10,
        backgroundColor: 'lightgray',
    },
    center: {
        justifyContent: 'center', alignItems: 'center'
    }
})
