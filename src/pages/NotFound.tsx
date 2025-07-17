import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          {/* 404 Animation */}
          <motion.div
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              404
            </h1>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Page Not Found
            </h2>
            <p className="text-xl text-muted-foreground">
              Oops! The page you're looking for seems to have wandered off into the digital void.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button size="lg" asChild>
              <Link to="/">
                <Home className="mr-2 h-5 w-5" />
                Back to Home
              </Link>
            </Button>
            
            <Button size="lg" variant="outline" onClick={() => window.history.back()}>
              <ArrowLeft className="mr-2 h-5 w-5" />
              Go Back
            </Button>
          </motion.div>

          {/* Floating Elements */}
          <div className="absolute top-1/4 left-10 hidden lg:block">
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-12 h-12 bg-primary/10 rounded-full"
            />
          </div>

          <div className="absolute top-1/3 right-10 hidden lg:block">
            <motion.div
              animate={{
                y: [0, 15, 0],
                rotate: [0, -8, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              }}
              className="w-8 h-8 bg-accent/20 rounded-full"
            />
          </div>

          <div className="absolute bottom-1/4 left-1/4 hidden lg:block">
            <motion.div
              animate={{
                y: [0, -10, 0],
                x: [0, 5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 2,
              }}
              className="w-6 h-6 bg-primary/20 rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
