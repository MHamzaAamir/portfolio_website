import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import Dashboard from "./components/Dashboard"
import Login from './components/Login';


export default async function Home() {

  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  let isLoggedIn = false

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    isLoggedIn = true
  } catch{
    console.log("Not Logged In")
  }

  return (
    <>
        {isLoggedIn?<Dashboard/>:<Login/>}
    </>
  )
}
