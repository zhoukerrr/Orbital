export type EventType = "approved" | "rejected" | "submitted";
export type UserType = "admin" | "organiser" | "student";
export type Event = {
  id: number;
  name: string;
  details: string;
  user_id: number;
  summary: string;
  tag: string;
  venue: string;
  start_date: Date;
  end_date: Date;
  skills: string;
  link: string;
  poster: string;
  contact: string;
  status: string;
  remarks: string;
};

export const ReportStatus: string[] = ["submitted", "reviewed"];

export const tags: string[] = [
  "Animal Welfare",
  "Arts and Heritage",
  "Children and Youth",
  "Community",
  "Disability",
  "Education",
  "Elderly",
  "Environment",
  "Families",
  "Health",
  "Humanitarian",
  "Social Service",
  "Sports",
  "Women and Girls",
];
