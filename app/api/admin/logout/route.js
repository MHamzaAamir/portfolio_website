import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'


export async function POST(req) {
    const response = NextResponse.json({ message: 'Logged out' })
    response.cookies.set('token', '', {
        maxAge: 0, // Expire immediately
        path: '/'
    })
    return response
}