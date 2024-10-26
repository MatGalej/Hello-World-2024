import { auth } from '../config/firebase'

export const Auth = () => {
    return (
        <div>
            <input placeholder="Email..."/>
            <input placeholder="Password..." />
            <button> Sign in </button>
        </div>
    )
}