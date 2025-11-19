import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';
import { getAboutContent, saveAboutContent } from '@/lib/storage';

const AboutEditor = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    mission: '',
    vision: '',
    stats: [],
    values: []
  });

  useEffect(() => {
    loadAboutContent();
  }, []);

  const loadAboutContent = () => {
    const data = getAboutContent();
    setFormData(data);
  };

  const handleSave = () => {
    setLoading(true);
    try {
      saveAboutContent(formData);
      toast({
        title: 'Success',
        description: 'About content updated successfully',
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
        <h1 className="text-3xl font-bold">About Page Editor</h1>
        <p className="text-muted-foreground mt-2">
          Edit the about page content
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>About Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mission">Mission Statement</Label>
              <Textarea
                id="mission"
                value={formData.mission}
                onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
                placeholder="Our mission..."
                rows={5}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vision">Vision</Label>
              <Textarea
                id="vision"
                value={formData.vision}
                onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
                placeholder="Our vision..."
                rows={5}
              />
            </div>

            <div className="text-sm text-muted-foreground mt-4">
              <p>Note: Stats and Values sections are managed through the database defaults.</p>
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

export default AboutEditor;
