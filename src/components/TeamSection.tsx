import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getCXOTeam } from '@/lib/storage';

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
    <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Meet Our <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Leadership</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our experienced leadership team drives innovation and excellence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {cxos.map((cxo, index) => (
            <motion.div
              key={cxo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-[var(--shadow-hover)] transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="aspect-square rounded-lg overflow-hidden mb-4">
                    <img 
                      src={cxo.image} 
                      alt={cxo.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{cxo.name}</h3>
                  <Badge variant="default" className="mb-3">{cxo.position}</Badge>
                  <p className="text-sm text-muted-foreground">{cxo.bio}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button size="lg" variant="outline" className="group" asChild>
            <Link to="/team">
              View Our Full Team
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
