import { useState, useEffect, useRef } from 'react'

export default function Timer({ givenTime, time_start }) {
  // these lines run on every frame
  const millis = Math.floor((Date.now() - time_start) / 1000)
  const convertedTime = (givenTime * 60) - millis

  const [timeLeft, setTimeLeft] = useState(convertedTime) 
  const [minutes, setMinutes] = useState('--')
  const [seconds, setSeconds] = useState('--')

  const intervalRef = useRef()
  intervalRef.current = timeLeft
  //console.log('time left: ' + timeLeft)
  //console.log('minutes left: ' + minutes)
  //console.log('seconds left: ' + seconds)

  const calculateTimeLeft = () => {
    if (intervalRef.current > 0) {
      setTimeLeft(c => c - 1)
      //const m = Math.floor(timeLeft / 60).toString().padStart(2,'0')
      //const s = Math.floor(timeLeft % 60).toString().padStart(2, '0')

      console.log('time left:' + intervalRef.current)
      setMinutes(() => Math.floor(intervalRef.current / 60).toString().padStart(2,'0'))
      setSeconds(() => Math.floor(intervalRef.current % 60).toString().padStart(2, '0'))

      //formatTimeLeft()
    } else {
      setTimeLeft(0)
    }
  }

  //const formatTimeLeft = () => {
    //if (timeLeft == 0) return

    //const m = Math.floor(timeLeft / 60).toString().padStart(2,'0')
    //const s = Math.floor(timeLeft % 60).toString().padStart(2, '0')

    //setMinutes(m)
    //setSeconds(s)
  //}

  useEffect(() => {
    console.log('logging from 1st useEffect')
    const millis = Math.floor((Date.now() - time_start) / 1000)
    const convertedTime = (givenTime * 60) - millis
    setTimeLeft(convertedTime)
  }, [time_start])
  
  // This isn't accurate
  useEffect(() => {
    const interval = setInterval(() => {
      calculateTimeLeft()
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const timer = (
    <div class="flex w-16">
      <div class="flex-none">
        <p class="font-custom font-semibold text-gray-800 text-xl">{minutes}</p>
      </div>
      <div class="flex-none">
        <p class="font-custom font-semibold text-gray-800 text-xl">:</p>
      </div>
      <div class="flex-none">
        <p class="font-custom font-semibold text-gray-800 text-xl">{seconds}</p>
      </div>
    </div>
  )

  const timesUp = (
    <div class="flex w-16">
      <p class="font-custom font-semibold text-gray-800 text-xl">Times Up!</p>
    </div>
  )

  return (
    <>
      {timeLeft != 0 ? timer : timesUp}
    </>
  )

  //return (
    //<div class="flex">
      //<p class="font-custom font-semibold text-gray-800 text-xl">{timeLeft}</p>
    //</div>
  //)
}
