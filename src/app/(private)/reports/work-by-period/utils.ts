import dayjs from "dayjs";

export const generatePeriods = () => {
  const currentDate = dayjs().date(27);

  return Array.from({ length: 24 }).map((_, index) => {
    // дата начала периода - сегодня минус индекс месяцев, задаем 27 число
    const date = currentDate.clone().subtract(index, "months");

    return {
      label: `${date.format("MMMM YYYY")}`,
      value: date.format(ADDRESS_MASK),
    };
  });
};

export const ADDRESS_MASK = "MM-DD-YYYY";
