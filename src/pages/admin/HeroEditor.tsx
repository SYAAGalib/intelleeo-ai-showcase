import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';
import { getHeroContent, saveHeroContent } from '@/lib/storage';

const HeroEditor = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    tagline: '',
    subtext: '',
    cta_primary_text: '',
    cta_secondary_text: '',
  });

  useEffect(() => {
    loadHeroContent();
  }, []);

  const loadHeroContent = () => {
    const data = getHeroContent();
    setFormData(data);
  };

  const handleSave = () => {
    setLoading(true);
    try {
      saveHeroContent(formData);
      toast({
        title: 'Success',
        description: 'Hero content updated successfully',
      });
    } catch (error: any) {
      toast({
        title: 'Error saving',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Hero Section Editor</h1>
        <p className="text-muted-foreground mt-2">
          Edit the main hero section content
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Hero Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="intelleeo"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tagline">Tagline</Label>
              <Input
                id="tagline"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                placeholder="Build Smart. Build Human."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtext">Subtext</Label>
              <Textarea
                id="subtext"
                value={formData.subtext}
                onChange={(e) => setFormData({ ...formData, subtext: e.target.value })}
                placeholder="AI Software Studio"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cta_primary">Primary CTA Text</Label>
                <Input
                  id="cta_primary"
                  value={formData.cta_primary_text}
                  onChange={(e) => setFormData({ ...formData, cta_primary_text: e.target.value })}
                  placeholder="View Our Work"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cta_secondary">Secondary CTA Text</Label>
                <Input
                  id="cta_secondary"
                  value={formData.cta_secondary_text}
                  onChange={(e) => setFormData({ ...formData, cta_secondary_text: e.target.value })}
                  placeholder="Contact Us"
                />
              </div>
            </div>

            <Button onClick={handleSave} disabled={loading} className="w-full">
              <Save className="mr-2 h-4 w-4" />
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default HeroEditor;
