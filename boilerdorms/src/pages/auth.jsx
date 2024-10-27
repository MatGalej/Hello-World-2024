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
            if (err.code == "auth/email-already-in-use") {
                alert("This email is already registered. Please sign in instead.");
            } else {
                console.error("Error creating user", err.message);
            }
        }
    }

    return (
        <div className='signup-form'>
            <div className='email'>
                <p>Email</p>
                <input required className='email-form' placeholder="purduepete@purdue.edu" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='password'>
                <p>Password</p>
                <input required className='password-form' type="password" placeholder="I Love Purdue" onChange={(e) => setPassword(e.target.value)} />
            </div>
            
            <div className='grade'>
                <p>What is your grade?</p>
                <select required>
                    <option>(Select a value)</option>
                    <option>Freshmen</option>
                    <option>Sophomore</option>
                    <option>Junior</option>
                    <option>Senior</option>
                    <option>Graduate 1st Year</option>
                    <option>Graduate 2nd Year</option>
                    <option>PHD</option>
                    <option>Other</option>
                </select>
            </div>

            <div className='signup'>
                <button className='signup-button' onClick={signIn}> Sign Up! </button>
            </div>
        </div>
    );
};