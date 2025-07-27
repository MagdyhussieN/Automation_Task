import { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'

const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Check if user is logged in on app start
        const token = localStorage.getItem('token')
        const userData = localStorage.getItem('user')

        if (token && userData) {
            try {
                const parsedUser = JSON.parse(userData)
                setUser(parsedUser)
                setIsAuthenticated(true)
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`
            } catch (error) {
                console.error('Error parsing user data:', error)
                logout()
            }
        }
        setLoading(false)
    }, [])

    const login = async (email, password) => {
        try {
            const response = await api.post('/login', { email, password })
            const { token, user: userData } = response.data

            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(userData))

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            setUser(userData)
            setIsAuthenticated(true)

            return { success: true }
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed'
            }
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        delete api.defaults.headers.common['Authorization']

        setUser(null)
        setIsAuthenticated(false)
    }

    const value = {
        user,
        isAuthenticated,
        loading,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
} 