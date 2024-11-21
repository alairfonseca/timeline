import { TimelineItem } from "@/adapters";

interface TimelineProps {
  timelineItems: TimelineItem[];
}

export function Timeline({ timelineItems }: TimelineProps) {
  return <pre>{JSON.stringify(timelineItems, null, 2)}</pre>
}
