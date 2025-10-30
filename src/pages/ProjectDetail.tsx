import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ExternalLink, Github, Clock, User, Lightbulb, ChevronLeft, ChevronRight } from 'lucide-react';
import { getProjectBySlug } from '@/data/projects';

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : null;
  
  // Create array of all media items (main screenshot + additional images + video)
  const allMedia = project ? [
    { type: 'image', src: project.screenshot },
    ...(project.images?.map(img => ({ type: 'image', src: img })) || []),
    ...(project.demoVideo ? [{ type: 'video', src: project.demoVideo }] : [])
  ] : [];
  
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);

  if (!project) {
    return <Navigate to="/404" replace />;
  }
  
  const handlePrevious = () => {
    setSelectedMediaIndex((prev) => (prev === 0 ? allMedia.length - 1 : prev - 1));
  };
  
  const handleNext = () => {
    setSelectedMediaIndex((prev) => (prev === allMedia.length - 1 ? 0 : prev + 1));
  };
  
  const selectedMedia = allMedia[selectedMediaIndex];

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Project Media Gallery */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 lg:col-span-2"
          >
            {/* Featured Media with Navigation */}
            <div className="relative rounded-xl overflow-hidden shadow-[var(--shadow-card)] group">
              {selectedMedia.type === 'image' ? (
                <img
                  src={selectedMedia.src}
                  alt={project.title}
                  className="w-full h-auto object-cover"
                />
              ) : (
                <div className="relative aspect-video w-full">
                  <iframe
                    key={selectedMediaIndex}
                    src={`${selectedMedia.src}?autoplay=0`}
                    title={`${project.title} demo video`}
                    className="w-full h-full"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              
              {/* Navigation Arrows - Full Height */}
              {allMedia.length > 1 && (
                <>
                  <button
                    onClick={handlePrevious}
                    className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background/80 to-transparent hover:from-background/90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  >
                    <ChevronLeft className="h-8 w-8 text-foreground" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background/80 to-transparent hover:from-background/90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  >
                    <ChevronRight className="h-8 w-8 text-foreground" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {allMedia.length > 1 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                {allMedia.map((media, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedMediaIndex(index)}
                    className={`relative rounded-lg overflow-hidden shadow-[var(--shadow-card)] aspect-video transition-all hover:scale-105 hover:ring-2 hover:ring-primary ${
                      selectedMediaIndex === index ? 'ring-2 ring-primary scale-105' : ''
                    }`}
                  >
                    {media.type === 'image' ? (
                      <img
                        src={media.src}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted relative">
                        {(() => {
                          // Extract YouTube video ID from URL
                          const youtubeMatch = media.src.match(/(?:youtube\.com\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]+)/);
                          const videoId = youtubeMatch ? youtubeMatch[1] : null;
                          const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;
                          
                          return thumbnailUrl ? (
                            <>
                              <img
                                src={thumbnailUrl}
                                alt="Video thumbnail"
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center">
                                  <div className="w-0 h-0 border-l-[12px] border-l-primary-foreground border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1" />
                                </div>
                              </div>
                            </>
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20">
                              <div className="text-center">
                                <ExternalLink className="h-4 w-4 text-primary mx-auto mb-1" />
                                <span className="text-[10px] text-primary font-medium">Video</span>
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}

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
            className="space-y-8 lg:col-span-1"
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