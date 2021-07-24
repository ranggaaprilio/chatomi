import React, { useRef, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from '../utils/firebase';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import Constant from '../utils/constant';


const Chats = (props) => {
    
   
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    // console.log(user);

    const history = useHistory();
    const handleLogout = async () => {
        await auth.signOut();

        history.push('/')
    }

    const getfile=async (url) => {
        const response = await fetch(url);
        const data= await response.blob();

        return new File([data], 'userPhoto.jpg', {type: 'image/jpeg'});
    }


    useEffect(() => {
        if (!user) {
            history.push('/');
            return
        }

        console.log(user.uid,'ini user');

        axios.get('https://api.chatengine.io/users/me', {
            headers: {
                "project-id":Constant.chatProjectId,
                "user-name":user.email,
                "user-secret":user.uid
            }
        }).then(response => {
            setLoading(false)
        }).catch(err => {
            console.log('ini user not found');
            let formdata=new FormData();
            formdata.append("email", user.email);
            formdata.append("username", user.email);
            formdata.append("secret", user.uid);

            getfile(user.photoURL)
                .then((avatar)=>{
                    console.log('avatar',avatar.name);
                    formdata.append("avatar", avatar)
                    for (var pair of formdata.entries()) {
                        console.log(pair[0]+ ', ' + pair[1],"formdata"); 
                    }
                    axios.post('https://api.chatengine.io/users/', formdata,{
                        headers: {
                            "Content-Type": "multipart/form-data",
                            "PRIVATE-KEY":Constant.chatPrivateKey
                        }
                }).then(()=>setLoading(false)).catch((err)=>console.log(err,'err post data'))
        })})

    }, [user, history])

    return (
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    chatomi
                </div>
            </div>
            <div className="logout-tab" onClick={handleLogout} >
                Logout
            </div>

            <ChatEngine
                height='calc(100vh-60px)'
                userName={user?.email}
                userSecret={user?.uid}
                projectID= {Constant.chatProjectId}
            />
        </div>
    )
}

export default Chats;