import { SelectOption } from "@/components/select/select";

export const radiusOptions: SelectOption[] = [
  {
    label: "0",
    value: "0",
  },
  {
    label: "1",
    value: "1",
  },
  {
    label: "2",
    value: "2",
  },
  {
    label: "3",
    value: "3",
  },
  {
    label: "6",
    value: "6",
  },
  {
    label: "9",
    value: "9",
  },
];

export const thicknessOptions = [10, 16, 19, 22, 24, 26, 32].map((item) => ({
  label: `${item} мм`,
  value: item,
}));
