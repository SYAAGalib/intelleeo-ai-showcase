import { motion } from 'framer-motion';
import { HeroSection } from '@/components/HeroSection';
import { ProjectCard } from '@/components/ProjectCard';
import { TeamSection } from '@/components/TeamSection';
import { FAQSection } from '@/components/FAQSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { AnimatedStats } from '@/components/AnimatedStats';
import { BlogSection } from '@/components/BlogSection';
import { SEOHead } from '@/components/SEOHead';
import { SectionReveal } from '@/components/SectionReveal';
import { projects } from '@/data/projects';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqItems = [
  { question: "What services does intelleeo offer?", answer: "intelleeo offers AI/ML development, web and mobile application development, custom AI solutions, and consulting services to help businesses leverage artificial intelligence effectively." },
  { question: "How long does a typical project take?", answer: "Project timelines vary based on complexity. Simple projects may take 2-4 weeks, while complex AI solutions can take 2-6 months. We provide detailed timelines during our initial consultation." },
  { question: "What industries does intelleeo work with?", answer: "We work across various industries including healthcare, finance, e-commerce, education, and technology startups, bringing AI solutions tailored to each sector's unique needs." },
  { question: "How can I get started with intelleeo?", answer: "Simply contact us through our website or email at intelleeo.inteligence@gmail.com. We'll schedule a free consultation to discuss your project requirements and propose a solution." },
];

const Index = () => {
  return (
    <div className="min-h-screen overflow-hidden">
      <SEOHead 
        faqItems={faqItems}
        breadcrumbs={[
          { name: 'Home', url: 'https://intelleeo.com' }
        ]}
      />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Animated Stats Section */}
      <AnimatedStats />

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Featured</span> Work
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover how we transform ideas into intelligent solutions that make a real impact
            </p>
          </SectionReveal>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {projects.slice(0, 9).map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

          {/* View All Projects Button */}
          <SectionReveal delay={0.4} className="text-center">
            <Button size="lg" variant="outline" className="group" asChild>
              <Link to="/devnest">
                Explore our DevNest
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </SectionReveal>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Blog Section */}
      <BlogSection />

      {/* Team Section */}
      <TeamSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Call to Action Section */}
      <section className="py-20 bg-primary/5 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 text-center relative">
          <SectionReveal className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let's collaborate on your next AI-powered project and create solutions that matter.
            </p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Button size="lg" asChild className="group">
                <Link to="/contact">
                  Start a Project
                  <motion.span
                    className="ml-2"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    →
                  </motion.span>
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/about">Learn More About Us</Link>
              </Button>
            </motion.div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
};

export default Index;
