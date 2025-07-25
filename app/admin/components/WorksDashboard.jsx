import { useState } from "react"

const WorksDashboard = ({ works, setWorks, loading }) => {
  const [formData, setFormData] = useState({ name: "", description: "", link: "",liveLink:"", category: "" })
  const [editForm, setEditForm] = useState({ i: 0, id: "", name: "", description: "", link: "",liveLink:"", category: "" })
  const [visibleEditForm, setVisibleEditForm] = useState(false)

  const handleDelete = async (id) => {
    const res = await fetch("/api/works", {
      method: "DELETE",
      body: JSON.stringify({ id })
    })

    if (res.ok) {
      const newWorks = works.filter(work => work._id != id)
      setWorks(newWorks)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch("/api/works", {
      method: "POST",
      body: JSON.stringify(formData)
    })

    const data = await res.json()

    if (res.ok) {
      setWorks([...works, data.work])
      setFormData({ name: "", description: "", link: "",liveLink:"", category: "" })
    }

  }

  const handleEdit = (i) => {
    const work = works[i]
    setEditForm({
      i,
      id: work._id,
      name: work.name,
      description: work.description,
      link: work.link,
      liveLink:work.liveLink ? work.liveLink:"",
      category: work.category,
    })
    setVisibleEditForm(true)
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch("/api/works",{
      method:"PATCH",
      body:JSON.stringify(editForm)
    })

    const data = await res.json()

    if(res.ok){
      works[editForm.i] = data
      setWorks(works)
      setVisibleEditForm(false)
    }

  }

  const handleClose = () =>{
    setVisibleEditForm(false)
  }

  return (
    <>
      {
        !loading && (
          <div className='w-screen flex items-center justify-center py-10'>
            <div className='max-w-[700px] w-[90%] py-10 px-5 outline-1 outline-white flex flex-col gap-2'>
              <div className="flex flex-col gap-4">
                {
                  works.map((work, i) => (
                    <div key={i} className="outline-1 outline-white p-3 flex flex-col items-start gap-2">
                      <div className="font-bold">{work.name}</div>
                      <div className="italic text-[10px]">{work.link}</div>
                      <div className="italic text-[10px]">{work.liveLink}</div>
                      <div>{work.description}</div>
                      <div>Category: {work.category}</div>
                      <div className="flex gap-2">
                        <div onClick={() => handleEdit(i)} className="text-blue-600 cursor-pointer">Edit</div>
                        <div onClick={() => handleDelete(work._id)} className="text-red-600 cursor-pointer">Delete</div>
                      </div>
                    </div>
                  ))
                }
              </div>


              <form onSubmit={handleSubmit} className="flex flex-col mt-3 outline-1 outline-white py-10 px-5 gap-2">
                <input className="py-2 px-2 outline-1 outline-gray-900" type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                <input className="py-2 px-2 outline-1 outline-gray-900" type="text" placeholder="Link" value={formData.link} onChange={(e) => setFormData({ ...formData, link: e.target.value })} />
                <input className="py-2 px-2 outline-1 outline-gray-900" type="text" placeholder="Live Link (Optional)" value={formData.liveLink} onChange={(e) => setFormData({ ...formData, liveLink: e.target.value })} />
                <textarea rows={5} className="py-2 px-2 outline-1 outline-gray-900 resize-none" placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                <select className="py-2 px-2 outline-1 outline-gray-900 bg-black" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} >
                  <option value="">Select Category</option>
                  <option value="AI">AI</option>
                  <option value="Programming">Programming</option>
                  <option value="Website">Website</option>
                </select>
                <button className="bg-blue-700 py-1 cursor-pointer">Submit</button>
              </form>
            </div>
            {(visibleEditForm) && (
              <form onSubmit={handleEditSubmit} className="w-[300px] outline-1 outline-white fixed top-1/2 left-1/2 -translate-y-[50%] -translate-x-[50%] flex flex-col gap-2 bg-black p-2">
                <input className="py-2 px-2 outline-1 outline-gray-900" type="text" placeholder="Name" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} />
                <input className="py-2 px-2 outline-1 outline-gray-900" type="text" placeholder="Link" value={editForm.link} onChange={(e) => setEditForm({ ...editForm, link: e.target.value })} />
                <input className="py-2 px-2 outline-1 outline-gray-900" type="text" placeholder="Live Link (Optional)" value={editForm.liveLink} onChange={(e) => setEditForm({ ...editForm, liveLink: e.target.value })} />
                <textarea rows={5} className="py-2 px-2 outline-1 outline-gray-900 resize-none" placeholder="Description" value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} />
                <select className="py-2 px-2 outline-1 outline-gray-900 bg-black" value={editForm.category} onChange={(e) => setEditForm({ ...editForm, category: e.target.value })} >
                  <option value="">Select Category</option>
                  <option value="AI">AI</option>
                  <option value="Programming">Programming</option>
                  <option value="Website">Website</option>
                </select>
                <div className="flex">
                  <button className="bg-blue-700 py-1 cursor-pointer w-1/2">Submit</button>
                  <div onClick={handleClose} className="text-center bg-red-600 py-1 cursor-pointer w-1/2">Close</div>
                </div>
              </form>
            )}

          </div>
        )
      }
    </>
  )
}

export default WorksDashboard
