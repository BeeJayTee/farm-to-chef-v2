import { useState } from "react";
import { useAuthContext } from '../hooks/useAuthContext'

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const signup = async (email, password, retypePassword, organization, isBuyer, isSeller) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('http://localhost:4141/user/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, organization, password, retypePassword, isBuyer, isSeller})
        })
        const json = await response.json()
        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            // save user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            // update auth context
            dispatch({type: 'LOGIN', payload: json})
        }
    }

    return { signup, isLoading, error }
}