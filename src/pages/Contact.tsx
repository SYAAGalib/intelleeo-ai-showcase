import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Mail, MapPin, Phone, Clock, Send, CheckCircle, ChevronDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { sendContactEmail } from '@/lib/email';
import { saveContactMessage } from '@/lib/storage-team';

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredFaqIndex, setHoveredFaqIndex] = useState<number | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: ''
  });

  const projectTypes = [
    'AI/ML Development',
    'Web Application',
    'Mobile App',
    'Consulting',
    'Other'
  ];

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'intelleeo.inteligence@gmail.com',
      link: 'mailto:intelleeo.inteligence@gmail.com'
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+880 1946 303020',
      link: 'tel:+8801946303020'
    },
    {
      icon: MapPin,
      title: 'Location',
      content: 'Khulna, Bangladesh',
      link: null
    },
    {
      icon: Clock,
      title: 'Response Time',
      content: 'Within 24 hours',
      link: null
    }
  ];

  const faqs = [
    {
      question: "How long does a typical project take?",
      answer: "Project timelines vary based on complexity, but most projects range from 2-6 months."
    },
    {
      question: "Do you work with startups?",
      answer: "Absolutely! We love working with startups and offer flexible engagement models."
    },
    {
      question: "Can you help with existing projects?",
      answer: "Yes, we can audit, optimize, or enhance existing applications and systems."
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Save to storage
    saveContactMessage({
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      projectType: formData.projectType,
      message: formData.message,
      timestamp: new Date().toISOString(),
      read: false
    });

    try {
      const response = await sendContactEmail({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        project_type: formData.projectType,
        message: formData.message,
      });

      setIsLoading(false);
      setIsSubmitted(true);
      
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });

      // Reset form after a delay
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          projectType: '',
          message: ''
        });
      }, 3000);

    } catch (error: any) {
      setIsLoading(false);
      console.error('Email send error:', error);
      console.error('Error details:', {
        text: error?.text,
        status: error?.status,
        message: error?.message
      });
      
      let errorMessage = "Please try again or contact us directly at intelleeo.inteligence@gmail.com";
      
      if (error?.text) {
        errorMessage = `Error: ${error.text}`;
      } else if (error?.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Failed to send message",
        description: errorMessage,
        variant: "destructive",
      });
    }
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
            Get in <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to start your next AI project? We'd love to hear from you. Let's discuss how we can bring your vision to life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </CardHeader>
              <CardContent>
...
              </CardContent>
            </Card>

            {/* Map */}
            <Card>
              <CardContent className="p-0 overflow-hidden rounded-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118162.3087199857!2d89.48464537910156!3d22.80975580000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ff9071cb778b29%3A0x35c0f9088c37c80d!2sKhulna%2C%20Bangladesh!5e0!3m2!1sen!2s!4v1234567890"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location"
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-[var(--shadow-hover)] transition-all duration-300 group">
                    <CardContent className="p-6">
                      <info.icon className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                      <h3 className="font-semibold mb-2">{info.title}</h3>
                      {info.link ? (
                        <a 
                          href={info.link}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{info.content}</p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Additional Information */}
            <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4">What to Expect</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Badge variant="default" className="mt-1">1</Badge>
                    <div>
                      <h4 className="font-semibold">Initial Consultation</h4>
                      <p className="text-sm text-muted-foreground">
                        We'll discuss your project goals, requirements, and timeline.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Badge variant="default" className="mt-1">2</Badge>
                    <div>
                      <h4 className="font-semibold">Proposal & Planning</h4>
                      <p className="text-sm text-muted-foreground">
                        Detailed project proposal with timeline and cost estimate.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Badge variant="default" className="mt-1">3</Badge>
                    <div>
                      <h4 className="font-semibold">Development & Delivery</h4>
                      <p className="text-sm text-muted-foreground">
                        Agile development process with regular updates and demos.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    onMouseEnter={() => setHoveredFaqIndex(index)}
                    onMouseLeave={() => setHoveredFaqIndex(null)}
                    className="border-b border-border/50 py-3 transition-colors hover:border-primary/30"
                  >
                    <div className="flex items-center justify-between cursor-pointer">
                      <h4 className="text-sm font-medium pr-4">{faq.question}</h4>
                      <motion.div
                        animate={{ rotate: hoveredFaqIndex === index ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      </motion.div>
                    </div>
                    
                    <AnimatePresence>
                      {hoveredFaqIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;