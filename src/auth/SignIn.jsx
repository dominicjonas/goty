import React from 'react'
import { initializeApp } from '@firebase/app'
import { firebaseConfig } from '../firebase'

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'

// initialize firebase app
initializeApp(firebaseConfig)

// init services
const auth = getAuth()

const SignIn = () => {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider()

    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential.accessToken
        // signed in user info
        const user = result.user
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </>
  )
}

export default SignIn
