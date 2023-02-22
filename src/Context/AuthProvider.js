import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateEmail, updateProfile } from 'firebase/auth'
import app from '../firebase/firebase.config'

export const AuthContext = createContext()
const auth = getAuth(app)

const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)
    const createUser = (email,password) => {
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const signIn = (email,password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const updateUser = (userInfo) => {
        // setLoading(true)
        return updateProfile(auth.currentUser,userInfo)
    }

    const updateUserEmail = (newEmail) => {
        return updateEmail(auth.currentUser,newEmail)
    }

    const googleLogin = (provider) => {
        setLoading(true)
        return signInWithPopup(auth,provider)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth,currentUser => {
            setUser(currentUser)
            setLoading(false)
        }) 
        return () => unsubscribe()
    },[])

    const logOut = () => {
        return signOut(auth)
    }

    const authInfo = { createUser, signIn, user, updateUser, googleLogin, logOut, loading, updateUserEmail }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;