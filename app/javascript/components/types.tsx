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
  status: typeof eventStatus[number];
  remarks: string;
};

export const eventStatus = ["approved", "rejected", "submitted"] as const;
export const reportStatus = ["submitted", "reviewed"] as const;

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
