import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { getTechnologies, saveTechnologies } from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Plus, Save } from 'lucide-react';

interface Technology {
  id: string;
  name: string;
  category: string;
  icon: string;
  color: string;
  visible?: boolean;
}

const CATEGORIES = ['Frontend', 'Backend', 'AI/ML', 'Mobile', 'Database', 'Tools'];

export default function TechnologiesManager() {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [selectedTechnology, setSelectedTechnology] = useState<Technology | null>(null);
  const [formData, setFormData] = useState<Partial<Technology>>({
    name: '',
    category: 'Frontend',
    icon: '⚛️',
    color: '#61DAFB',
    visible: true
  });
  const { toast } = useToast();

  useEffect(() => {
    loadTechnologies();
  }, []);

  const loadTechnologies = () => {
    const loadedTechnologies = getTechnologies();
    setTechnologies(loadedTechnologies);
  };

  const handleCreateNew = () => {
    setSelectedTechnology(null);
    setFormData({
      name: '',
      category: 'Frontend',
      icon: '⚛️',
      color: '#61DAFB',
      visible: true
    });
  };

  const handleSelectTechnology = (tech: Technology) => {
    setSelectedTechnology(tech);
    setFormData(tech);
  };

  const handleSave = () => {
    if (!formData.name || !formData.category) {
      toast({
        title: 'Validation Error',
        description: 'Name and category are required',
        variant: 'destructive'
      });
      return;
    }

    const technology: Technology = {
      id: selectedTechnology?.id || Date.now().toString(),
      name: formData.name!,
      category: formData.category!,
      icon: formData.icon || '⚛️',
      color: formData.color || '#61DAFB',
      visible: formData.visible !== false
    };

    const updatedTechnologies = selectedTechnology
      ? technologies.map(t => t.id === technology.id ? technology : t)
      : [...technologies, technology];

    saveTechnologies(updatedTechnologies);
    loadTechnologies();
    
    toast({
      title: 'Success',
      description: selectedTechnology ? 'Technology updated successfully' : 'Technology added successfully'
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this technology?')) {
      const filtered = technologies.filter(t => t.id !== id);
      saveTechnologies(filtered);
      loadTechnologies();
      if (selectedTechnology?.id === id) {
        handleCreateNew();
      }
      toast({
        title: 'Success',
        description: 'Technology deleted successfully'
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Technologies Manager</h1>
        <Button onClick={handleCreateNew}>
          <Plus className="mr-2 h-4 w-4" />
          New Technology
        </Button>
      </div>

      <Tabs defaultValue="editor" className="w-full">
        <TabsList>
          <TabsTrigger value="editor">Editor</TabsTrigger>
          <TabsTrigger value="list">All Technologies ({technologies.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="editor" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{selectedTechnology ? 'Edit Technology' : 'Add New Technology'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., React"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="icon">Icon (Emoji)</Label>
                  <Input
                    id="icon"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    placeholder="⚛️"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="color">Color (Hex)</Label>
                  <Input
                    id="color"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    placeholder="#61DAFB"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="visible"
                  checked={formData.visible !== false}
                  onCheckedChange={(visible) => setFormData({ ...formData, visible })}
                />
                <Label htmlFor="visible">Show on website</Label>
              </div>

              <Button onClick={handleSave} className="w-full">
                <Save className="mr-2 h-4 w-4" />
                {selectedTechnology ? 'Update Technology' : 'Add Technology'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="list">
          <div className="grid gap-4">
            {technologies.map((tech) => (
              <Card key={tech.id}>
                <CardContent className="flex justify-between items-center p-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-2xl">{tech.icon}</span>
                      <div>
                        <h3 className="text-lg font-semibold">{tech.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {tech.category}
                          {tech.visible === false && <span className="ml-2 text-destructive">(Hidden from website)</span>}
                        </p>
                      </div>
                    </div>
                    <div 
                      className="w-20 h-3 rounded"
                      style={{ backgroundColor: tech.color }}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => handleSelectTechnology(tech)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(tech.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
