import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Goal from './Goal'
import Countdown from './Countdown'
import { firebaseConfig } from '../firebase'
import { initializeApp } from '@firebase/app'

import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp,
  query,
  orderBy
} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// initialize firebase app
initializeApp(firebaseConfig)

// init services
const db = getFirestore()
const auth = getAuth()

// collection ref
const colRef = collection(db, 'goals')

// queries
const q = query(colRef, orderBy('createdAt'))

const GoalDisplay = ({ titleRef }) => {
  const [userCred, setUserCred] = useState({})
  const [goals, setGoals] = useState([])
  const [inputText, setInputText] = useState('')

  const gotyRef = useRef()

  // dont need this useEffect, just to see the user details
  useEffect(() => {
    setUserCred(auth.currentUser)
    onSnapshot(q, (snapshot) => {
      let goals = []
      snapshot.docs.forEach((doc) => {
        goals.push({ ...doc.data(), id: doc.id })
      })
      console.log(goals)
      setGoals(goals)
    })
    return () => {}
  }, [])

  // useEffect(() => {
  //   const tl = gsap.timeline({
  //     defaults: { duration: 0.75, ease: 'power1.out' }
  //   })
  //   tl.fromTo(
  //     titleRef.current,
  //     { y: 0, opacity: 1 },
  //     { y: '-150px', opacity: 0, duration: 1.5 }
  //   )
  //   tl.fromTo(
  //     gotyRef.current,
  //     { y: '-450px', opacity: 0 },
  //     { y: '10px', opacity: 1, duration: 1.5 }
  //   )
  //   return () => {}
  // }, [])

  const submitGoalHandler = (e) => {
    e.preventDefault()
    inputText &&
      addDoc(colRef, {
        text: inputText,
        isCompleted: false,
        createdAt: serverTimestamp(),
        userId: auth.currentUser.uid
      }).then(() => {
        console.log('goal submitted to firebase')
        setInputText('')
      })
  }

  return (
    <div>
      <h1 className='goty-title' ref={gotyRef}>
        GOTY
      </h1>

      <form className='goal-form-container'>
        <label>Add a goal</label>
        <input
          value={inputText}
          type='text'
          onChange={(e) => setInputText(e.target.value)}
        />
        <button onClick={submitGoalHandler} type='submit'>
          Add
        </button>
      </form>
      <div className='gaols-container'>
        <ul className='goal-list'>
          {goals
            // is it better to do this through firebase security rules??
            .filter((el) => el.userId === auth.currentUser.uid)
            .map((goal, index) => (
              <Goal
                key={index}
                text={goal.text}
                completed={goal.isCompleted}
                userId={goal.userId}
                goalId={goal.id}
              />
            ))}
        </ul>
      </div>
      <Countdown />
    </div>
  )
}

export default GoalDisplay
