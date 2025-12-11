// Storage for new features: Testimonials, Services, Newsletter

const STORAGE_KEYS = {
  TESTIMONIALS: 'admin_testimonials',
  SERVICES: 'admin_services',
  NEWSLETTER: 'admin_newsletter_subscribers',
};

// Interfaces
export interface Testimonial {
  id: string;
  clientName: string;
  company: string;
  position: string;
  quote: string;
  rating: number;
  imageUrl: string;
  visible: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  priceHint: string;
  order: number;
  visible: boolean;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
  unsubscribedAt: string | null;
}

// Default data
const getDefaultTestimonials = (): Testimonial[] => [
  {
    id: '1',
    clientName: 'Sarah Johnson',
    company: 'TechStart Inc.',
    position: 'CEO',
    quote: 'intelleeo transformed our business with their AI solutions. The team delivered beyond our expectations, and the results speak for themselves - 40% increase in efficiency.',
    rating: 5,
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    visible: true,
  },
  {
    id: '2',
    clientName: 'Michael Chen',
    company: 'DataFlow Solutions',
    position: 'CTO',
    quote: 'Working with intelleeo was a game-changer. Their expertise in AI and modern web technologies helped us launch our product 2 months ahead of schedule.',
    rating: 5,
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    visible: true,
  },
  {
    id: '3',
    clientName: 'Emily Rodriguez',
    company: 'HealthTech Pro',
    position: 'Product Manager',
    quote: 'The attention to detail and commitment to quality is unmatched. intelleeo delivered a healthcare platform that our users love.',
    rating: 5,
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    visible: true,
  },
  {
    id: '4',
    clientName: 'David Park',
    company: 'RetailMax',
    position: 'Operations Director',
    quote: 'From concept to deployment, the intelleeo team was professional, responsive, and delivered exceptional results. Highly recommend!',
    rating: 5,
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    visible: true,
  },
];

const getDefaultServices = (): Service[] => [
  {
    id: '1',
    title: 'AI Development',
    description: 'Custom AI solutions including machine learning models, natural language processing, computer vision, and intelligent automation systems.',
    icon: 'Brain',
    features: ['Custom ML Models', 'NLP & Chatbots', 'Computer Vision', 'AI Integration', 'Predictive Analytics'],
    priceHint: 'Starting from $5,000',
    order: 1,
    visible: true,
  },
  {
    id: '2',
    title: 'Web Applications',
    description: 'Full-stack web development using modern frameworks and technologies. Scalable, secure, and user-friendly applications.',
    icon: 'Globe',
    features: ['React/Next.js Apps', 'Backend APIs', 'Database Design', 'Cloud Deployment', 'Performance Optimization'],
    priceHint: 'Starting from $3,000',
    order: 2,
    visible: true,
  },
  {
    id: '3',
    title: 'Mobile Development',
    description: 'Cross-platform mobile applications for iOS and Android using React Native and Flutter with native-like performance.',
    icon: 'Smartphone',
    features: ['iOS & Android', 'Cross-Platform', 'Native Features', 'App Store Launch', 'Push Notifications'],
    priceHint: 'Starting from $4,000',
    order: 3,
    visible: true,
  },
  {
    id: '4',
    title: 'Tech Consulting',
    description: 'Strategic technology consulting to help you make informed decisions about your tech stack, architecture, and digital transformation.',
    icon: 'Lightbulb',
    features: ['Tech Audit', 'Architecture Review', 'Stack Selection', 'Team Training', 'Digital Strategy'],
    priceHint: 'Starting from $150/hr',
    order: 4,
    visible: true,
  },
];

// Helper functions
const getStorageData = <T>(key: string, defaultValue: T): T => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
};

const setStorageData = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Testimonials CRUD
export const getTestimonials = (includeHidden = false): Testimonial[] => {
  const testimonials = getStorageData<Testimonial[]>(STORAGE_KEYS.TESTIMONIALS, getDefaultTestimonials());
  return includeHidden ? testimonials : testimonials.filter(t => t.visible);
};

export const saveTestimonial = (testimonial: Testimonial): void => {
  const testimonials = getStorageData<Testimonial[]>(STORAGE_KEYS.TESTIMONIALS, getDefaultTestimonials());
  const index = testimonials.findIndex(t => t.id === testimonial.id);
  if (index >= 0) {
    testimonials[index] = testimonial;
  } else {
    testimonials.push(testimonial);
  }
  setStorageData(STORAGE_KEYS.TESTIMONIALS, testimonials);
};

export const deleteTestimonial = (id: string): void => {
  const testimonials = getStorageData<Testimonial[]>(STORAGE_KEYS.TESTIMONIALS, getDefaultTestimonials());
  setStorageData(STORAGE_KEYS.TESTIMONIALS, testimonials.filter(t => t.id !== id));
};

// Services CRUD
export const getServices = (includeHidden = false): Service[] => {
  const services = getStorageData<Service[]>(STORAGE_KEYS.SERVICES, getDefaultServices());
  const filtered = includeHidden ? services : services.filter(s => s.visible);
  return filtered.sort((a, b) => a.order - b.order);
};

export const saveService = (service: Service): void => {
  const services = getStorageData<Service[]>(STORAGE_KEYS.SERVICES, getDefaultServices());
  const index = services.findIndex(s => s.id === service.id);
  if (index >= 0) {
    services[index] = service;
  } else {
    services.push(service);
  }
  setStorageData(STORAGE_KEYS.SERVICES, services);
};

export const deleteService = (id: string): void => {
  const services = getStorageData<Service[]>(STORAGE_KEYS.SERVICES, getDefaultServices());
  setStorageData(STORAGE_KEYS.SERVICES, services.filter(s => s.id !== id));
};

// Newsletter CRUD
export const getNewsletterSubscribers = (): NewsletterSubscriber[] => {
  return getStorageData<NewsletterSubscriber[]>(STORAGE_KEYS.NEWSLETTER, []);
};

export const subscribeNewsletter = (email: string): boolean => {
  const subscribers = getNewsletterSubscribers();
  const existing = subscribers.find(s => s.email.toLowerCase() === email.toLowerCase());
  
  if (existing && !existing.unsubscribedAt) {
    return false; // Already subscribed
  }
  
  if (existing) {
    existing.unsubscribedAt = null;
    existing.subscribedAt = new Date().toISOString();
    setStorageData(STORAGE_KEYS.NEWSLETTER, subscribers);
  } else {
    subscribers.push({
      id: Date.now().toString(),
      email,
      subscribedAt: new Date().toISOString(),
      unsubscribedAt: null,
    });
    setStorageData(STORAGE_KEYS.NEWSLETTER, subscribers);
  }
  return true;
};

export const unsubscribeNewsletter = (email: string): void => {
  const subscribers = getNewsletterSubscribers();
  const subscriber = subscribers.find(s => s.email.toLowerCase() === email.toLowerCase());
  if (subscriber) {
    subscriber.unsubscribedAt = new Date().toISOString();
    setStorageData(STORAGE_KEYS.NEWSLETTER, subscribers);
  }
};
