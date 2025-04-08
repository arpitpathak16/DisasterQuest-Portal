import { toast } from "@/hooks/use-toast";
import { User } from "@/contexts/UserContext";

// A simple in-memory store to simulate real-time data for demo purposes
// In a real app, this would be backed by a real-time database like Firebase
class CollaborationService {
  private static instance: CollaborationService;
  private sessions: Record<string, SessionData> = {};
  private currentLeaderboard: LeaderboardEntry[] = [];
  private demoLeaderboard: LeaderboardEntry[] = [];
  private eventListeners: Record<string, Function[]> = {};

  private constructor() {
    // Initialize with demo leaderboard data
    this.demoLeaderboard = [
      {
        id: "demo-1",
        name: "DisasterMaster",
        points: 3450,
        badges: 15,
        challenges: 42,
        joinedAt: new Date("2023-08-15"),
      },
      {
        id: "demo-2",
        name: "PreparedHero",
        points: 2950,
        badges: 12,
        challenges: 38,
        joinedAt: new Date("2023-09-01"),
      },
      {
        id: "demo-3",
        name: "EmergencyPro",
        points: 2800,
        badges: 14,
        challenges: 35,
        joinedAt: new Date("2023-09-15"),
      },
      {
        id: "demo-4",
        name: "ResilienceQueen",
        points: 2650,
        badges: 11,
        challenges: 32,
        joinedAt: new Date("2023-10-01"),
      },
      {
        id: "demo-5",
        name: "ReadyResponder",
        points: 2400,
        badges: 10,
        challenges: 30,
        joinedAt: new Date("2023-10-15"),
      },
    ];

    // Load saved leaderboard from localStorage if available
    this.loadLeaderboardFromStorage();
  }

  private loadLeaderboardFromStorage() {
    try {
      const savedLeaderboard = localStorage.getItem("disasterQuestLeaderboard");
      if (savedLeaderboard) {
        const parsedLeaderboard = JSON.parse(savedLeaderboard);
        // Convert date strings back to Date objects
        this.currentLeaderboard = parsedLeaderboard.map((entry: any) => ({
          ...entry,
          joinedAt: new Date(entry.joinedAt),
        }));
      }
    } catch (error) {
      console.error("Failed to load leaderboard from storage:", error);
    }
  }

  private saveLeaderboardToStorage() {
    try {
      localStorage.setItem(
        "disasterQuestLeaderboard",
        JSON.stringify(this.currentLeaderboard)
      );
    } catch (error) {
      console.error("Failed to save leaderboard to storage:", error);
    }
  }

  public static getInstance(): CollaborationService {
    if (!CollaborationService.instance) {
      CollaborationService.instance = new CollaborationService();
    }
    return CollaborationService.instance;
  }

  // Create or join a session
  public joinSession(sessionId: string, user: User): void {
    if (!this.sessions[sessionId]) {
      // Create new session
      this.sessions[sessionId] = {
        id: sessionId,
        participants: [],
        startTime: new Date(),
        activeChallenge: null,
      };
    }

    // Check if user is already in session
    const existingParticipant = this.sessions[sessionId].participants.find(
      (p) => p.id === user.id
    );
    if (!existingParticipant) {
      this.sessions[sessionId].participants.push(user);
      this.emitEvent("session-updated", this.sessions[sessionId]);
      toast({
        title: "Joined Session",
        description: `You've joined collaboration session ${sessionId}`,
      });
    }
  }

  // Leave a session
  public leaveSession(sessionId: string, userId: string): void {
    if (!this.sessions[sessionId]) return;

    this.sessions[sessionId].participants = this.sessions[
      sessionId
    ].participants.filter((p) => p.id !== userId);

    // If no participants left, clean up the session
    if (this.sessions[sessionId].participants.length === 0) {
      delete this.sessions[sessionId];
    } else {
      this.emitEvent("session-updated", this.sessions[sessionId]);
    }
  }

  // Get all active sessions
  public getActiveSessions(): SessionData[] {
    return Object.values(this.sessions);
  }

  // Get a specific session
  public getSession(sessionId: string): SessionData | null {
    return this.sessions[sessionId] || null;
  }

  // Start a challenge in a session
  public startChallenge(sessionId: string, challengeId: string): void {
    if (!this.sessions[sessionId]) return;

    this.sessions[sessionId].activeChallenge = challengeId;
    this.emitEvent("session-updated", this.sessions[sessionId]);
    toast({
      title: "Challenge Started",
      description: `Challenge ${challengeId} has started in session ${sessionId}`,
    });
  }

  // End a challenge in a session
  public endChallenge(sessionId: string): void {
    if (!this.sessions[sessionId]) return;

    this.sessions[sessionId].activeChallenge = null;
    this.emitEvent("session-updated", this.sessions[sessionId]);
    toast({
      title: "Challenge Ended",
      description: `The challenge in session ${sessionId} has ended`,
    });
  }

  // Update the leaderboard with a user's data
  public updateLeaderboard(user: User): void {
    // Find if user already exists in leaderboard
    const existingIndex = this.currentLeaderboard.findIndex(
      (entry) => entry.id === user.id
    );

    const leaderboardEntry: LeaderboardEntry = {
      id: user.id,
      name: user.name,
      points: user.points,
      badges: user.badges.length,
      challenges: user.completedChallenges.length,
      joinedAt: user.joinedAt,
    };

    if (existingIndex >= 0) {
      // Update existing entry
      this.currentLeaderboard[existingIndex] = leaderboardEntry;
    } else {
      // Add new entry
      this.currentLeaderboard.push(leaderboardEntry);
    }

    // Sort leaderboard by points (descending)
    this.currentLeaderboard.sort((a, b) => b.points - a.points);

    // Save to localStorage
    this.saveLeaderboardToStorage();

    // Notify subscribers
    this.emitEvent("leaderboard-updated", this.currentLeaderboard);
  }

  // Get the current leaderboard
  public getLeaderboard(isDemo: boolean = false): LeaderboardEntry[] {
    return isDemo ? this.demoLeaderboard : this.currentLeaderboard;
  }

  // Subscribe to events
  public subscribe(event: string, callback: Function): void {
    if (!this.eventListeners[event]) {
      this.eventListeners[event] = [];
    }
    this.eventListeners[event].push(callback);
  }

  // Unsubscribe from events
  public unsubscribe(event: string, callback: Function): void {
    if (!this.eventListeners[event]) return;
    this.eventListeners[event] = this.eventListeners[event].filter(
      (cb) => cb !== callback
    );
  }

  // Emit an event to all subscribers
  private emitEvent(event: string, data: any): void {
    if (!this.eventListeners[event]) return;
    this.eventListeners[event].forEach((callback) => callback(data));
  }
}

export interface SessionData {
  id: string;
  participants: User[];
  startTime: Date;
  activeChallenge: string | null;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  points: number;
  badges: number;
  challenges: number;
  joinedAt: Date;
}

export default CollaborationService.getInstance();

