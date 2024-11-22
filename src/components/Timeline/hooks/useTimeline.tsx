import { useMemo, useState } from "react";
import { Event } from "../types";
import { getDaysInInterval, intervalToRender } from "../utils";
import { placeEvents } from "../utils/timeline";

export function useTimeline(timelineItems: Event[]) {
  const [events, setEvents] = useState<Event[]>(timelineItems);

  const { eventRows, takenColumns, dates } = useMemo(() => {
    const interval = intervalToRender(events);
    const dates = getDaysInInterval(interval[0], interval[1]);

    const { eventRows, takenColumns } = placeEvents(events, dates[0]);

    return {
      eventRows,
      takenColumns,
      dates,
    };
  }, [events]);

  // const [takenCells, setTakenCells] = useState<{[row: number]: number[]}>({});

  // useEffect(() => {}, [events, takenCells]);

  return {
    eventRows,
    takenColumns,
    dates,
    events,
    setEvents,
    initialDate: dates[0],
  };
}
