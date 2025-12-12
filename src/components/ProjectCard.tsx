import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Project } from '@/data/projects';
import { useState } from 'react';
import { LazyImage } from './LazyImage';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ 
        duration: 0.7, 
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      }}
      className="group"
    >
      <Link to={`/projects/${project.slug}`}>
        <motion.div
          className="relative bg-card rounded-xl overflow-hidden shadow-[var(--shadow-card)] h-[400px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ 
            y: -8,
            boxShadow: '0 20px 60px -15px hsl(var(--primary) / 0.3)',
          }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        >
          {/* Project Screenshot with Lazy Loading */}
          <div className="relative h-full overflow-hidden">
            <motion.div
              className="w-full h-full"
              animate={{
                scale: isHovered ? 1.08 : 1,
                y: isHovered ? -15 : 0,
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            >
              <LazyImage
                src={project.screenshot}
                alt={project.title}
                className="object-top"
                containerClassName="w-full h-full"
              />
            </motion.div>
            
            {/* Premium Gradient Overlay */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"
              animate={{ opacity: isHovered ? 1 : 0.9 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Shine effect on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ 
                x: isHovered ? '100%' : '-100%',
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />
          </div>

          {/* Content Overlay */}
          <div className="absolute inset-0 p-6 flex flex-col justify-between">
            {/* Tags */}
            <motion.div 
              className="flex flex-wrap gap-2"
              animate={{ y: isHovered ? -5 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {project.tags.map((tag, tagIndex) => (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + tagIndex * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Badge
                    variant="secondary"
                    className="bg-background/90 backdrop-blur-md text-xs border border-border/50"
                  >
                    {tag}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>

            {/* Title and Description */}
            <div className="text-white">
              <motion.div
                animate={{ y: isHovered ? -12 : 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              >
                <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h3>
                <motion.p 
                  className="text-sm opacity-90 mb-3"
                  animate={{ opacity: isHovered ? 1 : 0.8 }}
                >
                  {project.subtitle}
                </motion.p>
                
                {/* Tech Stack Preview */}
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 3).map((tech, i) => (
                    <motion.span
                      key={tech}
                      className="text-xs bg-primary/30 text-accent px-2.5 py-1 rounded-md backdrop-blur-sm border border-primary/20"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.05 }}
                      viewport={{ once: true }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="text-xs text-muted-foreground/80">
                      +{project.techStack.length - 3} more
                    </span>
                  )}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Premium hover border glow */}
          <motion.div
            className="absolute inset-0 rounded-xl pointer-events-none"
            animate={{ 
              boxShadow: isHovered 
                ? 'inset 0 0 0 2px hsl(var(--primary) / 0.5), 0 0 30px hsl(var(--primary) / 0.2)' 
                : 'inset 0 0 0 1px transparent',
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </Link>
    </motion.div>
  );
};