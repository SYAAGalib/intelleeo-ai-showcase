import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "What AI technologies do you specialize in?",
    answer: "We specialize in machine learning, natural language processing, computer vision, and generative AI. Our team works with cutting-edge technologies including TensorFlow, PyTorch, OpenAI GPT models, and custom AI solutions tailored to your needs."
  },
  {
    question: "How long does a typical AI project take?",
    answer: "Project timelines vary based on complexity. Simple AI integrations can take 2-4 weeks, while custom AI solutions typically range from 2-6 months. We follow an agile methodology with regular milestones and demos to ensure transparency."
  },
  {
    question: "Do you provide ongoing support after project completion?",
    answer: "Yes! We offer comprehensive maintenance and support packages including model monitoring, retraining, updates, and technical support. We ensure your AI solutions continue to perform optimally as your business grows."
  },
  {
    question: "Can you work with our existing tech stack?",
    answer: "Absolutely! We're experienced in integrating AI solutions with various tech stacks including React, Node.js, Python, Java, and cloud platforms like AWS, Azure, and Google Cloud. We adapt to your infrastructure."
  },
  {
    question: "What industries do you serve?",
    answer: "We serve diverse industries including healthcare, finance, e-commerce, education, logistics, and manufacturing. Our AI solutions are customized to address specific industry challenges and compliance requirements."
  }
];

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Frequently Asked <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Find answers to common questions about our AI solutions and services
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card 
                className="cursor-pointer hover:shadow-[var(--shadow-hover)] transition-all duration-300"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold pr-4">{faq.question}</h3>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    </motion.div>
                  </div>
                  
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-muted-foreground mt-4 leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
