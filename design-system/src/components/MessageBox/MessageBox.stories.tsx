import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import MessageBox from "./MessageBox";

export default {
  title: "MessageBox",
  component: MessageBox,
  argTypes: {
    text: { control: "text" },
    messageType: { control: "select", options: ["info", "success", "error"] },
  },
} as ComponentMeta<typeof MessageBox>;

const Template: ComponentStory<typeof MessageBox> = (args) => (
  <MessageBox {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  text: "This is a message box",
  messageType: "info",
};

export const Secondary = Template.bind({});
Secondary.args = {
  text: "",
  messageType: "error",
};
