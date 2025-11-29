import { useEffect, useMemo } from 'react';
import { MetaPixelEventParams, trackMetaEvent } from '../utils/metaPixel';

const DEFAULT_EVENTS = ['ViewContent'] as const;

type UseMetaPageEventsOptions = {
  params?: MetaPixelEventParams;
  events?: string[];
};

export const useMetaPageEvents = (
  contentName: string,
  { params, events = DEFAULT_EVENTS as unknown as string[] }: UseMetaPageEventsOptions = {}
) => {
  const payload = useMemo(() => ({ content_name: contentName, ...params }), [contentName, params]);
  const eventsToSend = useMemo(() => events, [events]);

  useEffect(() => {
    eventsToSend.forEach((event) => trackMetaEvent(event, payload));
  }, [eventsToSend, payload]);
};

export default useMetaPageEvents;
