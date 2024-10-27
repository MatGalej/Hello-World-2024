import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from "react";
import { db } from '../config/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export const Auth = () => {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const allowedDomain = '@purdue.edu';
    const [error, setError] = useState(""); // Error state
    const [grade, setGrade] = useState(""); // State for grade
    const navigate = useNavigate(); // Define navigate

    const signIn = async () => {
        setError(""); // Clear any previous error

        if (!Email || !Password) {
            setError("Both email and password fields are required.");
            return;
        }

        if (!Email.endsWith(allowedDomain)) {
            setError(`Only ${allowedDomain} emails are allowed to sign up.`);
            return;
        }

        if (!grade) {
            setError(`Please select a grade!`);
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, Email, Password);
            const user = userCredential.user; // Use the created user

            // Store additional data in Firestore
            await setDoc(doc(db, "users", user.uid), {
                email: Email,
                grade: grade    
            });

            console.log("User created successfully with grade:", grade);
            setError(""); // Clear error on success
            navigate("/");  

        } catch (err) {
            if (err.code === "auth/email-already-in-use") {
                setError("This email is already registered. Please sign in instead.");
            } else {
                setError("Error creating user: " + err.message);
                console.error("Error creating user", err.message);
            }
        }
    }

    return (
        <div className='signup-form'>
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
                <input required className='password-form' type="password" placeholder="I Love Purdue" onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div className='grade'>
                <p>What is your grade?</p>
                <select required onChange={(e) => setGrade(e.target.value)}>
                    <option value="">(Select a value)</option>
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