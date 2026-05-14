export type Symptom = 
  | 'cramps' | 'headache' | 'bloating'
  | 'fatigue' | 'mood-swing' | 'acne'
  | 'back-pain' | 'appetite-change' | 'insomnia';

export type Mood = '😭' | '😐' | '😊' | '😄' | '🔥';

export type Flow = 'light' | 'moderate' | 'heavy';

export interface LogEntry {
  date: string; // YYYY-MM-DD
  hasPeriod: boolean;
  flow?: Flow; // Only if hasPeriod
  symptoms: Symptom[];
  mood: Mood;
  notes: string;
}

export interface LogStore {
  logs: Record<string, LogEntry>; // date → entry
  addLog: (entry: LogEntry) => void;
  getLog: (date: string) => LogEntry | undefined;
  removeLog: (date: string) => void;
  clearLogs: () => void;
}
