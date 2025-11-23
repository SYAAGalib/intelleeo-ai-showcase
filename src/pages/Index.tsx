import { motion } from 'framer-motion';
import { HeroSection } from '@/components/HeroSection';
import { ProjectCard } from '@/components/ProjectCard';
import { projects } from '@/data/projects';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
        <HeroSection />

        {/* Projects Section */}
        <section id="projects" className="py-20 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
            >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Featured</span> Work
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how we transform ideas into intelligent solutions that make a real impact
          </p>
            </motion.div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.slice(0, 9).map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
            </div>

            {/* View All Projects Button */}
            <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
            >
          <Button size="lg" variant="outline" className="group" asChild>
            <Link to="/devnest">
              Explore our DevNest
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
            </motion.div>
          </div>
        </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let's collaborate on your next AI-powered project and create solutions that matter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/contact">Start a Project</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/about">Learn More About Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
