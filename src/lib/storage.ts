// Local storage manager for admin data
const STORAGE_KEYS = {
  HERO: 'admin_hero_content',
  ABOUT: 'admin_about_content',
  CONTACT: 'admin_contact_info',
  PROJECTS: 'admin_projects',
  TECHNOLOGIES: 'admin_technologies',
  AUTH: 'admin_auth',
};

// Admin credentials
export const ADMIN_CREDENTIALS = {
  email: 'syaagalib@gmail.com',
  password: 'Galib00.00',
};

// Helper to get data from localStorage
export const getStorageData = <T>(key: string, defaultValue: T): T => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
};

// Helper to set data in localStorage
export const setStorageData = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Auth functions
export const adminLogin = (email: string, password: string): boolean => {
  if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
    localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
    return true;
  }
  return false;
};

export const adminLogout = (): void => {
  localStorage.removeItem(STORAGE_KEYS.AUTH);
};

export const isAdminAuthenticated = (): boolean => {
  return localStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
};

// Hero content
export const getHeroContent = () => {
  return getStorageData(STORAGE_KEYS.HERO, {
    title: 'intelleeo',
    tagline: 'Build Smart. Build Human.',
    subtext: 'AI Software Studio',
    cta_primary_text: 'View Our Work',
    cta_secondary_text: 'Contact Us',
  });
};

export const saveHeroContent = (data: any) => {
  setStorageData(STORAGE_KEYS.HERO, data);
};

// About content
export const getAboutContent = () => {
  return getStorageData(STORAGE_KEYS.ABOUT, {
    mission: 'To bridge the gap between cutting-edge AI technology and human needs, creating intelligent solutions that enhance productivity, creativity, and quality of life while maintaining the human touch that makes technology meaningful.',
    vision: "We're not just another development studio. We're AI pioneers crafting the future of human-computer interaction.",
    stats: [
      { label: 'Projects Completed', value: '50+' },
      { label: 'Happy Clients', value: '25+' },
      { label: 'Years of Experience', value: '5+' },
      { label: 'Technologies Mastered', value: '30+' }
    ],
    values: [
      {
        title: 'Intelligence First',
        description: 'We believe AI should augment human capabilities, not replace them. Every solution we build is designed to make people more effective and empowered.'
      },
      {
        title: 'Human-Centered',
        description: 'Technology should serve humanity. We prioritize user experience, accessibility, and ethical considerations in every project we undertake.'
      },
      {
        title: 'Innovation',
        description: "We stay at the forefront of technological advancement, constantly exploring new possibilities and pushing the boundaries of what's possible."
      },
      {
        title: 'Collaboration',
        description: 'The best solutions emerge from diverse perspectives. We work closely with our clients as partners in the creative process.'
      }
    ]
  });
};

export const saveAboutContent = (data: any) => {
  setStorageData(STORAGE_KEYS.ABOUT, data);
};

// Contact info
export const getContactInfo = () => {
  return getStorageData(STORAGE_KEYS.CONTACT, {
    email: 'intelleeo.inteligence@gmail.com',
    phone: '+880 1946 303020',
    address: 'Khulna, Bangladesh',
    response_time: 'Within 24 hours',
    linkedin: '',
    github: '',
    twitter: '',
  });
};

export const saveContactInfo = (data: any) => {
  setStorageData(STORAGE_KEYS.CONTACT, data);
};

