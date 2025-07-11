import { redirect } from "next/navigation"

const Navbar = ({setPage}) => {

  const logout = async () =>{
    const res = await fetch("/api/admin/logout",{
      method:"POST"
    })
    redirect("/admin")
  }

  return (
    <div className="h-36 py-12 w-full flex items-center justify-center">
        <div className="h-full px-6 outline-1 outline-white rounded-2xl flex justify-center items-center">
            <button onClick={()=>setPage("works")} className="px-5 py-2 cursor-pointer hover:bg-gray-500 rounded-2xl">Work</button>
            <button onClick={()=>setPage("skills")} className="px-5 py-2 cursor-pointer hover:bg-gray-500 rounded-2xl">Skills</button>
            <button onClick={logout} className="px-5 py-2 cursor-pointer hover:bg-gray-500 rounded-2xl">Logout</button>
        </div>
    </div>
  )
}

export default Navbar
