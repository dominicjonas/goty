import React, { useState } from 'react'

import { initializeApp } from '@firebase/app'
import { firebaseConfig } from '../firebase'

import { getAuth, signOut } from 'firebase/auth'

initializeApp(firebaseConfig)

// init services
const auth = getAuth()

const UserWidget = ({ photoURL, username }) => {
  const [displayDay, setDisplayDay] = useState('')
  const [displayHour, setDisplayHour] = useState('')
  const [displayMinute, setDisplayMinute] = useState('')
  const [displaySecond, setDisplaySecond] = useState('')
  const [timeOfDay, setTimeOfDay] = useState('')

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

    let nowLocale = new Date().toLocaleTimeString()
    let formattedHour = parseInt(nowLocale.split('').slice(0, 2).join(''))

    if (formattedHour > 5 && formattedHour < 12) {
      setTimeOfDay('morning')
    }
    if (formattedHour > 12 && formattedHour < 18) {
      setTimeOfDay('afternoon')
    }
    if (formattedHour > 18 && formattedHour < 5) {
      setTimeOfDay('evening')
    }
  }
  setInterval(handleCountdown, 1000)

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('signout successful')
      })
      .catch((err) => {
        console.log('an error occured signing out: ', err)
      })
  }

  return (
    auth.currentUser && (
      <div className='user-widget-container'>
        <div className='user-signout-container'>
          <div className='user-info'>
            <span>
              Good {timeOfDay}, <h3>{username}</h3>
            </span>
            <img src={photoURL} alt='user-profile' />
          </div>
          <div className='signout-button-container'>
            <button className='signout-button' onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
        </div>
        <h2 className='time-left'>Time left to complete your goals..</h2>
        <div className='countdown-container'>
          <div className='container-day'>
            <h3 className='day'>{displayDay}</h3>
            <h4>Day(s)</h4>
          </div>
          <div className='container-hour'>
            <h3 className='hour'>{displayHour}</h3>
            <h4>Hour(s)</h4>
          </div>
          <div className='container-minute'>
            <h3 className='minute'>{displayMinute}</h3>
            <h4>Minute(s)</h4>
          </div>
          <div className='container-second'>
            <h3 className='second'>{displaySecond}</h3>
            <h4>Second(s)</h4>
          </div>
        </div>
      </div>
    )
  )
}

export default UserWidget
