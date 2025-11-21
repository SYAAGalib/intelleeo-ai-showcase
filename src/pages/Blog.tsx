import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { getBlogs } from '@/lib/storage';
import { useState, useEffect } from 'react';

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

const Blog = () => {
  const { slug } = useParams();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);

  useEffect(() => {
    const loadedBlogs = getBlogs();
    setBlogs(loadedBlogs);
    
    if (slug) {
      const blog = loadedBlogs.find(b => b.slug === slug);
      setSelectedBlog(blog || null);
    }
  }, [slug]);

  const shareOnSocial = (platform: string, blog: BlogPost) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(blog.title);
    
    const shareUrls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
    };
    
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  if (selectedBlog) {
    return (
      <div className="min-h-screen pt-20">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <Link to="/blog" className="text-primary hover:underline mb-6 inline-block">
            ← Back to all posts
          </Link>
          
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <header className="mb-8">
              <Badge className="mb-4">{selectedBlog.category}</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{selectedBlog.title}</h1>
              
              <div className="flex flex-wrap gap-4 text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{selectedBlog.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(selectedBlog.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{selectedBlog.readTime} read</span>
                </div>
              </div>

              <div className="flex gap-2 mb-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => shareOnSocial('facebook', selectedBlog)}
                >
                  <Facebook className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => shareOnSocial('twitter', selectedBlog)}
                >
                  <Twitter className="w-4 h-4 mr-2" />
                  Tweet
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => shareOnSocial('linkedin', selectedBlog)}
                >
                  <Linkedin className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {selectedBlog.tags.map(tag => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </header>

            <div 
              className="prose prose-lg dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
            />
          </motion.article>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Our <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Blog</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Insights, tutorials, and thoughts on AI, software development, and digital innovation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge>{blog.category}</Badge>
                    {blog.featured && <Badge variant="secondary">Featured</Badge>}
                  </div>
                  <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
                    <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 line-clamp-3">{blog.excerpt}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags.slice(0, 3).map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                    ))}
                  </div>

                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(blog.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{blog.readTime}</span>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full mt-4" asChild>
                    <Link to={`/blog/${blog.slug}`}>Read More</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
