import dayjs from "dayjs";

type HeaderProps = {
  dates: dayjs.Dayjs[];
}

export function Header({ dates }: HeaderProps) {
  return (
    <>
      {dates.map((date, index) => (
        <div
          key={index}
          className="bg-gray-50 text-black text-center p-2 font-extralight"
          style={{
            gridColumnStart: index + 2,
            gridColumnEnd: index + 3,
            gridRowStart: 1,
          }}
        >
        <div className="text-sm font-normal whitespace-nowrap">
          {date.format("MMM DD")}
        </div>
        <div className="text-sm">{date.format("ddd")}</div>
        </div>
      ))}
    </>
  );
}