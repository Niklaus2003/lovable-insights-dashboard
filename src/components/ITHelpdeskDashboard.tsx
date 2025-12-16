import { useState, useMemo } from "react";
import { 
  MessageSquare, Ticket, Clock, CheckCircle, History, ChevronRight, 
  Search, Brain, Tag, AlertTriangle, TrendingUp, PieChart as PieChartIcon,
  Sun, Moon
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// ============= TYPES =============
export interface TranscriptMessage {
  speaker: "user" | "agent";
  text: string;
  timestamp: number;
}

export interface Session {
  sessionId: string;
  startedAt: number;
  endedAt?: number;
  ticketRaised: boolean;
  transcripts: TranscriptMessage[];
  summary?: {
    issue: string;
    category: string;
    resolution: string;
    escalationRequired: boolean;
  };
}

export interface DashboardStats {
  totalSessions: number;
  ticketsRaised: number;
  resolvedSessions: number;
  avgDuration: number;
}

export interface ChartData {
  sessionsOverTime: { date: string; sessions: number; tickets: number }[];
  issueCategories: { name: string; value: number; fill: string }[];
}

export interface ITHelpdeskDashboardProps {
  sessions: Session[];
  stats: DashboardStats;
  chartData: ChartData;
  title?: string;
  subtitle?: string;
  showThemeToggle?: boolean;
  onThemeToggle?: () => void;
  isDarkMode?: boolean;
}

// ============= TRANSCRIPT VIEWER =============
function TranscriptViewer({ transcripts }: { transcripts: TranscriptMessage[] }) {
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="space-y-3">
      {transcripts.map((message, index) => (
        <div
          key={index}
          className={`flex ${message.speaker === "user" ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
              message.speaker === "user"
                ? "bg-primary text-primary-foreground rounded-br-md"
                : "bg-secondary text-secondary-foreground rounded-bl-md"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-medium uppercase opacity-70">
                {message.speaker === "user" ? "User" : "AI Agent"}
              </span>
              <span className="text-[10px] opacity-50">{formatTime(message.timestamp)}</span>
            </div>
            <p className="text-sm leading-relaxed">{message.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ============= STATS CARDS =============
function StatsCards({ stats }: { stats: DashboardStats }) {
  const cards = [
    { title: "Total Sessions", value: stats.totalSessions, icon: MessageSquare, description: "All time" },
    { title: "Tickets Raised", value: stats.ticketsRaised, icon: Ticket, description: `${Math.round((stats.ticketsRaised / stats.totalSessions) * 100)}% escalation rate` },
    { title: "Resolved", value: stats.resolvedSessions, icon: CheckCircle, description: "Without tickets", highlight: true },
    { title: "Avg Duration", value: `${stats.avgDuration} min`, icon: Clock, description: "Per session" },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((stat, index) => (
        <Card key={stat.title} className="glass-card animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <p className={`text-2xl font-semibold ${stat.highlight ? "text-success" : "text-foreground"}`}>
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </div>
              <div className={`rounded-lg p-2 ${stat.highlight ? "bg-success/10" : "bg-primary/10"}`}>
                <stat.icon className={`h-5 w-5 ${stat.highlight ? "text-success" : "text-primary"}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// ============= CHARTS =============
function DashboardCharts({ chartData }: { chartData: ChartData }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card className="glass-card animate-fade-in">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-primary/10 p-2">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-base font-semibold">Sessions This Week</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData.sessionsOverTime} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--muted))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Bar dataKey="sessions" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} name="Sessions" />
              <Bar dataKey="tickets" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} name="Tickets" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 flex items-center justify-center gap-6 text-xs">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: 'hsl(var(--chart-1))' }} />
              <span className="text-muted-foreground">Sessions</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: 'hsl(var(--chart-3))' }} />
              <span className="text-muted-foreground">Tickets</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card animate-fade-in" style={{ animationDelay: "100ms" }}>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-primary/10 p-2">
              <PieChartIcon className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-base font-semibold">Issue Categories</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={chartData.issueCategories}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
                stroke="none"
                style={{ outline: 'none' }}
              >
                {chartData.issueCategories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} style={{ outline: 'none' }} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-4 text-xs">
            {chartData.issueCategories.slice(0, 4).map((item) => (
              <div key={item.name} className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.fill }} />
                <span className="text-muted-foreground">{item.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ============= SESSION HISTORY =============
function SessionHistory({ sessions }: { sessions: Session[] }) {
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
    return new Date(timestamp).toLocaleDateString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
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
              <CardTitle className="text-base font-semibold">All Sessions</CardTitle>
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
          <ScrollArea className="h-[400px]">
            <div className="divide-y divide-border">
              {filteredSessions.length === 0 ? (
                <div className="flex items-center justify-center p-8 text-center">
                  <p className="text-sm text-muted-foreground">
                    {searchQuery ? `No sessions found matching "${searchQuery}"` : "No sessions yet"}
                  </p>
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
                  <TranscriptViewer transcripts={selectedSession.transcripts} />
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

// ============= MAIN DASHBOARD COMPONENT =============
export function ITHelpdeskDashboard({
  sessions,
  stats,
  chartData,
  title = "IT Helpdesk Dashboard",
  subtitle = "AI-powered support insights",
  showThemeToggle = true,
  onThemeToggle,
  isDarkMode = false,
}: ITHelpdeskDashboardProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <MessageSquare className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">{title}</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">{subtitle}</p>
            </div>
          </div>
          
          {showThemeToggle && onThemeToggle && (
            <Button variant="ghost" size="icon" onClick={onThemeToggle} className="h-9 w-9">
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container px-4 py-6 md:px-6 lg:py-8">
        <div className="space-y-6 lg:space-y-8">
          {/* Stats */}
          <section>
            <StatsCards stats={stats} />
          </section>

          {/* Charts */}
          <section>
            <DashboardCharts chartData={chartData} />
          </section>

          {/* All Sessions */}
          <section>
            <SessionHistory sessions={sessions} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default ITHelpdeskDashboard;
