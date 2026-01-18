
export type Role = "user" | "assistant" | "developer";

export type Message = {
  id: string;
  role: Role;
  content: string;
};

export type Messages = Message[];
