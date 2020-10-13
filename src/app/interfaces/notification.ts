import { History } from '@interfaces/history';

export interface Notification extends History {
  id: number;
  recipient: number;
  source: string;
  event: number;
  read: boolean;
  client_page?: string;
  subject: string;
  body: string;
}
