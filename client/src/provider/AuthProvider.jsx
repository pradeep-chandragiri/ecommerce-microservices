import { useEffect, useMemo, useState } from 'react'
import { getUser } from '../services/userService.js'
import AuthContext from '../context/AuthContext.jsx'

const AuthProvider = ({ children }) => {

    // state variables
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)


    useEffect(() => {
        // fetching user info 
        const fetchUser = async () => {

            try {
                const data = await getUser()

                // fetches success
                if (data.success) {
                    setUser(data.data.user)
                    setIsLoggedIn(true)
                } 
                // fetches fails
                else {
                    setUser(null)
                    setIsLoggedIn(false)
                }
            } catch (error) {
                setUser(null)
                setIsLoggedIn(false)
            } finally {
                setLoading(false)
            }
        }

        // calling fetchUser
        fetchUser()
    }, [])

    const values = useMemo(() => {
        return { 
            user, setUser, loading, isLoggedIn, setIsLoggedIn 
        }
    }, [user, loading, isLoggedIn])

    return (
        <AuthContext.Provider value={ values }>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthProvider