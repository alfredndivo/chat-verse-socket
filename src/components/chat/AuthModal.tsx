
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Wifi } from "lucide-react";

interface AuthModalProps {
  onLogin: (username: string) => void;
}

export const AuthModal = ({ onLogin }: AuthModalProps) => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Welcome to ChatVerse
            </CardTitle>
            <CardDescription className="flex items-center justify-center gap-2 mt-2">
              <Wifi className="w-4 h-4 text-green-500" />
              Real-time messaging with Socket.io
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full"
                autoFocus
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              disabled={!username.trim()}
            >
              Join Chat
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-gray-600">
            <p>Features included:</p>
            <div className="grid grid-cols-2 gap-1 mt-2 text-xs">
              <span>✅ Real-time messaging</span>
              <span>✅ Multiple rooms</span>
              <span>✅ Private messages</span>
              <span>✅ Typing indicators</span>
              <span>✅ File sharing</span>
              <span>✅ Message reactions</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
