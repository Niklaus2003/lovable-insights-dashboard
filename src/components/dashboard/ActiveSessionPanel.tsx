import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Radio, Clock, Ticket } from "lucide-react";
import type { Session } from "@/lib/mockData";
import { TranscriptViewer } from "./TranscriptViewer";

interface ActiveSessionPanelProps {
  session: Session | null;
}

export function ActiveSessionPanel({ session }: ActiveSessionPanelProps) {
  if (!session) {
    return (
      <Card className="glass-card">
        <CardContent className="flex min-h-[200px] items-center justify-center p-6">
          <div className="text-center">
            <Radio className="mx-auto mb-3 h-10 w-10 text-muted-foreground/50" />
            <p className="text-sm font-medium text-muted-foreground">No active session</p>
            <p className="text-xs text-muted-foreground/70">Sessions will appear here in real time</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const duration = Math.round((Date.now() - session.startedAt) / 60000);

  return (
    <Card className="glass-card border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Radio className="h-5 w-5 text-success" />
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-success animate-pulse-soft" />
            </div>
            <CardTitle className="text-base font-semibold">Active Session</CardTitle>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="bg-secondary text-secondary-foreground">
              {session.sessionId}
            </Badge>
            {session.ticketRaised ? (
              <Badge className="status-badge status-warning">
                <Ticket className="mr-1 h-3 w-3" />
                Ticket Raised
              </Badge>
            ) : (
              <Badge className="status-badge status-success">
                Resolved
              </Badge>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>Started {duration} min ago</span>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <ScrollArea className="max-h-[300px]">
          <TranscriptViewer transcripts={session.transcripts} maxHeight="none" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
