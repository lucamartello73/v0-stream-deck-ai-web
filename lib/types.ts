export type ActionType = "open_url" | "run_webhook";

export interface ButtonConfig {
  id: string;
  row: number;
  col: number;
  label: string;
  actionType: ActionType;
  url?: string;
  webhookUrl?: string;
  payloadTemplate?: string;
}

export interface PageConfig {
  id: string;
  name: string;
  buttons: ButtonConfig[];
}

export interface StreamDeckConfig {
  pages: PageConfig[];
}
