import React from 'react'
import { initializeApp } from '@firebase/app'
import { firebaseConfig } from '../firebase'

import { getAuth, signOut } from 'firebase/auth'

initializeApp(firebaseConfig)

// init services
const auth = getAuth()

const Signout = () => {
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
      <button className='signout-button' onClick={handleSignOut}>
        Sign Out
      </button>
    )
  )
}

export default Signout
