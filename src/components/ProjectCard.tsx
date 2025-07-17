import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Project } from '@/data/projects';
import { useState } from 'react';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <Link to={`/projects/${project.slug}`}>
        <div
          className="relative bg-card rounded-xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] transition-all duration-300 h-[400px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Project Screenshot */}
          <div className="relative h-full overflow-hidden">
            <motion.img
              src={project.screenshot}
              alt={project.title}
              className="w-full h-full object-cover object-top"
              animate={{
                scale: isHovered ? 1.05 : 1,
                y: isHovered ? -20 : 0,
              }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </div>

          {/* Content Overlay */}
          <div className="absolute inset-0 p-6 flex flex-col justify-between">
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-background/80 backdrop-blur text-xs"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Title and Description */}
            <div className="text-white">
              <motion.div
                animate={{ y: isHovered ? -10 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm opacity-90 mb-3">
                  {project.subtitle}
                </p>
                
                {/* Tech Stack Preview */}
                <div className="flex flex-wrap gap-1">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="text-xs bg-primary/20 text-accent px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="text-xs text-muted-foreground">
                      +{project.techStack.length - 3} more
                    </span>
                  )}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Hover Effect Border */}
          <motion.div
            className="absolute inset-0 border-2 border-primary/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
            animate={{ opacity: isHovered ? 1 : 0 }}
          />
        </div>
      </Link>
    </motion.div>
  );
};