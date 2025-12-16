import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, Bot, User, Zap, HelpCircle, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { saveChat, getChatConfig } from '@/lib/storage';
import { Badge } from '@/components/ui/badge';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

const helpMessages = [
  "How can I help you today?",
  "Ask me about AI solutions...",
  "Need help with your project?",
  "Let's discuss your ideas!",
  "What can I assist you with?",
];

const quickActions = [
  { icon: <Zap className="w-3 h-3" />, label: "Services", query: "What services do you offer?" },
  { icon: <HelpCircle className="w-3 h-3" />, label: "Pricing", query: "What are your pricing options?" },
  { icon: <Mail className="w-3 h-3" />, label: "Contact", query: "How can I contact you?" },
];

export const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: 'Hello! 👋 I\'m intelleeo\'s AI assistant. I can help you learn about our AI solutions, answer questions about our services, or discuss your project ideas. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentHelpIndex, setCurrentHelpIndex] = useState(0);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!isOpen) {
      const interval = setInterval(() => {
        setCurrentHelpIndex((prev) => (prev + 1) % helpMessages.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  const handleSend = async (messageText?: string) => {
    const userMessage = messageText || input.trim();
    if (!userMessage || isLoading) return;

    setInput('');
    setShowQuickActions(false);
    setMessages(prev => [...prev, { role: 'user', content: userMessage, timestamp: new Date() }]);
    setIsLoading(true);

    try {
      const chatConfig = getChatConfig();
      const { supabase } = await import('@/integrations/supabase/client');
      
      const { data, error } = await supabase.functions.invoke('chat-assistant', {
        body: { 
          messages: [...messages, { role: 'user', content: userMessage }],
          config: chatConfig
        }
      });

      if (error) throw error;

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.response,
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'I apologize, but I\'m having trouble connecting right now. Please try contacting us directly at intelleeo.inteligence@gmail.com',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    const summary = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      messages: messages.length,
      preview: messages[messages.length - 1]?.content.substring(0, 100) || ''
    };
    saveChat(summary);
    
    setIsOpen(false);
    setIsMinimized(false);
    setShowQuickActions(true);
    setMessages([
      { 
        role: 'assistant', 
        content: 'Hello! 👋 I\'m intelleeo\'s AI assistant. I can help you learn about our AI solutions, answer questions about our services, or discuss your project ideas. How can I assist you today?',
        timestamp: new Date()
      }
    ]);
  };

  const formatTime = (date?: Date) => {
    if (!date) return '';
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 left-6 z-50"
          >
            <div className="relative">
              <Button
                size="lg"
                className="rounded-full w-16 h-16 shadow-lg relative group bg-gradient-to-br from-primary to-accent hover:shadow-xl hover:shadow-primary/25 transition-all duration-300"
                onClick={() => setIsOpen(true)}
              >
                <Bot className="w-7 h-7" />
                <motion.div
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [1, 0.6, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -top-1 -right-1"
                >
                  <Sparkles className="w-5 h-5 text-yellow-400 drop-shadow-lg" />
                </motion.div>
              </Button>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentHelpIndex}
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-full left-0 mb-3 px-4 py-2 bg-card/95 backdrop-blur-md border border-border/50 rounded-xl shadow-xl whitespace-nowrap"
                >
                  <div className="absolute -bottom-2 left-6 w-4 h-4 bg-card/95 border-b border-r border-border/50 rotate-45" />
                  <p className="text-sm text-foreground font-medium">{helpMessages[currentHelpIndex]}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 left-6 z-50 w-[400px] max-w-[calc(100vw-3rem)]"
          >
            <Card className="shadow-2xl border-primary/20 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-primary via-primary/90 to-accent text-primary-foreground p-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                      <Bot className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="block">AI Assistant</span>
                      <span className="text-xs font-normal opacity-80">Powered by intelleeo</span>
                    </div>
                  </CardTitle>
                  <div className="flex gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20 rounded-full"
                      onClick={() => setIsMinimized(!isMinimized)}
                    >
                      <span className="text-xl leading-none">−</span>
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20 rounded-full"
                      onClick={handleClose}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {!isMinimized && (
                <CardContent className="p-0">
                  <ScrollArea className="h-[350px] p-4" ref={scrollRef}>
                    <div className="space-y-4">
                      {messages.map((message, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={`flex gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          {message.role === 'assistant' && (
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <Bot className="w-4 h-4 text-primary" />
                            </div>
                          )}
                          <div className={`max-w-[75%] ${message.role === 'user' ? 'order-1' : ''}`}>
                            <div
                              className={`rounded-2xl p-3 ${
                                message.role === 'user'
                                  ? 'bg-primary text-primary-foreground rounded-br-sm'
                                  : 'bg-muted rounded-bl-sm'
                              }`}
                            >
                              <p className="text-sm leading-relaxed">{message.content}</p>
                            </div>
                            <p className={`text-[10px] text-muted-foreground mt-1 ${message.role === 'user' ? 'text-right' : ''}`}>
                              {formatTime(message.timestamp)}
                            </p>
                          </div>
                          {message.role === 'user' && (
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                              <User className="w-4 h-4 text-primary-foreground" />
                            </div>
                          )}
                        </motion.div>
                      ))}
                      
                      {isLoading && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex gap-2 justify-start"
                        >
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Bot className="w-4 h-4 text-primary" />
                          </div>
                          <div className="bg-muted rounded-2xl rounded-bl-sm p-4">
                            <div className="flex gap-1.5">
                              {[0, 1, 2].map((i) => (
                                <motion.div
                                  key={i}
                                  animate={{ 
                                    y: [0, -6, 0],
                                    opacity: [0.4, 1, 0.4]
                                  }}
                                  transition={{ 
                                    duration: 0.8, 
                                    repeat: Infinity, 
                                    delay: i * 0.15,
                                    ease: "easeInOut"
                                  }}
                                  className="w-2 h-2 bg-primary rounded-full"
                                />
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </ScrollArea>

                  {/* Quick Actions */}
                  {showQuickActions && messages.length <= 1 && (
                    <div className="px-4 pb-2">
                      <p className="text-xs text-muted-foreground mb-2">Quick questions:</p>
                      <div className="flex flex-wrap gap-2">
                        {quickActions.map((action, index) => (
                          <motion.div
                            key={action.label}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Badge
                              variant="secondary"
                              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors py-1.5 px-3"
                              onClick={() => handleSend(action.query)}
                            >
                              {action.icon}
                              <span className="ml-1">{action.label}</span>
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="p-4 border-t bg-card/50">
                    <div className="flex gap-2">
                      <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Type your message..."
                        disabled={isLoading}
                        className="bg-background/50"
                      />
                      <Button
                        size="icon"
                        onClick={() => handleSend()}
                        disabled={isLoading || !input.trim()}
                        className="bg-primary hover:bg-primary/90"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

