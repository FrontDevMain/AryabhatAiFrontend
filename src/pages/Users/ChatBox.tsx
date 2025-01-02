import { Box, Stack } from "@mui/material";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Loading } from "src/assets/icons/loading";
import { useAuthContext } from "src/auth/useAuthContext";
import ChatCard from "src/components/CustomChatCard/ChatCard";
import { fetchChat } from "src/redux/actions/chat/ChatActions";
import { updateSelectedLlm } from "src/redux/actions/llm/LlmActions";
import { updateSelectedTag } from "src/redux/actions/tags/TagsActions";
import { RootState } from "src/redux/reducers";

function ChatBox({ chatid }: { chatid: string | undefined }) {
  const elementRef = useRef();
  const { user } = useAuthContext();
  const dispatch = useDispatch();
  const { loading, CHAT, queryLoading } = useSelector(
    (state: RootState) => state.chat
  );
  const { LLM } = useSelector((state: RootState) => state.llm);
  const { TAG } = useSelector((state: RootState) => state.tag);

  useEffect(() => {
    const element = elementRef.current as any;
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
    if (CHAT.messages?.length) {
      const { provider_id, model_id, tag } =
        CHAT.messages[CHAT.messages.length - 1];
      dispatch(
        updateSelectedLlm(
          [LLM.find((item) => item.provider_id == provider_id)].map((item) => ({
            ...item,
            model: item?.model.map((row) => ({
              ...row,
              isSelected: row.model_id == model_id,
            })),
          }))[0]
        )
      );
      dispatch(
        updateSelectedTag(TAG.tags.find((item) => item.tag_name == tag))
      );
    }
  }, [CHAT]);

  useEffect(() => {
    if (chatid) {
      dispatch(fetchChat(user.user_id, chatid));
    }
  }, [chatid]);

  if (loading) {
    return (
      <Box
        sx={{ my: 1, mx: 3, height: "calc(100vh - 230px)", overflow: "scroll" }}
      >
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
      sx={{
        my: 1,
        mx: 3,
        pr: 1,
        height: "calc(100vh - 230px)",
        overflow: "scroll",
      }}
      ref={elementRef}
    >
      {CHAT?.messages.map((item) => (
        <ChatCard item={item} loading={false} key={item.message_id} />
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
