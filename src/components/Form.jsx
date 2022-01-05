import React, { useState } from 'react'

const Form = ({ setGoals, goals, currentUserUID }) => {
  const [inputText, setInputText] = useState('')

  const submitGoalHandler = (e) => {
    e.preventDefault()

    inputText &&
      setGoals([
        ...goals,
        {
          text: inputText,
          completed: false,
          userId: currentUserUID,
          goalId: Math.random() * 10000
        }
      ])
    setInputText('')
  }

  return (
    <form>
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
  )
}

export default Form
