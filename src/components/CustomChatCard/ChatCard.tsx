import { Card, Stack, Typography } from "@mui/material";
import { Loading } from "src/assets/icons/loading";
import { messageType } from "src/redux/actions/chat/ChatActionTypes";

function ChatCard({ item, loading }: { item: messageType; loading: boolean }) {
  if (loading) {
    return (
      <Stack
        sx={{
          alignItems: item.type == "aryabhat" ? "start" : "flex-end",
          my: 2,
        }}
      >
        <Card sx={{ p: 1, maxWidth: "60%", boxShadow: "none" }}>
          <Loading />
        </Card>
      </Stack>
    );
  }
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
