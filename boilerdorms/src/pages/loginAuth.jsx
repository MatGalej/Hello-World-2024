import { auth } from '../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export const LoginAuth = () => {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const allowedDomain = '@purdue.edu';
    const [error, setError] = useState(""); // Error state
    const navigate = useNavigate(); // Initialize navigate

    const logIn = async () => {
        setError(""); // Clear any previous error

        if (!Email || !Password) {
            setError("Both email and password fields are required.");
            return;
        }

        if (!Email.endsWith(allowedDomain)) {
            setError(`Only ${allowedDomain} emails are allowed to sign in.`);
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, Email, Password);
            console.log("User logged in successfully");

            // Redirect to landing page after successful login
            navigate('/'); 

        } catch (err) {
            if (err.code === "auth/user-not-found" || err.code === "auth/invalid-credential") {
                setError("Invalid credentials. Please check or sign up.");
                console.error("Error logging in", err.message);
            }  else {
                setError("Error logging in: " + err.message);
                console.error("Error logging in", err.message);
            }
        }
    }

    return (
        <div className='login-form'>
            {error && (
                <div className="error-box">
                    <p>{error}</p>
                </div>
            )}

            <div className='email'>
                <p>Email</p>
                <input required className='email-form' placeholder="purduepete@purdue.edu" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='password'>
                <p>Password</p>
                <input required className='password-form' type="password" placeholder="Your Password" onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div className='login'>
                <button className='login-button' onClick={logIn}> Log In </button>
            </div>
        </div>
    );
};