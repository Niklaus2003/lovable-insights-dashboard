import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { History, ChevronRight, Ticket, CheckCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Session } from "@/lib/mockData";
import { TranscriptViewer } from "./TranscriptViewer";

interface SessionHistoryProps {
  sessions: Session[];
}

export function SessionHistory({ sessions }: SessionHistoryProps) {
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString([], { 
      month: "short", 
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getDuration = (session: Session) => {
    if (!session.endedAt) return "Ongoing";
    return `${Math.round((session.endedAt - session.startedAt) / 60000)} min`;
  };

  return (
    <>
      <Card className="glass-card animate-fade-in">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-primary/10 p-2">
              <History className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-base font-semibold">Previous Sessions</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="max-h-[400px]">
            <div className="divide-y divide-border">
              {sessions.map((session, index) => (
                <button
                  key={session.sessionId}
                  onClick={() => setSelectedSession(session)}
                  className="flex w-full items-center justify-between gap-4 p-4 text-left transition-colors hover:bg-secondary/50 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">{session.sessionId}</span>
                      {session.ticketRaised ? (
                        <Badge className="status-badge status-warning">
                          <Ticket className="mr-1 h-3 w-3" />
                          Ticket
                        </Badge>
                      ) : (
                        <Badge className="status-badge status-success">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Resolved
                        </Badge>
                      )}
                    </div>
                    <p className="truncate text-xs text-muted-foreground">
                      {session.summary?.issue || "No summary available"}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{formatDate(session.startedAt)}</span>
                      <span>•</span>
                      <span>{getDuration(session)}</span>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                </button>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Dialog open={!!selectedSession} onOpenChange={() => setSelectedSession(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span>Session Details</span>
              <Badge variant="outline">{selectedSession?.sessionId}</Badge>
            </DialogTitle>
          </DialogHeader>
          {selectedSession && (
            <div className="flex flex-col gap-4 min-h-0 flex-1">
              {selectedSession.summary && (
                <div className="space-y-2 rounded-lg bg-secondary/50 p-4 shrink-0">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Summary</p>
                  <p className="text-sm text-foreground">{selectedSession.summary.issue}</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <Badge variant="outline">{selectedSession.summary.category}</Badge>
                    <Badge variant={selectedSession.ticketRaised ? "destructive" : "default"} className={selectedSession.ticketRaised ? "bg-warning text-warning-foreground" : "bg-success text-success-foreground"}>
                      {selectedSession.ticketRaised ? "Ticket Raised" : "Resolved"}
                    </Badge>
                  </div>
                </div>
              )}
              <div className="flex flex-col min-h-0 flex-1">
                <p className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wide shrink-0">Transcript</p>
                <ScrollArea className="flex-1 max-h-[400px]">
                  <TranscriptViewer transcripts={selectedSession.transcripts} maxHeight="none" />
                </ScrollArea>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
