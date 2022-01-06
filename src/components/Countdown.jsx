import React, { useState } from 'react'

const Countdown = () => {
  const [displayDay, setDisplayDay] = useState('')
  const [displayHour, setDisplayHour] = useState('')
  const [displayMinute, setDisplayMinute] = useState('')
  const [displaySecond, setDisplaySecond] = useState('')

  const handleCountdown = () => {
    const countDate = new Date('Dec 31, 2022 00:00:00').getTime()
    const now = new Date().getTime()
    const gap = countDate - now

    const second = 1000
    const minute = second * 60
    const hour = minute * 60
    const day = hour * 24

    setDisplayDay(Math.floor(gap / day))
    setDisplayHour(Math.floor((gap % day) / hour))
    setDisplayMinute(Math.floor((gap % hour) / minute))
    setDisplaySecond(Math.floor((gap % minute) / second))
  }

  setInterval(handleCountdown, 1000)

  return (
    <>
      <h2>Time left to complete goals..</h2>
      <div className='countdown-container'>
        <div className='container-day'>
          <h3 className='day'>{displayDay}</h3>
          <h3>Day(s)</h3>
        </div>
        <div className='container-hour'>
          <h3 className='hour'>{displayHour}</h3>
          <h3>Hour(s)</h3>
        </div>
        <div className='container-minute'>
          <h3 className='minute'>{displayMinute}</h3>
          <h3>Minute(s)</h3>
        </div>
        <div className='container-second'>
          <h3 className='second'>{displaySecond}</h3>
          <h3>Second(s)</h3>
        </div>
      </div>
    </>
  )
}

export default Countdown
