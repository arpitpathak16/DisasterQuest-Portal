
import { toast } from '@/hooks/use-toast';
import { User } from '@/contexts/UserContext';

// A simple in-memory store to simulate real-time data for demo purposes
// In a real app, this would be backed by a real-time database like Firebase
class CollaborationService {
  private static instance: CollaborationService;
  private sessions: Record<string, SessionData> = {};
  private globalLeaderboard: LeaderboardEntry[] = [];
  private eventListeners: Record<string, Function[]> = {};

  private constructor() {
    // Initialize with some dummy leaderboard data
    this.globalLeaderboard = [
      { id: 'user-1', name: 'DisasterMaster', points: 3450, badges: 15, challenges: 42, joinedAt: new Date('2023-08-15') },
      { id: 'user-2', name: 'PreparedHero', points: 2950, badges: 12, challenges: 38, joinedAt: new Date('2023-09-01') },
      { id: 'user-3', name: 'EmergencyPro', points: 2800, badges: 14, challenges: 35, joinedAt: new Date('2023-09-15') },
      { id: 'user-4', name: 'ResilienceQueen', points: 2650, badges: 11, challenges: 32, joinedAt: new Date('2023-10-01') },
      { id: 'user-5', name: 'ReadyResponder', points: 2400, badges: 10, challenges: 30, joinedAt: new Date('2023-10-15') },
    ];
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
        activeChallenge: null
      };
    }

    // Check if user is already in session
    const existingParticipant = this.sessions[sessionId].participants.find(p => p.id === user.id);
    if (!existingParticipant) {
      this.sessions[sessionId].participants.push(user);
      this.emitEvent('session-updated', this.sessions[sessionId]);
      toast({
        title: "Joined Session",
        description: `You've joined collaboration session ${sessionId}`,
      });
    }
  }

  // Leave a session
  public leaveSession(sessionId: string, userId: string): void {
    if (!this.sessions[sessionId]) return;

    this.sessions[sessionId].participants = this.sessions[sessionId].participants.filter(p => p.id !== userId);
    
    // If no participants left, clean up the session
    if (this.sessions[sessionId].participants.length === 0) {
      delete this.sessions[sessionId];
    } else {
      this.emitEvent('session-updated', this.sessions[sessionId]);
    }
  }

  // Get session details
  public getSession(sessionId: string): SessionData | null {
    return this.sessions[sessionId] || null;
  }

  // Set active challenge for a session
  public setActiveChallenge(sessionId: string, challengeId: string): void {
    if (!this.sessions[sessionId]) return;
    
    this.sessions[sessionId].activeChallenge = challengeId;
    this.emitEvent('session-updated', this.sessions[sessionId]);
  }

  // Update leaderboard with a new score
  public updateLeaderboard(user: User): void {
    // Find existing entry or create new one
    const existingEntry = this.globalLeaderboard.find(entry => entry.id === user.id);
    
    if (existingEntry) {
      // Update existing entry
      existingEntry.points = user.points;
      existingEntry.badges = user.badges.length;
      existingEntry.challenges = user.completedChallenges.length;
    } else {
      // Add new entry
      this.globalLeaderboard.push({
        id: user.id,
        name: user.name,
        points: user.points,
        badges: user.badges.length,
        challenges: user.completedChallenges.length,
        joinedAt: user.joinedAt
      });
    }
    
    // Sort leaderboard by points (descending)
    this.globalLeaderboard.sort((a, b) => b.points - a.points);
    
    // Emit leaderboard update event
    this.emitEvent('leaderboard-updated', this.globalLeaderboard);
  }

  // Get global leaderboard
  public getLeaderboard(): LeaderboardEntry[] {
    return [...this.globalLeaderboard];
  }

  // Event subscription system
  public subscribe(event: string, callback: Function): void {
    if (!this.eventListeners[event]) {
      this.eventListeners[event] = [];
    }
    this.eventListeners[event].push(callback);
  }

  public unsubscribe(event: string, callback: Function): void {
    if (!this.eventListeners[event]) return;
    this.eventListeners[event] = this.eventListeners[event].filter(cb => cb !== callback);
  }

  private emitEvent(event: string, data: any): void {
    if (!this.eventListeners[event]) return;
    this.eventListeners[event].forEach(callback => callback(data));
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
