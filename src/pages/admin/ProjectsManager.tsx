import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { getProjects, saveProjects } from '@/lib/storage';

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
    }
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Title</Label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Slug</Label>
          <Input
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Subtitle</Label>
        <Input
          value={formData.subtitle}
          onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label>Problem</Label>
        <Textarea
          value={formData.problem}
          onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label>Solution</Label>
        <Textarea
          value={formData.solution}
          onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
          rows={2}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Role</Label>
          <Input
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Timeline</Label>
          <Input
            value={formData.timeline}
            onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Tech Stack (comma separated)</Label>
        <Input
          value={formData.tech_stack?.join(', ')}
          onChange={(e) =>
            setFormData({
              ...formData,
              tech_stack: e.target.value.split(',').map((s) => s.trim()),
            })
          }
        />
      </div>

      <div className="space-y-2">
        <Label>Tags (comma separated)</Label>
        <Input
          value={formData.tags?.join(', ')}
          onChange={(e) =>
            setFormData({
              ...formData,
              tags: e.target.value.split(',').map((s) => s.trim()),
            })
          }
        />
      </div>

      <div className="space-y-2">
        <Label>Screenshot URL</Label>
        <Input
          value={formData.screenshot}
          onChange={(e) => setFormData({ ...formData, screenshot: e.target.value })}
        />
      </div>

      <Button onClick={() => onSave(formData)} className="w-full">
        Save Project
      </Button>
    </div>
  );
};

export default ProjectsManager;
