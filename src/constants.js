// Skills Section Logo's
import htmlLogo from './assets/tech_logo/html.png';
import cssLogo from './assets/tech_logo/css.png';
import javascriptLogo from './assets/tech_logo/javascript.png';
import reactjsLogo from './assets/tech_logo/reactjs.png';
import reduxLogo from './assets/tech_logo/redux.png';
import tailwindcssLogo from './assets/tech_logo/tailwindcss.png';
import nodejsLogo from './assets/tech_logo/nodejs.png';
import expressjsLogo from './assets/tech_logo/express.png';
import mysqlLogo from './assets/tech_logo/mysql.png';
import mongodbLogo from './assets/tech_logo/mongodb.png';
import javaLogo from './assets/tech_logo/java.png';
import gitLogo from './assets/tech_logo/git.png';
import githubLogo from './assets/tech_logo/github.png';
import vscodeLogo from './assets/tech_logo/vscode.png';
import postmanLogo from './assets/tech_logo/postman.png';

// Experience Section Logo's
import edunetLogo from './assets/company_logo/edunetlogo.png';
import OctanetLogo from './assets/company_logo/Octanet_logo.png';

// Education Section Logo's
import Anna_University_Logo from './assets/education_logo/Anna_University_Logo.png';
import MGS_Logo from './assets/education_logo/mgs.png';
import MGSLogo from './assets/education_logo/mgs.png';

// Project Section Logo's
import  E_HospitalLogo from './assets/work_logo/e-hospital.png';
import PokemonLogo from './assets/work_logo/Pokemon_Logo.png';
import ZomatoLogo from './assets/work_logo/zomato_Logo.png';
import Currency_ConverterLogo from './assets/work_logo/currency_Logo.png';
import HouseLogo from './assets/work_logo/house_Logo.png';
import BankLogo from './assets/work_logo/Bank_Logo.png';
import HospitalLogo from './assets/work_logo/hospital_Logo.png';


