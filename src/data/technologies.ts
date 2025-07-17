export interface Technology {
  name: string;
  category: 'Frontend' | 'Backend' | 'AI/ML' | 'Tools' | 'Mobile' | 'Database';
  icon: string;
  color: string;
}

export const technologies: Technology[] = [
  // Frontend
  { name: 'React', category: 'Frontend', icon: '⚛️', color: '#61DAFB' },
  { name: 'Vue.js', category: 'Frontend', icon: '🟢', color: '#4FC08D' },
  { name: 'Next.js', category: 'Frontend', icon: '▲', color: '#000000' },
  { name: 'TypeScript', category: 'Frontend', icon: '📘', color: '#3178C6' },
  { name: 'TailwindCSS', category: 'Frontend', icon: '🎨', color: '#06B6D4' },
  
  // Backend
  { name: 'Node.js', category: 'Backend', icon: '🟢', color: '#339933' },
  { name: 'Python', category: 'Backend', icon: '🐍', color: '#3776AB' },
  { name: 'Laravel', category: 'Backend', icon: '🚀', color: '#FF2D20' },
  { name: 'Express.js', category: 'Backend', icon: '⚡', color: '#000000' },
  
  // AI/ML
  { name: 'OpenAI', category: 'AI/ML', icon: '🤖', color: '#412991' },
  { name: 'TensorFlow', category: 'AI/ML', icon: '🧠', color: '#FF6F00' },
  { name: 'PyTorch', category: 'AI/ML', icon: '🔥', color: '#EE4C2C' },
  { name: 'Hugging Face', category: 'AI/ML', icon: '🤗', color: '#FFD21E' },
  { name: 'LangChain', category: 'AI/ML', icon: '⛓️', color: '#1C3C3C' },
  
  // Mobile
  { name: 'React Native', category: 'Mobile', icon: '📱', color: '#61DAFB' },
  { name: 'Expo', category: 'Mobile', icon: '🚀', color: '#000020' },
  { name: 'Flutter', category: 'Mobile', icon: '💙', color: '#02569B' },
  
  // Database
  { name: 'MongoDB', category: 'Database', icon: '🍃', color: '#47A248' },
  { name: 'PostgreSQL', category: 'Database', icon: '🐘', color: '#336791' },
  { name: 'Redis', category: 'Database', icon: '🔴', color: '#DC382D' },
  { name: 'Firebase', category: 'Database', icon: '🔥', color: '#FFCA28' },
  
  // Tools
  { name: 'Docker', category: 'Tools', icon: '🐳', color: '#2496ED' },
  { name: 'Kubernetes', category: 'Tools', icon: '☸️', color: '#326CE5' },
  { name: 'AWS', category: 'Tools', icon: '☁️', color: '#FF9900' },
  { name: 'Vercel', category: 'Tools', icon: '▲', color: '#000000' },
  { name: 'GitHub', category: 'Tools', icon: '🐙', color: '#181717' }
];

export const getTechnologiesByCategory = (category: Technology['category']): Technology[] => {
  return technologies.filter(tech => tech.category === category);
};

export const getCategories = (): Technology['category'][] => {
  return Array.from(new Set(technologies.map(tech => tech.category)));
};