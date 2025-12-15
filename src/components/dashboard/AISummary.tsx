import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Tag, CheckCircle, AlertTriangle } from "lucide-react";
import type { Session } from "@/lib/mockData";

interface AISummaryProps {
  session: Session | null;
}

export function AISummary({ session }: AISummaryProps) {
  if (!session?.summary) {
    return null;
  }

  const { issue, category, resolution, escalationRequired } = session.summary;

  const categoryColors: Record<string, string> = {
    Network: "bg-chart-1/15 text-chart-1",
    Software: "bg-chart-2/15 text-chart-2",
    Password: "bg-chart-3/15 text-chart-3",
    Hardware: "bg-chart-4/15 text-chart-4",
    Access: "bg-chart-5/15 text-chart-5",
  };

  return (
    <Card className="glass-card animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-primary/10 p-2">
            <Brain className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="text-base font-semibold">AI Summary</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
            <Tag className="h-3 w-3" />
            Issue Summary
          </div>
          <p className="text-sm text-foreground leading-relaxed">{issue}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="space-y-1.5">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Category</p>
            <Badge className={`${categoryColors[category] || "bg-secondary text-secondary-foreground"}`}>
              {category}
            </Badge>
          </div>

          <div className="space-y-1.5">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Escalation</p>
            <Badge className={escalationRequired ? "status-badge status-warning" : "status-badge status-success"}>
              {escalationRequired ? (
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

        <div className="space-y-2 rounded-lg bg-secondary/50 p-3">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Resolution Status</p>
          <p className="text-sm text-foreground">{resolution}</p>
        </div>
      </CardContent>
    </Card>
  );
}
