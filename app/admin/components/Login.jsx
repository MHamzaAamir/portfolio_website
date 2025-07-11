"use client"
import { useState } from "react"
import { redirect } from "next/navigation"


const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        const res = await fetch('/api/admin/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        })

        const data = await res.json()
        setMessage(data.message)

        if (res.ok) {
            redirect('/admin')
        }
    }

    return (
        <div className="h-screen w-full flex justify-center items-center bg-black">
            <form
                onSubmit={handleSubmit}
                className="relative h-auto w-[280px] flex flex-col gap-4 justify-center rounded-3xl px-5 py-10 outline-1 outline-gray-900"
            >
                <h2 className="text-center text-white text-lg font-semibold mb-2">Login</h2>

                <div className="flex flex-col gap-3">
                    <input
                        className="rounded-lg bg-black text-white placeholder-gray-400 outline-1 outline-gray-900 focus:outline-2 focus:outline-white p-2"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        type="text"
                    />
                    <input
                        className="rounded-lg bg-black text-white placeholder-gray-400 outline-1 outline-gray-900 focus:outline-2 focus:outline-white p-2"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        type="password"
                    />
                </div>

                <button
                    type="submit"
                    className="mt-3 rounded-lg cursor-pointer text-white outline-1 outline-gray-900 hover:bg-white hover:text-black transition duration-200 p-2"
                >
                    Login
                </button>

                {message && (
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-sm text-center text-gray-300">
                        {message}
                    </div>
                )}
            </form>
        </div>

    )
}

export default Login
