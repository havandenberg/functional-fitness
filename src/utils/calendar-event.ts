import moment from 'moment';
import { find, isEmpty, propEq } from 'ramda';
import { rrulestr } from 'rrule';
import * as api from 'api';

const MAX_RECURRENCES = 200;

const GET_CAL_URL = (calID: string, key: string) =>
  `https://www.googleapis.com/calendar/v3/calendars/${calID}/events?fields=items(summary,id,location,start,end,recurrence,description)&key=${key}`;

export const getEvents = () =>
  fetch(GET_CAL_URL(process.env.REACT_APP_GCAL_ID || '', process.env.REACT_APP_GCAL_KEY || '')).then((res) =>
    res.json(),
  );

export const expandRecurringEvents: (events: api.CalendarEventShape[]) => api.LiveSession[] = (events) => {
  const liveSessionsContent = api.fetchLiveSessionsContent();
  const liveSessions: api.LiveSession[] = [];
  events.map((event: api.CalendarEventShape) => {
    const startMoment = moment.utc(new Date(event.start.date || event.start.dateTime || ''));
    const endMoment = moment.utc(new Date(event.end.date || event.end.dateTime || ''));
    const minDiff = moment.duration(endMoment.diff(startMoment)).asMinutes();
    const data = event.description ? event.description.split(':') : [];
    const id = data.length > 0 ? data[0] : '';
    // const instructor = data.length > 1 ? data[1] : '';

    if (event.recurrence && !isEmpty(event.recurrence)) {
      rrulestr(`DTSTART:${startMoment.format('YYYYMMDD')}T${startMoment.format('HHmmss')}Z\n${event.recurrence[0]}`)
        .all((date: Date, i: number) => i < MAX_RECURRENCES)
        .map((date: Date) => {
          const liveSessionContent = find(propEq('id', id), liveSessionsContent);
          const isLive = moment().isBetween(moment.utc(date), moment.utc(date).add(minDiff, 'minutes'), 'minute');
          if (liveSessionContent) {
            liveSessions.push({
              ...liveSessionContent,
              duration: `${minDiff} min`,
              end: moment.utc(date).add(minDiff, 'minutes').toISOString(),
              id: `${liveSessions.length}`,
              isLive,
              name: event.summary,
              start: date.toISOString(),
            });
          }
          return null;
        });
    } else {
      const liveSessionContent = find(propEq('id', id), liveSessionsContent);
      const isLive = moment().isBetween(startMoment, endMoment, 'minute');
      if (liveSessionContent) {
        liveSessions.push({
          ...liveSessionContent,
          duration: `${minDiff} min`,
          end: endMoment.toISOString(),
          id: `${liveSessions.length}`,
          isLive,
          name: event.summary,
          start: startMoment.toISOString(),
        });
      }
    }
    return null;
  });
  return liveSessions;
};
