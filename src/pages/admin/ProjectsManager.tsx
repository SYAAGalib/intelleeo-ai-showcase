import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, Upload, X } from 'lucide-react';
import { getProjects, saveProjects, getTechnologies, saveTechnologies } from '@/lib/storage';
import { MultiSelect } from '@/components/admin/MultiSelect';
import imageCompression from 'browser-image-compression';

interface Project {
  id?: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  problem: string;
  solution: string;
  role: string;
  timeline: string;
  tech_stack: string[];
  tags: string[];
  screenshot: string;
  images?: string[];
  video_link?: string;
  live_link?: string;
  source_code?: string;
  ai_highlight?: string;
}

const ProjectsManager = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    const data = getProjects();
    setProjects(data);
  };

  const handleSave = (project: Project) => {
    try {
      let updatedProjects;
      if (project.id) {
        updatedProjects = projects.map(p => p.id === project.id ? project : p);
      } else {
        const newProject = { ...project, id: Date.now().toString() };
        updatedProjects = [...projects, newProject];
      }
      
      saveProjects(updatedProjects);
      setProjects(updatedProjects);
      
      toast({
        title: 'Success',
        description: 'Project saved successfully',
      });
      setDialogOpen(false);
      setEditingProject(null);
    } catch (error: any) {
      toast({
        title: 'Error saving',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const updatedProjects = projects.filter(p => p.id !== id);
      saveProjects(updatedProjects);
      setProjects(updatedProjects);

      toast({
        title: 'Success',
        description: 'Project deleted successfully',
      });
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
          <h1 className="text-3xl font-bold">Projects Manager</h1>
          <p className="text-muted-foreground mt-2">
            Manage all your projects
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingProject(null)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProject?.id ? 'Edit Project' : 'Add New Project'}
              </DialogTitle>
            </DialogHeader>
            <ProjectForm
              project={editingProject}
              onSave={handleSave}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{project.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {project.subtitle}
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditingProject(project);
                      setDialogOpen(true);
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(project.id!)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const ProjectForm = ({
  project,
  onSave,
}: {
  project: Project | null;
  onSave: (project: Project) => void;
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Project>(
    project || {
      slug: '',
      title: '',
      subtitle: '',
      description: '',
      problem: '',
      solution: '',
      role: '',
      timeline: '',
      tech_stack: [],
      tags: [],
      screenshot: '',
      images: [],
      video_link: '',
    }
  );
  const [uploadedImages, setUploadedImages] = useState<string[]>(formData.images || []);
  const [uploading, setUploading] = useState(false);
  
  // Get available options
  const technologies = getTechnologies();
  const techOptions = technologies.map(t => t.name);
  const roleOptions = ['Full-Stack Developer', 'Lead Developer', 'Frontend Developer', 'Backend Developer', 'AI Engineer', 'Full-Stack Engineer', 'AI & Platform Engineer', 'DevOps Engineer', 'Mobile Developer', 'UI/UX Designer'];
  const tagOptions = ['AI', 'Web', 'Mobile', 'Client', 'Open Source', 'Enterprise', 'SaaS', 'E-commerce'];

  const compressImage = async (file: File): Promise<string> => {
    try {
      const options = {
        maxSizeMB: 0.3, // 300KB
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      
      const compressedFile = await imageCompression(file, options);
      
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(compressedFile);
      });
    } catch (error) {
      console.error('Error compressing image:', error);
      throw error;
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const compressedImages: string[] = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.startsWith('image/')) {
          toast({
            title: 'Invalid file',
            description: `${file.name} is not an image`,
            variant: 'destructive',
          });
          continue;
        }
        
        const compressed = await compressImage(file);
        compressedImages.push(compressed);
      }
      
      const newImages = [...uploadedImages, ...compressedImages];
      setUploadedImages(newImages);
      setFormData({ ...formData, images: newImages });
      
      toast({
        title: 'Success',
        description: `${compressedImages.length} image(s) uploaded and compressed`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to upload images',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    const newImages = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(newImages);
    setFormData({ ...formData, images: newImages });
  };

  const handleAddTech = (newTech: string) => {
    const technologies = getTechnologies();
    const exists = technologies.find(t => t.name.toLowerCase() === newTech.toLowerCase());
    
    if (!exists) {
      const newTechnology = {
        id: Date.now().toString(),
        name: newTech,
        category: 'Other',
        icon: '🔧',
        color: '#6B7280'
      };
      saveTechnologies([...technologies, newTechnology]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Title *</Label>
          <Input
            placeholder="e.g., AI Content Optimizer"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Slug *</Label>
          <Input
            placeholder="e.g., ai-content-optimizer"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Subtitle *</Label>
        <Input
          placeholder="e.g., Smart content enhancement platform"
          value={formData.subtitle}
          onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label>Description *</Label>
        <Textarea
          placeholder="A comprehensive description of what this project does and its key features..."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label>Problem *</Label>
        <Textarea
          placeholder="Describe the problem this project solves..."
          value={formData.problem}
          onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label>Solution *</Label>
        <Textarea
          placeholder="Explain how your solution addresses the problem..."
          value={formData.solution}
          onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
          rows={2}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Role *</Label>
          <MultiSelect
            options={roleOptions}
            value={formData.role ? [formData.role] : []}
            onChange={(values) => setFormData({ ...formData, role: values[0] || '' })}
            placeholder="Select your role"
            onAddNew={(newRole) => {
              setFormData({ ...formData, role: newRole });
            }}
          />
        </div>
        <div className="space-y-2">
          <Label>Timeline *</Label>
          <Input
            placeholder="e.g., 3 months"
            value={formData.timeline}
            onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Tech Stack *</Label>
        <MultiSelect
          options={techOptions}
          value={formData.tech_stack || []}
          onChange={(values) => setFormData({ ...formData, tech_stack: values })}
          placeholder="Select technologies"
          onAddNew={handleAddTech}
        />
      </div>

      <div className="space-y-2">
        <Label>Tags *</Label>
        <MultiSelect
          options={tagOptions}
          value={formData.tags || []}
          onChange={(values) => setFormData({ ...formData, tags: values })}
          placeholder="Select tags"
          onAddNew={(newTag) => {
            // Tags can be freely added
          }}
        />
      </div>

      <div className="space-y-2">
        <Label>Screenshot URL *</Label>
        <Input
          placeholder="https://example.com/screenshot.png or /uploads/project.png"
          value={formData.screenshot}
          onChange={(e) => setFormData({ ...formData, screenshot: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label>Additional Images (Upload)</Label>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              disabled={uploading}
              className="cursor-pointer"
            />
            {uploading && <span className="text-sm text-muted-foreground">Compressing...</span>}
          </div>
          {uploadedImages.length > 0 && (
            <div className="grid grid-cols-4 gap-2">
              {uploadedImages.map((img, index) => (
                <div key={index} className="relative group">
                  <img
                    src={img}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-20 object-cover rounded border"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Video Link (Optional)</Label>
        <Input
          placeholder="https://youtube.com/watch?v=..."
          value={formData.video_link || ''}
          onChange={(e) => setFormData({ ...formData, video_link: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label>Live Link (Optional)</Label>
        <Input
          placeholder="https://example.com"
          value={formData.live_link || ''}
          onChange={(e) => setFormData({ ...formData, live_link: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label>Source Code (Optional)</Label>
        <Input
          placeholder="https://github.com/username/repo"
          value={formData.source_code || ''}
          onChange={(e) => setFormData({ ...formData, source_code: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label>AI Highlight (Optional)</Label>
        <Textarea
          placeholder="Describe any AI-powered features or highlights..."
          value={formData.ai_highlight || ''}
          onChange={(e) => setFormData({ ...formData, ai_highlight: e.target.value })}
          rows={2}
        />
      </div>

      <Button onClick={() => onSave(formData)} className="w-full">
        Save Project
      </Button>
    </div>
  );
};

export default ProjectsManager;
