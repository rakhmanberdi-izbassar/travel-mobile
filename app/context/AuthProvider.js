import React, { createContext, useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const auth = getAuth()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return unsubscribe // Тазарту функциясы
  }, [])

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider
