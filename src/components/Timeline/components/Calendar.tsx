import { CELL_WIDTH, handleDrop } from "../utils";
import { useTimelineGrid } from "../timelineGrid.context";
import { EventBar } from "./EventBar";
import { Header } from "./Header";
import { useCallback } from "react";
import { EditTitleModal } from "./EditTitleModal";
import { useEditTitle } from "../hooks";

function onDragOver(e: React.DragEvent<HTMLDivElement>) {
  e.preventDefault()
}

function Calendar() {
  const { events, eventRows, dates, setEvents, initialDate } = useTimelineGrid();
  const {
    event: eventToEdit,
    modalIsOpen,
    openEditModal,
    closeModal,
    confirm
  } = useEditTitle();

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    const newEvents = handleDrop(e, events, initialDate);

    setEvents(newEvents);
  }, [events, setEvents, initialDate]);

  return (
    <div
      id="calendarGrid"
      className="grid gap-2 w-full h-screen overflow-auto relative"
      style={{
        gridTemplateColumns: `repeat(${dates.length}, ${CELL_WIDTH}px)`,
        gridAutoRows: "50px",
        alignItems: "center",
      }}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <Header dates={dates} />

      <div
        className="flex text-black text-center p-2 items-start justify-center"
        style={{
          gridColumnStart: 1,
          gridColumnEnd: 1,
          gridRowStart: 2,
        }}
      >
        <div className="text-sm font-bold whitespace-nowrap">
          Events
        </div>
      </div>

      {
        events?.map(event => (
          <EventBar
            key={event.id}
            event={event}
            startDate={dates[0]}
            eventRows={eventRows}
            onDoubleClick={openEditModal}
          />
        ))
      }

      <EditTitleModal
        confirm={confirm}
        closeModal={closeModal}
        isOpen={modalIsOpen}
        event={eventToEdit.current}
      />
    </div>
  );
};

export default Calendar;
