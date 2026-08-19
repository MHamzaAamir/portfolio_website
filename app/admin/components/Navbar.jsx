import { useState } from "react"
import { redirect } from "next/navigation"

const Navbar = ({setPage}) => {
  const [publishing, setPublishing] = useState(false)

  const logout = async () =>{
    const res = await fetch("/api/admin/logout",{
      method:"POST"
    })
    redirect("/admin")
  }

  const publish = async () =>{
    setPublishing(true)
    const res = await fetch("/api/admin/publish",{
      method:"POST"
    })
    setPublishing(false)
  }

  return (
    <div className="h-36 py-12 w-full flex items-center justify-center">
        <div className="h-full px-6 outline-1 outline-white rounded-2xl flex justify-center items-center gap-4">
            <button onClick={()=>setPage("works")} className="px-5 py-2 cursor-pointer hover:bg-gray-500 rounded-2xl">Work</button>
            <button onClick={()=>setPage("skills")} className="px-5 py-2 cursor-pointer hover:bg-gray-500 rounded-2xl">Skills</button>
            <button onClick={logout} className="px-5 py-2 cursor-pointer hover:bg-gray-500 rounded-2xl">Logout</button>
            <button onClick={publish} disabled={publishing} className="px-5 py-2 cursor-pointer hover:bg-gray-500 rounded-2xl bg-blue-700">{publishing ? "Publishing..." : "Publish Website"}</button>
        </div>
    </div>
  )
}

export default Navbar
