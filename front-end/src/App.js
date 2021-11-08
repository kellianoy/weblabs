
/** @jsxImportSource @emotion/react */
import React, {useState} from 'react'
import './App.css';
// Local
import Footer from './Footer'
import Header from './Header'
import Main from './Main'
import Login from './Login'

import {useContext} from 'react';

const styles = {
  root: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#565E71',
    padding: '50px',
  },
}

export const UserContext = React.createContext({ user: null, setUser: null, logout: null});

export const ContextProvider = ({
  children
}) => {
  const [user, setUser] = useState(null)
  return (
    <UserContext.Provider value={{
      user: user,
      setUser: setUser,
      logout: () => {
        setUser(null)
      }
    }}>{children}</UserContext.Provider>
  )
}

export default function App()  {

  const { user, setUser,} = useContext(UserContext)

  console.log(user)
  const [drawerMobileVisible, setDrawerMobileVisible] = useState(false)
  const drawerToggleListener = () => {
    setDrawerMobileVisible(!drawerMobileVisible)
  }
  return (
    <div className="App" css={styles.root}>
      <Header drawerToggleListener={drawerToggleListener}/>
      {
        user ? <Main drawerMobileVisible={drawerMobileVisible} /> : <Login onUser={setUser} />
      }
      <Footer />
    </div>
  );
}
