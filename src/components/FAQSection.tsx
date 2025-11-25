import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-12 bg-muted/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h3 className="text-2xl font-semibold text-muted-foreground mb-2">
            Frequently Asked Questions
          </h3>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-2">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="border-b border-border/50 py-3 transition-colors hover:border-primary/30"
            >
              <div className="flex items-center justify-between cursor-pointer">
                <h4 className="text-base font-medium pr-4">{faq.question}</h4>
                <motion.div
                  animate={{ rotate: hoveredIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                </motion.div>
              </div>
              
              <AnimatePresence>
                {hoveredIndex === index && (
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
