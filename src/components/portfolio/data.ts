// ─── SHARED PORTFOLIO DATA ────────────────────────────────────────────────────
// Single source of truth — used by both light/dark modes AND cyber mode

export const OWNER = {
  name: 'Vivek Bukka',
  firstName: 'Vivek',
  lastName: 'Bukka',
  role: 'Cybersecurity Student & Full-Stack Developer',
  tagline: 'Building secure & intelligent systems',
  email: 'vivek@example.com',
  github: 'github.com/vivekbukka',
  linkedin: 'linkedin.com/in/vivekbukka',
  hackthebox: 'hackthebox.com/vivekbukka',
  photoSrc: '', // e.g. '/profile.jpg'
  resumeSrc: '', // e.g. '/resume.pdf' — set this to your PDF path or URL
}

export const HERO_ROLES = [
  'Full-Stack Developer',
  'Cybersecurity Researcher',
  'AI Agentic Coder',
  'Open-Source Builder',
  'Security Engineer',
]

export const ABOUT_STATS = [
  { value: '3+', label: 'Years Building', colorKey: 'violet' as const },
  { value: '15+', label: 'Projects Shipped', colorKey: 'cyan' as const },
  { value: '5+', label: 'Certifications', colorKey: 'emerald' as const },
  { value: '3.87', label: 'GPA / 4.0', colorKey: 'rose' as const },
]

export const ABOUT_TRAITS = [
  { label: 'Full-Stack Development', colorKey: 'violet' as const },
  { label: 'Cybersecurity & Pentesting', colorKey: 'rose' as const },
  { label: 'AI & Agentic Systems', colorKey: 'emerald' as const },
  { label: 'Cloud Architecture', colorKey: 'cyan' as const },
]

