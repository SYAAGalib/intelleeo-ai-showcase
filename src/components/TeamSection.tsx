import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getCXOTeam } from '@/lib/storage';
import { LazyImage } from './LazyImage';
import { SectionReveal } from './SectionReveal';
import { StaggerContainer, StaggerItem } from './StaggerContainer';

interface CXO {
  id: string;
  name: string;
  position: string;
  image: string;
  bio: string;
}

export const TeamSection = () => {
  const [cxos, setCxos] = useState<CXO[]>([]);

  useEffect(() => {
    setCxos(getCXOTeam());
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-muted/30 to-background overflow-hidden">
      <div className="container mx-auto px-4">
        <SectionReveal className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Meet Our <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Leadership</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our experienced leadership team drives innovation and excellence
          </p>
        </SectionReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {cxos.map((cxo) => (
            <StaggerItem key={cxo.id}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              >
                <Card className="h-full group overflow-hidden border-border/50 hover:border-primary/30 transition-colors duration-500">
                  <CardContent className="p-6">
                    <div className="aspect-square rounded-lg overflow-hidden mb-4 relative">
                      <LazyImage 
                        src={cxo.image} 
                        alt={cxo.name}
                        containerClassName="w-full h-full"
                        className="group-hover:scale-110 transition-transform duration-700"
                      />
                      {/* Overlay on hover */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <motion.h3 
                      className="text-xl font-bold mb-2"
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.2 }}
                    >
                      {cxo.name}
                    </motion.h3>
                    <Badge variant="default" className="mb-3">{cxo.position}</Badge>
                    <p className="text-sm text-muted-foreground">{cxo.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <SectionReveal delay={0.4} className="text-center">
          <Button size="lg" variant="outline" className="group" asChild>
            <Link to="/team">
              View Our Full Team
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </SectionReveal>
      </div>
    </section>
  );
};
