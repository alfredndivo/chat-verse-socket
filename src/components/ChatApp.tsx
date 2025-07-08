
import { useState, useEffect } from "react";
import { Sidebar } from "./chat/Sidebar";
import { ChatArea } from "./chat/ChatArea";
import { AuthModal } from "./chat/AuthModal";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

export interface User {
  id: string;
  username: string;
  avatar: string;
  isOnline: boolean;
  lastSeen?: Date;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  roomId: string;
  reactions?: { [emoji: string]: string[] };
  isRead?: boolean;
  type?: 'text' | 'image' | 'file';
  fileUrl?: string;
  fileName?: string;
}

export interface Room {
  id: string;
  name: string;
  type: 'public' | 'private';
  participants: string[];
  unreadCount?: number;
  lastMessage?: Message;
}

const ChatApp = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<string>("general");
  const [showAuth, setShowAuth] = useState(true);
  const { toast } = useToast();

  // Initialize demo data
  const [users] = useState<User[]>([
    { id: "1", username: "Alice Johnson", avatar: "👩‍💼", isOnline: true },
    { id: "2", username: "Bob Smith", avatar: "👨‍💻", isOnline: true },
    { id: "3", username: "Carol Davis", avatar: "👩‍🎨", isOnline: false, lastSeen: new Date(Date.now() - 300000) },
    { id: "4", username: "David Wilson", avatar: "👨‍🔬", isOnline: true },
  ]);

  const [rooms] = useState<Room[]>([
    { 
      id: "general", 
      name: "General", 
      type: "public", 
      participants: ["1", "2", "3", "4"],
      unreadCount: 2
    },
    { 
      id: "random", 
      name: "Random", 
      type: "public", 
      participants: ["1", "2", "4"],
      unreadCount: 0
    },
    { 
      id: "tech-talk", 
      name: "Tech Talk", 
      type: "public", 
      participants: ["1", "2", "3"],
      unreadCount: 5
    },
    { 
      id: "private-alice", 
      name: "Alice Johnson", 
      type: "private", 
      participants: ["1", "current"],
      unreadCount: 1
    }
  ]);

  const handleLogin = (username: string) => {
    const newUser: User = {
      id: "current",
      username,
      avatar: "🤖",
      isOnline: true
    };
    setCurrentUser(newUser);
    setShowAuth(false);
    
    toast({
      title: "Welcome to ChatVerse!",
      description: `Logged in as ${username}`,
    });

    // Simulate notification permission request
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setShowAuth(true);
    toast({
      title: "Logged out",
      description: "Come back soon!",
    });
  };

  if (showAuth) {
    return <AuthModal onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar
        currentUser={currentUser!}
        users={users}
        rooms={rooms}
        selectedRoom={selectedRoom}
        onRoomSelect={setSelectedRoom}
        onLogout={handleLogout}
      />
      <ChatArea
        currentUser={currentUser!}
        selectedRoom={selectedRoom}
        rooms={rooms}
        users={users}
      />
      <Toaster />
    </div>
  );
};

export default ChatApp;
