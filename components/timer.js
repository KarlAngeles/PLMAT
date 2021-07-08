import { useState, useEffect, useRef } from 'react'

export default function Timer({ givenTime, time_start, submitHandler }) {
  // these lines run on every frame
  const millis = Math.floor((Date.now() - time_start) / 1000)
  const convertedTime = (givenTime * 60) - millis

  const [timeLeft, setTimeLeft] = useState(convertedTime) 
  const [minutes, setMinutes] = useState('--')
  const [seconds, setSeconds] = useState('--')

  const intervalRef = useRef()
  intervalRef.current = timeLeft

  const calculateTimeLeft = async () => {
    if (intervalRef.current > 0) {
      setTimeLeft(c => c - 1)

      console.log('time left:' + intervalRef.current)
      setMinutes(() => Math.floor(intervalRef.current / 60).toString().padStart(2,'0'))
      setSeconds(() => Math.floor(intervalRef.current % 60).toString().padStart(2, '0'))

    } else {
      setTimeLeft(0)
      // runs submit handler from app page
      await submitHandler()
    }
  }

  useEffect(() => {
    console.log('logging from 1st useEffect')
    const millis = Math.floor((Date.now() - time_start) / 1000)
    const convertedTime = (givenTime * 60) - millis
    setTimeLeft(convertedTime)
  }, [time_start])
  
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
