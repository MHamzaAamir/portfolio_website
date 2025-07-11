import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dbConnect from '@/lib/mongodb';
import Admin from '@/models/Admin';


export async function POST(req) {
  await dbConnect();
  const { username, password } = await req.json()
  const admin = await Admin.findOne({ username });

  console.log(admin)


  if (!admin) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
  }

  const isPasswordValid = await bcrypt.compare(password, admin.passwordHash)
  if (!isPasswordValid) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
  }

  const token = jwt.sign(
    { username: admin.username },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  )

  const response = NextResponse.json({ message: 'Login successful' })

  response.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60, // 1 hour
    path: '/'
  })

  return response
}