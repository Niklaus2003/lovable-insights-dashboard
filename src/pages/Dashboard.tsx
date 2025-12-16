import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { ITHelpdeskDashboard, Session, DashboardStats, ChartData } from "@/components/ITHelpdeskDashboard";

// ============= SAMPLE DATA (Replace with your real data) =============
const sampleSessions: Session[] = [
  {
    sessionId: "session-123",
    startedAt: Date.now() - 300000,
    endedAt: Date.now() - 100000,
    ticketRaised: true,
    transcripts: [
      { speaker: "user", text: "Hi, my WiFi is not working since this morning.", timestamp: Date.now() - 280000 },
      { speaker: "agent", text: "I understand. Let me help you troubleshoot this.", timestamp: Date.now() - 270000 },
      { speaker: "user", text: "My phone connects fine. It's just my laptop.", timestamp: Date.now() - 250000 },
      { speaker: "agent", text: "Let's try forgetting the network and reconnecting.", timestamp: Date.now() - 240000 },
    ],
    summary: {
      issue: "Laptop unable to connect to WiFi network while other devices work fine",
      category: "Network",
      resolution: "Ticket raised for IT team review",
      escalationRequired: true,
    },
  },
  {
    sessionId: "session-122",
    startedAt: Date.now() - 86400000,
    endedAt: Date.now() - 86200000,
    ticketRaised: false,
    transcripts: [
      { speaker: "user", text: "How do I reset my password?", timestamp: Date.now() - 86400000 },
      { speaker: "agent", text: "Go to login page and click 'Forgot Password'.", timestamp: Date.now() - 86350000 },
      { speaker: "user", text: "Got it, thanks!", timestamp: Date.now() - 86300000 },
    ],
    summary: {
      issue: "Password reset request",
      category: "Password",
      resolution: "Resolved - User guided to self-service password reset",
      escalationRequired: false,
    },
  },
  {
    sessionId: "session-121",
    startedAt: Date.now() - 172800000,
    endedAt: Date.now() - 172500000,
    ticketRaised: true,
    transcripts: [
      { speaker: "user", text: "My Outlook keeps crashing.", timestamp: Date.now() - 172800000 },
      { speaker: "agent", text: "When did this issue start?", timestamp: Date.now() - 172750000 },
      { speaker: "user", text: "Since yesterday after the Windows update.", timestamp: Date.now() - 172700000 },
    ],
    summary: {
      issue: "Outlook application crashing after Windows update",
      category: "Software",
      resolution: "Ticket raised for IT team review",
      escalationRequired: true,
    },
  },
  {
    sessionId: "session-120",
    startedAt: Date.now() - 259200000,
    endedAt: Date.now() - 259000000,
    ticketRaised: false,
    transcripts: [
      { speaker: "user", text: "Can you help me set up my VPN?", timestamp: Date.now() - 259200000 },
      { speaker: "agent", text: "Of course! I'll walk you through the setup.", timestamp: Date.now() - 259150000 },
    ],
    summary: {
      issue: "VPN setup assistance",
      category: "Network",
      resolution: "Resolved - VPN configured successfully",
      escalationRequired: false,
    },
  },
  {
    sessionId: "session-119",
    startedAt: Date.now() - 345600000,
    endedAt: Date.now() - 345400000,
    ticketRaised: true,
    transcripts: [
      { speaker: "user", text: "I need access to the finance shared drive.", timestamp: Date.now() - 345600000 },
      { speaker: "agent", text: "Access requests require manager approval. I'll create a ticket.", timestamp: Date.now() - 345550000 },
    ],
    summary: {
      issue: "Shared drive access request",
      category: "Access",
      resolution: "Ticket raised - Pending manager approval",
      escalationRequired: true,
    },
  },
];

const sampleStats: DashboardStats = {
  totalSessions: 156,
  ticketsRaised: 42,
  resolvedSessions: 114, // totalSessions - ticketsRaised
  avgDuration: 8.5,
};

const sampleChartData: ChartData = {
  sessionsOverTime: [
    { date: "Mon", sessions: 24, tickets: 8 },
    { date: "Tue", sessions: 18, tickets: 5 },
    { date: "Wed", sessions: 32, tickets: 12 },
    { date: "Thu", sessions: 28, tickets: 9 },
    { date: "Fri", sessions: 22, tickets: 6 },
    { date: "Sat", sessions: 8, tickets: 1 },
    { date: "Sun", sessions: 6, tickets: 1 },
  ],
  issueCategories: [
    { name: "Network", value: 35, fill: "hsl(var(--chart-1))" },
    { name: "Software", value: 28, fill: "hsl(var(--chart-2))" },
    { name: "Password", value: 22, fill: "hsl(var(--chart-3))" },
    { name: "Hardware", value: 10, fill: "hsl(var(--chart-4))" },
    { name: "Access", value: 5, fill: "hsl(var(--chart-5))" },
  ],
};

// ============= DASHBOARD PAGE =============
export default function Dashboard() {
  const [isDark, setIsDark] = useState(false);

  // Toggle theme (integrate with your existing theme system)
  const handleThemeToggle = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <>
      <Helmet>
        <title>IT Helpdesk Dashboard | AI-Powered Support Insights</title>
        <meta name="description" content="Monitor AI-powered IT helpdesk sessions, track ticket resolutions, and analyze support performance in real-time." />
      </Helmet>
      
      {/* 
        USAGE: Just pass your data as props
        - sessions: Array of session objects (update when new sessions come in)
        - stats: Dashboard statistics object
        - chartData: Chart data for visualizations
        - showThemeToggle: Set to false if you have your own theme toggle
      */}
      <ITHelpdeskDashboard
        sessions={sampleSessions}
        stats={sampleStats}
        chartData={sampleChartData}
        title="IT Helpdesk Dashboard"
        subtitle="AI-powered support insights"
        showThemeToggle={true}
        onThemeToggle={handleThemeToggle}
        isDarkMode={isDark}
      />
    </>
  );
}
