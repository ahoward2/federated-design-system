import React from "react";
import MessageBoxWrapper from "./MessageBox.styles";

type MessageBoxProps = {
  text?: string;
  messageType?: "info" | "success" | "error";
};

const MessageBox = ({ text, messageType }: MessageBoxProps) => {
  const messageTypeEmoji = {
    info: "💬",
    success: "✅",
    error: "❌",
  };

  return (
    <MessageBoxWrapper>
      <p>
        {text
          ? `${messageTypeEmoji[messageType] ?? messageTypeEmoji.error} ${text}`
          : `${messageTypeEmoji.error} no prop value provided`}
      </p>
    </MessageBoxWrapper>
  );
};

export default MessageBox;
