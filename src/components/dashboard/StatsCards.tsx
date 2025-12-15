import { MessageSquare, Ticket, Clock, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { DashboardData } from "@/lib/mockData";

interface StatsCardsProps {
  data: DashboardData;
}

export function StatsCards({ data }: StatsCardsProps) {
  const stats = [
    {
      title: "Total Sessions",
      value: data.stats.totalSessions,
      icon: MessageSquare,
      description: "All time",
    },
    {
      title: "Active Session",
      value: data.activeSession ? "Yes" : "No",
      icon: Activity,
      description: data.activeSession ? "In progress" : "None active",
      highlight: !!data.activeSession,
    },
    {
      title: "Tickets Raised",
      value: data.stats.ticketsRaised,
      icon: Ticket,
      description: `${Math.round((data.stats.ticketsRaised / data.stats.totalSessions) * 100)}% escalation rate`,
    },
    {
      title: "Avg Duration",
      value: `${data.stats.avgDuration} min`,
      icon: Clock,
      description: "Per session",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
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
