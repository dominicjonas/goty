import React, { useState } from 'react'
import { initializeApp } from '@firebase/app'
import { firebaseConfig } from '../firebase'

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'
import { useEffect } from 'react/cjs/react.development'

// initialize firebase app
initializeApp(firebaseConfig)

// init services
const auth = getAuth()

const GoalDisplay = () => {
  const [userCred, setUserCred] = useState({})

  useEffect(() => {
    setUserCred(auth.currentUser)
    return () => {}
  }, [])

  console.log('signed in user credentials: ', userCred)

  return (
    <div>
      <h1>Goals to be displayed here upon login</h1>
      <h2>Current signed in user: {userCred.displayName}</h2>
    </div>
  )
}

export default GoalDisplay
