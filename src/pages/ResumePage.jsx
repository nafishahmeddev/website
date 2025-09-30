import React from 'react';
import "../styles/resume.css";

// === Lucide React Icons (Defined as functional components for use in JSX) ===
// Icons are optional in ATS, but we keep them minimal and clear for readability.

// Mail Icon
const MailIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block w-4 h-4 mr-1.5 align-text-bottom">
        <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
);

// Link Icon (for LinkedIn/Portfolio/GitHub)
const LinkIcon = (props) => (
    // FIX: Removed duplicate 'strokeLinecap' attribute to resolve the compilation warning.
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block w-4 h-4 mr-1.5 align-text-bottom">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
);

// Phone Icon
const PhoneIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block w-4 h-4 mr-1.5 align-text-bottom">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 3.08 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
);


// =========================================================================

// Data is consolidated and slightly simplified for clarity
const resumeData = {
    name: "NAFISH AHMED",
    title: "Senior Full Stack Developer", // Title updated to reflect new role
    contact: {
        phone: "+91 9123881186",
        email: "nafish.ahmed.dev@gmail.com",
        linkedin: "linkedin.com/in/nafish-ahmed-dev/",
        github: "github.com/nafishahmeddev",
        portfolio: "nafish.me"
    },
    // CONSOLIDATED SKILLS FOR BETTER ATS PARSING AND READABILITY
    skills: [
        // UPDATED: Removed Angular
        "Frontend/UI: React.js, Svelte, Redux, TypeScript, SASS/CSS3",
        "Backend/API: Node.js, Express.js, PHP, Serverless, JWT, RESTful APIs",
        "Databases: MongoDB (NoSQL), MySQL (SQL), Redis (Caching)",
        "Cloud/DevOps: AWS Services (EC2, S3), Docker, CI/CD",
        "Mobile: Flutter (Cross-Platform Development)",
    ],
    // UPDATED SUMMARY: Years updated to 6+ and language simplified
    summary: "**Senior Full Stack Engineer** with **6+ years** of extensive experience in designing and optimizing scalable **MERN stack** applications (**React.js, Node.js, MongoDB**). Proven specialization in **performance engineering** and system reliability, highlighted by a dramatic report generation speed increase (from **45 minutes to 3 seconds**) and effective **Redis** caching implementation for latency reduction. Excels at modernizing legacy systems and building secure, high-availability microservices (e.g., **Pinex** migration, **Topup Gateway**). Proficient in **TypeScript, MySQL, and AWS**.",
    workExperience: [
        {
            title: "SENIOR FULL STACK DEVELOPER", // NEW ROLE
            company: "Vimo Software Development Pvt. Ltd.",
            date: "February 2025 – Present",
            description: [
                // NEW Bullet Point for the internal tool
                "**Developed and deployed** a custom internal tool, `secretly`, designed for the efficient and secure management of environment variables across multiple critical projects, enhancing security posture and deployment consistency.",
                // Migration Bullet Point
                "**Led the full stack migration** of the legacy, high-latency **Pinex** reseller system to a new highly available platform using **React.js, Tailwind CSS, Node.js, and TypeScript**, significantly improving system performance and scalability.",
                // Topup Gateway remains
                "Engineered the **Topup Gateway** using a microservices pattern to efficiently handle high-volume, third-party client traffic and intelligently route requests to external provider APIs, ensuring high reliability and low latency.",
            ]
        },
        {
            title: "SOFTWARE ENGINEER",
            company: "Softway Solutions",
            date: "March 2024 – January 2025",
            description: [
                // Strong, quantifiable metrics
                "**Optimized** a core report generation process, successfully reducing execution time from **45-60 minutes down to 3-5 seconds**, resulting in significant resource and time savings for the business.",
                "**Reduced latency** in Daikin Cloud Services performance charts by identifying stateful data bottlenecks and **implementing Redis caching**, significantly improving user experience and data load times.",
            ]
        },
        {
            title: "FULL STACK DEVELOPER",
            company: "Vimo Software Development Pvt. Ltd.",
            date: "April 2022 – February 2024",
            description: [
                // Enhanced: Focused on technical contributions, not just product names
                "**Contributed** to the full-stack maintenance of high-value applications (e.g., **AmanaWallet** remittance app), focusing on securing backend infrastructure and optimizing admin interface performance.",
                "**Orchestrated** the development and optimization of scalable backend systems for Sarraf & Sendony, focusing on API performance improvements and managing multiple external payment gateway integrations.",
            ]
        },
        {
            title: "FULL STACK DEVELOPER",
            company: "Avital Software Development Pvt. Ltd.",
            date: "August 2021 – March 2022",
            description: [
                "**Contributed** significantly to the core development and maintenance of the Node.js backend and integral managerial panel for **SuperMD, a Digital Health Clinic** platform.",
            ]
        },
        {
            title: "WEB DEVELOPER",
            company: "WEBTRACKERS4U",
            date: "May 2019 – July 2021",
            description: [
                "**Led** the creation, continual upkeep, and optimization of multiple client websites, focusing on responsive design, SEO improvements, and front-end performance.",
                "**Conceptualized** and **executed** the complete design and development for client sites, ensuring cross-browser compatibility and visual integrity using HTML/CSS/JavaScript.",
            ]
        }
    ],
    projects: [
        // Personal/Hobby Projects remain here
        { name: "FinTracker (Flutter)", description: "Flutter-based app for daily expense/income tracking, providing valuable insights for effective financial management.", link: "https://play.google.com/store/apps/details?id=me.nafish.fintracker&hl=en&gl=US" },
        { name: "dVal (NPM)", description: "Lightweight and intuitive data validation module designed to validate data against specified schemas.", link: "https://www.npmjs.com/package/dval" },
    ],
    education: [
        {
            degree: "B.Tech in Civil Engineering",
            university: "Maulana Abul Kalam Azad University of Technology",
            year: "2017 – 2020"
        },
    ],
};

