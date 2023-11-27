import { FaBuilding, FaCalendar, FaGraduationCap, FaSuitcase, FaTags, FaUser } from "react-icons/fa6"

export default function ResumePage() {

    const skills = [
        { label: "PHP", progress: 5 },
        { label: "NodeJS", progress: 5 },
        { label: "CSS", progress: 3 },
        { label: "HTML", progress: 4 },
        { label: "MySQL", progress: 4 },
        { label: "ReactJS", progress: 4 },
        { label: "Angular", progress: 3 },
        { label: "Svelte", progress: 3 },
        { label: "Flutter", progress: 1 },
    ]

    const languages = [
        { label: "English", progress: 4 },
        { label: "Bengali", progress: 5 },
        { label: "Hindi", progress: 3 },
    ]

    const works = [
        {
            designation: "Full Stack Developer",
            company: "Vimo Software Development Pvt. Ltd.",
            location: "Bengaluru",
            date: { from: "March, 2022", to: "Present" },
            description: "",
            projects: [
                {
                    name: "AmanaWallet",
                    description: "Played a key part in crafting and maintaining both the backend infrastructure and the supervisory control interface."
                },
                {
                    name: "Haaki",
                    description: "Orchestrated the development and continuous maintenance of both the backend and managerial interface."
                },
                {
                    name: "Sarraf",
                    description: "Managing the ongoing maintenance and optimization of the backend system and admin interface."
                },
                {
                    name: "Sendony",
                    description: "Managing the ongoing maintenance and optimization of the backend system and admin interface."
                }
            ]
        },
        {
            designation: "Full Stack Developer",
            company: "Avital Software Development Pvt. Ltd.",
            location: "Goa",
            date: { from: "August 2021", to: "March 2022" },
            description: "",
            projects: [
                {
                    name: "SuperMD",
                    description: "Contributed significantly to the development and maintenance of not only the backend but also the integral managerial panel."
                },
            ]
        },
        {
            designation: "Web Developer",
            company: "WEBTRACKERS4U",
            location: "Kolkata",
            date: { from: "February 2019", to: "July 2021" },
            description: "",
            projects: [
                {
                    name: "Currys2go",
                    description: "Contributed significantly to the development and maintenance of not only the backend but also the integral managerial panel.",
                    link: "http://currys2go.nl/"
                },
                {
                    name: "Cribs Day Nursery",
                    description: "Led the creation and continual upkeep of the website",
                    link: "http://www.cribsdaynursery.com/"
                },
                {
                    name: "Ambinigma Store",
                    description: "Played a pivotal role in developing and sustaining the website.",
                    link: "https://store.ambinigma.pt/"
                },
                {
                    name: "Francis&Friends",
                    description: "Conceptualized and executed the design for the website.",
                    link: "https://francisandfriends.co.uk/home"
                },
            ]
        }
    ]

    const projects = [
        {
            name: "FinTracker",
            description: "A Flutter-based app for easy daily expense and income tracking, providing valuable insights for effective financial management.",
            link: "https://play.google.com/store/apps/details?id=me.nafish.fintracker&hl=en&gl=US"
        }
    ]

    return (
        <main className="bg-gray-200">
            <section className="flex items-stretch m-auto shadow-sm overflow-hidden" style={{ minHeight: "100vh" }}>
                <aside className="bg-emerald-900 backdrop:blur-sm p-5 leading-7 text-white w-60">
                    <h1 className="text-3xl font-bold">Nafish Ahmed</h1>
                    <span className="text-emerald-100">Full Stack Developer</span>
                    <div className="block my-6">
                        <h2 className="font-medium mb-2">Contact</h2>
                        <ul className="text-sm">
                            <li className="my-3">
                                <span>Phone</span><br /><a className="underline text-emerald-100" href="tel:919123881186">+91 9123881186</a>
                            </li>
                            <li className="my-3">
                                <span>Email</span><br />
                                <a className="underline text-emerald-100" href="mailto:nafish.ahmed.dev@gmail.com">nafish.ahmed.dev@gmail.com</a>
                            </li>

                            <li className="my-3">
                                <span>Address</span><br />
                                <span className='text-emerald-100'>
                                    House No 7, 1st Cross, 3rd Main Road,
                                    Jakkasandra, Bengaluru,
                                    <br />
                                    Karnataka - 560034
                                </span>
                            </li>

                            <li className="my-3">
                                <span>LinkedIn</span><br />
                                <a className="underline text-emerald-100 text-xs" href="https://www.linkedin.com/in/nafish-ahmed-dev/">https://www.linkedin.com/in/nafish-ahmed-dev/</a>
                            </li>

                            <li className="my-3">
                                <span>GitHub</span><br />
                                <a className="underline text-emerald-100 text-xs" href="https://github.com/nafishahmeddev">https://github.com/nafishahmeddev</a>
                            </li>
                        </ul>
                    </div>
                    <div className="block my-6">
                        <h2 className="mb-3  font-medium">Skills</h2>
                        <ul className='list-disc ps-4'>
                            {skills.map((record) => (
                                <li key={record.label} className="flex my-1 text-sm relative">
                                    {record.label}
                                    <span className='absolute h-1.5 w-1.5 bg-emerald-200 -left-4 top-2 rounded-full'></span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="block my-6">
                        <h2 className="mb-3 font-medium">Languages</h2>
                        <ul className='list-disc ps-4'>
                            {languages.map((record) => (
                                <li key={record.label} className="flex my-1 text-sm relative">
                                    {record.label}
                                    <span className='absolute h-1.5 w-1.5 bg-emerald-200 -left-4 top-2 rounded-full'></span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>
                <aside className="flex-1 bg-white p-5  py-10">
                    <div className="block mb-5">
                        <h2 className="text-lg flex gap-2 items-center font-bold">
                            <div className='w-6'><FaUser className='text-emerald-600' /></div>Professional Summery
                        </h2>
                        <div className='ms-8 my-3 text-sm'>
                            <p>Results-driven Full Stack Developer with over four years of expertise in application layers, presentation layers, and database management. Proficient in PHP, Node.js, HTML, CSS, MySQL, React.js, Angular, and Svelte. Actively seeking opportunities for skill set expansion.</p>
                        </div>
                    </div>
                    <div className="block mb-5">
                        <h2 className="text-lg flex gap-2 items-center font-bold">
                            <div className='w-6'><FaSuitcase className='text-emerald-600' /></div>Employment History
                        </h2>
                        <div className='ms-8 mt-4'>
                            {
                                works.map((work, index) => (
                                    <div className="content mb-7 relative" key={`work-${index}`}>
                                        <p className='h3 font-medium text-emerald-700'>{work.designation} </p>
                                        <div className='flex items-center my-3 text-sm gap-3'>
                                            <div className='flex items-center gap-2'><FaBuilding className='text-emerald-600' /> {work.company}</div>
                                            <div className='flex items-center gap-2'><FaCalendar className='text-emerald-600' /> {work.date.from} - {work.date.to}</div>
                                        </div>
                                        <ul className='text-sm mt-2'>
                                            {work.projects.map(project => <li key={project.name} className='mb-2 relative'>
                                                <a className='font-medium' href={project.link ?? "#"}>{project.name}</a> - {project.description}
                                                <span className='absolute h-1.5 w-1.5 bg-emerald-700 -left-4 top-2 rounded-full'></span>
                                            </li>)}
                                        </ul>
                                    </div>
                                ))
                            }
                        </div>


                    </div>

                    <div className="block mb-5">
                        <h2 className="text-lg flex gap-2 items-center font-bold">
                            <div className='w-6'><FaTags className='text-emerald-600' /></div>Hobby Projects
                        </h2>
                        <div className='ms-8 mt-4'>
                            {
                                projects.map((project, index) => (
                                    <div className="content mb-7 relative" key={`work-${index}`}>
                                        <p className='h3 font-medium text-emerald-700'>{project.name} </p>
                                        <p>{project.description}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="block">
                        <h2 className="text-lg flex gap-2 items-center font-bold">
                            <div className='w-6'><FaGraduationCap className='text-emerald-600' /></div>Education
                        </h2>
                        <div className='ms-8'>
                            <ul>
                                <li className="content my-3">
                                    <span className='text-emerald-700 font-medium'><span>B.Tech in Civil Engineering</span></span> - <span>2017- 2020</span><br />
                                    <span className='text-sm'>Maulana Abul Kalam Azad University of Technology</span>
                                </li>
                                {/* <li className="content my-3">
                  <span className='text-emerald-700 font-medium'><span>Diploma in Civil Engineering</span> (<span>70 %</span>)</span> -  <span>2014-2017</span><br />
                  <span className='text-sm'>
                    West Bengal State Council of Technical &amp; Vocational Education
                    and Skill Development.
                  </span>
                </li>
                <li className="content my-3">
                  <span className='text-emerald-700 font-medium'><span>Secondary</span> (<span>56 %</span>)</span> - <span>2014</span><br />
                  <span className='text-sm'>West Bengal Board of Secondary Education</span>
                </li> */}
                            </ul>
                        </div>
                    </div>
                </aside>
            </section>
        </main>
    )
}