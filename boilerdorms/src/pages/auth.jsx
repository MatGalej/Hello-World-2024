import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from "react";

export const Auth = () => {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const allowedDomain = '@purdue.edu';

    const signIn = async () => {
        if (!Email || !Password) {
            alert("Both email and password fields are required.");
            return;
        }

        if (!Email.endsWith(allowedDomain)) {
            alert(`Only ${allowedDomain} emails are allowed to sign in.`);
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, Email, Password);
            console.log("User created successfully");
        } catch (err) {
            console.error("Error creating user", err.message);
        }
    }

    return (
        <div className='signup-form'>
            <div className='email'>
                <input className='email-form' placeholder="Email..." onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='password'>
                <input className='password-form' type="password" placeholder="Password..." onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className='signup'>
                <button className='signup-button' onClick={signIn}> Sign Up! </button>
            </div>


        </div>
    );
};