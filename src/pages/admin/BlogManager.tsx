import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { getBlogs, saveBlog, deleteBlog } from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Plus, Save } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { MultiSelect } from '@/components/admin/MultiSelect';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  featured: boolean;
}

const CATEGORIES = [
  'AI Development',
  'Web Development',
  'Mobile Development',
  'Machine Learning',
  'Cloud Computing',
  'DevOps',
  'UI/UX Design',
  'Software Engineering',
  'Technology Trends',
  'Case Studies'
];

export default function BlogManager() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: 'intelleeo',
    date: new Date().toISOString().split('T')[0],
    readTime: '5 min',
    category: 'AI Development',
    tags: [],
    featured: false
  });
  const { toast } = useToast();

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = () => {
    const loadedBlogs = getBlogs(true); // Include hidden posts in admin
    setBlogs(loadedBlogs);
  };

  const handleCreateNew = () => {
    setSelectedBlog(null);
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      author: 'intelleeo',
      date: new Date().toISOString().split('T')[0],
      readTime: '5 min',
      category: 'AI Development',
      tags: [],
      featured: false
    });
  };

  const handleSelectBlog = (blog: BlogPost) => {
    setSelectedBlog(blog);
    setFormData(blog);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title)
    }));
  };

  const handleSave = () => {
    if (!formData.title || !formData.content) {
      toast({
        title: 'Validation Error',
        description: 'Title and content are required',
        variant: 'destructive'
      });
      return;
    }

    const blogPost: BlogPost = {
      id: selectedBlog?.id || Date.now().toString(),
      title: formData.title!,
      slug: formData.slug!,
      excerpt: formData.excerpt!,
      content: formData.content!,
      author: formData.author || 'intelleeo',
      date: formData.date!,
      readTime: formData.readTime!,
      category: formData.category!,
      tags: formData.tags || [],
      featured: formData.featured || false,
      hidden: formData.hidden || false
    };

    saveBlog(blogPost);
    loadBlogs();
    
    toast({
      title: 'Success',
      description: selectedBlog ? 'Blog post updated successfully' : 'Blog post created successfully'
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      deleteBlog(id);
      loadBlogs();
      if (selectedBlog?.id === id) {
        handleCreateNew();
      }
      toast({
        title: 'Success',
        description: 'Blog post deleted successfully'
      });
    }
  };

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['link', 'image', 'video'],
      ['blockquote', 'code-block'],
      ['clean']
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Blog Manager</h1>
        <Button onClick={handleCreateNew}>
          <Plus className="mr-2 h-4 w-4" />
          New Post
        </Button>
      </div>

      <Tabs defaultValue="editor" className="w-full">
        <TabsList>
          <TabsTrigger value="editor">Editor</TabsTrigger>
          <TabsTrigger value="posts">All Posts ({blogs.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="editor" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{selectedBlog ? 'Edit Post' : 'Create New Post'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Enter blog post title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">URL Slug</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="url-friendly-slug"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Input
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    placeholder="Brief description of the post"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
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
                    <Label htmlFor="readTime">Read Time</Label>
                    <Input
                      id="readTime"
                      value={formData.readTime}
                      onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                      placeholder="5 min"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Tags</Label>
                  <MultiSelect
                    options={['AI', 'Machine Learning', 'Web Development', 'Mobile', 'Cloud', 'DevOps', 'UI/UX', 'Tutorial', 'Case Study', 'Best Practices']}
                    value={formData.tags || []}
                    onChange={(tags) => setFormData({ ...formData, tags })}
                    placeholder="Select or add tags"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(featured) => setFormData({ ...formData, featured })}
                  />
                  <Label htmlFor="featured">Featured Post</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="hidden"
                    checked={formData.hidden || false}
                    onCheckedChange={(hidden) => setFormData({ ...formData, hidden })}
                  />
                  <Label htmlFor="hidden">Hidden (SEO only, not visible on site)</Label>
                </div>

                <div className="space-y-2">
                  <Label>Content *</Label>
                  <ReactQuill
                    theme="snow"
                    value={formData.content}
                    onChange={(content) => setFormData({ ...formData, content })}
                    modules={quillModules}
                    className="h-96 mb-12"
                  />
                </div>
              </div>

              <Button onClick={handleSave} className="w-full">
                <Save className="mr-2 h-4 w-4" />
                {selectedBlog ? 'Update Post' : 'Create Post'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="posts">
          <div className="grid gap-4">
            {blogs.map((blog) => (
              <Card key={blog.id}>
                <CardContent className="flex justify-between items-center p-6">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{blog.excerpt}</p>
                    <div className="flex gap-4 text-xs text-muted-foreground">
                      <span>{blog.category}</span>
                      <span>{new Date(blog.date).toLocaleDateString()}</span>
                      <span>{blog.readTime}</span>
                      {blog.featured && <span className="text-primary">Featured</span>}
                      {blog.hidden && <span className="text-muted-foreground">Hidden</span>}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => handleSelectBlog(blog)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(blog.id)}
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
