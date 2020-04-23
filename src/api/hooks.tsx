import { useEffect, useState } from 'react';
import Parse from 'parse';
import * as api from '.';
import data from 'content/data';

export const toExercise = (s: any) => s as api.Exercise;
export const fetchExercises = () => data.exercises.map((e) => toExercise(e));

export const toSession = (s: any) => ({ ...s } as api.Session);
export const fetchSessions = () => data.sessions.map((s) => toSession(s));
export const useFetchSessions = () => {
  const [sessions, setSessions] = useState<api.Session[]>([]);
  const [loading, setLoading] = useState(true);
  const Session = Parse.Object.extend('Session');
  const query = new Parse.Query(Session);
  const fetchSessions = async () => {
    let results: any = await query.find();
    const newSessions = results.map((res: any) => toSession({ ...res.attributes, id: res.id }));
    setSessions(newSessions);
    setLoading(false);
  };
  useEffect(() => {
    if (sessions.length === 0) {
      // fetchSessions();
    }
  });
  return [sessions, setSessions, loading];
};

export const toLiveSession = (r: any) => r as api.LiveSession;
export const fetchLiveSessions = () => data.liveSessions.map((ls) => toLiveSession(ls));

export const toResource = (r: any) => r as api.Resource;
export const fetchResources = () => data.resources.map((r) => toResource(r));

export const toTag = (t: any) => t as api.Tag;
export const fetchTags = () => data.tags.map((t) => toTag(t));
