import dayjs from "dayjs";

export const formatDate = (date: Date) => dayjs(date).format("DD.MM.YYYY");

export function pluralize(num: number, titles: string[]): string {
  const title =
    titles[
      num % 10 === 1 && num % 100 !== 11
        ? 0
        : num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20)
          ? 1
          : 2
    ];

  return `${num} ${title}`;
}
