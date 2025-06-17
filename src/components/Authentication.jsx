import {useState} from 'react'
import { useAuth } from '../context/AuthContext'

export default function Authentication(props) {

    const { handleCloseModal } = props
    const [isRegistration, setIsRegistration] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isAuthenticating, setIsAuthenticating] = useState(false)
    const [error, setError] = useState(null)

    const { signup, login } = useAuth()

    async function handleAuthenticate() {
        if (!email || !email.includes("@") || !password || password.length < 6 || 
            isAuthenticating) {return } 
        try { 
            setIsAuthenticating(true)
            setError(null) // Reset error state before authentication attempt

            if (isRegistration) {
            // register a user
                await signup(email, password) 
            }   else {
            // login a user
                await login(email, password) 
            }
            handleCloseModal()
        }   catch (err) {
            console.log(err.message)
            setError(err.message)
        }   finally {
            setIsAuthenticating(false)
        }    
        
    }
    
    return (
       <div className="bg-gradient-to-b from-white to-gray-100">
            <div className="text-center items-center justify-center">
                <img
                    src="/lexit_logo_black.png"
                    alt="LEXIT Logo"
                    className="auth-logo"
                    style={{
                        width: "40%",
                        maxWidth: "50%", // ensure it doesn't overflow container
                        height: "auto",
                        display: "block",
                        margin: "0 auto 20px auto"
                    }}
                />
                
                <h2 className="font-Archivo text-deepblue text-2xl sm:text-lg md:text-sm">
                    {isRegistration ? "Sign up" : "Login"}
                </h2>

                <p className="font-AnekTamil text-deepblue text-2xl sm:text-xl md:text-lg">
                    {isRegistration ? "Create an account" : "Sign in to your account"}
                </p>
                {error && (
                    <p>❌ {error}</p>
                )}
            </div>

            <br />
            <div className="flex flex-col items-center justify-center">
                <input 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email" 
                    placeholder="email" 
                    className="w-64 sm:w-64 md:w-100 text-2xl sm:text-xl md:text-lg border border-gray-300 rounded p-2 mb-2" />
                
                <input 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password" 
                    placeholder="********" 
                    className="w-64 sm:w-64 md:w-100 text-2xl sm:text-xl md:text-lg border border-gray-300 rounded p-2 mb-2" />
            </div>
            <br />

            {/* Center these buttons */}
            <div className="flex flex-col items-center w-full space-y-4">
                
                {/* Define a shared button class for consistency */}
                <button 
                    onClick={handleAuthenticate}
                    className="btn">
                        <p>
                        {isAuthenticating ? "Authenticating..." : "Submit"}
                        </p>
                </button>
                
                <p className='text-sm text-center'>By pressing submit you agree to abide by our Terms and Conditions.</p>

                <hr className="w-full my-2" />

                <p className="text-2xl sm:text-xl md:text-lg">
                    {isRegistration ? "Already have an account?" : "Don't have an account?" }
                </p>
                    
                <button 
                onClick={() => {setIsRegistration(!isRegistration)}}
                className="btn">
                    <p>
                        {isRegistration ? "Login" : "Sign up"}
                    </p>
                </button>
                <br />
            </div>
        </div>
    )
}
