import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Parse from 'parse';
import { find, propEq } from 'ramda';
import { Redirect } from 'react-router-dom';
import * as api from 'api';
import nextImg from 'assets/images/next.svg';
import pauseImg from 'assets/images/pause.svg';
import playImg from 'assets/images/play.svg';
import previousImg from 'assets/images/previous.svg';
import resetImg from 'assets/images/reset.svg';
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

const CountText = styled(ty.Text)({
  'user-select': 'none',
  fontSize: 30,
  fontWeight: 'bold',
});

const TogglePlay = styled(l.Img)<{ duration: number; isActive: boolean }>(
  {
    cursor: 'pointer',
    height: th.sizes.xs,
    position: 'absolute',
    right: th.spacing.md,
    top: '50%',
    transform: 'translateY(-50%)',
    transition: 'all 1s ease',
  },
  ({ duration, isActive }) => ({
    opacity: duration % 2 === 0 || !isActive ? 1 : 0.4,
  }),
);

const Reset = styled(l.Img)({
  cursor: 'pointer',
  height: th.sizes.xs,
  position: 'absolute',
  left: th.spacing.md,
  top: '50%',
  transform: 'translateY(-50%)',
});

const TimeLabel = styled(ty.Label)({
  position: 'absolute',
  right: -24,
  textAlign: 'center',
  top: 0,
  width: 20,
});

