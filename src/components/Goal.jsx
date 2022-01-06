import React from 'react'
import { firebaseConfig } from '../firebase'
import { initializeApp } from '@firebase/app'

import { deleteDoc, doc, getFirestore } from 'firebase/firestore'

// initialize firebase app
initializeApp(firebaseConfig)

// init services
const db = getFirestore()

const Goal = ({ text, userId, goalId }) => {
  const handleDelete = (e) => {
    // setGoals(goals.filter((el) => el.goalId !== goal.goalId))
    const docRef = doc(db, 'goals', goalId)
    deleteDoc(docRef).then(() => {
      console.log(`Goal id: ${goalId} '${text}' has been deleted`)
    })
  }

  return (
    <div className='goal-container'>
      <li className='goal-item'>
        <p>{text}</p>
        <p>user id: {userId}</p>
      </li>
      <button>
        <i className='fas fa-check'></i>
      </button>
      <button onClick={handleDelete}>
        <i className='far fa-trash-alt'></i>
      </button>
    </div>
  )
}

export default Goal
