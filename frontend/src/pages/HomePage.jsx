const projects = [
    {
      "title": "FinTacker",
      "description": "Effortlessly track expenses & incomes, stay in control. Simple, secure, and private. Your financial ally. FinTracker is a user-friendly personal finance app designed to help users effortlessly track daily expenses and incomes, and gain valuable insights through monthly tracking. It prioritizes data privacy, securely storing all financial data on the user's device without any data collection. With FinTracker, managing finances becomes simple and convenient.",
      "technologies_text": "Sishu suraksha is bult on webview with some of android native features. On other hand php used for backend and Mysql as database.  The firebase is used to track analytical data, remote config and push notification.",
      "image": "assets/images/fintracker.webp",
      "url": "https://play.google.com/store/apps/details?id=me.nafish.fintracker",
      "technologies": [
        "flutter",
        "sqlite"
      ]
  
    },
    {
      "title": "Francis & Friends",
      "description": "Francis&Friends is a UK's real-state business website.\nTo design the website we've used HTML, CSS and JavaScript.",
      "technologies_text": "Sishu suraksha is bult on webview with some of android native features. On other hand php used for backend and Mysql as database.  The firebase is used to track analytical data, remote config and push notification.",
      "image": "assets/images/francis.webp",
      "url": "https://francisandfriends.co.uk/home",
      "technologies": [
        "html5",
        "css3",
        "javascript",
      ]
  
    },
    {
      "title": "Shishu Suraksha",
      "description": "This is an android application of the Online Complaint Management System of the West Bengal Commission for Protection of Child Rights (WBCPCR).\nThrough this App, any individual or organisation can file complaint relating to violation of child rights virtually. Complainant can view status of his or her complaint. The complainant need not come to the office of WBCPCR for filing a complaint.",
      "technologies_text": "Sishu suraksha is bult on webview with some of android native features. On other hand php used for backend and Mysql as database.  The firebase is used to track analytical data, remote config and push notification.",
      "image": "assets/images/shishu-suraksha.png",
      "url": "https://play.google.com/store/apps/details?id=in.co.webtrackers.sishusuraksha",
      "technologies": [
        "php",
        "mysql",
        "jquery",
        "html5",
        "css3",
        "android",
        "firebase"
      ]
  
    },
    {
      "title": "Medi Angels",
      "description": "Medi Angels is a android app to help people in the COVID pandemic situation  by providing Covid related medical consultancy services (medical help, oxygen, hospitalization advice, cremation/burial etc.), completely free of cost ",
      "technologies_text": "Medi Angels app build with android java and webview. Firebase is used to track analytical data, remote config and push notification. In backend Php is used MySQL is for database.",
      "image": "assets/images/medi-angels.png",
      "url": "https://play.google.com/store/apps/details?id=in.co.webtrackers.covidangels",
      "technologies": [
        "php",
        "mysql",
        "jquery",
        "html5",
        "css3",
        "android"
      ]
  
    },
    {
      "title": "Furkan",
      "description": "Furkan is a android version of holy quran. It is developed to help people to read quran on the go in bengali language. It has also a special feature for searching any Surah or Ayat by related keywords.",
      "technologies_text": "Furqan is build with android java.  In backend Php is used MySQL is for database. Also used codeigniter4 framework in backend",
      "image": "assets/images/furkan.png",
      "url": "https://play.google.com/store/apps/details?id=webtrackers.co.in.furkan&hl=en&gl=US",
      "technologies": [
        "php",
        "mysql",
        "codeigniter",
        "android"
      ]
  
    },
    {
      "title": "Currys2go",
      "description": "Currys2Go is a pick-up service and delivery takes place at Laan van Vollenhove 2971, 3706 AK Zeist. The restaurant's specialties include Indian curry, tandoori, biryani, fish and vegetarian dishes. ",
      "technologies_text": "For frontend HTML, CSS, JS, JQuery is used and for backed used PHP and Wordpress",
      "image": "assets/images/currys2go.png",
      "url": "http://currys2go.nl/",
      "technologies": [
        "html5", "css3",
        "php",
        "mysql",
        "wordpress",
        "javascript",
      ]
  
    },
    {
      "title": "Cribs Day Nursery",
      "description": "Cribs day nursery is an Ofsted registered nursery which provides high quality childcare for babies sand young children from the ages of 0-5 years. We also provide an afterschool care session which go up to the age of 8..",
      "technologies_text": "For frontend HTML, CSS, JS, JQuery is used and for backed used Core PHP with custom cms.",
      "image": "assets/images/cribs.png",
      "url": "http://www.cribsdaynursery.com/",
      "technologies": [
        "html5",
        "css3",
        "php",
        "mysql",
        "jquery",
        "javascript",
      ]
  
    },
    {
      "title": "Global Forum Consulting",
      "description": "The Global Forum Consulting Limited is a South London based Chartered Certified Firm of Accountants, which offers professional and affordable Accountancy and Information Technology & Security services.",
      "technologies_text": "For frontend HTML, CSS, JS, JQuery is used and for backed used Core PHP with custom cms.",
      "image": "assets/images/global.png",
      "url": "https://globalgorumconsulting.com/global_forum",
      "technologies": [
        "html5",
        "css3",
        "php",
        "mysql",
        "jquery",
        "javascript",
      ]
  
    },
    {
      "title": "Ambinigma",
      "description": "Ambinigma is a ecommerce website which provides wood, gas, bioethanol products.",
      "technologies_text": "Opencart E-Commerce platform is used to develop the website. The website is built with PHP, HTML, CSS, JQuery",
      "image": "assets/images/ambinigma.png",
      "url": "https://store.ambinigma.pt",
      "technologies": [
        "css3",
        "html5",
        "mysql",
        "javascript",
        "php"
      ]
  
    },
  ];
