export type EventType = "approved" | "rejected" | "submitted";
export type UserType = "admin" | "organiser" | "student";
export type Event = {
  name: string;
  details: string;
  user_id: number;
  summary: string;
  tag: string;
  venue: string;
  start_date: string | Date;
  end_date: string | Date;
  skills: string;
  link: string;
  poster: string;
  contact: string;
  status: string;
  remarks: string;
};

export const tags: string[] = [
  "Environment",
  "Fund-Raising",
  "Senior",
  "Teaching",
  "Technology",
  "Youth",
  "Overseas",
  "Others",
];
