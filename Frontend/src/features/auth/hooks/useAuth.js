import { login, register, getMe, logout } from "../services/auth.api";
import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { useEffect } from "react";


export const useAuth = () => {
    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context

    function handleAuthError(error) {
        if (error?.response?.status === 401) {
            setUser(null)
            return
        }

        throw error
    }

    async function handleRegister({ username, email, password }) {
        setLoading(true)

        try {
            const data = await register({ username, email, password })
            setUser(data.user)
            return data
        } catch (error) {
            handleAuthError(error)
            return null
        } finally {
            setLoading(false)
        }
    }

    async function handleLogin({ username, email, password }) {
        setLoading(true)

        try {
            const data = await login({ username, email, password })
            setUser(data.user)
            return data
        } catch (error) {
            handleAuthError(error)
            return null
        } finally {
            setLoading(false)
        }
    }

    async function handleGetMe() {
        setLoading(true)

        try {
            const data = await getMe()
            setUser(data.user)
            return data
        } catch (error) {
            handleAuthError(error)
            return null
        } finally {
            setLoading(false)
        }
    }

    async function handleLogout() {
        setLoading(true)

        try {
            const data = await logout()
            setUser(null)
            return data
        } catch (error) {
            handleAuthError(error)
            return null
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        handleGetMe().catch(() => {
            setUser(null)
        })
    }, [])

    return ({
        user, loading, handleRegister, handleLogin, handleLogout, handleGetMe
    })
}