// Projects
export const getProjects = () => {
  return getStorageData(STORAGE_KEYS.PROJECTS, [
    {
      id: '1',
      slug: 'ai-content-optimizer',
      title: 'AI Content Optimizer',
      subtitle: 'Smart content enhancement platform',
      description: 'An intelligent content optimization platform that uses advanced NLP to analyze, enhance, and personalize content for maximum engagement.',
      problem: 'Content creators struggle to optimize their content for different audiences and platforms, leading to reduced engagement and reach.',
      solution: 'Built an AI-powered platform that analyzes content sentiment, readability, and engagement potential, then provides actionable recommendations for improvement.',
      role: 'Full-Stack Developer & AI Engineer',
      timeline: '3 months',
      tech_stack: ['React', 'Node.js', 'OpenAI GPT-4', 'MongoDB', 'TailwindCSS'],
      tags: ['AI', 'Web', 'Client'],
      screenshot: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=1200&fit=crop',
      live_link: 'https://ai-content-optimizer.demo',
      source_code: 'https://github.com/intelleeo/ai-content-optimizer',
      ai_highlight: 'Custom RAG model with OpenAI for personalized content recommendations'
    },
    {
      id: '2',
      slug: 'hotel-management-system',
      title: 'Hotel Management System',
      subtitle: 'Real-time business intelligence platform',
      description: 'A comprehensive analytics dashboard that transforms complex data into actionable insights using machine learning algorithms.',
      problem: 'Businesses needed a way to visualize and understand their data without requiring technical expertise.',
      solution: 'Created an intuitive dashboard with AI-powered insights, automated reporting, and predictive analytics capabilities.',
      role: 'Lead Developer',
      timeline: '4 months',
      tech_stack: ['MongoDB', 'Express.js', 'React', 'Node.js', 'Vite', 'Chart.js', 'OpenAI'],
      tags: ['AI', 'Web', 'Client'],
      screenshot: '/uploads/DevNest/HOTELS/admin.png',
      images: [
        '/uploads/DevNest/HOTELS/a2.png',
        '/uploads/DevNest/HOTELS/a3.png',
        '/uploads/DevNest/HOTELS/a4.png',
        '/uploads/DevNest/HOTELS/a5.png',
        '/uploads/DevNest/HOTELS/a6.png',
        '/uploads/DevNest/HOTELS/a7.png',
        '/uploads/DevNest/HOTELS/a8.png',
        '/uploads/DevNest/HOTELS/a9.png',
        '/uploads/DevNest/HOTELS/h.png',
        '/uploads/DevNest/HOTELS/h0.png',
        '/uploads/DevNest/HOTELS/h1.png',
        '/uploads/DevNest/HOTELS/h2.png',
        '/uploads/DevNest/HOTELS/h3.png',
        '/uploads/DevNest/HOTELS/h4.png',
        '/uploads/DevNest/HOTELS/h5.png',
        '/uploads/DevNest/HOTELS/h6.png',
        '/uploads/DevNest/HOTELS/h7.png',
        '/uploads/DevNest/HOTELS/h8.png',
        '/uploads/DevNest/HOTELS/h9.png',
        '/uploads/DevNest/HOTELS/h10.png',
        '/uploads/DevNest/HOTELS/h11.png',
        '/uploads/DevNest/HOTELS/h12.png',
        '/uploads/DevNest/HOTELS/h13.png',
        '/uploads/DevNest/HOTELS/h14.png',
        '/uploads/DevNest/HOTELS/h15.png',
      ],
      ai_highlight: 'Ai-powered predictive analytics for occupancy and revenue forecasting'
    },
    {
      id: '3',
      slug: 'citizen-lab-hospital',
      title: 'Citizen Lab Hospital',
      subtitle: 'Hospital management system',
      description: 'A comprehensive hospital management system that streamlines patient records, appointments, billing, and staff management.',
      problem: 'Hospitals needed an efficient way to manage patient data and streamline operations.',
      solution: 'Developed a system that automates patient record management, appointment scheduling, and billing processes.',
      role: 'Full-Stack Developer',
      timeline: '6 months',
      tech_stack: ['React', 'Laravel', 'MySQL', 'Redis', 'Docker'],
      tags: ['Web', 'Client'],
      screenshot: '/uploads/DevNest/citizen-lab.jpg',
      live_link: 'https://www.citizenlabbd.com'
    },
    {
      id: '4',
      slug: 'mariyam-traders',
      title: 'E-commerce Mariyam Traders',
      subtitle: 'An E-commerce for local variety store in Khulna, Bangladesh',
      description: 'Production e-commerce platform built for Mariyam Traders — a local variety store in Khulna. Supports catalog & inventory management, point-of-sale sync, localized checkout (cash-on-delivery and local payment gateways), order tracking, delivery zone management, and a compact admin dashboard for day-to-day operations.',
      problem: 'Local retailers lacked an easy-to-manage online storefront tailored to local payment methods, delivery constraints, and low-bandwidth mobile customers.',
      solution: 'Delivered a mobile-first, production-ready storefront with real-time inventory synchronization to the in-store POS, localized payment options, flexible delivery and pickup workflows, automated order notifications, and an admin panel for product, order, and promotion management. Deployed with CI/CD, monitoring, backups and performance optimizations to ensure reliable production usage.',
      role: 'Full-Stack Developer',
      timeline: '6 months',
      tech_stack: ['React', 'Laravel', 'MySQL', 'Tailwind', 'Payment API', 'VPS Hosting'],
      tags: ['Web', 'Client'],
      screenshot: '/uploads/DevNest/mariyamtraders.jpg',
      images: [
        'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=800&h=600&fit=crop'
      ],
      live_link: 'http://mariyamtraders.com',
      ai_highlight: 'Real-time inventory sync, smart product recommendations, and optimized mobile UX for low-bandwidth environments'
    },
    {
      id: '5',
      slug: 'auto-glide-hub',
      title: 'Auto Glide Hub',
      subtitle: 'Car marketplace & finance management system',
      description: 'A unified car selling showcase and financing platform that lets buyers browse stock, calculate payments, place orders for specific models, and verify auction provenance — all with quick financing options.',
      problem: 'Buyers face fragmented experiences when shopping for cars and financing: unclear rates, slow approvals, no integrated payment tools, and limited auction verification.',
      solution: 'Built Auto Glide Hub — a web platform combining a searchable stock catalogue, per-model ordering, an integrated payment & loan calculator, and auction verification. Features include competitive rates starting from 4.99% APR for qualified buyers, flexible terms from 12 to 84 months, and pre-approval within 24–48 hours. The platform also provides real-time stock availability, model configurators, and auction provenance checks powered by automated verification workflows.',
      role: 'Full-Stack Engineer',
      timeline: '4 months',
      tech_stack: ['React', 'TypeScript', 'Docker', 'Kubernetes', 'OpenAI Codex'],
      tags: ['AI', 'Web', 'Open Source'],
      screenshot: '/uploads/DevNest/auto-glide-hub.jpg',
      live_link: 'https://auto-glide-hub.vercel.app',
      source_code: 'https://github.com/intelleeo/auto-glide-hub',
      ai_highlight: 'GPT-powered automated conversational agents for customer support'
    },
    {
      id: '6',
      slug: 'global-chronicle-news',
      title: 'Global Chronicle News',
      subtitle: 'AI-first newsroom and personalization engine',
      description: 'An AI-driven news platform that ingests, verifies, summarizes, and personalizes breaking news in real time for readers and editors.',
      problem: 'Newsrooms struggle to curate trustworthy, multilingual content at speed while delivering personalized experiences that increase retention.',
      solution: 'Built Global Chronicle — a news aggregation and editorial platform that uses LLMs for headline generation, summarization, sentiment analysis, multilingual translation, and bias detection. Editors approve or edit AI-suggested content in a central dashboard. Readers see personalized feeds based on interests, reading history, and trending topics. The platform monitors live news sources, performs fact-checking via external APIs, and auto-publishes verified articles with minimal latency.',
      role: 'AI & Platform Engineer',
      timeline: '5 months',
      tech_stack: ['React', 'Python', 'FastAPI', 'PostgreSQL', 'Redis', 'OpenAI', 'LangChain'],
      tags: ['AI', 'Web'],
      screenshot: '/uploads/DevNest/globalcronicle.png',
      live_link: 'https://global-chronicle-news.vercel.app',
      ai_highlight: 'Real-time AI fact-checking, multilingual translation, and personalized content recommendations'
    }
  ]);
};

