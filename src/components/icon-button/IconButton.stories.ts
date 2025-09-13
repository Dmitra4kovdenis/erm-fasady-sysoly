import Button from "@/components/button/button";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  component: Button,
  title: "Button",
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Кнопка",
  },
};
