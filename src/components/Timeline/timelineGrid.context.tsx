/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";
import { TimelineGridContextValues, TimelineGridProviderProps } from "./types";
import { useTimeline } from "./hooks/useTimeline";
import dayjs from "dayjs";

export const TimelineGridContext = createContext<TimelineGridContextValues>({
  events: [],
  setEvents: () => {},
  eventRows: {},
  takenColumns: {},
  dates: [],
  initialDate: dayjs(),
});

export function TimelineGridProvider({ children, timelineItems }: TimelineGridProviderProps) {
  const {
    eventRows,
    takenColumns,
    dates,
    events,
    setEvents,
    initialDate
  } = useTimeline(timelineItems);

  return (
    <TimelineGridContext.Provider
      value={{
        events,
        eventRows,
        takenColumns,
        setEvents,
        dates,
        initialDate
      }}
    >
      {children}
    </TimelineGridContext.Provider>
  );
};

export const useTimelineGrid = () => useContext(TimelineGridContext);
