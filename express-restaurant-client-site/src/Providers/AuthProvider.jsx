import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../FireBase/firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";


export const authContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState();
    const [loader, setLoader] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const axiosPublic = useAxiosPublic();

    const createUser = (email, password) => {
        setLoader(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const loginUser = (email, password) => {
        setLoader(true)
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleLogin = () => {
        setLoader(true)
        return signInWithPopup(auth, googleProvider);
    }

    const userUpdate = (name, photo) =>{
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        })
    }

    const logoutUser = () => {
        setLoader(true)
        return signOut(auth);
    }

    useEffect(()=>{
       const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);

            const userInfo = {email: currentUser?.email};
            if(currentUser){
                // get token client site
                axiosPublic.post('/jwt', userInfo)
                .then(res => {
                    if(res.data.token){
                        localStorage.setItem('access-token', res.data.token);
                        setLoader(false);
                    }
                })
            }
            else{
                // remove token 
                localStorage.removeItem('access-token');
                setLoader(false);
            }
            console.log('current user', currentUser);
        })

        return () => {
            unsubscribe();
        }
    },[axiosPublic])

    const authInfo = {
        user,
        loader,
        createUser,
        loginUser,
        googleLogin,
        userUpdate,
        logoutUser,
    }

    return (
        <authContext.Provider value={authInfo}>
            {children}
        </authContext.Provider>
    );
};

export default AuthProvider;