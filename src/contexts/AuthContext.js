import React ,{useContext,useEffect,useState} from 'react';
import {useHistory} from "react-router-dom"
import { auth } from '../utils/firebase';

const AuthContext = React.createContext();

export const useAuth = () =>useContext(AuthContext)
export const AuthProvider =({children})=>{
    const history = useHistory();
    const [loading,setLoading] = useState(true);

    const [user,setUser] = useState(null);

    useEffect(()=>{
    
        auth.onAuthStateChanged(user=>{
            console.log(user,"catomi user log info");
            setUser(user);
            setLoading(false);

            if(user)history.push("/chats");
        });
    },[user,history]);

    const value={user};

    return (
        <AuthContext.Provider value={value}>
            {!loading&&children}
        </AuthContext.Provider>
    );
}