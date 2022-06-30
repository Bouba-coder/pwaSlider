import {useState, useEffect} from 'react';
import Login from './components/auth/Login';
import Home from './components/Home';
import firebase from 'firebase/compat/app';

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
      firebase.auth().onAuthStateChanged(user => {
        setUser(user);
      })
    }, [])

    console.log(user);
    
    return (
      <div>
        {user ? <Home user={user} /> : <Login />}
      </div>
    );
}

export default App;
