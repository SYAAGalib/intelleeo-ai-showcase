import { useState } from 'react';
import { motion } from 'framer-motion';
import { ProjectCard } from '@/components/ProjectCard';
import { projects } from '@/data/projects';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const DevNest = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  
  const filterTags = ['All', 'AI', 'Web', 'Mobile', 'Client', 'Open Source'];
  
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.tags.includes(activeFilter as any));

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Dev<span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Nest</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            Our complete collection of intelligent solutions, crafted with precision and innovation
          </p>
          
          {/* Filter Tabs */}
          <Tabs value={activeFilter} onValueChange={setActiveFilter} className="w-full max-w-2xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 bg-muted/50 p-1 rounded-lg">
              {filterTags.map((tag) => (
                <TabsTrigger 
                  key={tag} 
                  value={tag}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200"
                >
                  {tag}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-xl text-muted-foreground">
              No projects found for "{activeFilter}" category.
            </p>
          </motion.div>
        )}

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-20 pt-16 border-t border-border"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">{projects.length}+</div>
              <div className="text-muted-foreground">Projects Delivered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Innovation Focus</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DevNest;