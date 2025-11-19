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
    mission: '',
    vision: '',
    why_choose_us: '',
  });
};

export const saveAboutContent = (data: any) => {
  setStorageData(STORAGE_KEYS.ABOUT, data);
};

// Contact info
export const getContactInfo = () => {
  return getStorageData(STORAGE_KEYS.CONTACT, {
    email: '',
    phone: '',
    address: '',
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
  return getStorageData(STORAGE_KEYS.PROJECTS, []);
};

export const saveProjects = (projects: any[]) => {
  setStorageData(STORAGE_KEYS.PROJECTS, projects);
};

// Technologies
export const getTechnologies = () => {
  return getStorageData(STORAGE_KEYS.TECHNOLOGIES, []);
};

export const saveTechnologies = (technologies: any[]) => {
  setStorageData(STORAGE_KEYS.TECHNOLOGIES, technologies);
};