export const SkillsInfo = [
  {
    title: 'Frontend',
    skills: [
      { name: 'HTML', logo: htmlLogo },
      { name: 'CSS', logo: cssLogo },
      { name: 'JavaScript', logo: javascriptLogo },
      { name: 'React JS', logo: reactjsLogo },
      { name: 'Redux', logo: reduxLogo },
      { name: 'Tailwind CSS', logo: tailwindcssLogo },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node JS', logo: nodejsLogo },
      { name: 'Express JS', logo: expressjsLogo },
      { name: 'MySQL', logo: mysqlLogo },
      { name: 'MongoDB', logo: mongodbLogo },
    ],
  },
  {
    title: 'Languages',
    skills: [
      { name: 'Java', logo: javaLogo },
      { name: 'JavaScript', logo: javascriptLogo },
    ],
  },
  {
    title: 'Tools',
    skills: [
      { name: 'Git', logo: gitLogo },
      { name: 'GitHub', logo: githubLogo },
      { name: 'VS Code', logo: vscodeLogo },
      { name: 'Postman', logo: postmanLogo },
    ],
  },
];

  export const experiences = [
    {
      id: 0,
      img: edunetLogo,
      role: "Fullstack Web Development with MERN Internship",
      company: "edunet foundation",
      date: "February 2025 - March 2025",
      desc: "Developed and contributed to dynamic web applications using the MERN stack. Worked on both frontend and backend development, creating responsive user interfaces, integrating RESTful APIs, and improving performance. Collaborated in an agile environment, gaining practical experience in building scalable and user-friendly solutions.",
      skills: [
        "HTML",
        "CSS",
        "JavaScript",
        "React JS",
        "Node JS",
        "Express.Js",
        "Tailwind CSS",
        "MongoDb",
        "Redux",
      ],
    },
    {
      id: 1,
      img: OctanetLogo,
      role: "Web Development Internship",
      company: "TechOctanet Services PVT LTD",
      date: "May 2024 - July 2024",
      desc: "Assisted in developing innovative web projects during my internship, contributing to both frontend and backend tasks using HTML, CSS, JavaScript, MongoDB, and ReactJS. Collaborated with the team to build responsive, user-friendly web applications and gained hands-on experience in integrating technologies to enhance performance and user experience.",
      skills: [
        "HTML",
        "CSS",
        "JavaScript",
        "ReactJS",
        "Node.Js",        
        "MongoDB",
      ],
    },
  ];
  
  export const education = [
    {
      id: 0,
      img: Anna_University_Logo,
      school: "Anna University, Chennai",
      date: "Sept 2021 - May 2025",
      grade: "7.50 CGPA",
      desc: "I have completed my Bachelor of Engineering (BE) in Computer Science Engineering from Anna University, Chennai. Throughout my academic journey, I developed a solid foundation in programming, software development, and core computer science principles. I successfully completed coursework in Object-Oriented Programming, Database Management Systems, Web Development, and Software Engineering, which strengthened both my technical knowledge and problem-solving abilities. My education has equipped me with the skills, adaptability, and analytical mindset required to contribute effectively to dynamic and challenging technology-driven environments.",
      degree: "Bachelor of Engineering - BE",
    },
    {
      id: 1,
      img: MGS_Logo,
      school: "Mahatma Gandhi Smarak(+2) High School, Jhajha",
      date: "2019 - 2021",
      grade: "56.7%",
      desc: "I completed my Class 12 education at Mahatma Gandhi Smarak (+2) High School, Jhajha, under the BSEB board. My curriculum included Physics, Chemistry, Biology, Mathematics, English, and Hindi, which helped me build a strong academic foundation, develop analytical skills, and prepare for higher education in science.",
      degree: "BSEB(XII) - Science",
    },
    {
      id: 2,
      img: MGSLogo,
      school: "Mahatma Gandhi Smarak(+2) High School, Jhajha",
      date: "2018 - 2019",
      grade: "66%",
      desc: "I completed my Class 10 from Mahatma Gandhi Smarak (+2) High School, Jhajha, under the BSEB board. I studied Mathematics, Science, Social Science, English, Hindi, and Sanskrit, which gave me a good basic knowledge and prepared me for higher studies.",
      degree: "BSEB(X)",
    },
  ];
  
  export const projects = [
    {
      id: 0,
      title: "E-Hospital Management System",
      description:
"        A web-based E-Hospital Management System using the MERN stack streamlines hospital operations, managing patients, appointments, staff, and medical history. It ensures secure data handling, responsive design, and smooth navigation to enhance efficiency and improve overall patient care.",
      image: E_HospitalLogo,
      tags: ["HTML", "CSS", "JavaScript", "React JS", "Node.Js", "Express.Js","MongoDB", "API"],
      github: "https://github.com/CHUNCHUNKUMARSINGH9693/E-Hospital-Management-System",
    },
    {
      id: 1,
      title: "Pokemon",
      description:
         "A React-based Pokémon project featuring dynamic search, interactive cards, and responsive design. Styled with CSS for a clean, engaging UI, it showcases Pokémon details, abilities, and evolutions with smooth animations and filtering.",
      image: PokemonLogo,
      tags: ["React JS","CSS", "API"],
      github: "//github.com/CHUNCHUNKUMARSINGH9693/Pokemon",
    },
    {
      id: 2,
      title: "Zomato-Clone",
      description:
         "A Full Stack Web Development-based Zomato Clone web app enabling users to explore restaurants, browse menus, place online food orders, and write reviews. It ensures secure authentication, responsive design, real-time updates, and smooth navigation, enhancing user experience in online food delivery.",
      image: ZomatoLogo,
      tags: ["React JS", "API", "HTML", "CSS", "JavaScript0", "Node.Js", "Express.Js", "MongoDB"],
      github: "https://github.com/CHUNCHUNKUMARSINGH9693/Edunet-Zomoto-Clone",
    },
    {
      id: 3,
      title: "House Rent App",
      description:
         "A MERN-based House Rent application where users can list, search, and manage rental properties with secure authentication, advanced filters, real-time updates, and responsive design for an efficient rental experience.",
      image: HouseLogo,
      tags: ["React JS", "CSS", "Node.js", "NPM", "Express.Js", "MongoDB"],
      github: "https://github.com/CHUNCHUNKUMARSINGH9693/houserentapp-naan-mudhalvan-main",
    },
    {
      id: 4,
      title: "Currency Converter",
      description:
         "A web-based Currency Converter built with HTML, CSS, and JavaScript, integrating an external API to provide real-time exchange rates with responsive design, user-friendly interface, and accurate multi-currency conversions.", 
      image: Currency_ConverterLogo,
      tags: ["JavaScript", "HTML", "CSS", "API"],
      github: "https://github.com/CHUNCHUNKUMARSINGH9693/CurrencyConverter",
    },
    {
      id: 5,
      title: "Banking Management System",
      description:
         "A Java-based Banking Management System using SQL and JDBC to manage accounts, deposits, withdrawals, transfers, and statements with secure authentication, real-time processing, robust database integration, and efficient transaction handling.",
      image: BankLogo,
      tags: ["Java", "SQL", "JDBC"],
      github: "https://github.com/CHUNCHUNKUMARSINGH9693/Java-Project/blob/main/BankingManagementSystem.zip",
    },
    {
      id: 6,
      title: "Hospital Management System",
      description:
       "A Java-based Hospital Management System using SQL and JDBC to manage patient records, doctor details, appointments, billing, and staff information with secure authentication, real-time updates, efficient database integration, and smooth hospital operations.",
      image: HospitalLogo,
      tags: ["Java", "SQL", "JDBC"],
      github: "https://github.com/CHUNCHUNKUMARSINGH9693/Java-Project/blob/main/Hospital%20Management%20System.zip",
    },
  ];  