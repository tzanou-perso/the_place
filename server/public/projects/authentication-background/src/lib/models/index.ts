export interface User {
  name?: string;
  email: string;
  sessionId: string;
}

export type Users = User[];

export interface listFeaturesType {
  nonce?: string[];
  connect?: string[];
  language?: string[];
  sasl?: string[];
  starttls?: string[];
}
