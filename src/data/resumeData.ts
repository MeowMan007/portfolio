export const resumeData = {
  name: "Arshal Saifi",
  role: "Full-Stack Developer & GenAI Engineer",
  location: "Greater Noida, India",
  phone: "+91 8630811634",
  email: "arshal.real@outlook.com",
  linkedin: "https://linkedin.com/in/arshalsaifi",
  github: "https://github.com/MeowMan007",
  leetcode: "https://leetcode.com/MeowMan007",
  summary:
    "Full-Stack Developer and GenAI Engineer with hands-on experience building robust React.js/FastAPI applications and sophisticated agentic AI systems using LangChain, LangGraph, and PydanticAI. Shipped 4+ complex end-to-end projects and automated enterprise workflows.",
  education: [
    {
      institution: "Noida Institute of Engineering & Technology",
      location: "Greater Noida",
      duration: "2022–2026",
      degree: "B.Tech — Computer Science (AI & ML)",
      score: "CGPA: 7.29 / 10",
      details:
        "Data Structures & Algorithms, Machine Learning, Deep Learning, DBMS, Operating Systems, Agentic AI Systems",
    },
    {
      institution: "Dewan Public School",
      location: "Hapur",
      duration: "2021–2022",
      degree: "Class XII (CBSE)",
      score: "Percentage: 71%",
    },
  ],
  experience: [
    {
      role: "AI & Python Automation Engineer Intern",
      company: "Sparkx Automations",
      duration: "Oct 2025 – Mar 2026",
      description:
        "Built Python ETL scripts (Pandas, NumPy) to automate manual data workflows, cutting reporting turnaround times from 2 days to under an hour. Exposed FastAPI endpoints to trigger background tasks. Developed a LangChain-based lead classifier for unstructured emails (50% sorting efficiency gain) and refactored legacy production scripts.",
    },
  ],
  projects: [
    {
      title: "Placidus AI",
      subtitle: "Astrology Birth Chart Calculator & AI Astrologer Counselor",
      techStack: ["Python", "FastAPI", "React", "Hugging Face API", "SVG Engine"],
      github: "https://github.com/MeowMan007/Placidus_ai",
      description:
        "A modern, Astro-Seek inspired Astrology Birth Chart Calculator & AI Astrologer Counselor built on Demetra George's 'Astrology and the Authentic Self: Integrating Traditional and Modern Astrology to Uncover the Essence of the Birth Chart'.\n\nKey Features:\n• High-Precision Birth Chart Engine: Calculates planetary tropical longitudes, zodiac signs, Placidus house cusps, and aspect matrix.\n• Dynamic Interactive SVG Wheel: Astro-Seek style interactive chart wheel visualizer showing houses, planets, signs, and Ascendant/Descendant axes.\n• Demetra George Astrological Agent: System prompt injected with Demetra George's authentic self philosophy, sect analysis (diurnal vs nocturnal), chart lord, essential dignities, and Sun/Moon synthesis.\n• Hugging Face API Integration: Supports custom Hugging Face model keys (Qwen/Qwen2.5-72B-Instruct, Mistral-7B, Llama-3) or built-in Demetra George interpretation engine.",
      color: "yellow",
    },
    {
      title: "AccessLens",
      subtitle: "AI-Powered Accessibility Audit Tool",
      techStack: ["React", "FastAPI", "Python", "PyTorch", "ViT", "Docker"],
      github: "https://github.com/MeowMan007/Accesslens",
      description:
        "A web accessibility auditor combining WCAG 2.1 rule-based checks with a custom-trained Vision Transformer (ViT-B/16), catching visual failures that typical rule-engines overlook. Features a FastAPI backend with Selenium captures, Grad-CAM explainability, SQLite reports, and containerized Docker scaling.",
      color: "blue",
    },
    {
      title: "Dental Booking Agent",
      subtitle: "AI Scheduling Agent via Pydantic AI",
      techStack: ["React.js", "Vite", "FastAPI", "PydanticAI", "LangGraph"],
      github: "https://github.com/MeowMan007/dental-booking-made-with-pydantic-ai",
      description:
        "An intelligent scheduling software using React + Vite on the client side with a real-time conversational booking UI and custom hooks, streaming backend responses over REST. Orchestrated with a PydanticAI multi-agent workflow that interprets natural language, resolves slots, and updates Google Calendars dynamically.",
      color: "pink",
    },
    {
      title: "AI Resume Analyzer",
      subtitle: "Client-Side ATS Scoring Tool",
      techStack: ["React.js", "Vite", "LangChain", "Ollama", "Local LLM"],
      github: "https://github.com/MeowMan007/Ai-resume-analyser",
      description:
        "A client-side Single Page Application leveraging React.js with drag-and-drop PDF upload and structured JSON feedback. Utilizes LangChain to analyze ATS keyword density in-browser using a local privacy-first Ollama LLM, with prompt tuning achieving a 35% increase in structured output accuracy.",
      color: "green",
    },
  ],
  certifications: [
    "14+ Tech Certifications — GenAI, Production RAG Pipelines, and LLM Systems (IBM, DeepLearning.AI, Coursera)",
    "400+ Problems Solved — LeetCode, Codeforces, and HackerRank",
    "Collegiate Competitive Programming — Top 10% Rank",
  ],
  skills: [
    {
      category: "Languages",
      items: ["Python", "TypeScript", "JavaScript", "C/C++", "SQL", "HTML5", "CSS3"],
      color: "green",
    },
    {
      category: "Frontend & UI",
      items: ["React.js", "Next.js", "Vite", "Tailwind CSS", "Framer Motion", "REST APIs"],
      color: "blue",
    },
    {
      category: "Backend & GenAI",
      items: [
        "FastAPI",
        "LangChain",
        "LangGraph",
        "PydanticAI",
        "PyTorch",
        "Ollama",
        "Hugging Face API",
        "ETL Pipelines",
      ],
      color: "pink",
    },
    {
      category: "Databases & Infra",
      items: [
        "PostgreSQL",
        "SQLite",
        "Docker",
        "Git",
        "GitHub",
        "Vercel",
        "Pandas",
        "NumPy",
      ],
      color: "yellow",
    },
  ],
};
