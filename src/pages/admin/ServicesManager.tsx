import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, X, GripVertical } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  getServices,
  saveService,
  deleteService,
  Service,
} from '@/lib/storage-features';

const icons = ['Brain', 'Globe', 'Smartphone', 'Lightbulb'];

const ServicesManager = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const loadServices = () => {
    setServices(getServices(true));
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleSave = (service: Service) => {
    saveService(service);
    loadServices();
    setIsDialogOpen(false);
    setEditingService(null);
    toast({
      title: 'Service saved',
      description: 'The service has been saved successfully.',
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      deleteService(id);
      loadServices();
      toast({
        title: 'Service deleted',
        description: 'The service has been deleted.',
      });
    }
  };

  const openNewDialog = () => {
    setEditingService({
      id: Date.now().toString(),
      title: '',
      description: '',
      icon: 'Brain',
      features: [],
      priceHint: '',
      order: services.length + 1,
      visible: true,
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Services Manager</h1>
          <p className="text-muted-foreground">Manage your services offerings</p>
        </div>
        <Button onClick={openNewDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Add Service
        </Button>
      </div>

      <div className="grid gap-4">
        {services.map((service) => (
          <Card key={service.id} className={!service.visible ? 'opacity-60' : ''}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <GripVertical className="h-5 w-5" />
                    <span className="font-mono text-sm">#{service.order}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{service.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{service.description}</p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {service.features.map((feature, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm font-medium text-primary">{service.priceHint}</p>
                    {!service.visible && (
                      <span className="text-xs text-red-500 mt-2 block">Hidden</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setEditingService(service);
                      setIsDialogOpen(true);
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(service.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingService?.id ? 'Edit Service' : 'Add Service'}
            </DialogTitle>
          </DialogHeader>
          {editingService && (
            <ServiceForm
              service={editingService}
              onSave={handleSave}
              onCancel={() => setIsDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface ServiceFormProps {
  service: Service;
  onSave: (service: Service) => void;
  onCancel: () => void;
}

const ServiceForm = ({ service, onSave, onCancel }: ServiceFormProps) => {
  const [form, setForm] = useState(service);
  const [newFeature, setNewFeature] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setForm({ ...form, features: [...form.features, newFeature.trim()] });
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setForm({ ...form, features: form.features.filter((_, i) => i !== index) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Title</Label>
        <Input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={3}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Icon</Label>
          <Select value={form.icon} onValueChange={(value) => setForm({ ...form, icon: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {icons.map((icon) => (
                <SelectItem key={icon} value={icon}>
                  {icon}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Order</Label>
          <Input
            type="number"
            value={form.order}
            onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) })}
            min={1}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Price Hint</Label>
        <Input
          value={form.priceHint}
          onChange={(e) => setForm({ ...form, priceHint: e.target.value })}
          placeholder="Starting from $X,XXX"
        />
      </div>
      <div className="space-y-2">
        <Label>Features</Label>
        <div className="flex gap-2">
          <Input
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            placeholder="Add a feature"
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
          />
          <Button type="button" onClick={addFeature}>
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {form.features.map((feature, idx) => (
            <Badge key={idx} variant="secondary" className="gap-1">
              {feature}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => removeFeature(idx)}
              />
            </Badge>
          ))}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          checked={form.visible}
          onCheckedChange={(checked) => setForm({ ...form, visible: checked })}
        />
        <Label>Visible on website</Label>
      </div>
      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

export default ServicesManager;
