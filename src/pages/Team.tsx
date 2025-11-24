import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, CheckCircle } from 'lucide-react';
import { getTeamMembers } from '@/lib/storage';

interface TeamMember {
  id: string;
  name: string;
  position: string;
  image: string;
  bio: string;
  certificationId: string;
  skills: string[];
  email: string;
}

const Team = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);

  useEffect(() => {
    setTeam(getTeamMembers());
  }, []);

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Our <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Certified</span> Team
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Meet our team of certified professionals dedicated to delivering excellence in AI and software development.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-[var(--shadow-hover)] transition-all duration-300 group overflow-hidden">
                {/* ID Card Style */}
                <div className="relative bg-gradient-to-br from-primary/10 to-accent/10 p-6">
                  <div className="absolute top-4 right-4">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-32 h-40 rounded-lg overflow-hidden mb-4 border-4 border-background shadow-lg">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-center mb-1">{member.name}</h3>
                    <Badge variant="default" className="mb-2">{member.position}</Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <span>Certified ID: {member.certificationId}</span>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-xs font-semibold mb-2 text-muted-foreground uppercase">Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {member.skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-semibold mb-1 text-muted-foreground uppercase">Contact</h4>
                      <a 
                        href={`mailto:${member.email}`}
                        className="text-sm text-primary hover:underline"
                      >
                        {member.email}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Certificate Verification Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16"
        >
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <Shield className="w-12 h-12 text-primary flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Certificate Verification</h3>
                  <p className="text-muted-foreground mb-4">
                    All our team members are certified professionals. You can verify their credentials using their Certification ID.
                  </p>
                  <div className="bg-background/50 rounded-lg p-4 border border-border">
                    <h4 className="font-semibold mb-2">Sample Certificate</h4>
                    <img 
                      src="/uploads/demo-certificate.svg" 
                      alt="Sample Certificate"
                      className="w-full max-w-2xl mx-auto rounded-lg shadow-lg"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Team;
