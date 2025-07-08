
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  MessageCircle, 
  Hash, 
  Users, 
  Settings, 
  LogOut, 
  Plus,
  Search,
  Wifi,
  WifiOff
} from "lucide-react";
import { User, Room } from "../ChatApp";
import { Input } from "@/components/ui/input";

interface SidebarProps {
  currentUser: User;
  users: User[];
  rooms: Room[];
  selectedRoom: string;
  onRoomSelect: (roomId: string) => void;
  onLogout: () => void;
}

export const Sidebar = ({ 
  currentUser, 
  users, 
  rooms, 
  selectedRoom, 
  onRoomSelect, 
  onLogout 
}: SidebarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRooms = rooms.filter(room => 
    room.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onlineUsers = users.filter(user => user.isOnline);

  return (
    <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg">ChatVerse</h1>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <Wifi className="w-3 h-3 text-green-500" />
              Socket.io Connected
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search rooms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        {/* Rooms Section */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
              Channels
            </h2>
            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="space-y-1">
            {filteredRooms
              .filter(room => room.type === 'public')
              .map((room) => (
                <Button
                  key={room.id}
                  variant={selectedRoom === room.id ? "secondary" : "ghost"}
                  className="w-full justify-between h-8"
                  onClick={() => onRoomSelect(room.id)}
                >
                  <div className="flex items-center gap-2">
                    <Hash className="w-4 h-4" />
                    <span className="text-sm">{room.name}</span>
                  </div>
                  {room.unreadCount && room.unreadCount > 0 && (
                    <Badge variant="destructive" className="h-5 text-xs">
                      {room.unreadCount}
                    </Badge>
                  )}
                </Button>
              ))}
          </div>
        </div>

        <Separator />

        {/* Direct Messages */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
              Direct Messages
            </h2>
            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="space-y-1">
            {filteredRooms
              .filter(room => room.type === 'private')
              .map((room) => (
                <Button
                  key={room.id}
                  variant={selectedRoom === room.id ? "secondary" : "ghost"}
                  className="w-full justify-between h-8"
                  onClick={() => onRoomSelect(room.id)}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{users.find(u => u.id === "1")?.avatar}</span>
                    <span className="text-sm">{room.name}</span>
                  </div>
                  {room.unreadCount && room.unreadCount > 0 && (
                    <Badge variant="destructive" className="h-5 text-xs">
                      {room.unreadCount}
                    </Badge>
                  )}
                </Button>
              ))}
          </div>
        </div>

        <Separator />

        {/* Online Users */}
        <div className="p-4">
          <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-3">
            Online — {onlineUsers.length}
          </h2>
          <div className="space-y-2">
            {onlineUsers.map((user) => (
              <div key={user.id} className="flex items-center gap-2 p-1">
                <div className="relative">
                  <span className="text-lg">{user.avatar}</span>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">{user.username}</span>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <span className="text-lg">{currentUser.avatar}</span>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{currentUser.username}</p>
              <p className="text-xs text-green-600">Online</p>
            </div>
          </div>
          <div className="flex gap-1">
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
              <Settings className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={onLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
