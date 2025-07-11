import Main from "./components/Main";
import dbConnect from "@/lib/mongodb";
import Work from "@/models/Work";
import Skills from "@/models/Skills";

export default async function Home() {
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const [worksRes, skillsRes] = await Promise.all([
  //       fetch("/api/works", { method: "GET" }),
  //       fetch("/api/skills", { method: "GET" })
  //     ])

  //     const worksData = await worksRes.json()
  //     const skillsData = await skillsRes.json()

  //     let aiData = []
  //     let programmingData = []
  //     let webitesData = []

  //     worksData.works.forEach((work) => {
  //       if (work.category == "AI") {
  //         aiData.push(work)
  //       } else if (work.category == "Programming") {
  //         programmingData.push(work)
  //       } else {
  //         webitesData.push(work)
  //       }
  //     })

  //     setAI(aiData)
  //     setProgramming(programmingData)
  //     setWebsites(webitesData)

  //     setSkills(skillsData.skills)

  //     setLoading(false)
  //   }
  //   fetchData()
  // }, [])

  await dbConnect()
  let works = await Work.find({})
  let skills = await Skills.find({})

  works = works.map((work)=>(
    {
      _id:work._id.toString(),
      name:work.name,
      description:work.description,
      link:work.link,
      category:work.category
    }
  ))

  skills = skills.map((skill)=>(
    {
      _id:skill._id.toString(),
      name:skill.name,
      skillSet:skill.skillSet
    }
  ))
  

  let ai = []
  let programming = []
  let websites = []

  works.forEach((work)=>{
    if(work.category == "AI"){
      ai.push(work)
    }else if (work.category == "Programming"){
      programming.push(work)
    }else{
      websites.push(work)
    }
  })


  return (
    <>
      <Main ai={ai} programming={programming} websites={websites} skills={skills} />
    </>
  );
}
