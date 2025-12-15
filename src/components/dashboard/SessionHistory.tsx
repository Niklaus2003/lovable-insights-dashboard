import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { History, ChevronRight, Ticket, CheckCircle, Search, Brain, Tag, AlertTriangle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Session } from "@/lib/mockData";
import { TranscriptViewer } from "./TranscriptViewer";

interface SessionHistoryProps {
  sessions: Session[];
}

export function SessionHistory({ sessions }: SessionHistoryProps) {
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("transcript");

  const filteredSessions = useMemo(() => {
    if (!searchQuery.trim()) return sessions;
    const query = searchQuery.toLowerCase();
    return sessions.filter(session => 
      session.sessionId.toLowerCase().includes(query) ||
      session.summary?.issue.toLowerCase().includes(query) ||
      session.summary?.category.toLowerCase().includes(query) ||
      session.transcripts.some(t => t.text.toLowerCase().includes(query))
    );
  }, [sessions, searchQuery]);

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

  const categoryColors: Record<string, string> = {
    Network: "bg-chart-1/15 text-chart-1",
    Software: "bg-chart-2/15 text-chart-2",
    Password: "bg-chart-3/15 text-chart-3",
    Hardware: "bg-chart-4/15 text-chart-4",
    Access: "bg-chart-5/15 text-chart-5",
  };

  return (
    <>
      <Card className="glass-card animate-fade-in">
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <History className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-base font-semibold">Session History</CardTitle>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Search sessions..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 bg-secondary/50"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="max-h-[400px]">
            <div className="divide-y divide-border">
              {filteredSessions.length === 0 ? (
                <div className="flex items-center justify-center p-8 text-center">
                  <p className="text-sm text-muted-foreground">No sessions found matching "{searchQuery}"</p>
                </div>
              ) : (
                filteredSessions.map((session, index) => (
                  <button
                    key={session.sessionId}
                    onClick={() => setSelectedSession(session)}
                    className="flex w-full items-center justify-between gap-4 p-4 text-left transition-colors hover:bg-secondary/50 animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="min-w-0 flex-1 space-y-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
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
                        {session.summary?.category && (
                          <Badge className={`${categoryColors[session.summary.category] || "bg-secondary text-secondary-foreground"} text-xs`}>
                            {session.summary.category}
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
                ))
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Dialog open={!!selectedSession} onOpenChange={() => setSelectedSession(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col overflow-hidden p-0">
          <DialogHeader className="px-6 pt-6 pb-0 shrink-0">
            <DialogTitle className="flex items-center gap-2 flex-wrap">
              <span>Session Details</span>
              <Badge variant="outline">{selectedSession?.sessionId}</Badge>
              {selectedSession?.ticketRaised ? (
                <Badge className="status-badge status-warning">
                  <Ticket className="mr-1 h-3 w-3" />
                  Ticket Raised
                </Badge>
              ) : (
                <Badge className="status-badge status-success">
                  <CheckCircle className="mr-1 h-3 w-3" />
                  Resolved
                </Badge>
              )}
            </DialogTitle>
          </DialogHeader>
          
          {selectedSession && (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col flex-1 min-h-0">
              <TabsList className="mx-6 mt-4 shrink-0 grid w-auto grid-cols-2">
                <TabsTrigger value="transcript" className="gap-2">
                  <History className="h-4 w-4" />
                  Transcript
                </TabsTrigger>
                <TabsTrigger value="summary" className="gap-2">
                  <Brain className="h-4 w-4" />
                  AI Summary
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="transcript" className="flex-1 min-h-0 mt-0 px-6 pb-6">
                <ScrollArea className="h-full max-h-[450px] mt-4">
                  <TranscriptViewer transcripts={selectedSession.transcripts} maxHeight="none" />
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="summary" className="flex-1 min-h-0 mt-0 px-6 pb-6">
                <ScrollArea className="h-full max-h-[450px] mt-4">
                  {selectedSession.summary ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          <Tag className="h-3 w-3" />
                          Issue Summary
                        </div>
                        <p className="text-sm text-foreground leading-relaxed">{selectedSession.summary.issue}</p>
                      </div>

                      <div className="flex flex-wrap gap-4">
                        <div className="space-y-1.5">
                          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Category</p>
                          <Badge className={`${categoryColors[selectedSession.summary.category] || "bg-secondary text-secondary-foreground"}`}>
                            {selectedSession.summary.category}
                          </Badge>
                        </div>

                        <div className="space-y-1.5">
                          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Escalation</p>
                          <Badge className={selectedSession.summary.escalationRequired ? "status-badge status-warning" : "status-badge status-success"}>
                            {selectedSession.summary.escalationRequired ? (
                              <>
                                <AlertTriangle className="mr-1 h-3 w-3" />
                                Required
                              </>
                            ) : (
                              <>
                                <CheckCircle className="mr-1 h-3 w-3" />
                                Not Required
                              </>
                            )}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-2 rounded-lg bg-secondary/50 p-4">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Resolution Status</p>
                        <p className="text-sm text-foreground">{selectedSession.summary.resolution}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-32 text-center">
                      <p className="text-sm text-muted-foreground">No AI summary available for this session</p>
                    </div>
                  )}
                </ScrollArea>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
