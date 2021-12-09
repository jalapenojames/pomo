import React, { useState, useRef, useEffect, } from 'react'
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'

const RightHalf = ({color, degrees}) => (
    <View style={{marginTop: 10, borderWidth: 0, height: 101}}>
        <View style={{transformOrigin: 'center bottom',transform: 'rotate(-90deg)',}}>
            <View style={{position: 'relative', transformOrigin: 'center bottom', transform: 'rotate(0deg)'}}>
                <SemiCircle color={color}/>
            </View>
            <View style={{position: 'absolute', transformOrigin: "center bottom",transform: [{rotate: `${degrees+180}deg`}]}}>
                <SemiCircle color={color}/>
            </View>
        </View>
    </View>        
)

const LeftHalf = () => {
    <View style={{height: 50, width: 100, overflow: 'hidden', transformOrigin: 'center bottom', transform: [{rotate: "-90deg"}], marginBottom: 50}}>
        <View style={{height: 50, width: 100, overflow: 'hidden', backgroundColor: 'transparent', position: 'relative', transformOrigin: 'center bottom', transform: [{rotate: "0deg"}]}}>
            <View style={{height: 100, width: 100, backgroundColor: 'green', marginTop: 0, borderTopLeftRadius: 50, borderTopRightRadius: 50, }}/>
        </View> 
    </View>
}

const SemiCircle = ({color}) => (
    <View style={{height: 50, width: 100, overflow: 'hidden', backgroundColor: 'transparent', position: 'relative'}}>
        <View style={{position: 'absolute', height: 100, width: 100, backgroundColor: color, marginTop: 0, borderTopLeftRadius: 50, borderTopRightRadius: 50}}/>
    </View>        
)

const Timer = ({ animation, resetAnimation, animatedValSecond, animatedValue }) => {
    const [count, setCount] = useState([0,1,0])

    const [secondsLeft, setSecondsLeft] = useState(60*25)

    const [seconds,setSeconds] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [hours, setHours] = useState(0)

    const [isUpdate, setIsUpdate] = useState(false)
    const [isRunning, setIsRunning] = useState(false);
    const [watch, setWatch] = useState([0,0,0])
    const [start, setStart] = useState([0,0,0])
    const [watchDate, setWatchDate] = useState(null)
    const [startDate, setStartDate] = useState(null)
    const funRef = useRef(null);
 
    const startTimer = () => {
        const rn = new Date
        setStart([rn.getHours(), rn.getMinutes(), rn.getSeconds()])
        setWatch([rn.getHours(), rn.getMinutes(), rn.getSeconds()])
        setStartDate(rn)
        setWatchDate(rn)

        animation(Math.trunc(secondsLeft/60)).start()
        
       if (!isRunning) {
          setIsRunning(true);
       }
    };
 
    const stopTimer = () => {
       if (isRunning && funRef.current !== null) {
          setIsRunning(false);
       }
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

    const minus = (a, b) => {   // where a,b are [hr,min,sec], and a is greater or "later" time than b
        a = [1,2,3]; 
        b = [0,0,5];

        // convert a,b to seconds, take difference
        const aTimeInSeconds = clockToSeconds(a)
        const bTimeInSeconds = clockToSeconds(b)

        const diff = aTimeInSeconds-bTimeInSeconds
        console.log("a-b is "+aTimeInSeconds+"-"+bTimeInSeconds, aTimeInSeconds-bTimeInSeconds)
        const result = secondsToClock(diff)

        return result
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
        const strArr = clock.map(elem => {
            if(elem.toString().length===2)
                return elem.toString()
            if(elem.toString().length===1)
                return '0'+elem.toString()
        })

        return strArr.join(":")
    }

    return (
        <>
        <View style={styles.timerContainer}>
            <View style={[styles.buttonContainer, styles.center]}>
                <TouchableOpacity onPress={startTimer} activeOpacity={0.8} style={[styles.button,{marginRight: 5, backgroundColor: 'green'}]}>
                    <Text style={{color: 'white'}}>start</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={stopTimer} activeOpacity={0.8} style={[styles.button, {marginRight: 5, backgroundColor: 'salmon'}]}>
                    <Text style={{color: 'black'}}>stop</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={resetTimer} activeOpacity={0.8} style={[styles.button, {backgroundColor: 'white'}]}>
                    <Text style={{color: 'black'}}>reset</Text>
                </TouchableOpacity>
            </View>

            <View style={[styles.digits, styles.center]}>
                <Text style={styles.counterText}>
                    {
                        watchDate? 
                            convertClockToDigit(minusFullDate(watchDate,startDate) )
                        : 
                            '00:00:00'
                    }
                    {/* {console.log(`${watch[0]}:${watch[1]}:${watch[2]}`)}
                    {console.log(`${start[0]}:${start[1]}:${start[2]}`)} */}
                </Text>
            </View>

            <View style={[styles.countContainer, styles.center]}>
                <Text>Timer</Text>
                {/* <Text style={styles.count}>{count[0]+":"+count[1]+":"+count[2]}</Text> */}
                {
                    <Text style={styles.count}>
                        {
                        watchDate? 
                            Math.trunc((secondsLeft-minusFullDateSeconds(watchDate,startDate))/60)
                            :
                            Math.trunc(secondsLeft/60)
                        }
                    </Text>
                }
            </View>

            <View style={[styles.countContainer, styles.center, {justifyContent: 'space-around'}]}>
                <TouchableOpacity onPress={()=>setSecondsLeft(secondsLeft+60*20)} style={{height: 25, width: 40, borderRadius: 5, backgroundColor: "bisque", paddingTop: 2}}><Text style={{textAlign: 'center'}}>^</Text></TouchableOpacity>
                <TouchableOpacity onPress={()=>setSecondsLeft(secondsLeft-60*20)} style={{height: 25, width: 40, borderRadius: 5, backgroundColor: "bisque", paddingTop: 2, transform: [{rotate: '180deg'}]}}><Text style={{textAlign: 'center'}}>^</Text></TouchableOpacity>                
            </View>

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

export default Timer

export { RightHalf, SemiCircle }

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
        flexDirection: 'row'
    },
    counterText: {
        fontSize: 15
    },
    button: {
        padding: 3, borderWidth: 1, borderRadius: 5, marginBottom: 5
    },
    buttonContainer: {
        flexDirection: 'column', padding: 5
    },
    digits: {
        height: 100, width: 100,
        borderRadius: 10,
        backgroundColor: 'skyblue',
    },
    center: {
        justifyContent: 'center', alignItems: 'center'
    }
})
