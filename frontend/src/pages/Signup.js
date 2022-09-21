import { useState } from 'react'
import { useSignup } from '../hooks/useSignup'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [organization, setOrganization] = useState('')
    const [password, setPassword] = useState('')
    const [retypePassword, setRetypePassword] = useState('')
    const [isBuyer, setIsBuyer] = useState(false)
    const [isSeller, setIsSeller] = useState(false)
    const [marketID, setMarketID] = useState('')
    const {signup, error, isLoading} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        await signup(email, password, retypePassword, organization, isBuyer, isSeller, marketID)
    }

    const handleChange = (e) => {
         if (e.target.value === 'isSeller') {
            setIsSeller(true)
            setIsBuyer(false)
        }
        if (e.target.value === 'isBuyer') {
            setIsSeller(false)
            setIsBuyer(true)
        }
    }

    return (
        <form className="signup-form" onSubmit={handleSubmit}>
            <h3>Sign Up</h3>

            <label>Email:</label>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}    
            />

            <div>
                <input
                    type="radio"
                    name="org-type"
                    value="isBuyer" 
                    id="isBuyer"
                    onChange={handleChange}
                    checked={isBuyer === true}/>
                <label htmlFor='isBuyer'>Buyer</label>
            </div>
            <div>
                <input 
                    type="radio" 
                    name="org-type"
                    value="isSeller"
                    id="isSeller"
                    onChange={handleChange}
                    checked={isSeller === true}/>
                <label htmlFor='isSeller'>Farmer / Producer</label>
            </div>
            {isSeller && (
                <div>
                    <label>Business/Organization Name:</label>
                    <input
                        type="text"
                        onChange={(e) => setOrganization(e.target.value)}
                        value={organization}    
                    />
                    <label>Market ID Code:</label>
                    <input
                        type="text"
                        onChange={(e) => setMarketID(e.target.value)}
                        value={marketID}    
                    />
                </div>
            )}
            <label>Password:</label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}    
            />
            <label>Retype Password:</label>
            <input
                type="password"
                onChange={(e) => setRetypePassword(e.target.value)}
                value={retypePassword}    
            />
            {error && <div className='error'>{error}</div>}
            <button disabled={isLoading}>Submit</button>
        </form>
    )
}

export default Signup