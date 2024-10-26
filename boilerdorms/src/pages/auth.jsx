import { auth } from '../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
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
            await signInWithEmailAndPassword(auth, Email, Password);
            console.log("User signed in successfully");
        } catch (err) {
            if (err.code === 'auth/user-not-found') {
                alert("No account found with this email. Please create an account first.");
            } else {
                console.error("Error signing in:", err.message);
            }
        }
    }

    return (
        <div>
            <input placeholder="Email..." onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password..." onChange={(e) => setPassword(e.target.value)} />
            <button onClick={signIn}> Sign In </button>
        </div>
    );
};