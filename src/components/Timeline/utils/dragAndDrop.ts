import dayjs from "dayjs";
import { Event } from "../types";
import { CELL_WIDTH } from "./constants";

export function handleDragStart(e: React.DragEvent<HTMLDivElement>, event: Event) {
  e.dataTransfer.setData("id", String(event.id));
  e.dataTransfer.setData("startClientX", String(e.clientX));
  e.dataTransfer.setData("draggedWidth", String(e.currentTarget.offsetWidth));
}

export function handleDrop(
  e: React.DragEvent<HTMLDivElement>,
  events: Event[],
  initialDate: dayjs.Dayjs
) {
  e.preventDefault();

  const eventId = e.dataTransfer.getData("id");
  const draggedEvent = events.find((event) => event.id === Number(eventId));

  if (draggedEvent) {
    const startDate = dayjs(draggedEvent.start);
    const endDate = dayjs(draggedEvent.end);

    const offset = e.clientX - Number(e.dataTransfer.getData("startClientX"));
    const colsMoved = Math.floor(offset / (CELL_WIDTH));

    const newStartDate = startDate.add(colsMoved, "day");
    const newEndDate = endDate.add(colsMoved, "day");
    
    if (newStartDate.isBefore(initialDate)) {
      const eventSize = endDate.diff(startDate, "day");

      draggedEvent.start = initialDate.format("YYYY-MM-DD");
      draggedEvent.end = initialDate.add(eventSize, "day").format("YYYY-MM-DD");
    } else {
      draggedEvent.start = newStartDate.format("YYYY-MM-DD");
      draggedEvent.end = newEndDate.format("YYYY-MM-DD");
    }

    return [...events];
  }

  return [];
}
