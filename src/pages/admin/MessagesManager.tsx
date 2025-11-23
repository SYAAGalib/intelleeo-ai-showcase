import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getContactMessages, markMessageAsRead, deleteContactMessage, getChatSummaries, deleteChatSummary } from '@/lib/storage-team';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Mail, MailOpen, MessageSquare } from 'lucide-react';

export default function MessagesManager() {
  const [contactMessages, setContactMessages] = useState<any[]>([]);
  const [chatSummaries, setChatSummaries] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setContactMessages(getContactMessages());
    setChatSummaries(getChatSummaries());
  };

  const handleMarkAsRead = (id: string) => {
    markMessageAsRead(id);
    loadData();
  };

  const handleDeleteMessage = (id: string) => {
    if (confirm('Delete this message?')) {
      deleteContactMessage(id);
      loadData();
      toast({ title: 'Message deleted' });
    }
  };

  const handleDeleteChat = (id: string) => {
    if (confirm('Delete this chat summary?')) {
      deleteChatSummary(id);
      loadData();
      toast({ title: 'Chat summary deleted' });
    }
  };

  const unreadCount = contactMessages.filter(m => !m.read).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Messages & Chats</h1>
        <div className="flex gap-2">
          <Badge variant="default">
            {unreadCount} Unread
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="contact" className="w-full">
        <TabsList>
          <TabsTrigger value="contact">
            Contact Messages ({contactMessages.length})
          </TabsTrigger>
          <TabsTrigger value="chat">
            Chat Summaries ({chatSummaries.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="contact" className="space-y-4">
          {contactMessages.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Mail className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No messages yet</p>
              </CardContent>
            </Card>
          ) : (
            contactMessages.map((message) => (
              <Card key={message.id} className={!message.read ? 'border-primary' : ''}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg flex items-center gap-2">
                        {message.name}
                        {!message.read && <Badge variant="default">New</Badge>}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">{message.email}</p>
                    </div>
                    <div className="flex gap-2">
                      {!message.read && (
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => handleMarkAsRead(message.id)}
                          title="Mark as read"
                        >
                          <MailOpen className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => handleDeleteMessage(message.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Phone:</span> {message.phone || 'N/A'}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Project:</span> {message.projectType}
                    </div>
                    <div className="col-span-2">
                      <span className="text-muted-foreground">Date:</span> {new Date(message.timestamp).toLocaleString()}
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="chat" className="space-y-4">
          {chatSummaries.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No chat summaries yet</p>
              </CardContent>
            </Card>
          ) : (
            chatSummaries.map((chat) => (
              <Card key={chat.id}>
                <CardContent className="flex justify-between items-start p-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {new Date(chat.timestamp).toLocaleString()}
                      </span>
                      <Badge variant="outline">{chat.messages} messages</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{chat.preview}...</p>
                  </div>
                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => handleDeleteChat(chat.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
