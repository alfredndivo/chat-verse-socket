
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Send, 
  Paperclip, 
  Smile, 
  Phone, 
  Video, 
  MoreVertical,
  Hash,
  Users,
  Pin
} from "lucide-react";
import { User, Room, Message } from "../ChatApp";
import { MessageItem } from "./MessageItem";
import { TypingIndicator } from "./TypingIndicator";
import { useToast } from "@/hooks/use-toast";

interface ChatAreaProps {
  currentUser: User;
  selectedRoom: string;
  rooms: Room[];
  users: User[];
}

export const ChatArea = ({ currentUser, selectedRoom, rooms, users }: ChatAreaProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const currentRoom = rooms.find(room => room.id === selectedRoom);
  const roomParticipants = currentRoom?.participants.map(id => 
    users.find(user => user.id === id)
  ).filter(Boolean) || [];

  // Initialize demo messages
  useEffect(() => {
    const demoMessages: Message[] = [
      {
        id: "1",
        senderId: "1",
        senderName: "Alice Johnson",
        content: "Hey everyone! Welcome to ChatVerse! 🚀",
        timestamp: new Date(Date.now() - 300000),
        roomId: selectedRoom,
        reactions: { "👍": ["2", "3"], "🎉": ["4"] },
        isRead: true
      },
      {
        id: "2",
        senderId: "2",
        senderName: "Bob Smith",
        content: "This Socket.io implementation looks amazing! The real-time features are so smooth.",
        timestamp: new Date(Date.now() - 240000),
        roomId: selectedRoom,
        reactions: { "💯": ["1", "4"] },
        isRead: true
      },
      {
        id: "3",
        senderId: "4",
        senderName: "David Wilson",
        content: "I love the typing indicators and the notification system. Great work!",
        timestamp: new Date(Date.now() - 180000),
        roomId: selectedRoom,
        isRead: true
      },
      {
        id: "4",
        senderId: "1",
        senderName: "Alice Johnson",
        content: "Let me share a screenshot of our latest feature...",
        timestamp: new Date(Date.now() - 120000),
        roomId: selectedRoom,
        type: "image",
        fileUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400",
        fileName: "new-feature.png",
        isRead: false
      }
    ];
    setMessages(demoMessages);
  }, [selectedRoom]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Simulate typing indicator
  useEffect(() => {
    if (isTyping) {
      const timeout = setTimeout(() => {
        setIsTyping(false);
        // Simulate other users typing
        setTypingUsers(["Bob Smith"]);
        setTimeout(() => setTypingUsers([]), 2000);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      senderName: currentUser.username,
      content: message,
      timestamp: new Date(),
      roomId: selectedRoom,
      isRead: false
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage("");
    setIsTyping(false);

    // Show notification for sent message
    toast({
      title: "Message sent",
      description: "Your message has been delivered",
    });

    // Simulate response after a short delay
    setTimeout(() => {
      const responses = [
        "That's a great point!",
        "I totally agree with that",
        "Thanks for sharing!",
        "Interesting perspective 🤔",
        "Let me think about that...",
        "Great question!"
      ];
      
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        senderId: "2",
        senderName: "Bob Smith",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        roomId: selectedRoom,
        isRead: false
      };

      setMessages(prev => [...prev, responseMessage]);
      
      // Show notification for received message
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("New message from Bob Smith", {
          body: responseMessage.content,
          icon: "/favicon.ico"
        });
      }
    }, 2000);
  };

  const handleTyping = (value: string) => {
    setMessage(value);
    if (!isTyping && value.length > 0) {
      setIsTyping(true);
    }
  };

  const handleReaction = (messageId: string, emoji: string) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const reactions = { ...msg.reactions };
        if (reactions[emoji]) {
          if (reactions[emoji].includes(currentUser.id)) {
            reactions[emoji] = reactions[emoji].filter(id => id !== currentUser.id);
            if (reactions[emoji].length === 0) {
              delete reactions[emoji];
            }
          } else {
            reactions[emoji].push(currentUser.id);
          }
        } else {
          reactions[emoji] = [currentUser.id];
        }
        return { ...msg, reactions };
      }
      return msg;
    }));
  };

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-gray-900">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {currentRoom?.type === 'public' ? (
                <Hash className="w-5 h-5 text-gray-500" />
              ) : (
                <span className="text-xl">{users.find(u => u.id === "1")?.avatar}</span>
              )}
              <h2 className="text-lg font-semibold">{currentRoom?.name}</h2>
            </div>
            {currentRoom?.type === 'public' && (
              <Badge variant="secondary" className="ml-2">
                <Users className="w-3 h-3 mr-1" />
                {roomParticipants.length} members
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost">
              <Phone className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost">
              <Video className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost">
              <Pin className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {currentRoom?.type === 'public' && (
          <p className="text-sm text-gray-500 mt-1">
            Welcome to #{currentRoom.name}! This is the beginning of your conversation.
          </p>
        )}
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <MessageItem
              key={msg.id}
              message={msg}
              currentUserId={currentUser.id}
              onReaction={handleReaction}
            />
          ))}
          
          {typingUsers.length > 0 && (
            <TypingIndicator users={typingUsers} />
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <form onSubmit={handleSendMessage} className="flex items-end gap-2">
          <div className="flex-1 relative">
            <Input
              value={message}
              onChange={(e) => handleTyping(e.target.value)}
              placeholder={`Message #${currentRoom?.name || 'chat'}`}
              className="pr-20"
              multiline
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
              <Button type="button" size="sm" variant="ghost" className="h-8 w-8 p-0">
                <Paperclip className="w-4 h-4" />
              </Button>
              <Button type="button" size="sm" variant="ghost" className="h-8 w-8 p-0">
                <Smile className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <Button type="submit" disabled={!message.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
        
        {isTyping && (
          <p className="text-xs text-gray-500 mt-1">
            {currentUser.username} is typing...
          </p>
        )}
      </div>
    </div>
  );
};
