import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { FileText, FolderKanban, Code, Mail } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    technologies: 0,
    heroContent: false,
    aboutContent: false,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [projectsRes, techRes, heroRes, aboutRes] = await Promise.all([
        supabase.from('projects').select('id', { count: 'exact', head: true }),
        supabase.from('technologies').select('id', { count: 'exact', head: true }),
        supabase.from('hero_content').select('id').single(),
        supabase.from('about_content').select('id').single(),
      ]);

      setStats({
        projects: projectsRes.count || 0,
        technologies: techRes.count || 0,
        heroContent: !heroRes.error,
        aboutContent: !aboutRes.error,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const cards = [
    {
      title: 'Projects',
      value: stats.projects,
      icon: FolderKanban,
      description: 'Total projects',
    },
    {
      title: 'Technologies',
      value: stats.technologies,
      icon: Code,
      description: 'Total technologies',
    },
    {
      title: 'Hero Section',
      value: stats.heroContent ? 'Set' : 'Empty',
      icon: FileText,
      description: 'Hero content status',
    },
    {
      title: 'About Page',
      value: stats.aboutContent ? 'Set' : 'Empty',
      icon: Mail,
      description: 'About content status',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Manage your website content from here
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {card.title}
                </CardTitle>
                <card.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {card.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
