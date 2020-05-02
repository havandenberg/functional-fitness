import React, { useCallback, useEffect, useState } from 'react';
import Parse from 'parse';
import { find, propEq } from 'ramda';
import { Redirect } from 'react-router-dom';
import * as api from 'api';
import nextImg from 'assets/images/next.svg';
import previousImg from 'assets/images/previous.svg';
import userImg from 'assets/images/user.svg';
import Exercise from 'components/exercise';
import { Sticky } from 'components/header';
import LiveIndicator from 'components/live-indicator';
import ProgressBar from 'components/progress-bar';
import { useGlobalContext } from 'context/global';
import { usePrevious } from 'hooks/use-previous';
import { useLiveQueryParams } from 'hooks/use-query-params';
import l from 'ui/layout';
import th from 'ui/theme';
import ty from 'ui/typography';

const Live = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [{ user }] = useGlobalContext();
  const [{ liveId }] = useLiveQueryParams();
  const liveSessionsContent = api.fetchLiveSessionsContent();
  const liveSession = find(propEq('id', liveId || '0'), liveSessionsContent);
  const sessions = api.fetchSessions();
  const session = liveSession && find(propEq('id', liveSession.sessionId), sessions);

  const [activeLiveIndex] = api.useFetchActiveLiveSessionIndex();
  const isLive = activeLiveIndex >= 0 && activeIndex === activeLiveIndex;
  const previousLiveIndex = usePrevious(activeLiveIndex);
  const exercises = api.fetchExercises();
  const activeLiveExercise = liveSession && liveSession.exercises[activeIndex];
  const activeExercise = activeLiveExercise && find(propEq('id', activeLiveExercise.exerciseId), exercises);

  useEffect(() => {
    if (previousLiveIndex === activeIndex) {
      setActiveIndex(activeLiveIndex);
    }
  }, [activeIndex, activeLiveIndex, previousLiveIndex]);

  const getDuration = useCallback((activeLiveExercise?: api.LiveExercise) => {
    let time = activeLiveExercise ? activeLiveExercise.count.split(':') : [];
    let duration = 0;
    if (time.length > 0) {
      const minutes = time.length === 2 ? parseInt(time[0]) : 0;
      const seconds = time.length === 2 ? parseInt(time[1]) : parseInt(time[0]);
      duration = minutes * 60 + seconds;
    }
    return duration;
  }, []);

  const getTime = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return minutes ? `${minutes}:${seconds}` : seconds;
  };

  const [duration, setDuration] = useState(getDuration(activeLiveExercise));
  const [isActive, setIsActive] = useState(false);

  const reset = useCallback(() => {
    setDuration(getDuration(activeLiveExercise));
    setIsActive(false);
  }, [activeLiveExercise, getDuration]);

  useEffect(() => {
    if (activeLiveExercise && activeLiveExercise.type === 'time') {
      setDuration(getDuration(activeLiveExercise));
      setIsActive(true);
    } else {
      reset();
    }
  }, [activeLiveExercise, getDuration, reset]);

  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => {
        setDuration((duration) => duration - 1);
      }, 1000);
    } else if (!isActive && duration !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, duration]);

  const increment = useCallback(async () => {
    const nextIndex = activeIndex + 1;
    if (liveSession && nextIndex < exercises.length && nextIndex < liveSession.exercises.length) {
      if (user) {
        const LiveSession = Parse.Object.extend('LiveSession');
        const query = new Parse.Query(LiveSession);
        const results: any = await query.first();
        results.increment('activeIndex');
        results.save();
      } else {
        setActiveIndex(nextIndex);
      }
    }
  }, [activeIndex, exercises.length, liveSession, user]);

  const decrement = () => {
    const nextIndex = activeIndex - 1;
    if (nextIndex >= 0) {
      setActiveIndex(nextIndex);
    }
  };

  if (!activeExercise || !session || !activeLiveExercise || !liveSession) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Sticky>
        <l.AreaLink to={`/sessions/${liveSession.sessionId}`}>
          <l.Centered pb={th.spacing.sm} pt={th.spacing.md} position="relative">
            <ty.Label>Session</ty.Label>
            <ty.Text center>{session.name}</ty.Text>
            {user && (
              <l.Div position="absolute" right={56} top={12}>
                <l.Img height={th.sizes.xs} src={userImg} />
              </l.Div>
            )}
            <l.Div position="absolute" onClick={(e) => e.preventDefault()} right={12} top={th.spacing.sm}>
              <LiveIndicator live={isLive} onClick={() => setActiveIndex(activeLiveIndex || activeIndex)} />
            </l.Div>
          </l.Centered>
        </l.AreaLink>
        <ProgressBar activeIndex={activeIndex} liveExercises={liveSession.exercises} />
        <l.FlexBetween bg="#3A3A3A" height={85}>
          <l.Centered flexBasis="10%" height={th.sizes.fill} onClick={decrement}>
            <l.Img src={previousImg} width={th.sizes.xs} />
          </l.Centered>
          <l.Centered width="80%">
            <ty.Label color={th.colors.white}>Active Exercise</ty.Label>
            <l.Div scroll={false} width={`calc(${th.sizes.fill} - ${th.spacing.md})`}>
              <ty.H3 center color={th.colors.white} nowrap>
                {activeExercise.name}
              </ty.H3>
            </l.Div>
          </l.Centered>
          <l.Centered flexBasis="10%" height={th.sizes.fill} onClick={increment}>
            <l.Img src={nextImg} width={th.sizes.xs} />
          </l.Centered>
        </l.FlexBetween>
        <l.Flex bdb={th.borders.input}>
          <l.Centered bdr={th.borders.input} flex={1} height={85}>
            <ty.Label>Sets</ty.Label>
            <ty.Text bold fontSize="30px">
              {activeLiveExercise.setCount}
            </ty.Text>
          </l.Centered>
          <l.Centered flex={1} height={85}>
            <ty.Label>{activeLiveExercise.type}</ty.Label>
            <ty.Text bold fontSize="30px">
              {getTime(duration) || activeLiveExercise.count}
            </ty.Text>
          </l.Centered>
        </l.Flex>
      </Sticky>
      <l.Div my={th.spacing.lg} mx={th.spacing.md}>
        <Exercise {...activeExercise} live />
      </l.Div>
    </>
  );
};

export default Live;
