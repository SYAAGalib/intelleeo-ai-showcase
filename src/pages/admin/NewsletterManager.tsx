import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Download, Mail, Users, UserCheck, UserX } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  getNewsletterSubscribers,
  unsubscribeNewsletter,
  NewsletterSubscriber,
} from '@/lib/storage-features';

const NewsletterManager = () => {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const { toast } = useToast();

  const loadSubscribers = () => {
    setSubscribers(getNewsletterSubscribers());
  };

  useEffect(() => {
    loadSubscribers();
  }, []);

  const activeSubscribers = subscribers.filter((s) => !s.unsubscribedAt);
  const unsubscribedCount = subscribers.filter((s) => s.unsubscribedAt).length;

  const handleUnsubscribe = (email: string) => {
    if (confirm(`Are you sure you want to unsubscribe ${email}?`)) {
      unsubscribeNewsletter(email);
      loadSubscribers();
      toast({
        title: 'Subscriber removed',
        description: `${email} has been unsubscribed.`,
      });
    }
  };

  const exportCSV = () => {
    const csv = [
      ['Email', 'Subscribed At', 'Status'],
      ...subscribers.map((s) => [
        s.email,
        new Date(s.subscribedAt).toLocaleDateString(),
        s.unsubscribedAt ? 'Unsubscribed' : 'Active',
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: 'Export complete',
      description: 'Subscriber list has been downloaded.',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Newsletter Subscribers</h1>
          <p className="text-muted-foreground">Manage your newsletter mailing list</p>
        </div>
        <Button onClick={exportCSV} disabled={subscribers.length === 0}>
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Subscribers</p>
                <p className="text-2xl font-bold">{subscribers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-green-500/10">
                <UserCheck className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Subscribers</p>
                <p className="text-2xl font-bold">{activeSubscribers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-red-500/10">
                <UserX className="h-6 w-6 text-red-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Unsubscribed</p>
                <p className="text-2xl font-bold">{unsubscribedCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subscribers Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Subscriber List
          </CardTitle>
        </CardHeader>
        <CardContent>
          {subscribers.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No subscribers yet</p>
              <p className="text-sm">Subscribers will appear here once they sign up.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Subscribed</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subscribers.map((subscriber) => (
                  <TableRow key={subscriber.id}>
                    <TableCell className="font-medium">{subscriber.email}</TableCell>
                    <TableCell>
                      {new Date(subscriber.subscribedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {subscriber.unsubscribedAt ? (
                        <Badge variant="destructive">Unsubscribed</Badge>
                      ) : (
                        <Badge variant="default">Active</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {!subscriber.unsubscribedAt && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleUnsubscribe(subscriber.email)}
                        >
                          Unsubscribe
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NewsletterManager;
