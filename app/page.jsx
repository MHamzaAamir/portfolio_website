export const dynamic = "force-dynamic";
import Main from "./components/Main";
import dbConnect from "@/lib/mongodb";
import Work from "@/models/Work";
import Skills from "@/models/Skills";

export default async function Home() {

  await dbConnect()
  let works = await Work.find({})
  let skills = await Skills.find({})

  works = works.map((work)=>(
    {
      _id:work._id.toString(),
      name:work.name,
      description:work.description,
      link:work.link,
      liveLink:work.liveLink,
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
