import Calendar from "./components/Calendar";
import { TimelineGridProvider } from "./timelineGrid.context";
import { Event } from "./types";

interface TimelineProps {
  timelineItems: Event[];
}

export function Timeline({ timelineItems }: TimelineProps) {
  return (
    <TimelineGridProvider timelineItems={timelineItems}>
      <Calendar />
    </TimelineGridProvider>
  )
}
