import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, Heart, Lightbulb, Users, Target, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const values = [
    {
      icon: Brain,
      title: 'Intelligence First',
      description: 'We believe AI should augment human capabilities, not replace them. Every solution we build is designed to make people more effective and empowered.'
    },
    {
      icon: Heart,
      title: 'Human-Centered',
      description: 'Technology should serve humanity. We prioritize user experience, accessibility, and ethical considerations in every project we undertake.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We stay at the forefront of technological advancement, constantly exploring new possibilities and pushing the boundaries of what\'s possible.'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'The best solutions emerge from diverse perspectives. We work closely with our clients as partners in the creative process.'
    }
  ];

  const stats = [
    { label: 'Projects Completed', value: '50+' },
    { label: 'Happy Clients', value: '25+' },
    { label: 'Years of Experience', value: '5+' },
    { label: 'Technologies Mastered', value: '30+' }
  ];

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
            About <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">intelleeo</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're not just another development studio. We're AI pioneers crafting the future of human-computer interaction.
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="p-12 text-center">
              <Target className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-xl leading-relaxed text-muted-foreground max-w-4xl mx-auto">
                To bridge the gap between cutting-edge AI technology and human needs, creating intelligent solutions 
                that enhance productivity, creativity, and quality of life while maintaining the human touch that makes 
                technology meaningful.
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Stats */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <p className="text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Values */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-[var(--shadow-hover)] transition-all duration-300 group">
                  <CardContent className="p-8">
                    <value.icon className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Why Choose Us */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Choose <span className="text-primary">intelleeo</span>?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Badge variant="default" className="mt-1">
                    01
                  </Badge>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">AI Expertise</h3>
                    <p className="text-muted-foreground">
                      Deep knowledge in machine learning, natural language processing, and neural networks.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Badge variant="default" className="mt-1">
                    02
                  </Badge>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Full-Stack Solutions</h3>
                    <p className="text-muted-foreground">
                      From concept to deployment, we handle every aspect of your project with precision.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Badge variant="default" className="mt-1">
                    03
                  </Badge>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Agile Approach</h3>
                    <p className="text-muted-foreground">
                      Flexible development process that adapts to your needs and delivers results quickly.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Badge variant="default" className="mt-1">
                    04
                  </Badge>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Future-Proof Technology</h3>
                    <p className="text-muted-foreground">
                      Solutions built with scalability and longevity in mind, ready for tomorrow's challenges.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl p-8 text-center"
              >
                <Rocket className="w-24 h-24 text-primary mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-4">Ready to Launch?</h3>
                <p className="text-muted-foreground mb-6">
                  Let's turn your vision into reality with the power of AI
                </p>
                <Button size="lg" asChild>
                  <Link to="/contact">Start Your Journey</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center bg-primary/5 rounded-2xl p-12"
        >
          <h2 className="text-3xl font-bold mb-4">
            Let's Build the Future Together
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Ready to explore what's possible? We'd love to hear about your project and discuss how we can help bring your ideas to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/contact">Get in Touch</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/">View Our Work</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;