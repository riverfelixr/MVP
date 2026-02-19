export interface ActivityLog {
  id: string;
  date: string;
  note: string;
  type: 'system' | 'user' | 'task';
}

export interface Lead {
  id: string;
  name: string;
  company: string;
  role: string;
  email: string;
  phone: string;
  serviceOfInterest: string;
  value: number;
  status: 'novo' | 'negociacao' | 'proposta' | 'ganho' | 'perdido';
  tags: string[];
  history: ActivityLog[];
}

export type LeadStatus = Lead['status'];
