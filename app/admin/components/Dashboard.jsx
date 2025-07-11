"use client"
import { useState, useEffect } from "react"
import Navbar from "./Navbar"
import WorksDashboard from "./WorksDashboard"
import SkillDashboard from "./SkillDashboard"

const Dashboard = () => {
  const [page, setPage] = useState("works")
  const [loading,setLoading] = useState(true)
  const [skills,setSkills] = useState([])
  const [works,setWorks] = useState([])

  useEffect(() => {
    const fetchData = async () =>{
    const [worksRes, skillsRes] = await Promise.all([
      fetch("/api/works"),
      fetch("/api/skills"),
    ]);

    const works = await worksRes.json()
    const skills = await skillsRes.json()

    setWorks(works.works)
    setSkills(skills.skills)



    setLoading(false)
    }

    fetchData()

  }, [])

  return (
    <>
      <div className="min-h-screen w-screen bg-black">
        <Navbar setPage={setPage} />
        {
          (page == "works") && <WorksDashboard works={works} setWorks={setWorks} loading={loading}/>
        }
        {
          (page == "skills") && <SkillDashboard skills={skills} setSkills={setSkills} loading={loading}/>
        }
      </div>
    </>
  )
}

export default Dashboard
