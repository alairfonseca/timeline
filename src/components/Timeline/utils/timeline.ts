import { ColumnsTaken, Event, EventRows } from "../types";
import dayjs from "dayjs";

export function getEventStartAndEndColumns(event: Event, initialDate: dayjs.Dayjs): [number, number] {
  // 1 because grid layout is 1 based and plus 1 because the first cell is reserved
  const columnsToShiftRight = 2;

  const startCol = dayjs(event.start).diff(initialDate, 'day') + columnsToShiftRight;
  const endCol = dayjs(event.end).diff(event.start, 'day') + startCol + 1;

  return [startCol, endCol];
}

export function areEventsOverlapping(a: Event, b: Event) {
  return dayjs(a.start).isBefore(b.end) && dayjs(b.start).isBefore(dayjs(a.end));
}

export function placeEvents(events: Event[], initialDate: dayjs.Dayjs) {
  const eventRows: EventRows = {};
  const takenColumns: ColumnsTaken = {};

  for (const event of events) {
    const [start, end] = getEventStartAndEndColumns(event, initialDate);
    const row = nextFreeRow(takenColumns, start, end);

    eventRows[event.id] = row;
    registerTakenCols(takenColumns, row, start, end);
  };

  return {eventRows, takenColumns};
}

export function nextFreeRow(takenColumns: ColumnsTaken, start: number, end: number) {
  let rowCursor = 2;
  let found = false;

  while (!found) {
    let free = true;

    for (let i = start; i < end; i++) {
      if (takenColumns[rowCursor]?.includes(i)) {
        free = false;
      }
  
      if (!free) {
        rowCursor++;
        break;
      }
    }

    if (free) {
      found = true;
    }
  }

  return rowCursor;
}

export function registerTakenCols(takenColumns: ColumnsTaken, row: number, start: number, end: number) {
  if (!takenColumns[row]) {
    takenColumns[row] = [];
  }

  for (let i = start; i < end; i++) {
    takenColumns[row].push(i);
  }
}
