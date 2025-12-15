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

export interface DashboardData {
  activeSession: Session | null;
  history: Session[];
  stats: {
    totalSessions: number;
    ticketsRaised: number;
    avgDuration: number;
  };
}

export const mockData: DashboardData = {
  activeSession: {
    sessionId: "session-123",
    startedAt: Date.now() - 300000,
    ticketRaised: true,
    transcripts: [
      { speaker: "user", text: "Hi, my WiFi is not working since this morning. I've tried restarting the router but it still doesn't connect.", timestamp: Date.now() - 280000 },
      { speaker: "agent", text: "I understand how frustrating that can be. Let me help you troubleshoot this. First, can you tell me if other devices can connect to the same WiFi network?", timestamp: Date.now() - 270000 },
      { speaker: "user", text: "Actually, my phone connects fine. It's just my laptop that won't connect.", timestamp: Date.now() - 250000 },
      { speaker: "agent", text: "That's helpful information. This suggests the issue is with your laptop's network adapter rather than the router. Let's try a few steps. First, please click on the WiFi icon in your taskbar and select 'Forget' on your network, then try reconnecting.", timestamp: Date.now() - 240000 },
      { speaker: "user", text: "Okay, I did that. Now it's asking for the password again.", timestamp: Date.now() - 220000 },
      { speaker: "agent", text: "Perfect, please enter your WiFi password and let me know if it connects successfully.", timestamp: Date.now() - 210000 },
      { speaker: "user", text: "It's still not working. It says 'Can't connect to this network'.", timestamp: Date.now() - 180000 },
      { speaker: "agent", text: "I see. Let's try resetting the network adapter. Open Command Prompt as administrator and type: netsh winsock reset. Then restart your laptop.", timestamp: Date.now() - 170000 },
    ],
    summary: {
      issue: "Laptop unable to connect to WiFi network while other devices work fine",
      category: "Network",
      resolution: "In Progress - Network adapter reset recommended",
      escalationRequired: true,
    },
  },
  history: [
    {
      sessionId: "session-122",
      startedAt: Date.now() - 86400000,
      endedAt: Date.now() - 86200000,
      ticketRaised: false,
      transcripts: [
        { speaker: "user", text: "How do I reset my password?", timestamp: Date.now() - 86400000 },
        { speaker: "agent", text: "I can help you with that. Please go to the login page and click 'Forgot Password'. You'll receive a reset link via email.", timestamp: Date.now() - 86350000 },
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
        { speaker: "user", text: "My Outlook keeps crashing whenever I open it.", timestamp: Date.now() - 172800000 },
        { speaker: "agent", text: "I'm sorry to hear that. Let's troubleshoot this together. When did this issue start?", timestamp: Date.now() - 172750000 },
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
        { speaker: "agent", text: "Of course! I'll walk you through the VPN setup process step by step.", timestamp: Date.now() - 259150000 },
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
        { speaker: "agent", text: "I can help with that. Access requests require manager approval. I'll create a ticket for you.", timestamp: Date.now() - 345550000 },
      ],
      summary: {
        issue: "Shared drive access request",
        category: "Access",
        resolution: "Ticket raised - Pending manager approval",
        escalationRequired: true,
      },
    },
  ],
  stats: {
    totalSessions: 156,
    ticketsRaised: 42,
    avgDuration: 8.5,
  },
};

export const chartData = {
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
