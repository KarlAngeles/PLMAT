import { useState, useEffect } from 'react'

export default function Timer({ givenTime }) {
  const calculateTimeLeft = () => {
    // need to add time formatting
    if (timeLeft > 0) {
      return givenTime - 1
    }

    return 0
  }

  const [timeLeft, setTimeLeft] = useState(givenTime) 

  useEffect(() => {
    setTimeout(() => {
      setTime(calculateTimeLeft)
    }, 1000)
  })

  // add styling
  return (
    <div>
      {time}
    </div>
  )
}
