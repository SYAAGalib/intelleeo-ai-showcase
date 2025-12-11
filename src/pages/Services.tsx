import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Brain, Globe, Smartphone, Lightbulb, CheckCircle, ArrowRight } from 'lucide-react';
import { getServices, Service } from '@/lib/storage-features';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Brain,
  Globe,
  Smartphone,
  Lightbulb,
};

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    setServices(getServices());
  }, []);

  return (
    <>
      <Helmet>
        <title>Our Services | intelleeo - AI Software Studio</title>
        <meta name="description" content="Explore our comprehensive range of services including AI Development, Web Applications, Mobile Development, and Tech Consulting." />
      </Helmet>

      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4">What We Offer</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="text-primary">Services</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              From concept to deployment, we provide end-to-end solutions tailored to your business needs
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {services.map((service, index) => {
              const IconComponent = iconMap[service.icon] || Brain;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 border-primary/10 hover:border-primary/30">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="p-3 rounded-lg bg-primary/10 text-primary mb-4">
                          <IconComponent className="h-8 w-8" />
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {service.priceHint}
                        </Badge>
                      </div>
                      <CardTitle className="text-2xl">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-6">
                        {service.description}
                      </p>
                      <ul className="space-y-2 mb-6">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Link to="/contact">
                        <Button variant="outline" className="w-full group">
                          Get Started
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl p-12"
          >
            <h2 className="text-3xl font-bold mb-4">
              Need a Custom Solution?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Every project is unique. Let's discuss your specific requirements and create something amazing together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="gap-2">
                  Start a Project
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/devnest">
                <Button size="lg" variant="outline">
                  View Our Work
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Services;
