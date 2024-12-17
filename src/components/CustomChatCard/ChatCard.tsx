import { Card, Stack, Typography } from "@mui/material";
import { messageType } from "src/redux/actions/chat/ChatActionTypes";

function ChatCard({ item }: { item: messageType }) {
  return (
    <Stack
      sx={{
        alignItems: item.type == "aryabhat" ? "start" : "flex-end",
        my: 2,
      }}
    >
      <Card sx={{ p: 2, maxWidth: "60%", boxShadow: "none" }}>
        <Typography>{item.context}</Typography>
      </Card>
    </Stack>
  );
}

export default ChatCard;
