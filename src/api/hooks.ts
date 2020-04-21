import * as api from './';
import data from 'content/data.json';

// const [sessions, setSessions] = useState<api.Session[]>([]);
// const Session = Parse.Object.extend('Session');
// const query = new Parse.Query(Session);
// const fetchSessions = async () => {
//   let subscription: any = await query.subscribe();
//   subscription.on('update', (object: any) => {
//     console.log(object);
//     setSessions(object);
//   });
// };
// console.log(sessions);

export const toExercise = (s: any) => s as api.Exercise;
export const fetchExercises = () => data.exercises.map((e) => toExercise(e));

export const toSession = (s: any) => s as api.Session;
export const fetchSessions = () => data.sessions.map((s) => toSession(s));

export const toResource = (r: any) => r as api.Resource;
export const fetchResources = () => data.resources.map((r) => toResource(r));

export const toTag = (t: any) => t as api.Tag;
export const fetchTags = () => data.tags.map((t) => toTag(t));
