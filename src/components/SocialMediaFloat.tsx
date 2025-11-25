import { motion } from 'framer-motion';
import { MessageCircle, Send, Briefcase, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getSocialLinks, type SocialLinks } from '@/lib/storage';

const iconMap = {
  whatsapp: Phone,
  messenger: MessageCircle,
  upwork: Briefcase,
  telegram: Send,
};

export const SocialMediaFloat = () => {
  const [socialLinks, setSocialLinks] = useState<SocialLinks>({
    whatsapp: '',
    messenger: '',
    upwork: '',
    telegram: '',
  });

  useEffect(() => {
    setSocialLinks(getSocialLinks());
  }, []);

  const socials = [
    { name: 'whatsapp', url: socialLinks.whatsapp, color: 'hover:bg-green-500/20' },
    { name: 'messenger', url: socialLinks.messenger, color: 'hover:bg-blue-500/20' },
    { name: 'upwork', url: socialLinks.upwork, color: 'hover:bg-emerald-500/20' },
    { name: 'telegram', url: socialLinks.telegram, color: 'hover:bg-sky-500/20' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3"
    >
      {socials.map((social, index) => {
        const Icon = iconMap[social.name as keyof typeof iconMap];
        if (!social.url) return null;

        return (
          <motion.a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            whileHover={{ scale: 1.1, x: -5 }}
            className={`
              w-12 h-12 rounded-full 
              bg-background/70 backdrop-blur-sm 
              border border-border/50
              flex items-center justify-center
              transition-all duration-300
              opacity-80 hover:opacity-100
              shadow-lg hover:shadow-xl
              ${social.color}
              group
            `}
          >
            <Icon className="w-5 h-5 text-foreground/80 group-hover:text-foreground transition-colors" />
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 0 0 hsl(var(--primary) / 0.4)',
                  '0 0 0 8px hsl(var(--primary) / 0)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute inset-0 rounded-full"
            />
          </motion.a>
        );
      })}
    </motion.div>
  );
};
