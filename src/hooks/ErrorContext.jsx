import { createContext, useContext, useState } from 'react'

// Create context
const ErrorContext = createContext(null)

// Provider
export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null)

  const value = {
    error,
    setError,
    clearError: () => setError(null),
  }

  return <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
}

// Hook
export const useError = () => {
  const context = useContext(ErrorContext)
  if (!context) {
    throw new Error('useError must be used within an ErrorProvider')
  }
  return context
}
