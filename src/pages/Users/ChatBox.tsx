import { Box, Card, Stack, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Loading } from "src/assets/icons/loading";
import ChatCard from "src/components/CustomChatCard/ChatCard";
import { RootState } from "src/redux/reducers";

function ChatBox() {
  const elementRef = useRef();
  const { loading, CHAT, queryLoading } = useSelector(
    (state: RootState) => state.chat
  );

  useEffect(() => {
    const element = elementRef.current as any;
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }, [CHAT?.messages?.length]);

  if (loading) {
    return (
      <Box sx={{ m: 1, height: "calc(100vh - 230px)", overflow: "scroll" }}>
        <Stack
          sx={{
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <Loading />
        </Stack>
      </Box>
    );
  }

  return (
    <Box
      sx={{ m: 1, height: "calc(100vh - 230px)", overflow: "scroll" }}
      ref={elementRef}
    >
      {CHAT?.messages.map((item) => (
        <ChatCard item={item} loading={false} />
      ))}
      {queryLoading && (
        <ChatCard
          item={{
            context: "",
            is_Liked: 0,
            message_id: "",
            type: "aryabhat",
            model_id: "",
            provider_id: "",
            tag: "",
          }}
          loading={queryLoading}
        />
      )}
    </Box>
  );
}

export default ChatBox;
