export type ExerciseType = 'time' | 'reps';
export interface Exercise {
  author: string;
  equipment: string[];
  id: string;
  muscleGroups: string[];
  name: string;
  notes: string;
  skills: string[];
  src?: string;
}

export interface LiveExercise extends Exercise {
  alternateId: string;
  count: number;
  type: ExerciseType;
}

export interface Session {
  author: string;
  datetime: string;
  exercises: Exercise[];
  id: string;
  instructor: string;
  name: string;
  notes: string;
}

export interface LiveSession extends Session {
  activeExercise?: string[];
  participants?: string[];
}

export type ResourceType = 'article' | 'video';
export interface Resource {
  id: string;
  title: string;
  to: string;
  tags: string[];
  type: ResourceType;
}

export interface Tag {
  id: string;
  color?: string;
  text?: string;
  src?: string;
}
