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
        "Frontend/UI: React.js, Svelte, Redux, TypeScript, Tailwind CSS, SASS",
        "Backend: Node.js, Express.js, PHP, Serverless, JWT",
        "Databases: MongoDB (NoSQL), MySQL (SQL), Redis (Caching)",
        "DevOps/Cloud: AWS (EC2, S3), Docker, CI/CD",
        "Mobile: Flutter (Cross-Platform)",
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
                "**Maintained and secured** high-value applications (e.g., **AmanaWallet**), optimizing backend infrastructure and admin interfaces for better performance.",
                "**built and scaled** backend systems for Sarraf & Sendony, prioritizing API efficiency and integrating multiple payment gateways.",
            ]
        },
        {
            title: "FULL STACK DEVELOPER",
            company: "Avital Software Development Pvt. Ltd.",
            date: "August 2021 – March 2022",
            description: [
                "**Developed core backend services** and the administrative panel for **SuperMD**, a Digital Health Clinic platform, ensuring secure data handling and robust performance.",
            ]
        },
        {
            title: "WEB DEVELOPER",
            company: "WEBTRACKERS4U",
            date: "May 2019 – July 2021",
            description: [
                "**Designed and developed** multiple responsive client websites using HTML, CSS, and JavaScript, ensuring cross-browser compatibility and SEO best practices.",
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

const SectionHeader = ({ title }) => (
    <div className="flex items-center mb-1.5">
        <h2 className="text-[9pt] font-bold uppercase tracking-[0.1em] text-slate-500 mr-2 whitespace-nowrap">
            {title}
        </h2>
        <div className="flex-grow border-t border-slate-200"></div>
    </div>
);

const ResumePage = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex justify-center py-10 print:bg-white print:p-0">

            {/* DOCUMENT CONTAINER: Compact for single page */}
            <div className="w-[210mm] bg-white text-slate-900 border border-gray-200 shadow-xl print:shadow-none print:border-none print:w-full box-border px-[1.5cm] py-[1.5cm] min-h-[297mm]">

                {/* 1. HEADER */}
                <header className="border-b border-slate-300 pb-3 mb-4">
                    <div className="flex justify-between items-end">
                        <div>
                            <h1 className="text-2xl font-bold uppercase tracking-tight text-slate-900 mb-0.5">{resumeData.name}</h1>
                            <p className="text-sm font-medium text-slate-600 uppercase tracking-wider">{resumeData.title}</p>
                        </div>
                    </div>

                    {/* Contact Info - Single Line Row */}
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-[9pt] text-slate-600">
                        <div className="flex items-center gap-1">
                            <MailIcon className="w-3 h-3" /> {resumeData.contact.email}
                        </div>
                        <div className="flex items-center gap-1">
                            <PhoneIcon className="w-3 h-3" /> {resumeData.contact.phone}
                        </div>
                        {resumeData.contact.linkedin && (
                            <div className="flex items-center gap-1">
                                <LinkIcon className="w-3 h-3" />
                                <span className="hover:underline">{resumeData.contact.linkedin}</span>
                            </div>
                        )}
                        {resumeData.contact.portfolio && (
                            <div className="flex items-center gap-1">
                                <LinkIcon className="w-3 h-3" />
                                <span className="hover:underline">{resumeData.contact.portfolio}</span>
                            </div>
                        )}
                        {resumeData.contact.github && (
                            <div className="flex items-center gap-1">
                                <LinkIcon className="w-3 h-3" />
                                <span className="hover:underline">{resumeData.contact.github}</span>
                            </div>
                        )}
                    </div>
                </header>

                {/* 2. SUMMARY */}
                <section className="mb-4">
                    <SectionHeader title="Summary" />
                    <div className="text-[9pt] leading-snug text-slate-700 text-justify">
                        <div dangerouslySetInnerHTML={{ __html: resumeData.summary.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>') }} />
                    </div>
                </section>

                {/* 3. SKILLS - Linear Text List */}
                <section className="mb-4">
                    <SectionHeader title="Tech Stack" />
                    <div className="text-[9pt] text-slate-800">
                        {resumeData.skills.map((skill, index) => {
                            const [category, items] = skill.split(':');
                            return (
                                <div key={index} className="mb-1 flex align-baseline">
                                    <span className="font-bold text-slate-900 mr-2 min-w-[100px] text-[8.5pt] uppercase tracking-wide">{category}:</span>
                                    <span className="text-slate-700 flex-1">{items}</span>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* 4. EXPERIENCE - Vertical List */}
                <section className="mb-4">
                    <SectionHeader title="Professional Experience" />
                    <div className="space-y-3">
                        {resumeData.workExperience.map((job, index) => (
                            <div key={index} className="keep-together">
                                {/* Job Header */}
                                <div className="flex justify-between items-baseline mb-0.5">
                                    <h3 className="text-[10pt] font-bold text-slate-900">{job.title}</h3>
                                    <span className="text-[8.5pt] font-medium text-slate-500">{job.date}</span>
                                </div>
                                <div className="text-[9pt] font-semibold text-slate-700 mb-1">{job.company}</div>

                                {/* Bullets */}
                                <ul className="list-disc pl-3 space-y-0.5 text-[9pt] text-slate-700 leading-[1.35] marker:text-slate-400">
                                    {job.description.map((point, i) => (
                                        <li key={i} dangerouslySetInnerHTML={{ __html: point.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>') }} />
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 5. PROJECTS - Simple Grid (max 2 col) */}
                <section className="mb-4 keep-together">
                    <SectionHeader title="Projects" />
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                        {resumeData.projects.map((project, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-0.5">
                                    <h3 className="text-[9.5pt] font-bold text-slate-900">{project.name}</h3>
                                    <a href={project.link} target="_blank" className="text-[8.5pt] text-blue-600 hover:underline print:text-black print:no-underline">View</a>
                                </div>
                                <p className="text-[8.5pt] text-slate-600 leading-snug">{project.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 6. EDUCATION & LANGUAGES - Compact */}
                <div className="flex justify-between gap-6 keep-together">
                    {/* Education */}
                    <div className="flex-1">
                        <SectionHeader title="Education" />
                        {resumeData.education.map((edu, index) => (
                            <div key={index} className="mb-1">
                                <div className="flex justify-between items-baseline">
                                    <span className="font-bold text-slate-900 text-[9pt]">{edu.degree}</span>
                                    <span className="text-[8.5pt] text-slate-500">{edu.year}</span>
                                </div>
                                <div className="text-[8.5pt] text-slate-600">{edu.university}</div>
                            </div>
                        ))}
                    </div>

                    {/* Languages */}
                    <div className="flex-1">
                        <SectionHeader title="Languages" />
                        <div className="text-[9pt] text-slate-700">
                            Bengali, English, Hindi
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ResumePage;
