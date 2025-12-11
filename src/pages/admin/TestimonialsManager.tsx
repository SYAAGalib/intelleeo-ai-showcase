import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, Star, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  getTestimonials,
  saveTestimonial,
  deleteTestimonial,
  Testimonial,
} from '@/lib/storage-features';

const TestimonialsManager = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const loadTestimonials = () => {
    setTestimonials(getTestimonials(true));
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const handleSave = (testimonial: Testimonial) => {
    saveTestimonial(testimonial);
    loadTestimonials();
    setIsDialogOpen(false);
    setEditingTestimonial(null);
    toast({
      title: 'Testimonial saved',
      description: 'The testimonial has been saved successfully.',
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      deleteTestimonial(id);
      loadTestimonials();
      toast({
        title: 'Testimonial deleted',
        description: 'The testimonial has been deleted.',
      });
    }
  };

  const openNewDialog = () => {
    setEditingTestimonial({
      id: Date.now().toString(),
      clientName: '',
      company: '',
      position: '',
      quote: '',
      rating: 5,
      imageUrl: '',
      visible: true,
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Testimonials Manager</h1>
          <p className="text-muted-foreground">Manage client testimonials</p>
        </div>
        <Button onClick={openNewDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Add Testimonial
        </Button>
      </div>

      <div className="grid gap-4">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className={!testimonial.visible ? 'opacity-60' : ''}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <img
                  src={testimonial.imageUrl || 'https://via.placeholder.com/64'}
                  alt={testimonial.clientName}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{testimonial.clientName}</h3>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.position} at {testimonial.company}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < testimonial.rating
                                ? 'text-yellow-500 fill-yellow-500'
                                : 'text-muted-foreground/30'
                            }`}
                          />
                        ))}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setEditingTestimonial(testimonial);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(testimonial.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="mt-2 text-muted-foreground italic">"{testimonial.quote}"</p>
                  {!testimonial.visible && (
                    <span className="text-xs text-red-500 mt-2 block">Hidden</span>
                  )}
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
              {editingTestimonial?.id ? 'Edit Testimonial' : 'Add Testimonial'}
            </DialogTitle>
          </DialogHeader>
          {editingTestimonial && (
            <TestimonialForm
              testimonial={editingTestimonial}
              onSave={handleSave}
              onCancel={() => setIsDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface TestimonialFormProps {
  testimonial: Testimonial;
  onSave: (testimonial: Testimonial) => void;
  onCancel: () => void;
}

const TestimonialForm = ({ testimonial, onSave, onCancel }: TestimonialFormProps) => {
  const [form, setForm] = useState(testimonial);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Client Name</Label>
          <Input
            value={form.clientName}
            onChange={(e) => setForm({ ...form, clientName: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Position</Label>
          <Input
            value={form.position}
            onChange={(e) => setForm({ ...form, position: e.target.value })}
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Company</Label>
        <Input
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label>Quote</Label>
        <Textarea
          value={form.quote}
          onChange={(e) => setForm({ ...form, quote: e.target.value })}
          rows={4}
          required
        />
      </div>
      <div className="space-y-2">
        <Label>Image URL</Label>
        <Input
          value={form.imageUrl}
          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          placeholder="https://..."
        />
      </div>
      <div className="space-y-2">
        <Label>Rating</Label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((rating) => (
            <Button
              key={rating}
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setForm({ ...form, rating })}
            >
              <Star
                className={`h-6 w-6 ${
                  rating <= form.rating
                    ? 'text-yellow-500 fill-yellow-500'
                    : 'text-muted-foreground/30'
                }`}
              />
            </Button>
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

export default TestimonialsManager;
