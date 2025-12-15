import { User, Bot } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { TranscriptMessage } from "@/lib/mockData";

interface TranscriptViewerProps {
  transcripts: TranscriptMessage[];
  maxHeight?: string;
}

export function TranscriptViewer({ transcripts, maxHeight = "400px" }: TranscriptViewerProps) {
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <ScrollArea className="rounded-lg border border-border bg-secondary/30" style={{ maxHeight }}>
      <div className="space-y-3 p-4">
        {transcripts.map((message, index) => (
          <div
            key={index}
            className={`flex gap-3 animate-fade-in ${message.speaker === "user" ? "" : "flex-row-reverse"}`}
            style={{ animationDelay: `${index * 30}ms` }}
          >
            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
              message.speaker === "user" ? "bg-primary/15" : "bg-success/15"
            }`}>
              {message.speaker === "user" ? (
                <User className="h-4 w-4 text-primary" />
              ) : (
                <Bot className="h-4 w-4 text-success" />
              )}
            </div>
            <div className={`flex-1 space-y-1 ${message.speaker === "user" ? "" : "text-right"}`}>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-medium ${
                  message.speaker === "user" ? "text-primary" : "text-success"
                }`}>
                  {message.speaker === "user" ? "User" : "AI Agent"}
                </span>
                <span className="text-xs text-muted-foreground">{formatTime(message.timestamp)}</span>
              </div>
              <div className={`inline-block rounded-lg px-3 py-2 text-sm ${
                message.speaker === "user" 
                  ? "transcript-user text-left" 
                  : "transcript-agent text-left"
              }`}>
                {message.text}
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
