export interface Course {
  id: number;
  description: string;
  iconUrl: string;
  courseListIcon: string;
  longDescription: string;
  category: string;
  lessonsCount: number;
}

export interface Lesson {
  id: number;
  description: string;
  duration: string;
  seqNo: number;
  courseId: number;
}
