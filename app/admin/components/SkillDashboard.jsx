import { useState } from "react"

const SkillDashboard = ({ skills, setSkills, loading }) => {

  const [formData, setFormData] = useState({ name: "", skillSet: [""] })
  const [editForm, setEditForm] = useState({ i: 0, id: "", name: "", skillSet: [] })
  const [visibleEditForm, setVisibleEditForm] = useState(false)

  const handleChange = (e, index = null) => {
    if (index == null) {
      setFormData(prevData => ({
        ...prevData,
        name: e.target.value
      }))
    } else {
      let updatedSkills = formData.skillSet
      updatedSkills[index] = e.target.value
      setFormData(prevData => ({
        name: prevData.name,
        skillSet: updatedSkills
      }))
    }
  }

  const handleAddSkill = (e) => {
    setFormData(prevData => ({
      ...prevData,
      skillSet: [...prevData.skillSet, ""]
    }))
  }

  const handleRemoveSkill = (e) => {
    setFormData(prevData => ({
      ...prevData,
      skillSet: prevData.skillSet.slice(0, prevData.skillSet.length - 1)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch("/api/skills", {
      method: "POST",
      body: JSON.stringify(formData)
    })

    const data = await res.json()

    if (res.ok) {
      setSkills(prevData => [
        ...prevData, data.skill
      ])
      setFormData({ name: "", skillSet: [""] })
    }
  }

  async function handleDelete(id) {
    const res = await fetch("/api/skills", {
      method: "DELETE",
      body: JSON.stringify({
        id
      })
    })

    if (res.ok) {
      const newskills = skills.filter((skill) => skill._id != id)
      setSkills(newskills)
    }

  }

  function handleEdit(i) {
    const skill = skills[i]
    setEditForm({
      i,
      id: skill._id,
      name: skill.name,
      skillSet: skill.skillSet.slice()
    })

    setVisibleEditForm(true)
  }

  const handleEditChange = (e, index = null) => {
    if (index == null) {
      setEditForm(prevData => ({
        ...prevData,
        name: e.target.value
      }))
    } else {
      let updatedSkills = editForm.skillSet
      updatedSkills[index] = e.target.value
      setEditForm(prevData => ({
        ...prevData,
        skillSet: updatedSkills
      }))
    }
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch("/api/skills", {
      method: "PATCH",
      body: JSON.stringify(editForm)
    })

    const data = await res.json()

    console.log(data.skill)

    if (res.ok) {
      setVisibleEditForm(false)
      let updatedSkills = skills
      updatedSkills[editForm.i] = data.skill
      console.log(updatedSkills)
      setSkills(updatedSkills)
    }
  }

  const closeEditForm = (e) => {
    e.preventDefault()
    setVisibleEditForm(false)
  }

  const addSkillEditForm = () => {
    setEditForm(prevData => ({
      ...prevData,
      skillSet: [...prevData.skillSet, ""]
    }))
  }

  const removeSkillEditForm = () => {
    setEditForm(prevData => ({
      ...prevData,
      skillSet: prevData.skillSet.slice(0, prevData.skillSet.length - 1)
    }))
  }

  return (
    <div className='w-screen flex items-center justify-center py-10'>
      <div className='max-w-[700px] w-[90%] py-10 px-5 outline-1 outline-white flex flex-col gap-2'>
        <div className='flex flex-col gap-4'>
          {
            skills.map((skill, i) => (
              <div key={i} className='outline-1 outline-white p-3 flex flex-col items-start gap-2'>
                <div className='font-bold'>{skill.name}</div>
                <div className='text-sm pl-2'>
                  {
                    skill.skillSet.map((ss, i) => (
                      <div key={i} className=''>{ss}</div>
                    ))
                  }
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleDelete(skill._id)} className='text-red-600 cursor-pointer'>Delete</button>
                  <button onClick={() => handleEdit(i)} className='text-blue-600 cursor-pointer'>Edit</button>
                </div>
              </div>
            ))
          }
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col mt-3 outline-1 outline-white py-10 px-5 gap-2">
          <input className="py-2 px-2 outline-1 outline-gray-900" type="text" placeholder="Name" onChange={(e) => handleChange(e)} value={formData.name} />
          {
            formData.skillSet.map((item, i) => (
              <input className="py-1 px-2 outline-1 outline-gray-900" key={i} type="text" placeholder={`Skill ${i + 1}`} onChange={(e) => handleChange(e, i)} value={formData.skillSet[i]} />
            ))
          }
          <div className="flex gap-4">
            <div onClick={handleAddSkill} className="text-blue-600 cursor-pointer">Add Skill</div>
            <div onClick={handleRemoveSkill} className="text-red-600 cursor-pointer">Remove Skill</div>
          </div>
          <button className="bg-blue-700 py-1 cursor-pointer">Submit</button>
        </form>
      </div>
      {(visibleEditForm) && (<form onSubmit={handleEditSubmit} className="w-[300px] outline-1 outline-white fixed top-1/2 left-1/2 -translate-y-[50%] -translate-x-[50%] flex flex-col gap-2 bg-black p-2">
        <input className="py-2 px-2 outline-1 outline-gray-900" type="text" placeholder="Name" value={editForm.name} onChange={(e) => handleEditChange(e)} />
        {
          editForm.skillSet.map((ss, i) => (
            <input className="py-1 px-2 outline-1 outline-gray-900" key={i} type="text" placeholder={`Skill ${i + 1}`} value={editForm.skillSet[i]} onChange={(e) => handleEditChange(e, i)} />
          ))
        }
        <div className="flex gap-1">
          <div onClick={addSkillEditForm} className="text-blue-600 cursor-pointer">Add Skill</div>
          <div onClick={removeSkillEditForm} className="text-red-600 cursor-pointer">Remove Skill</div>
        </div>
        <div className="flex gap-1">
          <button className="cursor-pointer py-1 px-2 text-white bg-blue-600" type="submit">Update</button>
          <button className="cursor-pointer py-1 px-2 text-white bg-red-600" onClick={(e) => closeEditForm(e)}>Close</button>

        </div>
      </form>)}
    </div>
  )
}

export default SkillDashboard
