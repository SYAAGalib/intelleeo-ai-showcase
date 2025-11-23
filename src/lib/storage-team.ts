import { TeamMember, ContactMessage, ChatSummary } from './storage';

const STORAGE_KEYS = {
  TEAM: 'intelleeo_team',
  CONTACT_MESSAGES: 'intelleeo_contact_messages',
  CHAT_SUMMARIES: 'intelleeo_chat_summaries',
};

// Team Members
const getDefaultTeam = (): TeamMember[] => [
  {
    id: '1',
    name: 'John Doe',
    position: 'CEO',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
    bio: 'Visionary leader with 15+ years in AI and technology innovation',
    certificationId: 'CEO-001-2024',
    skills: ['Strategic Planning', 'AI Strategy', 'Business Development'],
    email: 'john.doe@intelleeo.com',
    isCXO: true
  },
  {
    id: '2',
    name: 'Jane Smith',
    position: 'CTO',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop',
    bio: 'Technical expert specializing in AI architecture and scalable solutions',
    certificationId: 'CTO-002-2024',
    skills: ['AI Architecture', 'Cloud Computing', 'Technical Leadership'],
    email: 'jane.smith@intelleeo.com',
    isCXO: true
  },
  {
    id: '3',
    name: 'Mike Johnson',
    position: 'COO',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop',
    bio: 'Operations specialist ensuring seamless project delivery and client satisfaction',
    certificationId: 'COO-003-2024',
    skills: ['Operations Management', 'Project Delivery', 'Client Relations'],
    email: 'mike.johnson@intelleeo.com',
    isCXO: true
  },
  {
    id: '4',
    name: 'Sarah Williams',
    position: 'Senior AI Engineer',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop',
    bio: 'ML expert with deep experience in NLP and computer vision',
    certificationId: 'ENG-004-2024',
    skills: ['Machine Learning', 'NLP', 'Computer Vision', 'Python'],
    email: 'sarah.williams@intelleeo.com',
    isCXO: false
  },
  {
    id: '5',
    name: 'David Brown',
    position: 'Full Stack Developer',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop',
    bio: 'Full-stack developer specializing in React and Node.js',
    certificationId: 'DEV-005-2024',
    skills: ['React', 'Node.js', 'TypeScript', 'Cloud Deployment'],
    email: 'david.brown@intelleeo.com',
    isCXO: false
  },
  {
    id: '6',
    name: 'Emily Davis',
    position: 'UI/UX Designer',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop',
    bio: 'Creative designer focused on user-centered AI interfaces',
    certificationId: 'DES-006-2024',
    skills: ['UI Design', 'UX Research', 'Figma', 'Design Systems'],
    email: 'emily.davis@intelleeo.com',
    isCXO: false
  }
];

export const getTeamMembers = (): TeamMember[] => {
  const team = localStorage.getItem(STORAGE_KEYS.TEAM);
  return team ? JSON.parse(team) : getDefaultTeam();
};

export const getCXOTeam = (): TeamMember[] => {
  return getTeamMembers().filter(member => member.isCXO);
};

export const saveTeamMember = (member: TeamMember) => {
  const team = getTeamMembers();
  const index = team.findIndex(m => m.id === member.id);
  if (index !== -1) {
    team[index] = member;
  } else {
    team.push(member);
  }
  localStorage.setItem(STORAGE_KEYS.TEAM, JSON.stringify(team));
};

export const deleteTeamMember = (id: string) => {
  const team = getTeamMembers().filter(m => m.id !== id);
  localStorage.setItem(STORAGE_KEYS.TEAM, JSON.stringify(team));
};

// Contact Messages
export const getContactMessages = (): ContactMessage[] => {
  const messages = localStorage.getItem(STORAGE_KEYS.CONTACT_MESSAGES);
  return messages ? JSON.parse(messages) : [];
};

export const saveContactMessage = (message: ContactMessage) => {
  const messages = getContactMessages();
  messages.unshift(message);
  localStorage.setItem(STORAGE_KEYS.CONTACT_MESSAGES, JSON.stringify(messages));
};

export const markMessageAsRead = (id: string) => {
  const messages = getContactMessages();
  const index = messages.findIndex(m => m.id === id);
  if (index !== -1) {
    messages[index].read = true;
    localStorage.setItem(STORAGE_KEYS.CONTACT_MESSAGES, JSON.stringify(messages));
  }
};

export const deleteContactMessage = (id: string) => {
  const messages = getContactMessages().filter(m => m.id !== id);
  localStorage.setItem(STORAGE_KEYS.CONTACT_MESSAGES, JSON.stringify(messages));
};

// Chat Summaries
export const getChatSummaries = (): ChatSummary[] => {
  const summaries = localStorage.getItem(STORAGE_KEYS.CHAT_SUMMARIES);
  return summaries ? JSON.parse(summaries) : [];
};

export const saveChat = (summary: ChatSummary) => {
  const summaries = getChatSummaries();
  summaries.unshift(summary);
  localStorage.setItem(STORAGE_KEYS.CHAT_SUMMARIES, JSON.stringify(summaries));
};

export const deleteChatSummary = (id: string) => {
  const summaries = getChatSummaries().filter(s => s.id !== id);
  localStorage.setItem(STORAGE_KEYS.CHAT_SUMMARIES, JSON.stringify(summaries));
};
