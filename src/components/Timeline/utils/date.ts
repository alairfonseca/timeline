import { Event } from "../types";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export function sortByStartDate(events: Event[]) {
  return events.sort((a, b) => {
    if (dayjs(a.start).isSameOrBefore(dayjs(b.start))) {
      return -1;
    }

    if (dayjs(a.start).isSameOrAfter(dayjs(b.start))) {
      return 1;
    }

    return 0;
  });
}

export function intervalToRender(events: Event[]): [dayjs.Dayjs, dayjs.Dayjs] {
  const firstDayToRender = dayjs(sortByStartDate(events).at(0)?.start).startOf("month");
  const lastDayToRender = dayjs(sortByStartDate(events).at(-1)?.start).endOf("month");

  return [firstDayToRender, lastDayToRender];
}

export function getDaysInInterval(start: dayjs.Dayjs, end: dayjs.Dayjs): dayjs.Dayjs[] {
  const result: dayjs.Dayjs[] = [];

  let cursor = start;
  while(cursor.isSameOrBefore(end)) {
    result.push(cursor);

    cursor = cursor.add(1, "day");
  }

  return result;
}
