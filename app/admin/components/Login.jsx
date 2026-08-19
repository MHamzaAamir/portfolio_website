"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

const Login = () => {
    const router = useRouter()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [loading, setLoading] = useState(false)
    const [shake, setShake] = useState(false)
    const [attempt, setAttempt] = useState(0)

    const triggerError = (text) => {
        setError(text)
        setSuccess("")
        setShake(false)
        requestAnimationFrame(() => setShake(true))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!username || !password) {
            triggerError("Please enter username and password")
            return
        }

        setLoading(true)
        setError("")
        setSuccess("")

        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json' },
            })

            const data = await res.json()

            if (res.ok) {
                setSuccess("Login successful, redirecting...")
                setTimeout(() => router.push('/admin'), 600)
            } else {
                setPassword("")
                setAttempt(a => a + 1)
                triggerError(data.message || "Invalid credentials")
            }
        } catch {
            triggerError("Network error, please try again")
        } finally {
            setLoading(false)
        }
    }

    const clearError = () => {
        if (error) setError("")
    }

    return (
        <div className="h-screen w-full flex justify-center items-center bg-black">
            <form
                onSubmit={handleSubmit}
                noValidate
                className={`relative w-[320px] flex flex-col gap-5 rounded-3xl px-6 py-8 outline-1 outline-white/20 ${shake ? "animate-shake" : ""}`}
            >
                <div className="flex flex-col items-center gap-1">
                    <h2 className="text-white text-xl font-semibold">Login</h2>
                    <p className="text-gray-400 text-xs">Admin panel access</p>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="username" className="text-gray-300 text-xs">Username</label>
                        <input
                            id="username"
                            className="rounded-lg bg-transparent text-white placeholder-gray-500 outline-1 outline-white/25 focus:outline-white p-2.5 text-sm disabled:opacity-50 transition-colors"
                            value={username}
                            onChange={(e) => { setUsername(e.target.value); clearError() }}
                            placeholder="Enter your username"
                            type="text"
                            disabled={loading}
                            autoComplete="username"
                            autoFocus
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="password" className="text-gray-300 text-xs">Password</label>
                        <input
                            id="password"
                            className="rounded-lg bg-transparent text-white placeholder-gray-500 outline-1 outline-white/25 focus:outline-white p-2.5 text-sm disabled:opacity-50 transition-colors"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); clearError() }}
                            placeholder="Enter your password"
                            type="password"
                            disabled={loading}
                            autoComplete="current-password"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="mt-1 flex items-center justify-center gap-2 rounded-lg cursor-pointer bg-white text-black font-medium hover:bg-gray-200 transition-colors p-2.5 text-sm disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-white"
                >
                    {loading ? (
                        <>
                            <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></span>
                            Logging in...
                        </>
                    ) : (
                        "Login"
                    )}
                </button>

                <div className="min-h-[20px] flex flex-col items-center gap-1">
                    {error && (
                        <div className="flex items-center gap-1.5 text-red-400 text-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                            {error}
                            {attempt > 1 && <span className="text-gray-500">(attempt {attempt})</span>}
                        </div>
                    )}
                    {success && (
                        <div className="flex items-center gap-1.5 text-green-400 text-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                            {success}
                        </div>
                    )}
                </div>
            </form>
        </div>
    )
}

export default Login
