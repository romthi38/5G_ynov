export interface Conversation {
  id: number;
  label: string;
  status: string;
  lastMessages?: Array<any>;
  members?: Array<any>;
}
