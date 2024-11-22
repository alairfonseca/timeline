import { Event, EventRows } from "../types";
import { eventColors, handleDragStart } from "../utils";
import dayjs from "dayjs";
import { getEventStartAndEndColumns } from "../utils/timeline";
import Tippy from '@tippyjs/react';

import "tippy.js/dist/tippy.css";
import { useCallback, useMemo } from "react";

type EventBarProps = {
  event: Event;
  startDate: dayjs.Dayjs;
  eventRows: EventRows;
  onDoubleClick: (event: Event) => void;
}

function TooltipContent({ event }: { event: Event }) {
  return (
    <div className="flex flex-col">
      <div className="text-[10px] text-grey-500 font-bold truncate max-w-[100%]">
        {event.name}
      </div>

      <div className="text-[10px] text-grey-500 font-bold truncate max-w-[100%]">
        {dayjs(event.start).format("YYYY/MM/DD")} - {dayjs(event.end).format("YYYY/MM/DD")}
      </div>
    </div>
  );
}

export function EventBar({ event, startDate, eventRows, onDoubleClick }: EventBarProps) {
  const [startCol, endCol] = getEventStartAndEndColumns(event, startDate);

  const disableTooltip = (endCol - startCol) >= 3;

  const color = useMemo(() => eventColors[Math.floor(Math.random() * eventColors.length)], []);

  const handleDoubleClick = useCallback(() => {
    onDoubleClick(event);
  }, [event, onDoubleClick]);

  return (
    <div
      key={event.id}
      className={`
        cursor-pointer
        active:cursor-grabbing
        h-[45px]
        flex flex-col justify-center
        text-xs text-white p-2 rounded shadow
        whitespace-nowrap
        bg-opacity-30
        ${color}
      `}
      style={{
        gridColumnStart: startCol,
        gridColumnEnd: endCol,
        gridRowStart: eventRows[event.id],
      }}
      draggable
      onDragStart={(e) => handleDragStart(e, event)}
      onDoubleClick={handleDoubleClick}
    >
      <Tippy content={<TooltipContent event={event} />} disabled={disableTooltip}>
        <div className="flex flex-col">
          <div className="text-[10px] text-black font-bold truncate max-w-[100%]">
            {event.name}
          </div>

          <div className="text-[10px] text-black font-bold truncate max-w-[100%]">
            {dayjs(event.start).format("YYYY/MM/DD")} - {dayjs(event.end).format("YYYY/MM/DD")}
          </div>
        </div>
      </Tippy>
    </div>
  );
}