export interface Project {
  id: number
  title: string
  codename: string
  number: string
  emoji: string
  tagline: string
  description: string
  tech: string[]
  category: string
  year: string
  highlights: string[]
  github?: string
  live?: string
  accentKey: 'rose' | 'violet' | 'emerald' | 'amber' | 'cyan'
  cyberType: string
  cyberColor: string
  cyberStatus: string
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'VulnScan AI',
    codename: 'VULNSCAN_AI',
    number: '01',
    emoji: '🛡️',
    tagline: 'Automated vulnerability scanner powered by LLM analysis',
    description:
      'An intelligent vulnerability scanner combining NMAP/Nessus output with GPT-4 analysis to generate human-readable risk reports with prioritized remediation steps. Built for SOC teams, reducing report time by 80%.',
    tech: ['Python', 'FastAPI', 'OpenAI API', 'React', 'PostgreSQL'],
    category: 'Security Tool',
    year: '2024',
    accentKey: 'rose',
    cyberType: 'OFFENSIVE',
    cyberColor: '#ff0040',
    cyberStatus: 'DEPLOYED',
    highlights: [
      'Reduced report generation time by 80%',
      'Integrated with 12+ scanning tools',
      'Used by 3 companies in beta testing',
    ],
    github: '#',
    live: '#',
  },
  {
    id: 2,
    title: 'CipherVault',
    codename: 'CIPHER_VAULT',
    number: '02',
    emoji: '🔐',
    tagline: 'End-to-end encrypted password manager — zero knowledge',
    description:
      'A zero-knowledge password manager using AES-256 encryption and Argon2 key derivation. Features browser extension, CLI, and web dashboard with cross-device sync.',
    tech: ['TypeScript', 'Next.js', 'Rust', 'WebCrypto API', 'Supabase'],
    category: 'Web App',
    year: '2024',
    accentKey: 'violet',
    cyberType: 'DEFENSIVE',
    cyberColor: '#00ff41',
    cyberStatus: 'ACTIVE',
    highlights: [
      'Zero-knowledge architecture',
      'Browser extension with autofill',
      '2FA and biometric unlock support',
    ],
    github: '#',
    live: '#',
  },
  {
    id: 3,
    title: 'AgentForge',
    codename: 'AGENT_FORGE',
    number: '03',
    emoji: '🤖',
    tagline: 'Visual builder for AI agentic workflows',
    description:
      'A drag-and-drop interface for building LLM-powered automation agents. Chain tools, APIs, and logic nodes without code. Supports OpenAI, Anthropic, and local models.',
    tech: ['React', 'TypeScript', 'LangChain', 'Node.js', 'Docker'],
    category: 'AI Platform',
    year: '2024',
    accentKey: 'emerald',
    cyberType: 'AI_OPS',
    cyberColor: '#00ffff',
    cyberStatus: 'DEPLOYED',
    highlights: [
      'Visual node-based workflow builder',
      'Multi-LLM provider support',
      '50+ pre-built tool integrations',
    ],
    github: '#',
    live: '#',
  },
  {
    id: 4,
    title: 'NetGhost',
    codename: 'NET_GHOST',
    number: '04',
    emoji: '👻',
    tagline: 'Real-time network anomaly detection system',
    description:
      'Real-time packet capture and ML-based anomaly detection. Visualizes traffic patterns, flags suspicious connections, and generates Wireshark-compatible exports.',
    tech: ['Python', 'Scapy', 'scikit-learn', 'React', 'WebSockets'],
    category: 'Security Tool',
    year: '2023',
    accentKey: 'amber',
    cyberType: 'SURVEILLANCE',
    cyberColor: '#ffcc00',
    cyberStatus: 'ACTIVE',
    highlights: [
      'Real-time anomaly detection',
      'Runs on edge hardware (RPi)',
      'Detected 3 novel attack patterns',
    ],
    github: '#',
  },
  {
    id: 5,
    title: 'CTF Toolkit',
    codename: 'CTF_TOOLKIT',
    number: '05',
    emoji: '🏴',
    tagline: 'All-in-one Capture The Flag competition helper',
    description:
      'A comprehensive toolkit for CTF competitions combining exploitation scripts, cryptography helpers, steganography tools, and automated recon pipelines.',
    tech: ['Python', 'Bash', 'Go', 'pwntools', 'Docker'],
    category: 'Security Tool',
    year: '2023',
    accentKey: 'violet',
    cyberType: 'OFFENSIVE',
    cyberColor: '#ff7700',
    cyberStatus: 'MAINTAINED',
    highlights: [
      'Used in 20+ CTF competitions',
      'Top 100 team ranking on CTFTime',
      '200+ GitHub stars',
    ],
    github: '#',
  },
  {
    id: 6,
    title: 'SecureAPI',
    codename: 'SECURE_API',
    number: '06',
    emoji: '🔒',
    tagline: 'Zero-trust API gateway with intelligent threat scoring',
    description:
      'A reverse proxy API gateway implementing zero-trust principles. Features JWT validation, rate limiting, IP reputation scoring, and behavioral anomaly detection.',
    tech: ['Go', 'Redis', 'PostgreSQL', 'Docker', 'Kubernetes'],
    category: 'Infrastructure',
    year: '2023',
    accentKey: 'cyan',
    cyberType: 'DEFENSIVE',
    cyberColor: '#39ff14',
    cyberStatus: 'PRODUCTION',
    highlights: [
      'Sub-1ms overhead per request',
      'Zero-trust architecture',
      'OWASP Top 10 protection built-in',
    ],
    github: '#',
  },
]