// Helper component for section headings
const SectionHeader = ({ title }) => (
    <h2 className="text-xl font-bold uppercase border-b-2 border-gray-400 pb-1 mb-3 mt-5 text-gray-800 tracking-wider">
        {title}
    </h2>
);

const ResumePage = () => {
    return (
        <div className="flex justify-center min-h-screen bg-white p-4 sm:p-8 font-sans">
            {/* ATS Resume Container - Max width 8.5in */}
            <div className="w-full bg-white text-gray-800">

                {/* 1. NAME & CONTACT HEADER */}
                <header className="text-center mb-6">
                    <h1 className="text-3xl font-extrabold uppercase tracking-widest text-gray-900">{resumeData.name}</h1>
                    <p className="text-lg font-semibold text-gray-700 mt-1">{resumeData.title}</p>

                    {/* Contact Bar - Single line, minimal dividers for parsing */}
                    <div className="flex flex-wrap justify-center text-sm mt-2 text-gray-600 space-x-4">
                        <span className="flex items-center">
                            <PhoneIcon />{resumeData.contact.phone}
                        </span>
                        <span className="hidden sm:inline">|</span>
                        <span className="flex items-center">
                            <MailIcon />{resumeData.contact.email}
                        </span>
                        <span className="hidden sm:inline">|</span>
                        <a href={`https://${resumeData.contact.linkedin}`} target="_blank" className="text-gray-600 flex items-center print:text-black">
                            <LinkIcon />{resumeData.contact.linkedin}
                        </a>
                        <span className="hidden md:inline">|</span>
                        <a href={`https://${resumeData.contact.github}`} target="_blank" className="text-gray-600 flex items-center print:text-black">
                            <LinkIcon />{resumeData.contact.github}
                        </a>
                    </div>
                </header>

                {/* 2. PROFESSIONAL SUMMARY */}
                <SectionHeader title="PROFESSIONAL SUMMARY" />
                {/* FIX: Changed outer <p> to <div> to prevent DOM nesting warning, 
            as the inner element generated by dangerouslySetInnerHTML is a block element (div). */}
                <div className="text-sm text-gray-700 mb-4 leading-relaxed">
                    <div dangerouslySetInnerHTML={{ __html: resumeData.summary.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                </div>

                {/* 3. CORE TECHNICAL SKILLS */}
                <SectionHeader title="CORE TECHNICAL SKILLS" />
                <div className="text-sm text-gray-700 mb-4">
                    {/* Using a simple comma-separated list or brief categorized list is best for ATS */}
                    <p className="font-semibold mb-1">Expertise:</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-1 list-none p-0">
                        {resumeData.skills.map((skill, index) => (
                            <li key={index} className="text-sm">
                                <span className="text-blue-600 text-lg mr-1">•</span>
                                {skill}
                            </li>
                        ))}
                    </ul>
                </div>


                {/* 4. PROFESSIONAL EXPERIENCE */}
                <SectionHeader title="PROFESSIONAL EXPERIENCE" />
                <div className="space-y-5">
                    {resumeData.workExperience.map((job, index) => (
                        <div key={index} className="pb-2">
                            <div className="flex justify-between items-start text-base">
                                <h3 className="font-bold text-gray-900 uppercase">{job.title} - {job.company}</h3>
                                <p className="font-medium text-gray-600 whitespace-nowrap">{job.date}</p>
                            </div>

                            {/* Job Descriptions */}
                            <ul className="list-disc space-y-1 mt-1 text-sm text-gray-700 pl-5">
                                {job.description.map((point, i) => (
                                    <li key={i} dangerouslySetInnerHTML={{ __html: point.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* 5. PROJECTS */}
                <SectionHeader title="KEY PROJECTS" />
                <div className="space-y-4">
                    {resumeData.projects.map((project, index) => (
                        <div key={index}>
                            <h3 className="text-sm font-bold text-gray-800 inline-block">{project.name}</h3>
                            <span className="text-xs text-gray-600 ml-2">
                                <LinkIcon className="inline-block w-3 h-3 align-text-bottom mr-1" />
                                <a href={project.link} target="_blank" className="hover:underline text-blue-600 print:text-black">
                                    {project.link}
                                </a>
                            </span>
                            <p className="text-sm text-gray-700 mt-0.5">{project.description}</p>
                        </div>
                    ))}
                </div>

                {/* 6. EDUCATION */}
                <SectionHeader title="EDUCATION" />
                <div className="space-y-2">
                    {resumeData.education.map((edu, index) => (
                        <div key={index} className="flex justify-between items-start text-sm">
                            <p className="font-bold text-gray-800">{edu.degree} - {edu.university}</p>
                            <p className="text-gray-600 whitespace-nowrap">{edu.year}</p>
                        </div>
                    ))}
                </div>

                {/* 7. LANGUAGES (Optional, but clean) */}
                <SectionHeader title="LANGUAGES" />
                <p className="text-sm text-gray-700">
                    <strong>Bengali</strong> (Native/Fluent), <strong>English</strong> (Professional Working Proficiency), <strong>Hindi</strong> (Conversational)
                </p>

            </div>
        </div>
    );
};

export default ResumePage;