export default function HomePage(){

    return (
        <main className="font-mono">
          <video playsInline autoPlay muted loop className="w-screen h-screen fixed top-0 left-0 -z-10 object-cover">
            <source src="assets/videos/banner.mp4" type="video/mp4" />
          </video>
          <section className="flex h-screen bg-black/40 text-white backdrop:blur-md">
            <div className="container m-auto  px-4  max-w-4xl">
    
              <div className="uk-light">
    
                <h2 className="text-4xl font-bold mt-5">Hi I{"'"}m </h2>
    
                <h1 className="md:text-8xl text-6xl font-bold  my-8">Nafish Ahmed</h1>
                <p className="mb-5">
                  I`m Nafish, a 25-year-old Full Stack Developer from India. I`m a quirky individual who enjoys crafting unconventional projects using web technologies. I thrive on solving design challenges, crafting intuitive user interfaces, and conceptualizing meaningful interactions to develop immersive web experiences and applications.
                </p>
                <p className="mb-5 ">Got any questions? <a className="underline" href="mailto:hello@nafish.me">Contact me.</a></p>
              </div>
              <div className="mt-5">
                <a className="px-9 py-2 bg-emerald-700 hover:bg-emerald-600 transition-all inline-flex justify-center gap-1 items-center  border-b-2 active:border-b-0 active:border-t-2  border-emerald-900 " href="/resume" target="_blank" rel="noreferrer">
                  Download Resume <span><i className="fa-solid fa-download text-xs"></i></span>
                </a>
              </div>
            </div>
          </section>
    
    
          {
            projects.map((project, index) => (
              <section className={`md:py-30 py-40 flex items-center ${index % 2 == 1 ? "bg-emerald-800 text-white" : "bg-yellow-300 "}`} key={`section_${project.title}`}>
                <div className="container max-w-6xl mx-auto px-4">
                  <div className={`flex items-center ${index % 2 == 1 ? "md:flex-row-reverse" : "md:flex-row"} flex-col gap-4`}>
                    <div className="md:w-[450px]">
                      <div>
                        <img src={project.image} className="w-full" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-3xl mb-4 font-extrabold">{project.title}</h2>
                      <p className="font-light leading-7 font-mono">{project.description}</p>
                      <div className="flex gap-4 text-xl py-8">
                        {project.technologies.map(technology => <i key={technology} className={`devicon-${technology}-plain`}></i>)}
                      </div>
                      <div>
                        <a className={`px-6 py-2 border-b-2 active:border-b-0 active:border-t-2 transition-all ${index % 2 != 1 ? "bg-white text-gray-900 border-gray-200" : "bg-gray-800 text-white border-gray-950"} hover:opacity-80 font-mono inline-flex items-center gap-2`} href={project.url} target="_blank" rel="noreferrer">
                          View Project Details
                          <span><i className="fa-solid fa-link text-xs"></i></span>
                        </a>
                      </div>
    
                    </div>
                  </div>
    
    
                </div>
    
              </section >
            ))
          }
          <section className="text-center py-20 bg-emerald-900 text-white">
            <div className="container m-auto">
              <div className="flex gap-3 justify-center text-2xl my-10">
                <em className="devicon-jquery-plain colored  "></em>
                <em className="devicon-php-plain colored "></em>
                <em className="devicon-mysql-plain colored"></em>
                <em className="devicon-react-plain colored"></em>
                <em className="devicon-codeignitor-plain colored"></em>
                <em className="devicon-laravel-plain colored"></em>
                <em className="devicon-wordpress-plain colored"></em>
                <em className="devicon-android-plain colored"></em>
                <em className="devicon-firebase-plain colored"></em>
                <em className="devicon-codeigniter-plain colored"></em>
                <em className="devicon-nodejs-plain colored"></em>
              </div>
    
              <h3 className="uk-margin-large-top">Get in touch with me</h3>
              <a className="underline font-light" href="mailto:hello@nafish.me">hello@nafish.me</a>
    
            </div>
          </section>
          <section className="text-center py-4 bg-emerald-950 text-white">
            <div className="container m-auto">
              <a className="uk-button uk-button-text">hello@nafish.me &copy; Nafish Ahmed. All rights reserved.</a>
            </div>
    
          </section>
        </main>
      )
}