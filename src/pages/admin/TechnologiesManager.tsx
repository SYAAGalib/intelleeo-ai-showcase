import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2 } from 'lucide-react';

interface Technology {
  id?: string;
  name: string;
  category: string;
  icon: string;
  color: string;
}

const TechnologiesManager = () => {
  const { toast } = useToast();
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [editingTech, setEditingTech] = useState<Technology | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    loadTechnologies();
  }, []);

  const loadTechnologies = async () => {
    try {
      const { data, error } = await supabase
        .from('technologies')
        .select('*')
        .order('category', { ascending: true });

      if (error) throw error;
      setTechnologies(data || []);
    } catch (error: any) {
      toast({
        title: 'Error loading technologies',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleSave = async (tech: Technology) => {
    try {
      if (tech.id) {
        const { error } = await supabase
          .from('technologies')
          .update(tech)
          .eq('id', tech.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('technologies')
          .insert(tech);
        if (error) throw error;
      }

      toast({
        title: 'Success',
        description: 'Technology saved successfully',
      });
      loadTechnologies();
      setDialogOpen(false);
      setEditingTech(null);
    } catch (error: any) {
      toast({
        title: 'Error saving',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this technology?')) return;

    try {
      const { error } = await supabase
        .from('technologies')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Technology deleted successfully',
      });
      loadTechnologies();
    } catch (error: any) {
      toast({
        title: 'Error deleting',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Technologies Manager</h1>
          <p className="text-muted-foreground mt-2">
            Manage all technologies displayed on your website
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingTech(null)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Technology
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingTech?.id ? 'Edit Technology' : 'Add New Technology'}
              </DialogTitle>
            </DialogHeader>
            <TechForm tech={editingTech} onSave={handleSave} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {technologies.map((tech, index) => (
          <motion.div
            key={tech.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">{tech.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">
                    Category: {tech.category}
                  </p>
                  <div
                    className="w-8 h-8 rounded"
                    style={{ backgroundColor: tech.color }}
                  />
                  <div className="flex gap-2 mt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingTech(tech);
                        setDialogOpen(true);
                      }}
                    >
                      <Pencil className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(tech.id!)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const TechForm = ({
  tech,
  onSave,
}: {
  tech: Technology | null;
  onSave: (tech: Technology) => void;
}) => {
  const [formData, setFormData] = useState<Technology>(
    tech || {
      name: '',
      category: '',
      icon: '',
      color: '#000000',
    }
  );

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Name</Label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label>Category</Label>
        <Input
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          placeholder="Frontend, Backend, Database, etc."
        />
      </div>

      <div className="space-y-2">
        <Label>Icon (Lucide icon name)</Label>
        <Input
          value={formData.icon}
          onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
          placeholder="Code, Database, Server, etc."
        />
      </div>

      <div className="space-y-2">
        <Label>Color (Hex)</Label>
        <Input
          type="color"
          value={formData.color}
          onChange={(e) => setFormData({ ...formData, color: e.target.value })}
        />
      </div>

      <Button onClick={() => onSave(formData)} className="w-full">
        Save Technology
      </Button>
    </div>
  );
};

export default TechnologiesManager;