export interface SkillCategory {
  id: string
  title: string
  subtitle: string
  skills: { name: string; level: number; tag?: string }[]
  accentKey: 'rose' | 'violet' | 'emerald' | 'cyan' | 'amber'
  icon: string
  description: string
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'cybersec',
    title: 'Cybersecurity',
    subtitle: 'Offense & Defense',
    accentKey: 'rose',
    icon: '🛡️',
    description:
      'From penetration testing to malware analysis, building security-first instincts.',
    skills: [
      { name: 'Penetration Testing', level: 85, tag: 'Core' },
      { name: 'Network Security', level: 80, tag: 'Core' },
      { name: 'OSINT & Recon', level: 82 },
      { name: 'Vulnerability Assessment', level: 78 },
      { name: 'CTF Challenges', level: 88, tag: 'Competitive' },
      { name: 'Malware Analysis', level: 65 },
      { name: 'Cryptography', level: 74 },
      { name: 'Incident Response', level: 70 },
    ],
  },
  {
    id: 'fullstack',
    title: 'Full-Stack',
    subtitle: 'Web & App Dev',
    accentKey: 'violet',
    icon: '⚡',
    description:
      'Crafting end-to-end digital products with modern frameworks and clean architecture.',
    skills: [
      { name: 'React / Next.js', level: 90, tag: 'Expert' },
      { name: 'TypeScript', level: 88, tag: 'Expert' },
      { name: 'Node.js / Express', level: 85, tag: 'Core' },
      { name: 'Python', level: 87, tag: 'Core' },
      { name: 'PostgreSQL / MongoDB', level: 80 },
      { name: 'Docker / K8s', level: 72 },
      { name: 'Tailwind CSS', level: 93, tag: 'Expert' },
      { name: 'GraphQL', level: 68 },
    ],
  },
  {
    id: 'ai',
    title: 'AI & Agents',
    subtitle: 'Automation & Intelligence',
    accentKey: 'emerald',
    icon: '🤖',
    description:
      'Building agentic systems, RAG pipelines, and LLM-powered tools that actually ship.',
    skills: [
      { name: 'LLM Integration', level: 85, tag: 'Core' },
      { name: 'Agentic Coding', level: 83, tag: 'Speciality' },
      { name: 'Prompt Engineering', level: 90, tag: 'Expert' },
      { name: 'LangChain / LlamaIndex', level: 78 },
      { name: 'RAG Systems', level: 75 },
      { name: 'ML / PyTorch', level: 65 },
      { name: 'Vector Databases', level: 72 },
      { name: 'OpenAI / Anthropic APIs', level: 88 },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Infra',
    subtitle: 'Platforms & Cloud',
    accentKey: 'cyan',
    icon: '🔧',
    description:
      'The toolchain behind reliable, scalable deployments across cloud and local envs.',
    skills: [
      { name: 'Git / GitHub Actions', level: 92, tag: 'Daily' },
      { name: 'AWS / GCP', level: 74 },
      { name: 'Burp Suite', level: 82, tag: 'Core' },
      { name: 'Kali Linux', level: 88 },
      { name: 'Metasploit', level: 78 },
      { name: 'Wireshark / Nmap', level: 85, tag: 'Core' },
      { name: 'Linux Administration', level: 83 },
      { name: 'Terraform', level: 62 },
    ],
  },
]

export interface EducationLevel {
  id: string
  level: string
  institution: string
  board: string
  period: string
  grade: string
  gradeLabel: string
  description: string
  highlights: string[]
  accentKey: 'violet' | 'emerald' | 'cyan' | 'amber' | 'rose'
  icon: string
  status: 'completed' | 'current'
}

export const EDUCATION_TIMELINE: EducationLevel[] = [
  {
    id: 'school',
    level: 'Secondary Education',
    institution: 'Your School Name',
    board: 'CBSE / State Board · Class 1 – 10',
    period: '2011 – 2021',
    grade: '92%',
    gradeLabel: 'Overall Score',
    description:
      'Built a strong foundation in Mathematics, Science, and Computer Science. Developed early interest in programming and logical reasoning through school-level competitions.',
    highlights: [
      'Math Olympiad Participant',
      'Science Fair Winner',
      'Class Representative',
      'Computer Club Lead',
    ],
    accentKey: 'emerald',
    icon: '📚',
    status: 'completed',
  },
  {
    id: 'intermediate',
    level: 'Higher Secondary',
    institution: 'Your College / School Name',
    board: 'CBSE / State Board · Class 11 – 12 · PCM + CS',
    period: '2021 – 2023',
    grade: '88%',
    gradeLabel: 'Board Score',
    description:
      'Specialized in Physics, Chemistry, Mathematics, and Computer Science. Deepened programming skills and explored cybersecurity concepts independently.',
    highlights: [
      'JEE / State Entrance Prepared',
      'CS Topper',
      'Coding Club Founder',
      'Hackathon Finalist',
    ],
    accentKey: 'cyan',
    icon: '🏫',
    status: 'completed',
  },
  {
    id: 'btech',
    level: 'Bachelor of Technology',
    institution: 'Your University Name',
    board: 'B.Tech — Computer Science & Engineering',
    period: '2023 – 2027 (Expected)',
    grade: '8.7',
    gradeLabel: 'CGPA / 10',
    description:
      'Currently pursuing B.Tech in CSE with a strong focus on Cybersecurity, Full-Stack Development, and AI-driven systems. Actively building real-world projects and participating in CTFs.',
    highlights: [
      'Cybersecurity Specialization',
      'Full-Stack Projects',
      'AI & Agents Research',
      'CTF Competitor',
    ],
    accentKey: 'violet',
    icon: '🎓',
    status: 'current',
  },
]

