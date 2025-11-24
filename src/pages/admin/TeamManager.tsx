import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { getTeamMembers, saveTeamMember, deleteTeamMember } from '@/lib/storage-team';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Plus, Save, Upload } from 'lucide-react';
import imageCompression from 'browser-image-compression';
import { MultiSelect } from '@/components/admin/MultiSelect';

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  image: string;
  bio: string;
  certificationId: string;
  skills: string[];
  email: string;
  isCXO: boolean;
}

const SKILLS_OPTIONS = [
  'React', 'Node.js', 'Python', 'AI/ML', 'TensorFlow', 'PyTorch',
  'Cloud Computing', 'AWS', 'Azure', 'DevOps', 'UI/UX Design',
  'Strategic Planning', 'Technical Leadership', 'Project Management'
];

export default function TeamManager() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [formData, setFormData] = useState<Partial<TeamMember>>({
    name: '',
    position: '',
    image: '',
    bio: '',
    certificationId: '',
    skills: [],
    email: '',
    isCXO: false
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadTeam();
  }, []);

  const loadTeam = () => {
    const loadedTeam = getTeamMembers();
    setTeam(loadedTeam);
  };

  const handleCreateNew = () => {
    setSelectedMember(null);
    setFormData({
      name: '',
      position: '',
      image: '',
      bio: '',
      certificationId: '',
      skills: [],
      email: '',
      isCXO: false
    });
    setImageFile(null);
  };

  const handleSelectMember = (member: TeamMember) => {
    setSelectedMember(member);
    setFormData(member);
    setImageFile(null);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const options = {
        maxSizeMB: 0.3,
        maxWidthOrHeight: 800,
        useWebWorker: true
      };

      const compressedFile = await imageCompression(file, options);
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      
      reader.readAsDataURL(compressedFile);
      setImageFile(compressedFile);
      
      toast({
        title: 'Image compressed',
        description: `Size: ${(compressedFile.size / 1024).toFixed(2)}KB`
      });
    } catch (error) {
      toast({
        title: 'Compression failed',
        description: 'Please try a different image',
        variant: 'destructive'
      });
    }
  };

  const handleSave = () => {
    if (!formData.name || !formData.position || !formData.email) {
      toast({
        title: 'Validation Error',
        description: 'Name, position, and email are required',
        variant: 'destructive'
      });
      return;
    }

    const member: TeamMember = {
      id: selectedMember?.id || Date.now().toString(),
      name: formData.name!,
      position: formData.position!,
      image: formData.image || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop',
      bio: formData.bio || '',
      certificationId: formData.certificationId || `ID-${Date.now().toString().slice(-6)}`,
      skills: formData.skills || [],
      email: formData.email!,
      isCXO: formData.isCXO || false
    };

    saveTeamMember(member);
    loadTeam();
    
    toast({
      title: 'Success',
      description: selectedMember ? 'Team member updated' : 'Team member added'
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to remove this team member?')) {
      deleteTeamMember(id);
      loadTeam();
      if (selectedMember?.id === id) {
        handleCreateNew();
      }
      toast({
        title: 'Success',
        description: 'Team member removed'
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Team Manager</h1>
        <Button onClick={handleCreateNew}>
          <Plus className="mr-2 h-4 w-4" />
          New Member
        </Button>
      </div>

      <Tabs defaultValue="editor" className="w-full">
        <TabsList>
          <TabsTrigger value="editor">Editor</TabsTrigger>
          <TabsTrigger value="team">All Members ({team.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="editor" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{selectedMember ? 'Edit Member' : 'Add New Member'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="position">Position *</Label>
                    <Input
                      id="position"
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      placeholder="Senior AI Engineer"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john.doe@intelleeo.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="certId">Certification ID</Label>
                  <Input
                    id="certId"
                    value={formData.certificationId}
                    onChange={(e) => setFormData({ ...formData, certificationId: e.target.value })}
                    placeholder="ENG-001-2024"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    placeholder="Brief professional summary..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Skills</Label>
                  <MultiSelect
                    options={SKILLS_OPTIONS}
                    value={formData.skills || []}
                    onChange={(skills) => setFormData({ ...formData, skills })}
                    placeholder="Select skills"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Profile Photo (max 300KB)</Label>
                  <div className="flex gap-4 items-start">
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="flex-1"
                    />
                    {formData.image && (
                      <img 
                        src={formData.image} 
                        alt="Preview" 
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="isCXO"
                    checked={formData.isCXO}
                    onCheckedChange={(isCXO) => setFormData({ ...formData, isCXO })}
                  />
                  <Label htmlFor="isCXO">Show in CXO Leadership Section</Label>
                </div>
              </div>

              <Button onClick={handleSave} className="w-full">
                <Save className="mr-2 h-4 w-4" />
                {selectedMember ? 'Update Member' : 'Add Member'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team">
          <div className="grid gap-4">
            {team.map((member) => (
              <Card key={member.id}>
                <CardContent className="flex justify-between items-center p-6">
                  <div className="flex gap-4 items-center flex-1">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{member.name}</h3>
                      <p className="text-sm text-muted-foreground">{member.position}</p>
                      <p className="text-xs text-muted-foreground mt-1">{member.email}</p>
                      {member.isCXO && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded mt-1 inline-block">
                          CXO
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => handleSelectMember(member)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(member.id)}
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
