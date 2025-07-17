import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ExternalLink, Github, Clock, User, Lightbulb } from 'lucide-react';
import { getProjectBySlug } from '@/data/projects';

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : null;

  if (!project) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Button variant="ghost" asChild className="group">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Projects
            </Link>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Project Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="relative rounded-xl overflow-hidden shadow-[var(--shadow-card)]">
              <img
                src={project.screenshot}
                alt={project.title}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              {project.liveLink && (
                <Button size="lg" asChild>
                  <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Live
                  </a>
                </Button>
              )}
              {project.sourceCode && (
                <Button size="lg" variant="outline" asChild>
                  <a href={project.sourceCode} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    Source Code
                  </a>
                </Button>
              )}
            </div>
          </motion.div>

          {/* Project Details */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Header */}
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="default">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {project.title}
              </h1>
              <p className="text-xl text-muted-foreground">
                {project.subtitle}
              </p>
            </div>

            {/* Meta Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 flex items-center space-x-3">
                  <User className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Role</p>
                    <p className="font-medium">{project.role}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Timeline</p>
                    <p className="font-medium">{project.timeline}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold mb-4">About This Project</h2>
              <p className="text-muted-foreground leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Problem & Solution */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-destructive">The Challenge</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {project.problem}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-primary">Our Solution</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* AI Highlight */}
            {project.aiHighlight && (
              <Card className="border-accent/20 bg-accent/5">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <Lightbulb className="h-6 w-6 text-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-accent">AI Innovation</h3>
                      <p className="text-muted-foreground">
                        {project.aiHighlight}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tech Stack */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-3">
                {project.techStack.map((tech) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    className="px-3 py-1 text-sm bg-muted/50"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 text-center bg-primary/5 rounded-2xl p-12"
        >
          <h2 className="text-3xl font-bold mb-4">
            Interested in a Similar Project?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss how we can create something amazing together. Every project starts with a conversation.
          </p>
          <Button size="lg" asChild>
            <Link to="/contact">Get in Touch</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetail;