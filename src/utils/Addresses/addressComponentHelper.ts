//eslint-disable-next-line
function formatScheduleText(schedule: any[]) {
  const TEXT_WIDTH = 22;

  return schedule
    .map((item) => {
      const day = daysMap(item.day) || "";

      let text = "";

      if (item.day_off) {
        text = `${day}: выходной`;
      } else {
        text = `${day}: ${formatTime(item.start)} - ${formatTime(item.end)}`;
      }

      return text.padEnd(TEXT_WIDTH, " ");
    })
    .join("\n");
}

function formatTime(time: string) {
  if (!time) return "";
  const parts = time.split(":");
  return `${parts[0]}:${parts[1]}`;
}

function daysMap(day: number) {
  const daysMap: { [key: number]: string } = {
    1: "ПН",
    2: "ВТ",
    3: "СР",
    4: "ЧТ",
    5: "ПТ",
    6: "СБ",
    7: "ВС",
  };

  return daysMap[day];
}

export { formatScheduleText, daysMap };
