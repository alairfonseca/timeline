import { Dispatch, ReactNode, SetStateAction } from "react";
import dayjs from "dayjs";

export type Event = {
  id: number;
  start: string;
  end: string;
  name: string;
};

export type EventRows = {
  [eventId: number]: number;
}

export type ColumnsTaken = {
  [row: number]: number[]
};

export type TimelineGridContextValues = {
  events: Event[];
  setEvents: Dispatch<SetStateAction<Event[]>>;
  eventRows: EventRows;
  takenColumns: ColumnsTaken;
  dates: dayjs.Dayjs[];
  initialDate: dayjs.Dayjs;
};

export type TimelineGridProviderProps = {
  children: ReactNode;
  timelineItems: Event[];
};