const Live = () => {
  const [{ user }] = useGlobalContext();
  const [{ liveId }] = useLiveQueryParams();

  const liveSessionsContent = api.fetchLiveSessionsContent();
  const liveSession = find(propEq('id', liveId || '0'), liveSessionsContent);
  const sessions = api.fetchSessions();
  const session = liveSession && find(propEq('id', liveSession.sessionId), sessions);

  const [activeLiveIndex] = api.useFetchActiveLiveSessionIndex();
  const previousLiveIndex = usePrevious(activeLiveIndex);
  const initialLiveIndex =
    activeLiveIndex >= 0
      ? liveSession
        ? activeLiveIndex < liveSession.exercises.length
          ? activeLiveIndex
          : liveSession.exercises.length - 1
        : 0
      : 0;
  const [activeIndex, setActiveIndex] = useState(initialLiveIndex);
  const isFirst = activeIndex === 0;
  const isLast = liveSession && activeIndex === liveSession.exercises.length - 1;
  const initialIsLive = activeLiveIndex >= 0 && activeIndex === activeLiveIndex;
  const [isLive, setIsLive] = useState(initialIsLive);

  const exercises = api.fetchExercises();
  const activeLiveExercise = liveSession && liveSession.exercises[activeIndex];
  const activeExercise = activeLiveExercise && find(propEq('id', activeLiveExercise.exerciseId), exercises);
  const isTime = activeLiveExercise && activeLiveExercise.type === 'time';

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

  const initialDuration = getDuration(activeLiveExercise);
  const [duration, setDuration] = useState(initialDuration);
  const [isActive, setIsActive] = useState(false);
  const initialSetCount = activeLiveExercise && activeLiveExercise.setCount ? activeLiveExercise.setCount : 0;
  const [setCount, setSetCount] = useState(initialSetCount);

  const getTime = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return minutes ? `${minutes}${seconds % 2 === 0 || !isActive ? ':' : ' '}${seconds || '00'}` : `${seconds}`;
  };

  const decrement = useCallback(async () => {
    const nextIndex = activeIndex - 1;
    if (liveSession && nextIndex >= 0) {
      if (user) {
        const LiveSession = Parse.Object.extend('LiveSession');
        const query = new Parse.Query(LiveSession);
        const results: any = await query.first();
        results.increment('activeIndex');
        results.save();
      } else {
        setActiveIndex(nextIndex);
        setIsLive(false);
      }
    }
  }, [activeIndex, liveSession, user]);

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
        setIsLive(false);
      }
    }
  }, [activeIndex, exercises.length, liveSession, user]);

  const reset = useCallback(() => {
    setDuration(initialDuration);
    setIsActive(false);
  }, [initialDuration]);

  const toggleActive = useCallback(() => {
    setIsActive(!isActive);
  }, [isActive]);

  const toggleLive = useCallback(() => {
    if (!isLive) {
      setActiveIndex(activeLiveIndex !== undefined ? activeLiveIndex : activeIndex);
    }
    setIsLive(!isLive);
  }, [activeLiveIndex, activeIndex, isLive]);

  useEffect(() => {
    if (previousLiveIndex === activeIndex || (previousLiveIndex === -1 && activeLiveIndex >= 0)) {
      setActiveIndex(activeLiveIndex);
      setIsLive(initialIsLive);
    }
  }, [activeIndex, activeLiveIndex, initialIsLive, isLive, previousLiveIndex]);

  useEffect(() => {
    if (activeLiveExercise && isTime) {
      setDuration(initialDuration);
      setSetCount(initialSetCount);
      setIsActive(true);
    } else {
      reset();
    }
  }, [activeLiveExercise, initialDuration, initialSetCount, isTime, reset]);

  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => {
        if (duration === 1 && setCount > 1) {
          setSetCount(setCount - 1);
          reset();
        } else if (duration === 1) {
          setDuration((duration) => duration - 1);
          setSetCount(0);
        } else if (duration === 0) {
          clearInterval(interval);
          setIsActive(false);
        } else {
          setDuration((duration) => duration - 1);
        }
      }, 1000);
    } else if (!isActive && duration !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [duration, isActive, reset, setCount]);

  if (!activeExercise || !session || !activeLiveExercise || !liveSession) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Sticky>
        <l.AreaLink to={`/sessions/${liveSession.sessionId}`}>
          <l.Centered pb={th.spacing.sm} pt={th.spacing.md} position="relative">
            <ty.Label>View Session</ty.Label>
            <ty.Text center>{liveSession.name || session.name}</ty.Text>
            {user && (
              <l.Div position="absolute" right={56} top={12}>
                <l.Img height={th.sizes.xs} src={userImg} />
              </l.Div>
            )}
            <l.Div position="absolute" onClick={(e) => e.preventDefault()} right={12} top={th.spacing.sm}>
              <LiveIndicator live={isLive} onClick={toggleLive} />
            </l.Div>
          </l.Centered>
        </l.AreaLink>
        <ProgressBar activeIndex={activeIndex} liveExercises={liveSession.exercises} />
        <l.FlexBetween bg="#3A3A3A" height={85}>
          <l.Centered flexBasis="10%" height={th.sizes.fill} onClick={isFirst ? undefined : decrement} pointer>
            {!isFirst && <l.Img src={previousImg} width={th.sizes.xs} />}
          </l.Centered>
          <l.Centered width="80%">
            <ty.Label color={th.colors.white}>Active Exercise</ty.Label>
            <l.Div scroll={false} width={`calc(${th.sizes.fill} - ${th.spacing.md})`}>
              <ty.H3 center color={th.colors.white} nowrap>
                {activeExercise.name}
              </ty.H3>
            </l.Div>
          </l.Centered>
          <l.Centered flexBasis="10%" height={th.sizes.fill} onClick={isLast ? undefined : increment} pointer>
            {!isLast && <l.Img src={nextImg} width={th.sizes.xs} />}
          </l.Centered>
        </l.FlexBetween>
        <l.Flex bdb={th.borders.input}>
          <l.Centered bdr={th.borders.input} flex={1} height={85} position="relative">
            <ty.Label>Sets</ty.Label>
            <ty.Text bold fontSize="30px">
              {setCount !== undefined ? setCount : activeLiveExercise.setCount}
            </ty.Text>
            {isTime && setCount !== initialSetCount && (!isActive || setCount === 0) && (
              <Reset
                onClick={(e: React.ChangeEvent) => {
                  e.stopPropagation();
                  if (duration === 0) {
                    reset();
                  }
                  setSetCount(initialSetCount);
                }}
                src={resetImg}
              />
            )}
          </l.Centered>
          <l.Centered
            flex={1}
            height={85}
            position="relative"
            onClick={isTime ? toggleActive : undefined}
            pointer={isTime}
          >
            <l.Div position="relative">
              <ty.Label>{activeLiveExercise.type}</ty.Label>
              {isTime && <TimeLabel>({duration < 60 ? 's' : 'min'})</TimeLabel>}
            </l.Div>
            <CountText>{getTime(duration) || activeLiveExercise.count}</CountText>
            {isTime && duration !== initialDuration && (!isActive || duration === 0) && (
              <Reset
                onClick={(e: React.ChangeEvent) => {
                  e.stopPropagation();
                  reset();
                }}
                src={resetImg}
              />
            )}
            {isTime && duration > 0 && (
              <TogglePlay
                duration={duration}
                isActive={isActive}
                src={isActive || initialDuration === duration ? playImg : pauseImg}
              />
            )}
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
