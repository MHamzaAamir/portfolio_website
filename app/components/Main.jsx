"use client"
import gsap from 'gsap'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import { SplitText, ScrollTrigger } from 'gsap/all'





gsap.registerPlugin(SplitText, ScrollTrigger)

const Main = ({ ai, programming, websites, skills }) => {
    const [selectedWork, updateSelectedWork] = useState({ works: ai, link: "ai" })
    const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" })
    const [popup, setPopup] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        setContactForm({ name: "", email: "", message: "" })
        const res = await fetch("/api/contact", {
            method: "POST",
            body: JSON.stringify(contactForm)
        })



        if (res.ok) {
            setPopup("Message Sent")
        } else {
            setPopup("An Error Occurred")
        }

        setTimeout(() => {
            setPopup("")
        }, 3000);

    }

    const handleChangeWork = async (work) => {

        const changeWork = () => {
            updateSelectedWork(work)
            if (work == "AI") {
                updateSelectedWork({ works: ai, link: "ai" })
            } else if (work == "Websites") {
                updateSelectedWork({ works: websites, link: "websites" })
            } else {
                updateSelectedWork({ works: programming, link: "programming" })
            }
        }


        await changeWork()
        ScrollTrigger.refresh()

    }

    useGSAP(() => {

        // Main Heading Animation

        let split = SplitText.create(".split-heading", { type: "words, chars" });

        const openTimeline = gsap.timeline()

        openTimeline.to(".opening-panel", {
            duration: 1,
            yPercent: -100
        }).from(".navbar", {
            y: -100,
            duration: 0.5
        }).from(split.chars, {
            duration: 0.5,
            opacity: 0,
            stagger: 0.1,
        });

        // Slide down opaque animation
        let make_opaque = gsap.utils.toArray(".make_opaque")

        let t1 = gsap.timeline({
            scrollTrigger: {
                trigger: ".hero-container",
                scrub: true,
                pin: true,
                // markers: true,
                end: "center top"
            }
        })

        t1.to(".nav-item", {
            y: -20,
            opacity: 0,
        }).to(make_opaque, {
            opacity: 0,
            y: 100,
        })


        // panel rising animation
        gsap.to(".panel", {
            scrollTrigger: {
                trigger: ".panel",
                scrub: true,
                start: "-300px top",
                end: "top top",
                // markers:true
            },
            borderRadius: 0
        })

        // About Animation
        gsap.from(".about-container", {
            scrollTrigger: {
                trigger: ".about-container",
                // markers: true,
                toggleActions: "play none none reverse",
                start: "top center",
                end: "center center",
                // scrub:true
                // start: "top bottom",
                // end: "bottom top"
            },
            opacity: 0,
            duration: 1,

        })

        // Work Heading Animation
        gsap.from(".works-heading", {
            scrollTrigger: {
                trigger: ".works-heading",
                toggleActions: "play none none reverse",
                start: "top center",
                end: "bottom center",
                // markers: true
            },
            opacity: 0,
            duration: 1,
        })

        // Project Cards Animation
        let project_cards = gsap.utils.toArray(".project-card")

        project_cards.forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    toggleActions: "play none none reverse",
                    // markers: true,
                    start: "center bottom"

                },

                xPercent: i % 2 == 0 ? 10 : -10,
                opacity: 0,

            })

        });


        // Skill Animation
        gsap.from(".skill-item", {
            scrollTrigger: {
                trigger: ".skill-container",
                // markers: true
            },
            opacity: 0,
            y: 20,
            stagger: 0.1,
            duration: 0.5
        })




        gsap.from(".motivation-elements", {
            scrollTrigger: {
                trigger: ".motivation-container",
                // markers: true,
                scrub: true,
                pin: true
            },
            stagger: 1,
            opacity: 0,
        })

    })


    return (
        <>
            <div className='opening-panel z-50 h-[150vh] w-screen bg-[black] fixed top-0'>

            </div>
            <div className='hero-container flex justify-center'>
                <div className='min-h-screen w-screen max-w-[1500px] bg-[#E8E8E3] flex flex-col justify-between'>
                    <div className='flex flex-col w-full justify-between h-1/2'>
                        <div className="navbar h-20 w-full px-10 flex justify-between items-center text-[#6B645C] text-sm md:text-base">
                            <div className='nav-item hidden md:block'>Computer Scientist</div>
                            <div className="nav-item flex">
                                <Link href={"https://www.linkedin.com/in/hamzaaamirDev"} target='_blank' className="py-1 px-2 cursor-pointer hover:scale-110 duration-200">Linkedin</Link>
                                <Link href={"https://www.github.com/MHamzaAamir"} target='_blank' className="py-1 px-2 cursor-pointer hover:scale-110 duration-200">Github</Link>
                                <Link href={"https://medium.com/@MHamzaAamir"} target='_blank' className="py-1 px-2 cursor-pointer hover:scale-110 duration-200">Medium</Link>
                            </div>
                            <Link href={"#contact"} className='nav-item py-1 px-2 rounded-[10px] block md:hidden text-white bg-[#393632] cursor-pointer'>Contact</Link>
                        </div>
                        <div className='flex flex-col'>
                            <div className='make_opaque split-heading w-full text-[70px] sm:text-[80px] md:text-[105px] lg:text-[140px] xl:text-[180px] font-bold text-center text-[#171717]'>HAMZA AAMIR</div>
                            <div className='block md:hidden make_opaque w-full text-center text-xl sm:text-4xl text-[#6B645C]'>
                                AI Engineer | Full Stack Developer
                            </div>

                        </div>

                    </div>
                    <div className='w-full h-1/2 flex items-end justify-center md:justify-between px-10'>
                        <div className='mb-16 hidden make_opaque md:flex max-w-[400px] w-1/3 text-3xl lg:text-4xl flex-col gap-6 text-[#6B645C]'>
                            <div>AI Engineer | Full Stack Developer</div>
                            <Link href={"#contact"} className='py-2 px-3 rounded-2xl text-white text-center bg-[#393632] cursor-pointer hover:scale-105 duration-200'>Contact</Link>
                        </div>

                        <Image className='max-h-full make_opaque' width={230} height={100} alt='Hamza Image' src={"/Hamza_svg.svg"} />

                        <div className='mb-20 hidden make_opaque md:flex max-w-[400px] w-1/3 text-3xl lg:text-4xl flex-col gap-6 text-[#6B645C] capitalize'>
                            <div>Open to Work. Always Building. Always Learning</div>
                        </div>
                    </div>
                </div>

            </div>

            <div className='panel w-screen bg-black rounded-t-[100px] px-10 sm:px-20 py-20 flex flex-col gap-20 items-center'>
                <div className='about-container w-full max-w-[1200px]'>
                    <div className='w-full flex flex-col border-b border-[#D1D1C7]'>
                        <div className='text-4xl sm:text-6xl lg:text-8xl text-[#D1D1C7]'>About Me</div>
                        <div className='text-xl text-[#D1D1C7] py-10 text-justify'>I'm a Computer Science graduate from NUST with over six years of coding experience. I specialize in building intelligent AI models and full stack web applications. To me, code is the paintbrush of the modern world and a skilled developer is an artist bringing ideas to life on a digital canvas. On my journey to becoming the Picasso of programming, I strive to keep learning, keep building, and keep creating.</div>
                    </div>
                </div>
                <div className='work-container w-full max-w-[1200px]'>
                    <div className='w-full flex flex-col border-b border-[#D1D1C7]'>
                        <div className='works-heading text-4xl sm:text-6xl lg:text-8xl text-[#D1D1C7]'>Selected Works</div>
                        <div className='works-heading flex gap-5 text-[#D1D1C7] py-5 px-1 text-sm sm:text-2xl'>
                            <button onClick={() => handleChangeWork("AI")} className={`border-b-[1px] ${selectedWork.link == "ai" ? "border-[#D1D1C7]" : "border-black"} hover:scale-110 duration-200 cursor-pointer`}>AI</button>
                            <button onClick={() => handleChangeWork("Websites")} className={`border-b-[1px] ${selectedWork.link == "websites" ? "border-[#D1D1C7]" : "border-black"} hover:scale-110 duration-200 cursor-pointer`}>Websites</button>
                            <button onClick={() => handleChangeWork("Programming")} className={`border-b-[1px] ${selectedWork.link == "programming" ? "border-[#D1D1C7]" : "border-black"} hover:scale-110 duration-200 cursor-pointer`}>Programming</button>
                        </div>
                        <div className='project-container px-2 w-full py-5 flex flex-col gap-6'>
                            {
                                selectedWork.works.map((work, i) => (
                                    <div key={i} className='w-full flex flex-row justify-between items-center'>
                                        <div className={`w-[45%] ${(i % 2 == 0) ? "hidden md:block" : "hidden md:hidden"}`}>
                                            <div className='md:text-[150px] lg:text-[250px] text-[#D1D1C7] text-center'>0{i + 1}</div>
                                        </div>

                                        <div className={`project-card cursor-default md:w-[55%] rounded-3xl outline-1 outline-[#D1D1C7] text-[#D1D1C7] px-5 py-5 flex flex-col gap-3`}>
                                            <div className='text-2xl lg:text-5xl text-center px-2 py-2'>{work.name}</div>
                                            <div className='text-sm lg:text-base p-2 text-justify'>{work.description}</div>
                                            <div className='w-full flex gap-2'>
                                                {
                                                    work.liveLink ? (
                                                        <>
                                                            <Link href={work.link} target='_blank' className='w-3/5 sm:w-2/3 cursor-pointer hover:bg-white bg-[#D1D1C7] text-black rounded-xl py-2 text-center'>Visit Repository</Link>
                                                            <Link href={work.liveLink} target='_blank' className='w-2/5 sm:w-1/3 cursor-pointer hover:bg-white bg-[#D1D1C7] text-black rounded-xl py-2 text-center'>View Live</Link>
                                                        </>
                                                    ) : (
                                                        <Link href={work.link} target='_blank' className='w-full cursor-pointer hover:bg-white bg-[#D1D1C7] text-black rounded-xl py-2 text-center'>Visit Repository</Link>
                                                    )
                                                }
                                            </div>
                                        </div>
                                        <div className={`w-[45%] ${(i % 2 == 0) ? "hidden md:hidden" : "hidden md:block"}`}>
                                            <div className='md:text-[150px] lg:text-[250px] text-[#D1D1C7] text-center'>0{i + 1}</div>
                                        </div>

                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className='skill-container w-full max-w-[1200px]'>
                    <div className='w-full flex flex-col gap-5 border-b border-[#D1D1C7]'>
                        <div className='skills-heading text-4xl sm:text-6xl lg:text-8xl text-[#D1D1C7]'>Skills</div>
                        <div className='w-full pb-10 flex flex-col gap-5'>
                            {skills.map((skill, i) => (
                                <div key={i} className='one-skill-row w-full flex flex-col lg:flex-row justify-between gap-2'>
                                    <div className='text-sm lg:text-xl'>{skill.name}:</div>
                                    <div className='text-sm lg:text-xl flex flex-wrap gap-2'>
                                        {skill.skillSet.map((s, i) => (
                                            <div key={i} className='skill-item py-2 px-2 rounded-2xl bg-[#D1D1C7] text-black'>{s}</div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className='motivation-container h-screen w-screen flex justify-center items-center gap-2 text-[#171717] bg-[#E8E8E3]'>
                <div className='motivation-elements text-3xl sm:text-5xl md:text-6xl lg:text-7xl '>LET'S</div>
                <div className='motivation-elements text-3xl sm:text-5xl md:text-6xl lg:text-7xl '>MAKE</div>
                <div className='motivation-elements text-3xl sm:text-5xl md:text-6xl lg:text-7xl '>IT</div>
                <div className='motivation-elements text-3xl sm:text-5xl md:text-6xl lg:text-7xl '>HAPPEN</div>
            </div>
            <div id="contact" className='py-20 px-5 w-screen flex flex-col justify-center items-center'>
                <div className='py-20 px-5 w-full rounded-4xl bg-[#171717] flex flex-col items-center gap-10'>
                    <div className='text-[#D1D1C7] text-5xl md:text-8xl text-center'>Drop A Message</div>
                    <form onSubmit={handleSubmit} className='w-[95%] max-w-[500px] p-5 flex flex-col gap-5 bg-[#22211E] outline-1 outline-[#373633] rounded-3xl'>
                        <input required value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} className='bg-[#302F2D] py-3 px-3 rounded-2xl outline-1 outline-[#454442]' type='text' placeholder='Your Name' />
                        <input required value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} className='bg-[#302F2D] py-3 px-3 rounded-2xl outline-1 outline-[#454442]' type='email' placeholder='Your Email' />
                        <textarea required value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} className='bg-[#302F2D] rounded-2xl resize-none py-3 px-3 outline-1 outline-[#454442]' rows={5} placeholder='Your Message' />
                        <button className='text-black bg-[#D1D1C7] cursor-pointer py-3 px-2 rounded-2xl hover:scale-105 duration-200'>Send Message</button>
                    </form>
                    <div className='text-[#D1D1C7] text-5xl md:text-8xl text-center'></div>
                </div>
            </div>
            {(popup) && (
                <div className='py-2 px-10 min-w-[200px] fixed top-10 left-1/2 -translate-x-[50%] rounded-xl bg-[#393632] text-white'>
                    <div className='text-center'>{popup}</div>
                </div>
            )}
        </>

    )
}

export default Main