export const saveProjects = (projects: any[]) => {
  setStorageData(STORAGE_KEYS.PROJECTS, projects);
};

// Technologies
export const getTechnologies = () => {
  return getStorageData(STORAGE_KEYS.TECHNOLOGIES, [
    // Frontend
    { id: '1', name: 'React', category: 'Frontend', icon: '⚛️', color: '#61DAFB' },
    { id: '2', name: 'Vue.js', category: 'Frontend', icon: '🟢', color: '#4FC08D' },
    { id: '3', name: 'Next.js', category: 'Frontend', icon: '▲', color: '#000000' },
    { id: '4', name: 'TypeScript', category: 'Frontend', icon: '📘', color: '#3178C6' },
    { id: '5', name: 'TailwindCSS', category: 'Frontend', icon: '🎨', color: '#06B6D4' },
    
    // Backend
    { id: '6', name: 'Node.js', category: 'Backend', icon: '🟢', color: '#339933' },
    { id: '7', name: 'Python', category: 'Backend', icon: '🐍', color: '#3776AB' },
    { id: '8', name: 'Laravel', category: 'Backend', icon: '🚀', color: '#FF2D20' },
    { id: '9', name: 'Express.js', category: 'Backend', icon: '⚡', color: '#000000' },
    
    // AI/ML
    { id: '10', name: 'OpenAI', category: 'AI/ML', icon: '🤖', color: '#412991' },
    { id: '11', name: 'TensorFlow', category: 'AI/ML', icon: '🧠', color: '#FF6F00' },
    { id: '12', name: 'PyTorch', category: 'AI/ML', icon: '🔥', color: '#EE4C2C' },
    { id: '13', name: 'Hugging Face', category: 'AI/ML', icon: '🤗', color: '#FFD21E' },
    { id: '14', name: 'LangChain', category: 'AI/ML', icon: '⛓️', color: '#1C3C3C' },
    
    // Mobile
    { id: '15', name: 'React Native', category: 'Mobile', icon: '📱', color: '#61DAFB' },
    { id: '16', name: 'Expo', category: 'Mobile', icon: '🚀', color: '#000020' },
    { id: '17', name: 'Flutter', category: 'Mobile', icon: '💙', color: '#02569B' },
    
    // Database
    { id: '18', name: 'MongoDB', category: 'Database', icon: '🍃', color: '#47A248' },
    { id: '19', name: 'PostgreSQL', category: 'Database', icon: '🐘', color: '#336791' },
    { id: '20', name: 'Redis', category: 'Database', icon: '🔴', color: '#DC382D' },
    { id: '21', name: 'Firebase', category: 'Database', icon: '🔥', color: '#FFCA28' },
    
    // Tools
    { id: '22', name: 'Docker', category: 'Tools', icon: '🐳', color: '#2496ED' },
    { id: '23', name: 'Kubernetes', category: 'Tools', icon: '☸️', color: '#326CE5' },
    { id: '24', name: 'AWS', category: 'Tools', icon: '☁️', color: '#FF9900' },
    { id: '25', name: 'Vercel', category: 'Tools', icon: '▲', color: '#000000' },
    { id: '26', name: 'GitHub', category: 'Tools', icon: '🐙', color: '#181717' }
  ]);
};

export const saveTechnologies = (technologies: any[]) => {
  setStorageData(STORAGE_KEYS.TECHNOLOGIES, technologies);
};
