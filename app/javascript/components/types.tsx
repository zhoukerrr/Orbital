export type EventType = "approved" | "rejected" | "submitted";
export type UserType = "admin" | "organiser" | "student";
export type Event = {
    name: string;
    details: string;
    user_id: number;
    venue: string;
    // TODO: the type is not entirely Date, may have to do some convertion here
    start_date: any;
    end_date: any;
    skills: string;
    link: string;
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
