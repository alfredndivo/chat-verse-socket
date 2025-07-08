
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  MoreHorizontal, 
  Reply, 
  Copy, 
  Trash2,
  Download,
  ExternalLink
} from "lucide-react";
import { Message } from "../ChatApp";
import { formatDistanceToNow } from "date-fns";

interface MessageItemProps {
  message: Message;
  currentUserId: string;
  onReaction: (messageId: string, emoji: string) => void;
}

export const MessageItem = ({ message, currentUserId, onReaction }: MessageItemProps) => {
  const [showActions, setShowActions] = useState(false);
  const isOwnMessage = message.senderId === currentUserId;

  const commonEmojis = ["👍", "❤️", "😂", "😮", "😢", "😡"];

  const handleReactionClick = (emoji: string) => {
    onReaction(message.id, emoji);
  };

  return (
    <div
      className={`group flex items-start gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors ${
        isOwnMessage ? "flex-row-reverse" : ""
      }`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
          {message.senderName.charAt(0)}
        </div>
      </div>

      {/* Message Content */}
      <div className={`flex-1 min-w-0 ${isOwnMessage ? "text-right" : ""}`}>
        {/* Header */}
        <div className={`flex items-center gap-2 mb-1 ${isOwnMessage ? "flex-row-reverse" : ""}`}>
          <span className="font-semibold text-sm">{message.senderName}</span>
          <span className="text-xs text-gray-500">
            {formatDistanceToNow(message.timestamp, { addSuffix: true })}
          </span>
          {!message.isRead && !isOwnMessage && (
            <Badge variant="destructive" className="h-4 text-xs">New</Badge>
          )}
        </div>

        {/* Message Body */}
        {message.type === 'image' ? (
          <Card className="p-2 max-w-sm">
            <img 
              src={message.fileUrl} 
              alt={message.fileName}
              className="rounded-lg w-full h-auto max-h-60 object-cover"
            />
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm text-gray-600">{message.fileName}</span>
              <div className="flex gap-1">
                <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                  <Download className="w-3 h-3" />
                </Button>
                <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          <div className={`bg-gray-100 dark:bg-gray-700 rounded-lg p-3 inline-block max-w-md ${
            isOwnMessage ? "bg-blue-500 text-white" : ""
          }`}>
            <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
          </div>
        )}

        {/* Reactions */}
        {message.reactions && Object.keys(message.reactions).length > 0 && (
          <div className={`flex gap-1 mt-2 flex-wrap ${isOwnMessage ? "justify-end" : ""}`}>
            {Object.entries(message.reactions).map(([emoji, users]) => (
              <Button
                key={emoji}
                variant="outline"
                size="sm"
                className="h-6 px-2 text-xs"
                onClick={() => handleReactionClick(emoji)}
              >
                {emoji} {users.length}
              </Button>
            ))}
          </div>
        )}

        {/* Quick Reactions (on hover) */}
        {showActions && (
          <div className={`flex items-center gap-1 mt-2 ${isOwnMessage ? "justify-end" : ""}`}>
            {commonEmojis.map((emoji) => (
              <Button
                key={emoji}
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 hover:bg-gray-200 dark:hover:bg-gray-600"
                onClick={() => handleReactionClick(emoji)}
              >
                {emoji}
              </Button>
            ))}
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <Reply className="w-3 h-3" />
            </Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <Copy className="w-3 h-3" />
            </Button>
            {isOwnMessage && (
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Trash2 className="w-3 h-3" />
              </Button>
            )}
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <MoreHorizontal className="w-3 h-3" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
