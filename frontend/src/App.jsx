import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import './App.css'

// Protected Route component
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth()
    return isAuthenticated ? children : <Navigate to="/login" replace />
}

function App() {
    return (
        <AuthProvider>
            <div className="min-h-screen bg-gray-50">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
        </AuthProvider>
    )
}

export default App 