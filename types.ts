
export enum Sender {
  USER = 'user',
  BOT = 'bot'
}

export enum Language {
  EN = 'en',
  AR = 'ar'
}

export interface Attachment {
  name: string;
  mimeType: string;
  data: string; // base64
}

export interface Message {
  id: string;
  sender: Sender;
  text: string;
  attachments?: Attachment[];
  timestamp: Date;
}

export interface APRSection {
  id: string;
  title: string;
  description: string;
  titleAr: string;
  descriptionAr: string;
}
