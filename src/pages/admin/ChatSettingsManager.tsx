import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getChatConfig, saveChatConfig, getSocialLinks, saveSocialLinks, type ChatConfig, type SocialLinks } from '@/lib/storage';
import { toast } from 'sonner';
import { MessageSquare, Link2, Save } from 'lucide-react';

const ChatSettingsManager = () => {
  const [chatConfig, setChatConfig] = useState<ChatConfig>({
    provider: 'gemini',
    apiKey: '',
    model: '',
    systemPrompt: '',
  });
  const [socialLinks, setSocialLinks] = useState<SocialLinks>({
    whatsapp: '',
    messenger: '',
    upwork: '',
    telegram: '',
  });

  useEffect(() => {
    const config = getChatConfig();
    const links = getSocialLinks();
    setChatConfig(config);
    setSocialLinks(links);
  }, []);

  const handleSaveChatConfig = () => {
    saveChatConfig(chatConfig);
    toast.success('Chat configuration saved successfully');
  };

  const handleSaveSocialLinks = () => {
    saveSocialLinks(socialLinks);
    toast.success('Social media links saved successfully');
  };

  const providerModels = {
    chatgpt: ['gpt-5', 'gpt-5-mini', 'gpt-5-nano', 'gpt-4o', 'gpt-4o-mini'],
    grok: ['grok-2', 'grok-2-mini'],
    deepseek: ['deepseek-chat', 'deepseek-coder'],
    gemini: ['gemini-2.0-flash-exp', 'gemini-1.5-pro', 'gemini-1.5-flash'],
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Chat & API Settings</h1>
        <p className="text-muted-foreground mt-2">
          Configure AI chatbot and social media links
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              AI Chat Configuration
            </CardTitle>
            <CardDescription>
              Configure the AI provider and model for the chat assistant
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="provider">AI Provider</Label>
                <Select
                  value={chatConfig.provider}
                  onValueChange={(value: any) => 
                    setChatConfig({ ...chatConfig, provider: value, model: providerModels[value][0] })
                  }
                >
                  <SelectTrigger id="provider">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="chatgpt">ChatGPT (OpenAI)</SelectItem>
                    <SelectItem value="grok">Grok (xAI)</SelectItem>
                    <SelectItem value="deepseek">DeepSeek</SelectItem>
                    <SelectItem value="gemini">Gemini (Google)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="model">Model</Label>
                <Select
                  value={chatConfig.model}
                  onValueChange={(value) => setChatConfig({ ...chatConfig, model: value })}
                >
                  <SelectTrigger id="model">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {providerModels[chatConfig.provider].map((model) => (
                      <SelectItem key={model} value={model}>
                        {model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                type="password"
                placeholder="Enter your API key"
                value={chatConfig.apiKey}
                onChange={(e) => setChatConfig({ ...chatConfig, apiKey: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="systemPrompt">System Prompt</Label>
              <Textarea
                id="systemPrompt"
                placeholder="Enter the system prompt for the AI assistant"
                value={chatConfig.systemPrompt}
                onChange={(e) => setChatConfig({ ...chatConfig, systemPrompt: e.target.value })}
                rows={4}
              />
            </div>

            <Button onClick={handleSaveChatConfig} className="w-full">
              <Save className="w-4 h-4 mr-2" />
              Save Chat Configuration
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link2 className="w-5 h-5" />
              Social Media Links
            </CardTitle>
            <CardDescription>
              Configure social media contact links displayed on the website
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="whatsapp">WhatsApp</Label>
                <Input
                  id="whatsapp"
                  placeholder="https://wa.me/1234567890"
                  value={socialLinks.whatsapp}
                  onChange={(e) => setSocialLinks({ ...socialLinks, whatsapp: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="messenger">Messenger</Label>
                <Input
                  id="messenger"
                  placeholder="https://m.me/username"
                  value={socialLinks.messenger}
                  onChange={(e) => setSocialLinks({ ...socialLinks, messenger: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="upwork">Upwork</Label>
                <Input
                  id="upwork"
                  placeholder="https://upwork.com/freelancers/username"
                  value={socialLinks.upwork}
                  onChange={(e) => setSocialLinks({ ...socialLinks, upwork: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telegram">Telegram</Label>
                <Input
                  id="telegram"
                  placeholder="https://t.me/username"
                  value={socialLinks.telegram}
                  onChange={(e) => setSocialLinks({ ...socialLinks, telegram: e.target.value })}
                />
              </div>
            </div>

            <Button onClick={handleSaveSocialLinks} className="w-full">
              <Save className="w-4 h-4 mr-2" />
              Save Social Links
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ChatSettingsManager;
