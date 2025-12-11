import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail, Loader2, CheckCircle } from 'lucide-react';
import { subscribeNewsletter } from '@/lib/storage-features';
import { useToast } from '@/hooks/use-toast';

export const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: 'Invalid email',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const success = subscribeNewsletter(email);
    
    if (success) {
      setIsSubscribed(true);
      toast({
        title: 'Subscribed!',
        description: 'Thank you for subscribing to our newsletter.',
      });
    } else {
      toast({
        title: 'Already subscribed',
        description: 'This email is already on our mailing list.',
      });
    }
    
    setIsLoading(false);
  };

  if (isSubscribed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-2 text-primary"
      >
        <CheckCircle className="h-5 w-5" />
        <span className="text-sm">Thanks for subscribing!</span>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
      <div className="relative flex-1">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="pl-10 bg-background/50"
        />
      </div>
      <Button type="submit" disabled={isLoading} size="default">
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          'Subscribe'
        )}
      </Button>
    </form>
  );
};
