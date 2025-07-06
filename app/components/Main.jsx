"use client"
import gsap from 'gsap'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import { SplitText, ScrollTrigger } from 'gsap/all'

import About from './About'
import Works from './Works'

gsap.registerPlugin(SplitText, ScrollTrigger)

const Main = () => {
    // useGSAP(()=>{
    //     gsap.fromTo(
    //         ".navbar",
    //         {y:-110},
    //         {y:0,duration:1}

    //     )
    // })

    useGSAP(() => {

        gsap.from(".navbar", {
            y: -100,
            duration: 1
        })

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

        gsap.from(".about-container", {
            scrollTrigger: {
                trigger: ".about-container",
                // markers: true,
                toggleActions:"play none none reverse",
                start:"top center",
                end:"center center",
                // scrub:true
                // start: "top bottom",
                // end: "bottom top"
            },
            opacity: 0,
            duration: 1
        })

    })

    const services = [{
        name: "AI/ML",
        items: ["TensorFlow", "Scikit-learn", "Pandas", "Numpy", "NLTK", "OpenCV"]
    }, {
        name: "Full Stack Web Dev",
        items: ["Node.js", "Express.js", "Fast API", "Next.js", "React.js", "Tailwind CSS", "GSAP"]
    }]



    return (
        <>
            <div className='hero-container h-screen w-screen bg-[#E8E8E3] flex flex-col justify-between'>
                <div className='flex flex-col justify-between h-1/2'>
                    <div className="navbar h-20 w-full px-10 flex justify-between items-center text-[#6B645C]">
                        <div className='nav-item hidden sm:block'>Computer Scientist</div>
                        <div className="nav-item flex">
                            <div className="py-1 px-2">Services</div>
                            <div className="py-1 px-2">Work</div>
                            <div className="py-1 px-2">Github</div>
                        </div>
                        <button className='nav-item py-1 px-2 rounded-[10px] block sm:hidden text-white bg-[#393632]'>Contact</button>
                    </div>
                    <div className='flex flex-col'>
                        <div className='make_opaque w-full text-[70px] sm:text-[80px] md:text-[105px] lg:text-[140px] xl:text-[180px] font-bold text-center text-[#171717]'>HAMZA AAMIR</div>
                        <div className='block sm:hidden make_opaque w-full text-center text-xl sm:text-4xl text-[#6B645C]'>
                            AI Engineer | Full Stack Developer
                        </div>

                    </div>

                </div>
                <div className='w-screen h-1/2 flex items-center justify-center sm:justify-between px-10'>
                    <div className='hidden make_opaque sm:flex max-w-[400px] w-1/3 text-2xl md:text-4xl flex-col gap-2 text-[#6B645C]'>
                        <div>AI Engineer | Full Stack Developer</div>
                        <button className='py-2 px-3 rounded-2xl text-white bg-[#393632]'>Contact</button>

                    </div>

                    <Image className='make_opaque -z-10 self-end' width={230} height={100} alt='Hamza Image' src={"/Hamza_svg.svg"} />

                    <div className='hidden sm:block make_opaque max-w-[400px] w-1/3 text-2xl md:text-4xl text-[#6B645C] text-end'>
                        Open to Work. Always Learning Always Building
                    </div>
                </div>
            </div>

            <div className='panel w-screen bg-black rounded-t-[100px] px-10 py-20 flex flex-col gap-40 items-center'>
                <div className='about-container'>
                    <About />
                </div>
            </div>

        </>

    )
}

export default Main


{/* <div className='flex items-center gap-20 justify-center'>
                    {services.map((service, i) => (
                        <div key={i} className='h-[300px] w-[200px] rounded-4xl outline-1 outline-white'>
                            <div>{service.name}</div>
                        </div>
                    ))}

                </div> */}
