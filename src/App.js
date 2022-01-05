import { initializeApp } from '@firebase/app'
import { firebaseConfig } from './firebase'

import SignIn from './auth/SignIn'
import SignOut from './auth/SignOut'

import { useAuthState } from 'react-firebase-hooks/auth'

import { getAuth } from 'firebase/auth'
import GoalDisplay from './components/GoalDisplay'

//  initialize firebase app
initializeApp(firebaseConfig)
// init services
const auth = getAuth()

// collection refs

function App() {
  const [user] = useAuthState(auth)
  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Goals Of The Year</h1>
        <SignOut />
      </header>
      <section>{user ? <GoalDisplay /> : <SignIn />}</section>
    </div>
  )
}

export default App
