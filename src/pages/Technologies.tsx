import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { technologies, getCategories, getTechnologiesByCategory } from '@/data/technologies';

const Technologies = () => {
  const categories = getCategories();

  const categoryColors: Record<string, string> = {
    'Frontend': 'bg-blue-500/10 border-blue-500/20 text-blue-700',
    'Backend': 'bg-green-500/10 border-green-500/20 text-green-700',
    'AI/ML': 'bg-purple-500/10 border-purple-500/20 text-purple-700',
    'Mobile': 'bg-orange-500/10 border-orange-500/20 text-orange-700',
    'Database': 'bg-red-500/10 border-red-500/20 text-red-700',
    'Tools': 'bg-gray-500/10 border-gray-500/20 text-gray-700',
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Our <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Technology</span> Stack
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We leverage cutting-edge technologies to build intelligent, scalable, and user-friendly solutions
          </p>
        </motion.div>

        {/* Technology Categories */}
        <div className="space-y-16">
          {categories.map((category, categoryIndex) => {
            const categoryTechs = getTechnologiesByCategory(category);
            
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
                className="space-y-8"
              >
                {/* Category Header */}
                <div className="text-center">
                  <Badge 
                    variant="outline" 
                    className={`text-lg px-6 py-2 mb-4 ${categoryColors[category] || 'bg-muted'}`}
                  >
                    {category}
                  </Badge>
                  <h2 className="text-3xl font-bold">
                    {category === 'AI/ML' && 'Artificial Intelligence & Machine Learning'}
                    {category === 'Frontend' && 'User Interface & Experience'}
                    {category === 'Backend' && 'Server & API Development'}
                    {category === 'Mobile' && 'Mobile App Development'}
                    {category === 'Database' && 'Data Storage & Management'}
                    {category === 'Tools' && 'Development & Deployment'}
                  </h2>
                </div>

                {/* Technology Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {categoryTechs.map((tech, techIndex) => (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: categoryIndex * 0.1 + techIndex * 0.05 
                      }}
                      whileHover={{ scale: 1.05 }}
                      className="group"
                    >
                      <Card className="h-full transition-all duration-300 hover:shadow-[var(--shadow-hover)] border-border group-hover:border-primary/50">
                        <CardContent className="p-6 text-center space-y-4">
                          {/* Icon */}
                          <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                            {tech.icon}
                          </div>
                          
                          {/* Name */}
                          <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                            {tech.name}
                          </h3>
                          
                          {/* Color indicator */}
                          <div 
                            className="w-full h-1 rounded-full mx-auto opacity-60 group-hover:opacity-100 transition-opacity"
                            style={{ backgroundColor: tech.color }}
                          />
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 text-center bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Leverage These Technologies?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Our expertise spans across these cutting-edge technologies. Let's discuss how we can apply them to solve your unique challenges.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Start Your Project
            </motion.a>
            <motion.a
              href="/"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center px-8 py-4 border border-border rounded-lg font-semibold hover:bg-muted transition-colors"
            >
              View Our Work
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Technologies;