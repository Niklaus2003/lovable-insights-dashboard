import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { ActiveSessionPanel } from "@/components/dashboard/ActiveSessionPanel";
import { AISummary } from "@/components/dashboard/AISummary";
import { SessionHistory } from "@/components/dashboard/SessionHistory";
import { DashboardCharts } from "@/components/dashboard/DashboardCharts";
import { mockData } from "@/lib/mockData";
import { Helmet } from "react-helmet-async";

export default function Dashboard() {
  return (
    <>
      <Helmet>
        <title>IT Helpdesk Dashboard | AI-Powered Support Insights</title>
        <meta name="description" content="Monitor AI-powered IT helpdesk sessions, track ticket resolutions, and analyze support performance in real-time." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        
        <main className="container px-4 py-6 md:px-6 lg:py-8">
          <div className="space-y-6 lg:space-y-8">
            {/* Stats Overview */}
            <section>
              <StatsCards data={mockData} />
            </section>

            {/* Active Session & AI Summary */}
            <section className="grid gap-4 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <ActiveSessionPanel session={mockData.activeSession} />
              </div>
              <div>
                <AISummary session={mockData.activeSession} />
              </div>
            </section>

            {/* Charts */}
            <section>
              <DashboardCharts />
            </section>

            {/* Session History */}
            <section>
              <SessionHistory sessions={mockData.history} />
            </section>
          </div>
        </main>
      </div>
    </>
  );
}
