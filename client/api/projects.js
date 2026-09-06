export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const data = [
    {
      id: 1,
      title: "AI-Powered E-Commerce Platform",
      slug: "ai-powered-ecommerce-platform",
      description: "A flagship full-stack shopping portal with user authorization, custom product inventory grids, and an interactive AI Shopping Assistant to guide user queries.",
      image: "ecommerce.png",
      technologies: ["React", "Axios", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "JWT", "Gemini AI"],
      features: [
        "User registration & Login",
        "JWT authentication & Role-based panels",
        "Shopping cart state & checkout flow",
        "Product category searches & filters",
        "AI Shopping Assistant chatbot in real-time"
      ],
      github_url: "https://github.com/CHUNCHUNKUMARSINGH9693/ecommerce",
      live_url: "https://my-portfolio-chunchun.vercel.app",
      featured: 1
    },
    {
      id: 2,
      title: "AI-Assisted Hospital Management System",
      slug: "ai-assisted-hospital-management",
      description: "A secure, role-based dashboard application for managing patient registrations, doctor logs, appointments, and general query navigation.",
      image: "hospital.jpg",
      technologies: ["React", "Axios", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "Gemini AI"],
      features: [
        "Patient registration & records management",
        "Doctor shifts & appointment booking",
        "General AI Assistant for navigation & FAQ help (no medical diagnoses)",
        "Protected admin dashboard panels",
        "Prescription and pharmacy status records"
      ],
      github_url: "https://github.com/CHUNCHUNKUMARSINGH9693/E-Hospital-Management-System",
      live_url: "https://my-portfolio-chunchun.vercel.app",
      featured: 1
    },
    {
      id: 3,
      title: "Zomato Clone",
      slug: "food-discovery-ordering-platform",
      description: "A dynamic restaurant catalog showing food menu classifications, cart storage, order tracking, and restaurant review feeds.",
      image: "zomato.png",
      technologies: ["React", "Axios", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "HTML"],
      features: [
        "Interactive restaurant layout & search listing",
        "Menu item filters & categories",
        "Persistent cart management using React Context",
        "Mock checkout & order tracking system",
        "Node.js REST API with full endpoints"
      ],
      github_url: "https://github.com/CHUNCHUNKUMARSINGH9693/Edunet-Zomoto-Clone",
      live_url: "https://zomoto-clone-weld.vercel.app/",
      featured: 0
    }
  ];

  return res.status(200).json({
    success: true,
    count: data.length,
    data
  });
}