export const CERTIFICATIONS = [
  {
    name: 'CompTIA Security+',
    issuer: 'CompTIA',
    year: '2024',
    status: 'active' as const,
    accentKey: 'amber' as const,
    emoji: '🏅',
  },
  {
    name: 'Certified Ethical Hacker',
    issuer: 'EC-Council',
    year: '2024',
    status: 'active' as const,
    accentKey: 'rose' as const,
    emoji: '⚔️',
  },
  {
    name: 'AWS Solutions Architect',
    issuer: 'Amazon Web Services',
    year: '2023',
    status: 'active' as const,
    accentKey: 'cyan' as const,
    emoji: '☁️',
  },
  {
    name: 'OSCP',
    issuer: 'Offensive Security',
    year: '2025',
    status: 'in-progress' as const,
    accentKey: 'violet' as const,
    emoji: '🎯',
  },
  {
    name: 'Google Cybersecurity Certificate',
    issuer: 'Google',
    year: '2023',
    status: 'active' as const,
    accentKey: 'emerald' as const,
    emoji: '🔒',
  },
  {
    name: 'CISSP',
    issuer: 'ISC²',
    year: '2026',
    status: 'planned' as const,
    accentKey: 'violet' as const,
    emoji: '📋',
  },
]

export const ACHIEVEMENTS = [
  {
    badge: '🏆',
    title: 'CTFTime Top 100',
    desc: 'Global ranking in competitive hacking',
    color: '#ffcc00',
  },
  {
    badge: '🛡️',
    title: 'CompTIA Security+',
    desc: 'Certified security professional',
    color: '#00ff41',
  },
  {
    badge: '🔓',
    title: 'HackTheBox Pro Hacker',
    desc: 'Offensive security milestone',
    color: '#ff0040',
  },
  {
    badge: '🤖',
    title: 'Google ML Certificate',
    desc: 'Machine learning foundations',
    color: '#00ffff',
  },
  {
    badge: '⚡',
    title: 'Bug Bounty — $1,500',
    desc: 'Responsible disclosure reward',
    color: '#ff7700',
  },
  {
    badge: '🌐',
    title: 'Open Source Contributor',
    desc: '200+ GitHub stars across projects',
    color: '#39ff14',
  },
]

export const INTERNSHIPS = [
  {
    company: 'SECURETECH_LABS',
    role: 'Security Engineer Intern',
    period: 'Jun 2024 – Aug 2024',
    type: 'OFFENSIVE_SECURITY',
    tasks: [
      'Performed penetration tests on 12 client web applications',
      'Discovered and reported 3 critical CVEs',
      'Built automated recon pipeline saving 6hrs/week',
      'Contributed to internal threat intelligence platform',
    ],
    color: '#ff0040',
  },
  {
    company: 'CLOUDGUARD_INC',
    role: 'Full-Stack Security Dev Intern',
    period: 'Jan 2024 – Apr 2024',
    type: 'DEFENSIVE_ENGINEERING',
    tasks: [
      'Built zero-trust API gateway reducing attack surface by 40%',
      'Integrated behavioral anomaly detection into existing SIEM',
      'Developed security dashboard visualizing 50K+ daily events',
      'Shipped 3 production features with zero regressions',
    ],
    color: '#00ffff',
  },
]

export const RADAR_SKILLS = [
  { label: 'Pentesting', value: 85 },
  { label: 'Networking', value: 80 },
  { label: 'Web Dev', value: 90 },
  { label: 'AI/ML', value: 83 },
  { label: 'Cloud', value: 74 },
  { label: 'Cryptography', value: 74 },
  { label: 'OSINT', value: 82 },
  { label: 'DevOps', value: 70 },
]
