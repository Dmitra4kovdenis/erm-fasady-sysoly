import dayjs from "dayjs";

export const formatDate = (date: Date) => dayjs(date).format("DD.MM.YYYY");
export const formatDateTime = (date: Date) =>
  dayjs(date).format("DD.MM.YYYY HH:mm:ss");

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

export function getInitials(fullName: string): string {
  if (!fullName) return "?";
  const parts = fullName.trim().split(" ");
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  return parts[0].charAt(0).toUpperCase() + parts[1].charAt(0).toUpperCase();
}
