import React, { useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';
import { useState } from 'react';
import { GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUserWithMail = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const loginWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if(currentUser){
                fetch('http://localhost:3000/getToken', {
                    method: 'POST',
                    headers:{
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({email: currentUser.email})
                })
                .then(res => res.json())
                .then(data => {
                    localStorage.setItem("Token", data.token);
                })
            }else{
                localStorage.removeItem('Token');
            }
            // if(currentUser){
            //     const loggedUser = {email: currentUser.email};
            // fetch('http://localhost:3000/getToken',{
            //     method: 'POST',
            //     headers: {'content-type': 'application/json'},
            //     body: JSON.stringify(loggedUser)
            // })
            // .then(res => res.json())
            // .then(data => {
            //     localStorage.setItem("Token", data.token);
            // })
            // }else{
            //     localStorage.removeItem('Token');
            // }
            setLoading(false);
        });
        return () => {
            unSubscribe();
        }
    }, [])
    const authInfo = {
        createUserWithMail,
        signIn,
        loginWithGoogle,
        user,
        loading,
        logOut
    };
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;