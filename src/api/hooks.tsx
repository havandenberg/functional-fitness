import { useEffect, useState } from 'react';
import Parse from 'parse';
import * as api from '.';
import data from 'content/data';

export const toExercise = (s: any) => s as api.Exercise;
export const fetchExercises = () => data.exercises.map((e) => toExercise(e));

export const toSession = (s: any) => ({ ...s } as api.Session);
export const fetchSessions = () => data.sessions.map((s) => toSession(s));

export const toLiveSession = (r: any) => r as api.LiveSession;
export const fetchLiveSessions = () => data.liveSessions.map((ls) => toLiveSession(ls));

export const useFetchActiveLiveSessionIndex = () => {
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [loading, setLoading] = useState(true);
  const fetchLiveSessionIndex = async () => {
    const LiveSession = Parse.Object.extend('LiveSession');
    const query = new Parse.Query(LiveSession);
    const results: any = await query.first();
    const { activeIndex } = results.attributes;
    setActiveIndex(activeIndex as number);
    setLoading(false);
    const subscription = api.client.subscribe(query);
    subscription.on('update', (results: any) => {
      const { activeIndex } = results.attributes;
      setActiveIndex(activeIndex as number);
    });
  };
  useEffect(() => {
    if (activeIndex < 0) {
      fetchLiveSessionIndex();
    }
  }, [activeIndex]);
  return [activeIndex, loading] as const;
};

export const toResource = (r: any) => r as api.Resource;
export const fetchResources = () => data.resources.map((r) => toResource(r));

export const toTag = (t: any) => t as api.Tag;
export const fetchTags = () => data.tags.map((t) => toTag(t));
