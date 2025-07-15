
import React from 'react';
import "../styles/resume.css";
export default function ResumePage() {

    // Skills as plain text, grouped by category, matching user format
    const skillText = [
        {
            category: "Languages",
            value: "TypeScript, PHP, HTML5, CSS3"
        },
        {
            category: "Web & Mobile",
            value: "ReactJS, Redux, Angular, Svelte, Flutter"
        },
        {
            category: "Cloud",
            value: "AWS Cloud, Serverless"
        },
        {
            category: "Database",
            value: "MongoDB, MySQL"
        },
        {
            category: "Backend/Runtime",
            value: "NodeJS"
        }
    ];

    const works = [
        {
            designation: "Senior Full Stack Developer",
            company: "Vimo Software Development Pvt. Ltd.",
            location: "Bengaluru",
            date: { from: "February, 2025", to: "Present" },
            description: "Leading feature development, performance tuning, and architectural improvements across high-traffic applications.",
            projects: [
                {
                    name: "Pinex",
                    description: "Led migration from a sluggish legacy stack to React 19, Node.js 22, and the latest Express—massively boosting performance, maintainability, and user experience."
                }
            ]
        },
        {
            designation: "Software Engineer",
            company: "Softway Solutions",
            location: "Bengaluru",
            date: { from: "March, 2024", to: "January, 2025" },
            description: "Handled critical backend workflows, improving system efficiency and delivering new product capabilities in a production-grade microservices setup.",
            projects: [
                {
                    name: "Daikin One Cloud Services (DOCS)",
                    description: "Owned backend services, rolled out feature upgrades, and ensured robust API performance and system reliability."
                },
            ]
        },
        {
            designation: "Full Stack Developer",
            company: "Vimo Software Development Pvt. Ltd.",
            location: "Bengaluru",
            date: { from: "April, 2022", to: "February 2024" },
            description: "Delivered full-cycle development on multiple B2B/B2C platforms, balancing backend design, admin tooling, and cross-functional collaboration.",
            projects: [
                {
                    name: "AmanaWallet, Remittance App",
                    description: "Engineered backend services and admin tools to support fast, secure money transfers and streamlined operations."
                },
                {
                    name: "Haaki, Audiobook app",
                    description: "Built and optimized core backend modules, integrated audio workflows, and managed a scalable admin interface."
                },
                {
                    name: "Sarraf",
                    description: "Improved backend efficiency and extended admin capabilities for real-time financial operations."
                },
                {
                    name: "Sendony",
                    description: "Spearheaded backend improvements, bug fixes, and performance tuning across admin tools and transactional flows."
                }
            ]
        },
        {
            designation: "Full Stack Developer",
            company: "Avital Software Development Pvt. Ltd.",
            location: "Goa",
            date: { from: "August 2021", to: "March 2022" },
            description: "Supported the rapid prototyping and deployment of a digital healthcare platform by crafting both backend logic and internal management panels.",
            projects: [
                {
                    name: "SuperMD, Digital Health Clinic",
                    description: "Built and maintained essential backend APIs and streamlined the internal management interface for better usability."
                },
            ]
        },
        {
            designation: "Web Developer",
            company: "WEBTRACKERS4U",
            location: "Kolkata",
            date: { from: "May 2019", to: "July 2021" },
            description: "Developed dynamic websites and admin panels for diverse clients, ensuring maintainability, SEO, and responsive UI delivery.",
            projects: [
                {
                    name: "Currys2go",
                    description: "Built full backend and managerial interface for an online food delivery platform.",
                    link: "http://currys2go.nl/"
                },
                {
                    name: "Cribs Day Nursery",
                    description: "Designed and maintained a responsive, content-rich website for a childcare provider.",
                    link: "http://www.cribsdaynursery.com/"
                },
                {
                    name: "Ambinigma Store",
                    description: "Implemented key frontend/backend components for a cross-border e-commerce solution.",
                    link: "https://store.ambinigma.pt/"
                },
                {
                    name: "Francis&Friends",
                    description: "Delivered UI/UX design and web implementation aligned with brand aesthetics and usability.",
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
        },
        {
            name: "dVal",
            description: "Dval is a lightweight and intuitive data validation module designed to validate data against specified schemas.",
            link: "https://www.npmjs.com/package/dval"
        },
        {
            name: "wxproxy",
            description: "Realtime ExpressJS proxy router.",
            link: "https://www.npmjs.com/package/wxproxy"
        }
    ]

    const links = [
        "https://www.linkedin.com/in/nafish-ahmed-dev/",
        "https://github.com/nafishahmeddev",
        "https://nafish.me"
    ]

    return (
        <main>
            <section className="p-8 font-reset">
                {/* Header: Name, Title, Contact */}
                <div className="pb-3 mb-6">
                    <h1 className="text-4xl font-bold tracking-wide m-0">Nafish Ahmed</h1>
                    <div className="text-xl font-semibold mt-2">Full Stack Developer</div>
                    <div className="text-base mt-2 flex gap-4">
                        <div><span className="font-semibold">Phone:</span> <span className='text-rose-600'>+91 9123881186</span></div>
                        <div><span className="font-semibold">Email:</span> <span className='text-rose-600'>nafish.ahmed.dev@gmail.com</span></div>
                    </div>
                    <div className="text-base mt-1">
                        <span className="font-semibold">Links:</span> {links.map((link, index) => (
                            <span key={index}>
                                <a href={link} className="text-rose-600 underline" target="_blank" rel="noopener noreferrer">
                                    {link}
                                </a>
                                {index < links.length - 1 && ', '}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Skills */}
                <div className="mb-6">
                    <div className="font-bold text-base uppercase tracking-wide mb-3 text-rose-600  border-b">Skills</div>
                    <div className="text-base leading-relaxed">
                        {skillText.map((item) => (
                            <div key={item.category}>
                                <span className="font-semibold">{item.category}:</span> {item.value}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Employment History */}
                <div className="mb-6">
                    <div className="font-bold text-base uppercase tracking-wide mb-3 text-rose-600  border-b">Employment History</div>
                    {works.map((work, index) => (
                        <div key={`work-${index}`} className="mb-5">
                            <div className="font-semibold text-base">{work.designation}</div>
                            <div className="text-base mt-0.5">
                                <span>{work.company}</span> &nbsp;|&nbsp; <span>{work.date.from} - {work.date.to}</span>
                            </div>
                            <ul className="text-base mt-1 ml-5 list-disc">
                                {work.projects.map(project => (
                                    <li key={project.name} className="mb-0.5">
                                        <span className="font-medium">{project.name}</span> - {project.description}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Projects */}
                <div className="mb-6">
                    <div className="font-bold text-base uppercase tracking-wide mb-3 text-rose-600 border-b">Projects</div>
                    {projects.map((project, index) => (
                        <div key={`work-${index}`} className="mb-3">
                            <div className="font-semibold text-base">{project.name}</div>
                            <div className="text-base">{project.description}</div>
                            <div className="text-base"><a href={project.link} className="text-rose-600 underline" target="_blank" rel="noopener noreferrer">{project.link}</a></div>
                        </div>
                    ))}
                </div>

                {/* Education */}
                <div>
                    <div className="font-bold text-base uppercase tracking-wide mb-3 text-rose-600 border-b">Education</div>
                    <div className="text-base">
                        <span className="font-semibold">B.Tech in Civil Engineering</span> - 2017-2020<br />
                        <span>Maulana Abul Kalam Azad University of Technology</span>
                    </div>
                </div>
            </section>
        </main>
    )
}