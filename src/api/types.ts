export type ExerciseType = 'time' | 'reps';
export interface Level {
  name?: string;
  notes: string;
}
export type Notes = string | Level[];
export interface Exercise {
  id: string;
  author?: string;
  equipmentIds: string[];
  muscleGroupIds: string[];
  name: string;
  notes?: Notes;
  skillIds: string[];
  src: string;
}

export interface Session {
  id: string;
  author: string;
  exerciseIds: string[];
  name: string;
  notes?: Notes;
}

export interface LiveExercise {
  alternateId: string;
  count: string;
  exerciseId: string;
  setCount: number;
  type: ExerciseType;
}

export interface LiveSession {
  id: string;
  activeExerciseIndex?: number;
  datetime: string;
  duration: string;
  exercises: LiveExercise[];
  instructor: string;
  sessionId: string;
}

export interface Resource {
  id: string;
  notes: string;
  src: string;
  tagIds: string[];
  title: string;
  to: string;
  typeIds: string[];
}

export interface Tag {
  id: string;
  color?: string;
  src?: string;
  text: string;
}
